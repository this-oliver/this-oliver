<template>
	<base-form title="experience form">
		<v-row justify="space-between">
			<v-col cols="12">
				<input-text
					v-model="form.title"
					label="title" />
			</v-col>
			<v-col cols="12">
				<input-text
					v-model="form.org"
					label="org" />
			</v-col>
			<v-col
				cols="12"
				md="6">
				<input-text
					v-model="form.startYear"
					label="start year" />
			</v-col>
			<v-col
				cols="12"
				md="6">
				<input-text
					v-model="form.endYear"
					label="end year" />
			</v-col>
			<v-col cols="12">
				<input-text-block
					v-model="form.description"
					label="description" />
			</v-col>
			<v-col cols="12">
				<input-select
					v-model="form.type"
					label="type"
					:items="getExperienceOptions" />
			</v-col>
		</v-row>

		<!-- actions -->
		<v-row
			class="mt-2"
			justify="space-between">
			<v-col
				class="mt-1"
				sm="3"
				md="3">
				<v-btn
					block
					color="secondary"
					@click="$router.go(-1)">
					back
				</v-btn>
			</v-col>
			<v-col
				v-if="editMode"
				class="mt-1 ml-auto"
				sm="11"
				md="3">
				<v-btn
					block
					color="outline-error"
					@click="deleteExperience">
					delete
				</v-btn>
			</v-col>
			<v-col
				v-if="editMode"
				class="mt-1"
				sm="11"
				md="3">
				<v-btn
					block
					color="dark"
					@click="updateExperience">
					update
				</v-btn>
			</v-col>
			<v-col
				v-if="!editMode"
				class="mt-1"
				sm="11"
				md="3">
				<v-btn
					block
					color="primary"
					@click="postExperience">
					post
				</v-btn>
			</v-col>
		</v-row>

		<!-- modals -->
		<v-dialog
			v-model="previewDescription"
			title="preview: short"
			hide-footer
			size="xl">
			<span v-if="form.description && form.description.length > 0">
				<!-- eslint-disable-next-line vue/no-v-html -->
				<span v-html="getParsedContent(form.description)" />
			</span>
			<span v-else>...</span>
		</v-dialog>
	</base-form>
</template>

<script>
import { mapActions } from "vuex";

import { MarkdownToHtml } from "../../utils/markdown";
import { getWordCount } from "../../utils/string";

import { EXPERIENCES } from "../../logic/enums";
import BaseForm from "../base/BaseForm.vue";
import InputText from "../base/InputText.vue";
import InputTextBlock from "../base/InputTextBlock.vue";
import InputSelect from "../base/InputSelect.vue";
export default {
	name: "ExperienceForm",
	components: { BaseForm, InputText, InputTextBlock, InputSelect },
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
			for (const key in EXPERIENCES) {
				types.push({ value: EXPERIENCES[key], text: EXPERIENCES[key] });
			}
			return types;
		}
	},
	created () {
		if (this.editMode) {
			const experience = this.experience;

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
			postExperience: "admin/experiences/post",
			updateExperience: "admin/experiences/patch",
			deleteExperience: "admin/experiences/delete"
		}),
		async postExperience () {
			try {
				await this.$store.dispatch("admin/experiences/post", { title: this.form.title, org: this.form.org, startYear: this.form.startYear, endYear: this.form.endYear, description: this.form.description, type: this.form.type });
				this.$router.push("/admin/experiences");
			} catch (error) {
				this.$store.commit("app/toaster/addError", { title: "Experience", message: error.message });
			}
		},
		async updateExperience () {
			try {
				await this.$store.dispatch("admin/experiences/patch", { id: this.$route.params.experience._id, title: this.form.title, org: this.form.org, startYear: this.form.startYear, endYear: this.form.endYear, description: this.form.description, type: this.form.type });
				this.$router.push("/admin/experiences");
			} catch (error) {
				this.$store.commit("app/toaster/addError", { title: "Experience", message: error.message });
			}
		},
		async deleteExperience () {
			try {
				await this.$store.dispatch("admin/experiences/delete", this.$route.params.experience._id);
				this.$router.push("/admin/experiences");
			} catch (error) {
				this.$store.commit("app/toaster/addError", { title: "Experience", message: error.message });
			}
		},
		getParsedContent (text) {
			if (text) {
				return MarkdownToHtml(text);
			} else {
				return null;
			}
		}
	}
};
</script>
