<template>
	<div>
		<b-row align-h="center">
			<b-col class="mt-3" sm="11" md="8">
				<experience-form />
			</b-col>
		</b-row>
	</div>
</template>

<script>
	import ExperienceForm from "~/components/experience/ExperienceForm.vue";

	export default {
		name: "CreateExperiencePage",
		components: { ExperienceForm }
	};
</script>
