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
							<!-- eslint-disable-next-line vue/no-v-html -->
							<span v-html="getDesc" />
						</small>
					</b-col>
				</b-row>
			</b-col>
		</b-row>
		<b-row v-if="editMode" align-h="end">
			<b-col v-if="editMode" cols="3">
				<nuxt-link class="simple-link" :to="`/admin/experiences/${experience._id}/update`">
					update
				</nuxt-link>
			</b-col>
			<b-col v-if="editMode" cols="3">
				<span class="red-text simple-link" @click="deleteXp(experience._id)">
					delete
				</span>
			</b-col>
		</b-row>
	</div>
</template>

<script>
	import { mapActions } from "vuex";
	import { getMarkdown } from "../../utils/markdown";

	import { EXPERIENCES } from "../../logic/enums";
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
				return getMarkdown(this.experience.description);
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
