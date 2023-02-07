<template>
	<base-page>
		<v-row
			v-if="!getArticle"
			justify="center">
			<v-col cols="auto">
				<v-chip color="warning">
					🚦 article could not load
				</v-chip>
			</v-col>
		</v-row>
		<div v-else>
			<v-row v-if="isLoggedIn">
				<v-col
					cols="12"
					md="auto">
					<base-btn
						color="warning"
						:block="true"
						:to="`/articles/${getArticle._id}/edit`">
						update
					</base-btn>
				</v-col>
			</v-row>
			<v-row justify-md="center">
				<v-col
					cols="12"
					md="4">
					<!-- article details -->
					<!-- title -->
					<h1>{{ getArticle.title }}</h1>
					<!-- time ago -->
					<h4>{{ getDate }}</h4>
					<!-- tags -->
					<v-chip
						v-for="tag in getArticle.tags"
						:key="tag._id"
						class="mr-1 mt-1">
						{{ tag.name }}
					</v-chip>
				</v-col>

				<v-col
					id="article-content"
					class="mt-2 mt-md-0"
					md="8">
					<base-html :html="getParsedContent" />
				</v-col>

				<v-col cols="12">
					<!-- back btn -->
					<v-row justify="space-around">
						<v-col cols="auto">
							<a
								class="simple-link"
								@click="$router.go(-1)">
								&larr; more articles
							</a>
						</v-col>
						<v-col cols="auto">
							<v-btn
								rounded
								@click="like">
								{{ `👏 ${getArticle.likes}` }}
							</v-btn>
						</v-col>
					</v-row>
				</v-col>
			</v-row>
		</div>
	</base-page>
</template>

<script>
import { mapGetters } from "vuex";
import { getDate } from "~/utils/time";
import { MarkdownToHtml } from "~/utils/parser";
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
		getParsedContent () {
			return MarkdownToHtml(this.getArticle.content, { darkMode: this.isDarkMode});
		},
		getDate () {
			return getDate(this.getArticle.createdAt);
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

<style scoped>
#article-content {
	min-height: 60vh;
}
</style>
