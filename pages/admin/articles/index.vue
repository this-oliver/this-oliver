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
		components: {
			ArticleList
		},
		async asyncData ({ store }) {
			const articles = await store.dispatch("admin/articles/index");
			return { articles };
		}
	};
</script>
