<template>
	<base-page>
		<template #title>
			<!-- title -->
			<v-row
				justify="space-around"
				align="center">
				<v-col cols="auto">
					<h1>Articles</h1>
				</v-col>
				<v-col
					v-if="isLoggedIn"
					cols="auto">
					<v-btn
						text
						outlined
						to="/articles/create">
						new article
					</v-btn>
				</v-col>
			</v-row>
		</template>

		<article-list
			:articles="articles"
			:tags="tags"
			:edit-mode="isLoggedIn"
			:loading="loading" />
	</base-page>
</template>

<script>
import { mapGetters } from "vuex";

import ArticleList from "~/components/article/ArticleList.vue";
import BasePage from "~/components/base/BasePage.vue";

export default {
	name: "ArticlesPage",
	components: {
		ArticleList,
		BasePage
	},
	data(){
		return {
			loading: true
		};
	},
	head() {
		return {
			title: "Articles - Oliver's Personal Website",
			meta: [
				{ charset: "utf-8" },
				{ name: "viewport", content: "width=device-width, initial-scale=1" },
				{
					hid: "description",
					name: "description",
					content: "Articles about tech and entreprenurial stuff."
				}
			],
			link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
		};
	},
	computed: {
		...mapGetters({
			isLoggedIn: "admin/isLoggedIn"
		}),
		articles () {
			const query = this.isLoggedIn ? "admin/articles/getArticles" : "user/articles/getArticles";
			return this.$store.getters[query];
		},
		tags () {
			const query = this.isLoggedIn ? "admin/articles/getTags" : "user/articles/getTags";
			return this.$store.getters[query];
		}
	},
	async mounted() {
		const isLoggedIn = this.$store.getters["admin/isLoggedIn"];
		const queryArticles = isLoggedIn ? "admin/articles/index" : "user/articles/index";
		const queryTags = isLoggedIn ? "admin/articles/indexTags" : "user/articles/indexTags";

		await this.$store.dispatch(queryArticles);
		await this.$store.dispatch(queryTags);

		this.loading = false;
	}
};
</script>
