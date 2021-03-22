<template>
  <div>
    <b-row
      align-h="end"
      v-if="editMode">
      <b-col cols="auto">
        <router-link
          class="simple-link"
          :to="{ name: ROUTES.admin.experienceCreate }">
          +
        </router-link>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12">
        <jobs-view
          :jobs="jobs"
          :edit-mode="editMode" />
      </b-col>
      <b-col cols="11">
        <hr>
      </b-col>
      <b-col cols="12">
        <education-view
          :educations="educations"
          :edit-mode="editMode" />
      </b-col>
    </b-row>
  </div>
</template>

<script>
	import EducationViewVue from "./EducationView.vue";
	import JobsView from "./JobsView.vue";
	export default {
		name:"ExperiencesView",
		components:{
			"jobs-view":JobsView,
			"education-view":EducationViewVue
		},
		props:{
			jobs:{
				type: Array,
				required: true
			},
			educations:{
				type: Array,
				required: true
			},
			editMode:{
				type: Boolean,
				default: false
			}
		}
	};
</script>
