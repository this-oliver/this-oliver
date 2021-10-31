<template>
	<base-page>
		<template #title>
			<!-- title -->
			<v-row
				justify="space-around"
				align="center">
				<v-col cols="auto">
					<h1>articles</h1>
				</v-col>
				<v-col cols="auto">
					<v-btn
						icon
						to="/admin/articles/create">
						<v-icon>add</v-icon>
					</v-btn>
				</v-col>
			</v-row>
		</template>
		<article-list
			:articles="articles"
			:edit-mode="true" />
	</base-page>
</template>

<script>
import { mapGetters } from "vuex";
import ArticleList from "~/components/article/ArticleList.vue";
import BasePage from "~/components/base/BasePage.vue";
export default {
	components: {
		ArticleList,
		BasePage
	},
	computed:{
		...mapGetters({
			articles: "admin/articles/getArticles"
		})
	},
	async mounted () {
		await this.$store.dispatch("admin/articles/index");
	}
};
</script>
