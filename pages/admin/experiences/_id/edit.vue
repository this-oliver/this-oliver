<template>
	<div>
		<b-row align-h="center">
			<b-col class="mt-3" sm="11" md="8">
				<experience-form :experience="experience" :edit-mode="true" />
			</b-col>
		</b-row>
	</div>
</template>

<script>
	import ExperienceForm from "~/components/experience/ExperienceForm.vue";

	export default {
		components: { ExperienceForm },
		async asyncData ({ params, store }) {
			const id = params.id;
			const experience = await store.dispatch("admin/experiences/get", id);

			return { experience };
		}
	};
</script>
