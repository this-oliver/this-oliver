<template>
	<div v-if="loading">
		<experience-card
			v-for="skeleton in [0,1,2,3,4, 5]"
			:key="skeleton"
			:experience="{}"
			:skeleton-mode="true" />
	</div>

	<v-row
		v-else-if="experiences.length > 0"
		justify="center">
		<v-col
			v-for="experience in experiences"
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
		},
		loading: {
			type: Boolean,
			default: false
		}
	}
};
</script>
