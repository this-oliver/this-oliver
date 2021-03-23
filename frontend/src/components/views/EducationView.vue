<template>
  <div>
    <b-row align-h="between">
      <b-col
        class="sub-header"
        sm="auto"
        md="auto">
        {{ $t("views.education.title") }}
      </b-col>
    </b-row>
    <b-row v-if="educations.length > 0">
      <b-col
        cols="12"
        v-for="education in educations"
        :key="education._id">
        <education-card
          class="mt-1"
          :education="education"
          :short-mode="true"
          :edit-mode="editMode" />
      </b-col>
    </b-row>
    <b-row
      v-else
      align-h="center">
      <b-col cols="auto">
        ...
      </b-col>
    </b-row>
  </div>
</template>

<script>
	import EducationCardVue from "../cards/EducationCard.vue";

	export default {
		name:"EducationView",
		props:{
			educations:{
				type: Array,
				required: true
			},
			editMode: {
				type: Boolean,
				default: false
			}
		},
		components:{
			"education-card":EducationCardVue
		}
	};
</script>

<style>

</style>
