<template>
	<div>
		<!-- name -->
		<b-row
			class="mt-2"
			align-h="between">
			<b-col
				class="form-subtitle"
				md="auto">
				title
			</b-col>
			<b-col md="12">
				<b-form-input
					v-model="form.title"
					:state="validateTitle"
					placeholder="title" />
			</b-col>
		</b-row>
		<!-- content -->
		<b-row
			class="mt-2"
			align-h="between">
			<b-col
				sm="6"
				md="auto">
				<span class="form-subtitle mr-3"> content </span>
				<small>{{ getArticleLength }}</small>
			</b-col>
			<b-col
				sm="auto"
				md="auto">
				<span
					class="simple-link"
					variant="outline-primary"
					@click="showPreview = true">
					preview
				</span>
			</b-col>
			<b-col
				class="mt-2"
				cols="12">
				<b-textarea
					v-model="form.content"
					rows="8"
					:state="validateContent"
					placeholder="enter content" />
			</b-col>
		</b-row>
		<!-- tags -->
		<b-row
			class="mt-2"
			align-h="between">
			<b-col
				class="form-subtitle"
				md="auto">
				tags
			</b-col>
			<b-col md="12">
				<b-form-tags
					v-model="form.tags"
					placeholder="tags" />
			</b-col>
		</b-row>
		<!-- tags -->
		<b-row
			class="mt-2"
			align-h="between">
			<b-col
				class="form-subtitle"
				md="auto">
				publish
			</b-col>
			<b-col md="12">
				<b-form-checkbox
					v-model="form.publish"
					:value="true"
					:unchecked-value="false" />
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
					@click="$router.go(-1)">
					back
				</b-button>
			</b-col>
			<b-col
				v-if="editMode"
				class="mt-1 ml-auto"
				sm="8"
				md="3">
				<b-button
					block
					variant="outline-dark"
					:disabled="!validateForm"
					@click="saveArticle">
					quick save
				</b-button>
			</b-col>
			<b-col
				v-if="editMode"
				class="mt-1"
				sm="8"
				md="3">
				<b-button
					block
					variant="dark"
					:disabled="!validateForm"
					@click="updateArticle">
					update
				</b-button>
			</b-col>
			<b-col
				v-if="!editMode"
				class="mt-1"
				sm="8"
				md="3">
				<b-button
					block
					variant="success"
					:disabled="!validateForm"
					@click="postArticle">
					post
				</b-button>
			</b-col>
		</b-row>

		<!-- modals -->
		<b-modal
			v-model="showPreview"
			:title="`preview: ${form.title}`"
			hide-footer
			size="xl">
			<span v-if="form.content && form.content.length > 0">
				<!-- eslint-disable-next-line vue/no-v-html -->
				<span v-html="getParsedContent(form.content)" />
			</span>
			<span v-else>...</span>
		</b-modal>
	</div>
</template>

<script>
	import { MarkdownToHtml } from "../../utils/markdown";
	import { getWordCount } from "../../utils/string";

	export default {
		name: "ArticleForm",
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
				},
				showPreview: false
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
					this.$store.commit("base/toaster/addError", { title: "Article", message: error.message });
				}
			},
			async updateArticle () {
				try {
					await this.$store.dispatch("admin/articles/patch", { id: this.$route.params.id, patch: { title: this.form.title, content: this.form.content, tags: this.form.tags, publish: this.form.publish } });
					this.$router.push("/admin/articles");
				} catch (error) {
					this.$store.commit("base/toaster/addError", { title: "Article", message: error.message });
				}
			},
			async saveArticle () {
				try {
					await this.$store.dispatch("admin/articles/patch", { id: this.$route.params.id, patch: { title: this.form.title, content: this.form.content, tags: this.form.tags, publish: this.form.publish } });
					this.$store.commit("base/toaster/addSuccess", { title: `Article ${this.article._id}`, message: "Saved" });
				} catch (error) {
					this.$store.commit("base/toaster/addError", { title: "Article", message: error.message });
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
