<template>
	<v-row
		v-if="experiences.length > 0"
		justify="center">
		<v-col
			v-for="(experience) in experiences"
			:key="experience._id"
			cols="12"
			md="8"
			class="my-1">
			<experience-card
				:experience="experience"
				:short-mode="true"
				:edit-mode="editMode" />
		</v-col>
	</v-row>
	<v-row
		v-else
		justify="center">
		<v-col cols="auto">
			...
		</v-col>
	</v-row>
</template>

<script>
import ExperienceCard from "~/components/experience/ExperienceCard.vue";
export default {
	name: "ExperienceList",
	components: {
		ExperienceCard
	},
	props: {
		experiences: {
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
