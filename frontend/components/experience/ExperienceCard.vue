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
			<v-chip
				:color="getExperienceColor(experience.type)">
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

		<v-divider
			v-if="editMode"
			class="my-2" />

		<v-row
			v-if="editMode"
			justify="space-between">
			<v-col
				cols="6"
				md="auto">
				<base-btn
					color="warning"
					:block="true"
					:rounded="true"
					:to="`/experiences/${experience._id}/edit`">
					update
				</base-btn>
			</v-col>
			<v-col
				cols="6"
				md="auto">
				<base-btn
					color="error"
					:block="true"
					:rounded="true"
					@click="deleteExperience(experience._id)">
					delete
				</base-btn>
			</v-col>
		</v-row>
	</base-card>
</template>

<script>
import { mapActions } from "vuex";
import { MarkdownToHtml } from "../../utils/parser";
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

			return MarkdownToHtml(this.experience.description, { darkMode: this.isDarkMode });
		},
		getEndYear () {
			if(this.skeletonMode) return "";

			const endYear = this.experience.endYear;
			return endYear || "Present";
		}
	},
	methods: {
		...mapActions({
			deleteExperience: "admin/experiences/delete"
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
