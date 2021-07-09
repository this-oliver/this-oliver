<template>
	<div>
		<!-- title -->
		<b-row
			class="mt-2"
			align-h="between">
			<b-col
				sm="6"
				md="auto">
				<span class="form-subtitle mr-3">title</span>
			</b-col>
			<b-col
				class="mt-2"
				cols="12">
				<b-form-input
					v-model="form.title"
					class="mr-2 mr-sm-0 mb-xs-1"
					placeholder="title" />
			</b-col>
		</b-row>
		<!-- org -->
		<b-row
			class="mt-2"
			align-h="between">
			<b-col
				sm="6"
				md="auto">
				<span class="form-subtitle mr-3">org</span>
			</b-col>
			<b-col
				class="mt-2"
				cols="12">
				<b-form-input
					v-model="form.org"
					class="mr-2 mr-sm-0 mb-xs-1"
					placeholder="org" />
			</b-col>
		</b-row>
		<!-- years -->
		<b-row
			class="mt-2"
			align-h="between">
			<b-col
				sm="6"
				md="auto">
				<span class="form-subtitle mr-3">years</span>
			</b-col>
			<b-col
				class="mt-2"
				cols="12">
				<b-form inline>
					<b-form-input
						v-model="form.startYear"
						class="mr-2"
						type="number"
						placeholder="start" />
					<b-form-input
						v-model="form.endYear"
						class="mr-2"
						type="number"
						placeholder="end" />
				</b-form>
			</b-col>
		</b-row>
		<!-- description -->
		<b-row
			class="mt-2"
			align-h="between">
			<b-col
				sm="6"
				md="auto">
				<span class="form-subtitle mr-3">description</span>
				<small>{{ getDescriptionLength }}</small>
			</b-col>
			<b-col
				sm="auto"
				md="auto">
				<span
					class="simple-link"
					variant="outline-primary"
					@click="previewDescription = true">
					preview
				</span>
			</b-col>
			<b-col
				class="mt-2"
				cols="12">
				<b-textarea
					v-model="form.description"
					placeholder="description"
					rows="4" />
			</b-col>
		</b-row>
		<!-- type -->
		<b-row
			class="mt-2"
			align-h="between">
			<b-col
				sm="6"
				md="auto">
				<span class="form-subtitle mr-3">type</span>
			</b-col>
			<b-col
				class="mt-2"
				cols="12">
				<b-form-select
					v-model="form.type"
					:options="getExperienceOptions">
					<template #first>
						<b-form-select-option
							:value="null"
							disabled>
							type
						</b-form-select-option>
					</template>
				</b-form-select>
			</b-col>
		</b-row>
		<!-- actions -->
		<b-row
			class="mt-2"
			align-h="between">
			<b-col
				class="mt-1"
				sm="3"
				md="3">
				<b-button
					block
					variant="secondary"
					to="/">
					back
				</b-button>
			</b-col>
			<b-col
				v-if="editMode"
				class="mt-1"
				sm="11"
				md="3">
				<b-button
					block
					variant="warning"
					@click="updateExperience({id: $route.params.experience._id, title: form.title, org: form.org, startYear: form.startYear, endYear: form.endYear, description: form.description, type: form.type})">
					update
				</b-button>
			</b-col>
			<b-col
				v-if="editMode"
				class="mt-1"
				sm="11"
				md="3">
				<b-button
					block
					variant="danger"
					@click="deleteExperience($route.params.experience._id)">
					delete
				</b-button>
			</b-col>
			<b-col
				v-if="!editMode"
				class="mt-1"
				sm="11"
				md="3">
				<b-button
					block
					variant="primary"
					@click="postExperience({title: form.title, org: form.org, startYear: form.startYear, endYear: form.endYear, description: form.description, type: form.type})">
					post
				</b-button>
			</b-col>
		</b-row>

		<!-- modals -->
		<b-modal
			v-model="previewDescription"
			title="preview: short"
			hide-footer
			size="xl">
			<span
				v-if="form.description && form.description.length > 0"
				v-html="getMarkDown(form.description)" />
			<span v-else>...</span>
		</b-modal>
	</div>
</template>

<script>
	import { mapActions } from "vuex";

	import { getMarkdown } from "../../utils/markdown";
	import { getWordCount } from "../../utils/string";

	import EXPERIENCE_TYPE from "../../logic/enums/experience";
	export default {
		name: "ExperienceForm",
		props: {
			editMode: {
				type: Boolean,
				default: false
			},
			experience: {
				type: Object,
				default: null
			}
		},
		data () {
			return {
				form: {
					title: null,
					org: null,
					startYear: null,
					endYear: null,
					description: null,
					type: null
				},
				previewDescription: false
			};
		},
		computed: {
			getDescriptionLength () {
				const desc = this.form.description;
				return getWordCount(desc);
			},
			getExperienceOptions () {
				const types = [];
				for (const key in EXPERIENCE_TYPE) {
					types.push({ value: EXPERIENCE_TYPE[key], text: EXPERIENCE_TYPE[key] });
				}
				return types;
			}
		},
		created () {
			const experience = this.$route.params.experience;
			if (this.editMode && experience !== null) {
				this.form.title = experience.title;
				this.form.org = experience.org;
				this.form.startYear = experience.startYear;
				this.form.endYear = experience.endYear;
				this.form.description = experience.description;
				this.form.type = experience.type;
			}
		},
		methods: {
			...mapActions({
				postExperience: "user/user/experiences/post",
				updateExperience: "user/user/experiences/patch",
				deleteExperience: "user/user/experiences/delete"
			}),
			getMarkDown (text) {
				if (text) {
					return getMarkdown(text);
				} else {
					return null;
				}
			}
		}
	};
</script>
