<template>
	<div>
		<b-row v-if="!article" align-h="center">
			<b-col cols="auto">
				<b-badge variant="warning">
					🚦 article could not load
				</b-badge>
			</b-col>
		</b-row>
		<b-row v-else>
			<b-col cols="12">
				<article-single :article="getArticle" @refresh="refreshArticle" />
			</b-col>
		</b-row>
	</div>
</template>

<script>
	import { getTextDescription } from "../../../utils/string";
	import ArticleSingle from "~/components/article/ArticleSingle.vue";

	export default {
		name: "ArticleSinglePage",
		components: {
			ArticleSingle
		},
		async asyncData ({ $auth, store, params, error }) {
			const id = params.id;
			const article = await store.dispatch("user/articles/get", id);

			// if admin is not logged in, increment article view
			if (!$auth.loggedIn) {
				await store.dispatch("user/articles/incrementViews", id);
			}

			if (article === null) {
				return error({ statusCode: 404, message: "article couldn't load" });
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
				title: this.article.title,
				meta: [
					{ charset: "utf-8" },
					{ name: "viewport", content: "width=device-width, initial-scale=1" },
					{ hid: "description", name: "description", content: `${getTextDescription(this.article.content)}...` }
				],
				link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
			};
		},
		computed: {
			getArticle () {
				return this.refreshedArticle || this.article;
			}
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
