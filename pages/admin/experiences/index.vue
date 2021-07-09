<template>
	<div>
		<b-row class="mt-3">
			<b-col cols="12">
				<experience-list :experiences="experiences" :edit-mode="true" />
			</b-col>
		</b-row>
	</div>
</template>

<script>
	import { mapGetters } from "vuex";
	import ExperienceListVue from "~/components/experience/ExperienceList.vue";

	export default {
		name: "AdminExperiencesPage",
		components: {
			"experience-list": ExperienceListVue
		},
		layout: "admin",
		computed: {
			...mapGetters({
				experiences: "user/getExperiences"
			})
		}
	};
</script>
