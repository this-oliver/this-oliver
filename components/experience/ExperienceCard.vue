<template>
	<div>
		<b-row>
			<b-col cols="1">
				<span class="card-title">{{ getExperienceEmoji(experience.type) }}</span>
			</b-col>
			<b-col cols="10">
				<b-row>
					<b-col cols="12">
						<b>{{ experience.title }}</b>
					</b-col>
					<b-col cols="12">
						<small>
							<b>
								{{ `${experience.org} (${experience.startYear}-${getEndYear})` }}
							</b>
						</small>
					</b-col>
					<b-col cols="12">
						<small>
							<span v-html="getDesc" />
						</small>
					</b-col>
				</b-row>
			</b-col>
		</b-row>
		<b-row v-if="editMode" align-h="end">
			<b-col v-if="editMode" sm="auto" md="auto">
				<nuxt-link class="simple-link" :to="`/experiences/${experience._id}/edit`">
					update
				</nuxt-link>
			</b-col>
			<b-col v-if="editMode" sm="auto" md="auto">
				<span class="simple-link" @click="deleteXp(experience._id)">
					delete
				</span>
			</b-col>
		</b-row>
	</div>
</template>

<script>
	import { mapActions } from "vuex";
	import { getMarkdown } from "../../utils/markdown";

	import EXPERIENCES from "../../logic/enums/experience";
	export default {
		name: "ExperienceCard",
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
			getDesc () {
				const description = this.experience.description;
				return getMarkdown(`-> ${description}`);
			},
			getEndYear () {
				const endYear = this.experience.endYear;
				return endYear || "Present";
			}
		},
		methods: {
			...mapActions({
				deleteXp: "user/user/experiences/delete"
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
