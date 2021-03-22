<template>
  <div>
    <!-- short bio -->
    <b-row
      class="mt-2"
      align-h="between">
      <b-col
        sm="6"
        md="auto">
        <span class="sub-header mr-3">{{ $t("forms.bio.short") }}</span>
        <small>{{ getShortLength }}</small>
      </b-col>
      <b-col
        sm="auto"
        md="auto">
        <span
          class="simple-link"
          variant="outline-primary"
          @click="showShortBioForm=true">
          {{ $t("form.actions.preview") }}
        </span>
      </b-col>
      <b-col
        class="mt-2"
        cols="12">
        <b-textarea
          v-model="form.short"
          rows="8" />
      </b-col>
    </b-row>
    <!-- long bio -->
    <b-row
      class="mt-2"
      align-h="between">
      <b-col
        sm="6"
        md="auto">
        <span class="sub-header mr-3">{{ $t("forms.bio.long") }}</span>
        <small>{{ getLongLength }}</small>
      </b-col>
      <b-col
        sm="auto"
        md="auto">
        <span
          class="simple-link"
          variant="outline-primary"
          @click="showLongBioForm=true">
          {{ $t("form.actions.preview") }}
        </span>
      </b-col>
      <b-col
        class="mt-2"
        cols="12">
        <b-textarea
          v-model="form.long"
          rows="8" />
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
          @click="update(null, null, form.short, form.long)">
          {{ $t("form.actions.update") }}
        </b-button>
        <b-button
          v-else
          block
          variant="primary"
          @click="post">
          {{ $t("form.actions.post") }}
        </b-button>
      </b-col>
    </b-row>

    <!-- modals -->
    <b-modal
      v-model="showShortBioForm"
      :title="`${$t('form.actions.preview')}: ${$t('forms.bio.short')}`"
      hide-footer
      size="xl">
      <span
        v-if="form.short && form.short.length > 0"
        v-html="getMarkDown(form.short)" />
      <span v-else>...</span>
    </b-modal>
    <b-modal
      v-model="showLongBioForm"
      :title="`${$t('form.actions.preview')}: ${$t('forms.bio.long')}`"
      hide-footer
      size="xl">
      <span
        v-if="form.long && form.long.length > 0"
        v-html="getMarkDown(form.long)" />
      <span v-else>...</span>
    </b-modal>
  </div>
</template>

<script>
	import { mapActions } from "vuex";
	import {getMarkdown} from "../../helpers/markdown-helper";
	import {getWordCount} from "../../helpers/string-helper";

	export default {
		name:"BioForm",
		props:{
			editMode:{
				type:Boolean,
				default: false
			},
		},
		data: function(){
			return{
				form:{
					short: null,
					long: null
				},
				showShortBioForm: false,
				showLongBioForm: false
			};
		},
		computed:{
			getShortLength: function(){
				let short = this.form.short;
				return getWordCount(short);
			},
			getLongLength: function(){
				let long = this.form.long;
				return getWordCount(long);
			}
		},
		methods:{
			...mapActions({
				update: "user/patchUser"
			}),
			getMarkDown: function(text){
				if(text){
					return getMarkdown(text);
				}else{
					return null;
				}
			},
			handleShortBio: function(text){
				this.form.short = text;
			},
			handleLongBio: function(text){
				this.form.long = text;
			}
		},
		created: function(){
			if(this.editMode){
				let user = this.$store.getters["user/getUser"];
				this.form.short = user.bio.short;
				this.form.long = user.bio.long;
			}
		}
	};
</script>
