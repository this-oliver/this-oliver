<template>
	<base-form title="article form">
		<!-- article title -->
		<v-row
			class="mt-2"
			justify="space-between">
			<v-col cols="12">
				<input-text
					v-model="form.title"
					:value="form.title"
					label="title"
					:required="true" />
			</v-col>
		</v-row>
		<!-- article content -->
		<v-row justify="center">
			<v-col
				cols="12"
				md="6">
				<input-text-block
					v-model="form.content"
					label="content"
					:required="true" />
				<small>{{ getArticleLength }} words</small>
			</v-col>
			<v-col
				cols="12"
				md="6">
				<v-sheet>
					<!-- eslint-disable-next-line vue/no-v-html -->
					<span v-html="getParsedContent(form.content)" />
				</v-sheet>
			</v-col>
			<!-- tags -->
			<v-col
				cols="12"
				md="6">
				<v-combobox
					v-model="form.tags"
					label="tags"
					chips
					multiple
					deletable-chips />
			</v-col>
			<!-- tags -->
			<v-col
				cols="12"
				md="6">
				<v-checkbox
					v-model="form.publish"
					label="publish" />
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
				sm="8"
				md="3">
				<v-btn
					block
					color="outline-dark"
					:disabled="!validateForm"
					@click="saveArticle">
					quick save
				</v-btn>
			</v-col>
			<v-col
				v-if="editMode"
				class="mt-1"
				sm="8"
				md="3">
				<v-btn
					block
					color="dark"
					:disabled="!validateForm"
					@click="updateArticle">
					update
				</v-btn>
			</v-col>
			<v-col
				v-if="!editMode"
				class="mt-1"
				sm="8"
				md="3">
				<v-btn
					block
					color="success"
					:disabled="!validateForm"
					@click="postArticle">
					post
				</v-btn>
			</v-col>
		</v-row>
	</base-form>
</template>

<script>
import { MarkdownToHtml } from "../../utils/markdown";
import { getWordCount } from "../../utils/string";
import InputText from "../base/InputText.vue";
import InputTextBlock from "../base/InputTextBlock.vue";

export default {
	name: "ArticleForm",
	components: { InputText, InputTextBlock },
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
				tags: null,
				publish: false
			}
		};
	},
	computed: {
		getArticleLength () {
			const content = this.form.content;
			return getWordCount(content);
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
		let article = this.$route.params.article;
		if (this.editMode) {
			if (!article) {
				article = await this.$store.dispatch("admin/articles/get", this.$route.params.id);
				this.fallBackArticle = article;
			}
			this.form.title = article.title;
			this.form.content = article.content;
			this.form.publish = article.publish;

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
				await this.$store.dispatch("admin/articles/post", { title: this.form.title, content: this.form.content, tags: this.form.tags, publish: this.form.publish });
				this.$router.push("/admin/articles");
			} catch (error) {
				this.$store.commit("app/toaster/addError", { title: "Article", message: error.message });
			}
		},
		async updateArticle () {
			try {
				await this.$store.dispatch("admin/articles/patch", { id: this.$route.params.id, patch: { title: this.form.title, content: this.form.content, tags: this.form.tags, publish: this.form.publish } });
				this.$router.push("/admin/articles");
			} catch (error) {
				this.$store.commit("app/toaster/addError", { title: "Article", message: error.message });
			}
		},
		async saveArticle () {
			try {
				await this.$store.dispatch("admin/articles/patch", { id: this.$route.params.id, patch: { title: this.form.title, content: this.form.content, tags: this.form.tags, publish: this.form.publish } });
				this.$store.commit("app/toaster/addSuccess", { title: `Article ${this.article._id}`, message: "Saved" });
			} catch (error) {
				this.$store.commit("app/toaster/addError", { title: "Article", message: error.message });
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
