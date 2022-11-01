<template>
	<base-page>
		<v-row v-if="article">
			<v-col cols="12">
				<article-single
					:article="getArticle"
					@refresh="refreshArticle" />
			</v-col>
		</v-row>
		<v-row
			v-else
			justify="center">
			<v-col cols="auto">
				<v-chip color="warning">
					🚦 article could not load
				</v-chip>
			</v-col>
		</v-row>
	</base-page>
</template>

<script>
import { getTextDescription } from "~/utils/string";
import ArticleSingle from "~/components/article/ArticleSingle.vue";
import BasePage from "~/components/base/BasePage.vue";

export default {
	components: {
		ArticleSingle,
		BasePage
	},
	data () {
		return {
			article: null,
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
		getArticle () {
			return this.refreshedArticle || this.article;
		}
	},
	async mounted () {
		const id = this.$route.params.id;
		this.article = await this.$store.dispatch("user/articles/get", id);
	},
	methods: {
		async refreshArticle () {
			const id = this.$route.params.id;
			// refresh articles
			await this.$store.dispatch("user/articles/index");
			// get new version of current article
			const articles = this.$store.getters["user/articles/getArticles"];
			this.refreshedArticle = articles.find(({ _id }) => _id === id);
		}
	}
};
</script>
