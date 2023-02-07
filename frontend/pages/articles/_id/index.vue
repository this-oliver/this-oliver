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
import {mapGetters} from "vuex";
import { getTextDescription } from "~/utils/string";
import ArticleSingle from "~/components/article/ArticleSingle.vue";
import BasePage from "~/components/base/BasePage.vue";

export default {
	components: {
		ArticleSingle,
		BasePage
	},
	async asyncData({ store, params }) {
		const id = params.id;
		const storeQuery = store.getters["admin/isLoggedIn"] ? "admin/articles/get" : "user/articles/get";
		const article = await store.dispatch(storeQuery, id);

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
		}
	},
	methods: {
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
