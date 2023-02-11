<template>
	<base-page :no-padding="true">
		<v-row
			v-if="!getArticle"
			justify="center">
			<v-col cols="auto">
				<v-chip color="warning">
					🚦 article could not load
				</v-chip>
			</v-col>
		</v-row>
		<v-row
			v-else
			justify="center">
			<v-col cols="11">
				<v-row justify-md="center">
					<v-col
						cols="12"
						sm="4"
						md="3">
						<div :style="`position: ${isScreenDesktop ? 'fixed' : null } ;`">
							<base-btn
								v-if="isLoggedIn"
								outline
								class="mt-1"
								color="warning"
								:block="true"
								:to="`/articles/${getArticle._id}/edit`">
								Update
							</base-btn>
							<!-- title -->
							<h1>{{ getArticle.title }}</h1>
							<!-- time ago -->
							<h4>{{ getArticleDate }}</h4>
							<!-- tags -->
							<v-chip
								v-for="tag in getArticle.tags"
								:key="tag._id"
								class="mr-1 mt-1">
								{{ tag.name }}
							</v-chip>
							<div
								v-if="getArticleTocHtml.length > 0"
								class="mt-2">
								<v-divider class="my-2" />
								<base-html
									class="table-of-content"
									:html="getArticleTocHtml" />
							</div>
							<div class="mt-2">
								<v-divider class="my-2" />
								<base-btn
									v-for="option in getArticleOptions"
									:key="option.text"
									:block="true"
									:color="option.color || null"
									:outline="option.outline || false"
									:class="`mt-1 ${option.class || ''}`"
									@click="option.action">
									{{ option.text }}
								</base-btn>
							</div>
						</div>
					</v-col>

					<v-col
						id="article-content"
						class="mt-2 mt-md-0"
						sm="8"
						md="9">
						<base-html :html="getArticleHtml" />
					</v-col>

					<!-- TODO: add suggestions -->
				</v-row>
			</v-col>
		</v-row>
	</base-page>
</template>

<script>
import { mapGetters } from "vuex";
import { getDate } from "~/utils/time";
import { MarkdownToHtml, getMarkdownTableOfContents } from "~/utils/parser";
import { getTextDescription } from "~/utils/string";

import BasePage from "~/components/base/BasePage.vue";
import BaseHtml from "~/components/base/BaseHtml.vue";
import BaseBtn from "~/components/base/BaseBtn.vue";

export default {
	components: {
		BasePage,
		BaseHtml,
		BaseBtn
	},
	async asyncData({ store, params }) {
		const id = params.id;
		const storeQuery = store.getters["admin/isLoggedIn"] ? "admin/articles/get" : "user/articles/get";
		const article = await store.dispatch(storeQuery, id);

		// increment views if viewer is not admin
		if(!store.getters["admin/isLoggedIn"]){
			await store.dispatch("user/articles/incrementViews", id);
		}

		return { article };
	},
	data () {
		return {
			refreshedArticle: null
		};
	},
	head () {
		return {
			title: this.getArticle ? this.getArticle.title : "Article",
			meta: [
				{ charset: "utf-8" },
				{ name: "viewport", content: "width=device-width, initial-scale=1" },
				{ hid: "description", name: "description", content: `${getTextDescription(this.getArticle ? this.getArticle.content : "")}...` }
			],
			link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
		};
	},
	computed: {
		...mapGetters({
			isLoggedIn: "admin/isLoggedIn"
		}),
		getArticle () {
			return this.refreshedArticle || this.article;
		},
		getArticleHtml () {
			return MarkdownToHtml(
				this.getArticle.content,
				{
					darkMode: this.isDarkMode,
					table: { wrapText: false }
				}
			);
		},
		getArticleTocHtml(){
			// get table of contents from markdown
			const toc = getMarkdownTableOfContents(this.getArticle.content, {renderAsList: false});
			// convert toc to html
			return MarkdownToHtml(toc, {
				link: {openOutside: false},
				table: {wrapText: true},
				darkMode: this.isDarkMode
			});
		},
		getArticleDate () {
			return getDate(this.getArticle.createdAt);
		},
		getArticleOptions(){
			return [
				{
					text: `${this.getArticle.likes} Likes`,
					color: this.isDarkMode ? "white" : "black",
					class: `${this.isDarkMode ? "black" : "white"}--text`,
					action: () => {this.like();}
				},
				{
					text: "Go Back",
					color: "secondary",
					outline: !this.isDarkMode,
					action: () => {this.$router.go(-1);}
				}
			];
		}
	},
	methods: {
		async like () {
			this.refreshedArticle = await this.$store.dispatch("user/articles/like", this.getArticle._id);
		},
		async refreshArticle () {
			const id = this.$route.params.id;
			// refresh articles
			const storeIndexQuery = this.isLoggedIn ? "admin/articles/index" : "user/articles/index";
			await this.$store.dispatch(storeIndexQuery);

			// get new version of current article
			const storeGetQuery = this.isLoggedIn ? "admin/articles/get" : "user/articles/get";
			const articles = this.$store.getters[storeGetQuery];
			this.refreshedArticle = articles.find(({ _id }) => _id === id);
		}
	}
};
</script>
