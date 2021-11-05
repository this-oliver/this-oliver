<template>
	<v-row
		v-if="articles.length > 0"
		justify="center">
		<v-col
			v-for="(article) in articles"
			:key="article._id"
			cols="12">
			<article-card
				:article="article"
				:edit-mode="editMode" />
		</v-col>
	</v-row>
	<v-row
		v-else
		justify="center">
		<v-col cols="auto">
			...
		</v-col>
	</v-row>
</template>

<script>
import ArticleCard from "~/components/article/ArticleCard.vue";

export default {
	name: "ArticleList",
	components: {
		ArticleCard
	},
	props: {
		articles: {
			type: Array,
			default: null
		},
		editMode: {
			type: Boolean,
			default: false
		}
	}
};
</script>
