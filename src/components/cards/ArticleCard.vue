<template>
  <div>
    <b-row>
      <b-col cols="1">
        <span class="sub-header"> 📰 </span>
      </b-col>
      <b-col cols="10">
        <b-row>
          <b-col cols="12">
            <b>{{ article.title }}</b>
          </b-col>
          <b-col cols="12">
            <small>
              <b>
                today...
              </b>
            </small>
          </b-col>
          <b-col
            cols="12">
            <small>
              <span v-html="getContent" />
            </small>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <!-- actions -->
    <b-row
      v-if="editMode"
      align-h="end">
      <b-col
        v-if="editMode"
        sm="auto"
        md="auto">
        <span
          class="simple-link"
          @click="update">
          {{ $t("form.actions.update") }}
        </span>
      </b-col>
      <b-col
        v-if="editMode"
        sm="auto"
        md="auto">
        <span
          class="simple-link"
          @click="deleteArticle(article._id)">
          {{ $t("form.actions.delete") }}
        </span>
      </b-col>
    </b-row>
  </div>
</template>

<script>
	import { mapActions } from "vuex";
	import { getMarkdown } from "../../helpers/markdown-helper";
	export default {
		name: "ExperienceCard",
		props: {
			article: {
				type: Object,
				required: true
			},
			editMode: {
				type: Boolean,
				default: false
			},
		},
		computed: {
			getContent: function() {
				const MAX_LENGTH = 80;
				let content = this.article.content;
				
				return (content.length > MAX_LENGTH)? getMarkdown(`-> ${content.substring(0, MAX_LENGTH)}`): getMarkdown(`-> ${content}`);
			},
		},
		methods:{
			...mapActions({
				deleteArticle: "user/article/deleteArticle"
			}),
			update: function(){
				this.$router.push(
					{ 
						name: this.ROUTES.admin.articleUpdate, 
						params: { 
							title: this.article.title.replaceAll(" ", "-"),
							article: this.article
						}
					}
				);
			},
		}
	};
</script>
