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
	import ArticleList from "~/components/article/ArticleList.vue";
	export default {
		name: "ArticleListPage",
		components: {
			ArticleList
		},
		async asyncData ({ store }) {
			const articles = await store.dispatch("user/articles/index");
			return { articles };
		},
		head () {
			return {
				title: "Articles"
			};
		}
	};
</script>
