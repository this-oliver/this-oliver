<template>
	<div>
		<b-row class="mt-3">
			<b-col cols="12">
				<article-list :articles="articles" :edit-mode="true" />
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
		layout: "admin",
		async asyncData ({ store }) {
			try {
				const articles = await store.dispatch("admin/articles/indexUser");
				return { articles };
			} catch (error) {
				console.log({ pageError: error });
			}
		}
	};
</script>
