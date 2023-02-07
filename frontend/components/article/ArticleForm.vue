<template>
	<base-form>
		<!-- actions -->
		<v-row justify="space-between">
			<!-- go back -->
			<v-col
				class="mt-1"
				cols="12"
				sm="2">
				<v-btn
					block
					color="secondary"
					@click="$router.go(-1)">
					back
				</v-btn>
			</v-col>
			<!-- quick save -->
			<v-col
				v-if="editMode"
				class="mt-1 ml-auto"
				cols="12"
				sm="4">
				<v-btn
					block
					color="outline-dark"
					:disabled="!validateForm"
					@click="saveArticle">
					quick save
				</v-btn>
			</v-col>
			<!-- save -->
			<v-col
				v-if="editMode"
				class="mt-1"
				cols="12"
				sm="4">
				<v-btn
					block
					color="dark"
					:disabled="!validateForm"
					@click="updateArticle">
					update
				</v-btn>
			</v-col>
			<!-- post -->
			<v-col
				v-if="!editMode"
				class="mt-1"
				cols="12"
				sm="4"
				offset-md="3">
				<v-btn
					block
					color="success"
					:disabled="!validateForm"
					@click="postArticle">
					post
				</v-btn>
			</v-col>
			<!-- tags -->
			<v-col
				cols="12"
				md="6">
				<v-combobox
					v-model="form.tags"
					:items="getTags"
					label="tags"
					chips
					multiple
					deletable-chips />
			</v-col>
			<!-- publish -->
			<v-col
				cols="12"
				md="auto">
				<v-checkbox
					v-model="form.publish"
					label="publish" />
			</v-col>
		</v-row>

		<!-- divider -->
		<v-divider />

		<v-row
			justify="center"
			no-gutters>
			<!-- article title -->
			<v-col cols="12">
				<input-text
					v-model="form.title"
					label="title"
					:required="true" />
			</v-col>
			<!-- article content -->
			<v-col cols="12">
				<input-text-editor
					v-model="form.content"
					:preview="true" />
			</v-col>
		</v-row>
	</base-form>
</template>

<script>
import { mapGetters } from "vuex";
import { getWordCount } from "../../utils/string";
import { isHtml, HtmlToMarkdown } from "../../utils/parser";

import BaseForm from "../base/BaseForm.vue";
import InputText from "../base/InputText.vue";
import InputTextEditor from "../base/InputTextEditor.vue";

export default {
	name: "ArticleForm",
	components: { BaseForm, InputText, InputTextEditor },
	props: {
		editMode: {
			type: Boolean,
			default: false
		},
		article: {
			type: Object,
			default: null
		}
	},
	data () {
		return {
			form: {
				title: null,
				content: null,
				tags: [],
				publish: false
			}
		};
	},
	computed: {
		...mapGetters({
			tags: "admin/articles/getTags"
		}),
		getTags(){
			return this.tags.map((tag) => {
				return {
					text: tag.name,
					value: tag._id
				};
			});
		},
		getArticleLength () {
			return getWordCount(this.form.content);
		},
		validateTitle () {
			const title = this.form.title;
			if (title) {
				return title.length > 0;
			} else {
				return null;
			}
		},
		validateContent () {
			const content = this.form.content;
			if (content) {
				return content.length > 0;
			} else {
				return null;
			}
		},
		validateForm () {
			if (this.editMode) {
				return this.validateTitle !== false && this.validateContent !== false;
			} else {
				return this.validateTitle === true && this.validateContent === true;
			}
		}
	},
	async created () {
		await this.$store.dispatch("admin/articles/indexTags");

		if (this.editMode) {
			let article = null;

			if (!article) {
				article = await this.$store.dispatch("admin/articles/get", this.$route.params.id);
				this.fallBackArticle = article;
			}
			this.form.title = article.title;
			this.form.publish = article.publish;
			this.form.content = isHtml(article.content) ? HtmlToMarkdown(article.content) : article.content;

			const tags = [];
			for (let i = 0; i < article.tags.length; i++) {
				const tag = article.tags[i];
				tags.push(tag.name);
			}

			this.form.tags = tags;
		}
	},
	methods: {
		async postArticle () {
			try {
				await this.$store.dispatch("admin/articles/post", { title: this.form.title, content: this.form.content, tags: this.getFormattedTags(), publish: this.form.publish });
				this.$router.push("/articles");
			} catch (error) {
				this.$store.commit("app/toaster/addError", { title: "Article", message: error.message });
			}
		},
		async updateArticle () {
			try {
				await this.$store.dispatch("admin/articles/patch", { id: this.$route.params.id, patch: { title: this.form.title, content: this.form.content, tags: this.getFormattedTags(), publish: this.form.publish } });
				this.$router.push("/articles");
			} catch (error) {
				this.$store.commit("app/toaster/addError", { title: "Article", message: error.message });
			}
		},
		async saveArticle () {
			try {
				await this.$store.dispatch("admin/articles/patch", { id: this.$route.params.id, patch: { title: this.form.title, content: this.form.content, tags: this.getFormattedTags(), publish: this.form.publish } });
				this.$store.commit("app/toaster/addSuccess", { title: `Article ${this.article._id}`, message: "Saved" });
			} catch (error) {
				this.$store.commit("app/toaster/addError", { title: "Article", message: error.message });
			}
		},
		getFormattedTags(){
			const tags = this.form.tags;
			const formattedTags = [];

			tags.forEach(tag => {
				if(typeof tag === "string"){
					formattedTags.push({name: tag, id: null});
				} else {
					formattedTags.push({name: tag.text, id: tag.value});
				}
			});

			return formattedTags;
		}
	}
};
</script>
