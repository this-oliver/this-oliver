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
				title: "Articles"
			};
		},
		computed: {
			...mapGetters({
				articles: "user/articles/getArticles"
			})
		}
	};
</script>
