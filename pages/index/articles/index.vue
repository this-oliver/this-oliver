<template>
	<div>
		<b-row class="mt-3">
			<b-col cols="12">
				<article-list :articles="articles" />
			</b-col>
		</b-row>
	</div>
</template>

<script>
	import { mapGetters } from "vuex";
	import ArticleList from "~/components/article/ArticleList.vue";
	export default {
		name: "ArticleListPage",
		components: {
			ArticleList
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
		}
	};
</script>
