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
			const user = store.getters["user/getUser"];
			const articles = (user) ? await store.dispatch("user/articles/indexUser", user._id) : [];
			return { articles };
		},
		head () {
			return {
				title: "Articles"
			};
		}
	};
</script>
