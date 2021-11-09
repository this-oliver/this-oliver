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
		<v-row justify="center">
			<v-col
				cols="12"
				md="8">
				<article-list
					:articles="articles"
					:edit-mode="true" />
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
	computed:{
		...mapGetters({
			articles: "admin/articles/getArticles",
			tags: "admin/articles/getTags"
		})
	},
	async mounted () {
		await this.$store.dispatch("admin/articles/index");
		await this.$store.dispatch("admin/articles/indexTags");
	},
	methods: {
		getRandomHexColor() {
			return colorUtil.getRandomHexColor();
		}
	}
};
</script>
