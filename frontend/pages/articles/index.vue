<template>
	<base-page title="Articles">
		<article-list
			:articles="articles"
			:tags="tags"
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
			title: "Articles - Oliver 🤠",
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
			articles: "user/articles/getArticles",
			tags: "user/articles/getTags"
		})
	},
	async mounted() {
		await this.$store.dispatch("user/articles/index");
		await this.$store.dispatch("user/articles/indexTags");
		this.loading = false;
	}
};
</script>
