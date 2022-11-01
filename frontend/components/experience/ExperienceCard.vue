<template>
	<base-card v-if="skeletonMode">
		<v-skeleton-loader type="list-item-three-line" />
	</base-card>

	<base-card v-else>
		<!-- title -->
		<h3>{{ experience.title }}</h3>
		<!-- org -->
		<h4 class="mt-1">
			{{ experience.org }}
		</h4>
		<v-chip-group class="mt-1">
			<!-- type -->
			<v-chip :color="getExperienceColor(experience.type)">
				{{ getExperienceType(experience.type) }}
			</v-chip>
			<!-- duration -->
			<v-chip>
				{{ `${experience.startYear} - ${getEndYear}` }}
			</v-chip>
		</v-chip-group>

		<v-row class="mt-2">
			<!-- content -->
			<v-col cols="12">
				<base-html :html="getParsedContent" />
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
import { capitalizeText } from "~/utils/string";
import { getExperienceColor } from "../../logic/experience";
import BaseCard from "../base/BaseCard.vue";
import BaseHtml from "../base/BaseHtml.vue";
export default {
	name: "ExperienceCard",
	components: {
		BaseCard,
		BaseHtml
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
		},
		skeletonMode: {
			type: Boolean,
			default: false
		}
	},
	computed: {
		getParsedContent () {
			if(this.skeletonMode) return "";

			return MarkdownToHtml(this.experience.description);
		},
		getEndYear () {
			if(this.skeletonMode) return "";

			const endYear = this.experience.endYear;
			return endYear || "Present";
		}
	},
	methods: {
		...mapActions({
			deleteXp: "admin/experiences/delete"
		}),
		getExperienceType (type) {
			return capitalizeText(type);
		},
		getExperienceColor (type) {
			return getExperienceColor(type);
		}
	}
};
</script>
