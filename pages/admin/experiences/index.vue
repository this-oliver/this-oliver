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
		components: {
			"experience-list": ExperienceListVue
		},
		computed: {
			...mapGetters({
				experiences: "admin/getExperiences"
			})
		}
	};
</script>
