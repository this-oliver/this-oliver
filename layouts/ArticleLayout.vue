<template>
	<div>
		<!-- loading -->
		<b-row v-if="loading">
			<b-col cols="4">
				<loading-card />
			</b-col>
			<b-col cols="8">
				<loading-card />
			</b-col>
		</b-row>
		<!-- article -->
		<b-row
			v-else
			align-h="end">
			<b-col
				sm="11"
				md="4">
				<b-row>
					<!-- title -->
					<b-col
						class="layout-title"
						cols="12">
						{{ getArticle.title }}
					</b-col>
					<!-- time ago -->
					<b-col
						class="my-2"
						cols="12">
						<i>{{ getTimeAgo }}</i>
					</b-col>
					<!-- tags -->
					<b-col cols="auto">
						<small>
							<b-badge
								v-for="tag in getArticle.tags"
								:key="tag._id"
								class="mr-1 mt-1">
								{{ tag.name }}
							</b-badge>
						</small>
					</b-col>
				</b-row>
			</b-col>
			<!-- content -->
			<b-col
				id="article-content"
				sm="11"
				md="8">
				<b-row>
					<b-col cols="12">
						<span v-html="getContent" />
					</b-col>
				</b-row>
			</b-col>
			<!-- back btn -->
			<b-col
				class="mt-2"
				cols="auto">
				<nuxt-link
					class="simple-link"
					to="articles">
					&larr; articles
				</nuxt-link>
			</b-col>
		</b-row>
	</div>
</template>

<script>
	import { getMarkdown } from "../middleware/markdown";
	import { getTimeAgo } from "../middleware/time";
	import LoadingCardVue from "../components/cards/LoadingCard.vue";

	export default {
		name: "ArticleLayout",
		components: {
			"loading-card": LoadingCardVue
		},
		props: {
			article: {
				type: Object,
				default: null
			}
		},
		data () {
			return {
				loading: false,
				fallbackArticle: null
			};
		},
		computed: {
			getArticle () {
				return (this.article) ? this.article : this.fallbackArticle;
			},
			getContent () {
				return getMarkdown(this.getArticle.content);
			},
			getTimeAgo () {
				return getTimeAgo(this.getArticle.createdAt);
			}
		},
		async created () {
			// fetches article
			const articleId = this.$route.params.id;
			const paramArticle = this.$route.params.article;
			if (paramArticle || this.article) {
				this.fallbackArticle = paramArticle;
			} else if (articleId) {
				this.loading = true;
				this.fallbackArticle = await this.$store.dispatch("user/user/article/getSingle", articleId);
				this.loading = false;
			}

			// set page title
			const article = this.getArticle;

			if (article) {
				// set title of html document
			}
		}
	};
</script>

<style scoped>
#article-content{
	min-height: 60vh;
}
</style>
