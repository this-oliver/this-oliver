<template>
	<base-page title="articles">
		<article-list :articles="articles" />
	</base-page>
</template>

<script>
import { mapGetters } from "vuex";

import ArticleList from "~/components/article/ArticleList.vue";
import BasePage from "~/components/base/BasePage.vue";

export default {
	components: {
		ArticleList,
		BasePage
	},
	head () {
		return {
			title: "Articles",
			meta: [
				{ charset: "utf-8" },
				{ name: "viewport", content: "width=device-width, initial-scale=1" },
				{ hid: "description", name: "description", content: "Articles about tech and entreprenurial stuff." }
			],
			link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
		};
	},
	computed: {
		...mapGetters({
			articles: "user/articles/getArticles"
		})
	},
	async mounted () {
		await this.$store.dispatch("user/articles/index");
	}
};
</script>
