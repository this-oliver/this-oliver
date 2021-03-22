<template>
  <div>
    <!-- title -->
    <b-row
      class="mt-2"
      align-h="between">
      <b-col
        sm="6"
        md="auto">
        <span class="sub-header mr-3">{{ $t("forms.experience.experienceTitle") }}</span>
      </b-col>
      <b-col
        class="mt-2"
        cols="12">
        <b-form-input
          class="mr-2 mr-sm-0 mb-xs-1"
          v-model="form.title"
          :placeholder="`${$t('forms.experience.experienceTitle')}...`" />
      </b-col>
    </b-row>
    <!-- org -->
    <b-row
      class="mt-2"
      align-h="between">
      <b-col
        sm="6"
        md="auto">
        <span class="sub-header mr-3">{{ $t("forms.experience.org") }}</span>
      </b-col>
      <b-col
        class="mt-2"
        cols="12">
        <b-form-input
          class="mr-2 mr-sm-0 mb-xs-1"
          v-model="form.org"
          :placeholder="`${$t('forms.experience.org')}...`" />
      </b-col>
    </b-row>
    <!-- years -->
    <b-row
      class="mt-2"
      align-h="between">
      <b-col
        sm="6"
        md="auto">
        <span class="sub-header mr-3">{{ $t("forms.experience.years") }}</span>
      </b-col>
      <b-col
        class="mt-2"
        cols="12">
        <b-form inline>
          <b-form-input
            class="mr-2"
            v-model="form.startYear"
            type="number"
            :placeholder="`${$t('forms.experience.startYear')}...`" />
          <b-form-input
            class="mr-2"
            v-model="form.endYear"
            type="number"
            :placeholder="`${$t('forms.experience.endYear')}...`" />
        </b-form>
      </b-col>
    </b-row>
    <!-- description -->
    <b-row
      class="mt-2"
      align-h="between">
      <b-col
        sm="6"
        md="auto">
        <span class="sub-header mr-3">{{ $t("forms.experience.description") }}</span>
        <small>{{ getDescriptionLength }}</small>
      </b-col>
      <b-col
        sm="auto"
        md="auto">
        <span
          class="simple-link"
          variant="outline-primary"
          @click="previewDescription = true">
          {{ $t("form.actions.preview") }}
        </span>
      </b-col>
      <b-col
        class="mt-2"
        cols="12">
        <b-textarea
          v-model="form.description"
          :placeholder="`${$t('forms.experience.description')}...`"
          rows="4" />
      </b-col>
    </b-row>
    <!-- type -->
    <b-row
      class="mt-2"
      align-h="between">
      <b-col
        sm="6"
        md="auto">
        <span class="sub-header mr-3">{{ $t("forms.experience.type") }}</span>
      </b-col>
      <b-col
        class="mt-2"
        cols="12">
        <b-form-select
          v-model="form.type"
          :options="getExperienceOptions">
          <template #first>
            <b-form-select-option
              :value="null"
              disabled>
              {{ `${$t("forms.experience.type")}...` }}
            </b-form-select-option>
          </template>
        </b-form-select>
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
        v-if="editMode"
        class="mt-1"
        sm="11"
        md="3">
        <b-button
          block
          variant="warning"
          @click="updateExperience(this.$route.params.experience._id, form.title, form.org, form.startYear, form.endYear, form.description, form.type)">
          {{ $t("form.actions.update") }}
        </b-button>
      </b-col>
      <b-col
        v-if="editMode"
        class="mt-1"
        sm="11"
        md="3">
        <b-button
          block
          variant="danger"
          @click="deleteExperience(this.$route.params.experience._id)">
          {{ $t("form.actions.delete") }}
        </b-button>
      </b-col>
      <b-col
        v-if="!editMode"
        class="mt-1"
        sm="11"
        md="3">
        <b-button
          block
          variant="primary"
          @click="postExperience(form.title, form.org, form.startYear, form.endYear, form.description, form.type)">
          {{ $t("form.actions.post") }}
        </b-button>
      </b-col>
    </b-row>

    <!-- modals -->
    <b-modal
      v-model="previewDescription"
      :title="`${$t('form.actions.preview')}: ${$t('forms.bio.short')}`"
      hide-footer
      size="xl">
      <span
        v-if="form.description && form.description.length > 0"
        v-html="getMarkDown(form.description)" />
      <span v-else>...</span>
    </b-modal>
  </div>
</template>

<script>
	import { mapActions } from "vuex";

	import {getMarkdown} from "../../helpers/markdown-helper";
	import {getWordCount} from "../../helpers/string-helper";

	import EXPERIENCE_TYPE from "../../enums/experience-enums";
	export default {
		name:"ExperienceForm",
		props:{
			editMode:{
				type: Boolean,
				default: false
			},
			experience: {
				type: Object,
				default: null
			}
		},
		data: function(){
			return{
				form:{
					title: null,
					org: null,
					startYear: null,
					endYear: null,
					description: null,
					type: null
				},
				previewDescription: false
			};
		},
		computed:{
			getDescriptionLength: function(){
				let desc = this.form.description;
				return getWordCount(desc);
			},
			getExperienceOptions: function(){
				let types = [];
				for(let key in EXPERIENCE_TYPE){
					types.push({value: EXPERIENCE_TYPE[key], text: EXPERIENCE_TYPE[key]});
				}
				return types;
			}
		},
		methods:{
			...mapActions({
				postExperience: "user/experiences/postExperience",
				patchExperience: "user/experiences/patchExperience",
				deleteExperience: "user/experiences/deleteExperience",
			}),
			getMarkDown: function(text){
				if(text){
					return getMarkdown(text);
				}else{
					return null;
				}
			},
		},
		created: function(){
			let experience = this.$route.params.experience;
			if(this.editMode && experience !== null){
				this.form.title = experience.title;
				this.form.org = experience.org;
				this.form.startYear = experience.startYear;
				this.form.endYear = experience.endYear;
				this.form.description = experience.description;
				this.form.type = experience.type;
			}
		}
	};
</script>
