<template>
	<v-row
		v-if="articles.length > 0"
		justify="center">
		<v-col
			v-if="tags && tags.length > 0"
			cols="auto"
			md="3"
			order="2"
			order-md="1">
			<v-btn
				v-for="tag in tags"
				:key="tag._id"
				:color="tag.color"
				class="ma-1">
				{{ tag.name }}
			</v-btn>
		</v-col>
		<v-col
			cols="12"
			md="8"
			order="1"
			order-md="2">
			<v-row>
				<v-col
					v-for="(article) in articles"
					:key="article._id"
					cols="12">
					<article-card
						:article="article"
						:edit-mode="editMode" />
				</v-col>
			</v-row>
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
			required: true
		},
		tags: {
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
