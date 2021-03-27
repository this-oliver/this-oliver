<template>
  <div>
    <!-- name -->
    <b-row
      class="mt-2"
      align-h="between">
      <b-col
        class="sub-header"
        md="auto">
        {{ $t("forms.article.articleTitle") }}
      </b-col>
      <b-col md="12">
        <b-form-input
          v-model="form.title"
          :state="validateTitle"
          :placeholder="$t('forms.article.articleTitle')" />
      </b-col>
    </b-row>
    <!-- content -->
    <b-row
      class="mt-2"
      align-h="between">
      <b-col
        sm="6"
        md="auto">
        <span class="sub-header mr-3">{{ $t("forms.article.content") }}</span>
        <small>{{ getArticleLength }}</small>
      </b-col>
      <b-col
        sm="auto"
        md="auto">
        <span
          class="simple-link"
          variant="outline-primary"
          @click="showPreview = true">
          {{ $t("form.actions.preview") }}
        </span>
      </b-col>
      <b-col
        class="mt-2"
        cols="12">
        <b-textarea
          v-model="form.content"
          rows="8"
          :state="validateContent"
          :placeholder="$t('forms.article.promptContent')" />
      </b-col>
    </b-row>
    <!-- tags -->
    <b-row
      class="mt-2"
      align-h="between">
      <b-col
        class="sub-header"
        md="auto">
        {{ $t("forms.article.tags") }}
      </b-col>
      <b-col md="12">
        <b-form-tags
          v-model="form.tags"
          :placeholder="$t('forms.article.promptTags')" />
      </b-col>
    </b-row>
    <!-- actions -->
    <b-row
      class="mt-2"
      align-h="between">
      <b-col
        class="mt-1"
        sm="3"
        md="3">
        <b-button
          block
          variant="secondary"
          :to="{ name: ROUTES.admin.profile}">
          {{ $t("form.actions.back") }}
        </b-button>
      </b-col>
      <b-col
        class="mt-1"
        sm="8"
        md="3">
        <b-button
          v-if="editMode"
          block
          variant="warning"
          :disabled="!validateForm"
          @click="update({id: article._id, title: form.title, content: form.content, tags: form.tags})">
          {{ $t("form.actions.update") }}
        </b-button>
        <b-button
          v-else
          block
          variant="primary"
          :disabled="!validateForm"
          @click="post({title: form.title, content: form.content, tags: form.tags})">
          {{ $t("form.actions.post") }}
        </b-button>
      </b-col>
    </b-row>

    <!-- modals -->
    <b-modal
      v-model="showPreview"
      :title="`${$t('form.actions.preview')}: ${$t('forms.article.title')}`"
      hide-footer
      size="xl">
      <span
        v-if="form.content && form.content.length > 0"
        v-html="getMarkDown(form.content)" />
      <span v-else>...</span>
    </b-modal>
  </div>
</template>

<script>
	import { mapActions } from "vuex";
	import {getMarkdown} from "../../helpers/markdown-helper";
	import {getWordCount} from "../../helpers/string-helper";

	export default {
		name:"ArticleFormVue",
		props:{
			editMode:{
				type:Boolean,
				default: false
			},
			article: {
				type: Object,
				default: null
			}
		},
		data: function(){
			return{
				form:{
					title: null,
					content: null,
					tags: null,
				},
				showPreview: false,
			};
		},
		computed:{
			getArticleLength: function(){
				let content = this.form.content;
				return getWordCount(content);
			},
			validateTitle: function(){
				let title = this.form.title;
				if(title){
					return title.length > 0;
				}else{
					return null;
				}
			},
			validateContent: function(){
				let content = this.form.content;
				if(content){
					return content.length > 0;
				}else{
					return null;
				}
			},
			validateForm: function(){
				if(this.editMode){
					return this.validateTitle !== false && this.validateContent !== false;
				}else{
					return this.validateTitle === true && this.validateContent === true;
				}
			}
		},
		methods:{
			...mapActions({
				post: "user/article/postArticle",
				update: "user/article/patchArticle"
			}),
			getMarkDown: function(text){
				if(text){
					return getMarkdown(text);
				}else{
					return null;
				}
			}
		},
		created: function(){
			let article = this.$route.params.article;
			if(this.editMode && article !== null){
				this.form.title = article.title;
				this.form.content = article.content;
				
				let tags = [];
				for(let i = 0; i < article.tags.length; i++){
					let tag = article.tags[i];
					tags.push(tag.name);
				}
				
				this.form.tags = tags;
			}
		}
	};
</script>
