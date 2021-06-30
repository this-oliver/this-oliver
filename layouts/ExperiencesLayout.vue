<template>
	<div>
		<b-row align-h="between">
			<b-col
				class="layout-title"
				sm="auto"
				md="auto">
				experiences
			</b-col>
			<b-col
				v-if="editMode"
				cols="auto">
				<nuxt-link
					class="simple-link"
					to="experiences/create">
					<b> + </b>
				</nuxt-link>
			</b-col>
		</b-row>
		<hr>
		<b-row v-if="experienceList.length > 0">
			<b-col
				v-for="(experience, index) in experienceList"
				:key="experience._id"
				cols="12">
				<experience-card
					class="mt-1"
					:experience="experience"
					:short-mode="true"
					:edit-mode="editMode" />
				<hr v-if="index < experienceList.length - 1">
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
	import ExperienceCardVue from "../components/cards/ExperienceCard.vue";
	export default {
		name: "ExperiencesLayout",
		components: {
			"experience-card": ExperienceCardVue
		},
		props: {
			experienceList: {
				type: Array,
				required: true
			},
			editMode: {
				type: Boolean,
				default: false
			}
		}
	};
</script>
