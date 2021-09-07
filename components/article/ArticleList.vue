<template>
	<div>
		<!-- title -->
		<b-row :align-h="editMode == true ? 'between' : 'center'" align-v="baseline">
			<b-col
				v-if="hideTitle == false"
				class="general-title center-text"
				cols="auto">
				articles
			</b-col>
			<b-col
				v-if="editMode"
				cols="auto">
				<nuxt-link
					class="simple-link"
					to="/admin/articles/create">
					<b> + </b>
				</nuxt-link>
			</b-col>
		</b-row>
		<!-- articles -->
		<hr v-if="hideTitle == false || editMode == true" class="divider">
		<b-row v-if="getArticles.length > 0">
			<b-col
				v-for="(article, index) in getArticles"
				:key="article._id"
				cols="12"
				class="my-1">
				<article-card
					:article="article"
					:edit-mode="editMode" />
				<hr v-if="index < getArticles.length - 1" class="divider">
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
			hideTitle: {
				type: Boolean,
				default: false
			},
			editMode: {
				type: Boolean,
				default: false
			}
		},
		computed: {
			getArticles () {
				return this.articles ? this.sortArticles([...this.articles]) : [];
			}
		},
		methods: {
			// sort articles: latest to earliest
			sortArticles (articles) {
				if (articles.length > 0) {
					return articles.sort((articleA, articleB) => {
						/**
						 * when comparing A and B:
						 * - return 1 to sort B before A,
						 * - return -1 to sort A before B, and
						 * - return 0 to sort A and B equally
						 */
						if (this.$moment(articleA.createdAt).isSame(articleB.createdAt)) {
							// if a is the same day as b, return zero
							return 0;
						} else if (this.$moment(articleA.createdAt).isBefore(articleB.createdAt)) {
							// if A was created before (earlier than) B, return 1
							return 1;
						} else {
							// if A was created after (later than) B, return -1
							return -1;
						}
					});
				}
			}
		}
	};
</script>
