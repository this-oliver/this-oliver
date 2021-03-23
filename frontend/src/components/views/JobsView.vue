<template>
  <div>
    <b-row align-h="between">
      <b-col
        class="sub-header"
        sm="auto"
        md="auto">
        {{ $t("views.jobs.title") }}
      </b-col>
    </b-row>
    <b-row v-if="jobs.length > 0">
      <b-col
        cols="12"
        v-for="job in jobs"
        :key="job._id">
        <job-card
          class="mt-1"
          :job="job"
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
	import JobCardVue from "../cards/JobCard.vue";

	export default {
		name: "JobsView",
		props: {
			jobs: {
				type: Array,
				required: true
			},
			editMode: {
				type: Boolean,
				default: false
			}
		},
		components: {
			"job-card": JobCardVue
		}
	};
</script>
