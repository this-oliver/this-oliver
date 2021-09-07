<template>
	<div>
		<!-- title -->
		<b-row :align-h="editMode == true ? 'between' : 'center'" align-v="baseline">
			<b-col
				v-if="hideTitle === false"
				class="general-title center-text"
				cols="8">
				experience
			</b-col>
			<b-col
				v-if="editMode"
				cols="2">
				<nuxt-link
					class="simple-link"
					to="/admin/experiences/create">
					<b> + </b>
				</nuxt-link>
			</b-col>
		</b-row>
		<!-- experiences -->
		<hr v-if="hideTitle == false || editMode == true" class="divider">
		<b-row v-if="experiences.length > 0">
			<b-col
				v-for="(experience, index) in getExperiences"
				:key="experience._id"
				cols="12">
				<experience-card
					class="mt-1"
					:experience="experience"
					:short-mode="true"
					:edit-mode="editMode" />
				<hr v-if="index < experiences.length - 1" class="divider">
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
	import ExperienceCardVue from "~/components/experience/ExperienceCard.vue";
	export default {
		name: "ExperienceList",
		components: {
			"experience-card": ExperienceCardVue
		},
		props: {
			experiences: {
				type: Array,
				required: true
			},
			hideTitle: {
				type: Boolean,
				default: false
			},
			editMode: {
				type: Boolean,
				default: false
			}
		},
		computed: {
			getExperiences () {
				return this.experiences ? this.sortExperiences(this.experiences) : [];
			}
		},
		methods: {
			// sort experiences: latest to earliest
			sortExperiences (experiences) {
				return experiences.sort((experienceA, experienceB) => {
					/**
						 * when comparing A and B:
						 * - return 1 to sort B before A,
						 * - return -1 to sort A before B, and
						 * - return 0 to sort A and B equally
						 */
					if (experienceA.startYear < experienceB.startYear) {
						return 1;
					} else if (experienceA.startYear > experienceB.startYear) {
						return -1;
					} else {
						return 0;
					}
				});
			}
		}
	};
</script>
