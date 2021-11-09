<template>
	<base-page title="Articles">
		<v-row justify="center">
			<v-col
				cols="12"
				md="8">
				<article-list :articles="articles" />
			</v-col>
			<v-col
				cols="12"
				md="2">
				<v-btn
					v-for="tag in tags"
					:key="tag._id"
					:color="getRandomHexColor()"
					class="ma-1">
					{{ tag.name }}
				</v-btn>
			</v-col>
		</v-row>
	</base-page>
</template>

<script>
import { mapGetters } from "vuex";

import ArticleList from "~/components/article/ArticleList.vue";
import BasePage from "~/components/base/BasePage.vue";

import colorUtil from "~/utils/color";

export default {
	name: "ArticlesPage",
	components: {
		ArticleList,
		BasePage
	},
	head() {
		return {
			title: "Articles",
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
	},
	methods: {
		getRandomHexColor() {
			return colorUtil.getRandomHexColor();
		}
	}
};
</script>
