<template>
	<div>
		<base-card>
			<b-row align-h="between" align-v="center" class="mb-2">
				<!-- title -->
				<b-col cols="9" class="experience-card-title">
					{{ experience.title }}
				</b-col>
				<!-- icon -->
				<b-col cols="2" class="experience-card-badge mr-2">
					{{ getExperienceEmoji(experience.type) }}
				</b-col>
			</b-row>
			<hr>
			<b-row class="experience-card-subtitle">
				<!-- org -->
				<b-col cols="12">
					{{ experience.org }}
				</b-col>
				<!-- duration -->
				<b-col cols="12">
					<b-badge variant="dark">
						{{ `${experience.startYear} - ${getEndYear}` }}
					</b-badge>
				</b-col>
			</b-row>
			<!-- content -->
			<b-row class="mt-2">
				<b-col cols="12">
					<!-- eslint-disable-next-line vue/no-v-html -->
					<span v-html="getParsedContent" />
				</b-col>
			</b-row>
			<template #footer>
				<b-row v-if="editMode" align-h="end">
					<b-col cols="3">
						<nuxt-link class="simple-link" :to="`/admin/experiences/${experience._id}/edit`">
							update
						</nuxt-link>
					</b-col>
					<b-col cols="3">
						<span class="red-text simple-link" @click="deleteXp(experience._id)">
							delete
						</span>
					</b-col>
				</b-row>
			</template>
		</base-card>
	</div>
</template>

<script>
	import { mapActions } from "vuex";
	import { MarkdownToHtml } from "../../utils/markdown";

	import { EXPERIENCES } from "../../logic/enums";
	import BaseCardVue from "../base/BaseCard.vue";
	export default {
		name: "ExperienceCard",
		components: {
			"base-card": BaseCardVue
		},
		props: {
			experience: {
				type: Object,
				required: true
			},
			editMode: {
				type: Boolean,
				default: false
			},
			shortMode: {
				type: Boolean,
				default: true
			}
		},
		computed: {
			getParsedContent () {
				return MarkdownToHtml(this.experience.description);
			},
			getEndYear () {
				const endYear = this.experience.endYear;
				return endYear || "Present";
			}
		},
		methods: {
			...mapActions({
				deleteXp: "admin/experiences/delete"
			}),
			getExperienceEmoji (type) {
				switch (type) {
				case EXPERIENCES.job:
					return "💼";
				case EXPERIENCES.education:
					return "🎓";
				case EXPERIENCES.projects:
					return "🧪";
				default:
					return "🧪";
				}
			}
		}
	};
</script>

<style scoped>
.experience-card-title {
	font-size: 1.5rem;
	font-weight: bold;
}

.experience-card-subtitle {
	font-size: 1.25rem;
	font-weight: bold;
}

.experience-card-badge {
	font-size: 2rem;
}

@media screen and (max-width: 480px) {
	.experience-card-title {
		font-size: 1.25rem;
		font-weight: bold;
	}

	.experience-card-badge {
		font-size: 1.5rem;
	}
}
</style>
