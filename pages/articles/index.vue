<template>
	<div>
		<b-row class="mt-3">
			<b-col cols="12">
				<article-list :articles="articleList" />
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
		async asyncData ({ store }) {
			const user = store.getters["user/getUser"];
			await store.dispatch("user/articles/indexUser", user._id);
		},
		head () {
			return {
				title: "Articles"
			};
		},
		computed: {
			...mapGetters({
				articleList: "user/articles/getArticles"
			})
		}
	};
</script>
