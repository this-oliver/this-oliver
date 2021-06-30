<template>
	<div>
		<b-row align-h="between">
			<b-col
				class="layout-title"
				sm="auto"
				md="auto">
				articles
			</b-col>
			<b-col
				v-if="editMode"
				cols="auto">
				<nuxt-link
					class="simple-link"
					to="articles/create">
					<b> + </b>
				</nuxt-link>
			</b-col>
		</b-row>
		<hr>
		<b-row
			v-if="getArticles.length > 0"
			class="mt-3">
			<b-col
				v-for="(article, index) in getArticles"
				:key="article._id"
				cols="12">
				<article-card
					:article="article"
					:edit-mode="editMode" />
				<hr v-if="index < getArticles.length - 1">
			</b-col>
		</b-row>
		<b-row
			v-else
			align-h="center">
			<b-col cols="auto">
				...
			</b-col>
		</b-row>
	</div>
</template>

<script>
	import { mapGetters } from "vuex";
	import ArticleCardVue from "../../components/cards/ArticleCard.vue";
	export default {
		name: "ArticleList",
		components: {
			"article-card": ArticleCardVue
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
		},
		computed: {
			...mapGetters({
				articleList: "user/articles/getArticles"
			}),
			getArticles () {
				return this.articles ? this.articles : this.articleList;
			}
		}
	};
</script>
