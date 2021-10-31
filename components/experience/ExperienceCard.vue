<template>
	<base-card>
		<v-row justify="space-between">
			<!-- title -->
			<v-col cols="10">
				<h3>{{ experience.title }}</h3>
			</v-col>
			<!-- icon -->
			<v-col
				cols="auto"
				class="mr-2">
				{{ getExperienceEmoji(experience.type) }}
			</v-col>
		</v-row>

		<v-row justify="space-between">
			<!-- org -->
			<v-col cols="9">
				<h4>{{ experience.org }}</h4>
			</v-col>
			<!-- duration -->
			<v-col cols="auto">
				<v-chip>
					{{ `${experience.startYear} - ${getEndYear}` }}
				</v-chip>
			</v-col>
		</v-row>

		<v-row class="mt-2">
			<!-- content -->
			<v-col cols="12">
				<!-- eslint-disable-next-line vue/no-v-html -->
				<span v-html="getParsedContent" />
			</v-col>
		</v-row>

		<template #footer>
			<v-row
				v-if="editMode"
				justify="end">
				<v-col cols="auto">
					<nuxt-link
						class="simple-link"
						:to="`/admin/experiences/${experience._id}/edit`">
						update
					</nuxt-link>
				</v-col>
				<v-col cols="auto">
					<span
						class="red--text simple-link"
						@click="deleteXp(experience._id)">
						delete
					</span>
				</v-col>
			</v-row>
		</template>
	</base-card>
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
