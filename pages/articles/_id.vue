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
						{{ article.title }}
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
								v-for="tag in article.tags"
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
				<a class="simple-link" @click="$router.go(-1)">
					&larr; articles
				</a>
			</b-col>
		</b-row>
	</div>
</template>

<script>
	import { getMarkdown } from "../../middleware/markdown";
	import { getTimeAgo } from "../../middleware/time";
	import LoadingCardVue from "../../components/cards/LoadingCard.vue";

	export default {
		name: "ArticleSingle",
		components: {
			"loading-card": LoadingCardVue
		},
		async asyncData ({ store, params }) {
			console.log("fetching...");
			const id = params.id;
			const article = await store.dispatch("user/articles/getSingle", id);

			return { article };
		},
		data () {
			return {
				loading: false
			};
		},
		head: {
			title: this.article.title,
			meta: [
				{
					hid: "description",
					name: this.article.title,
					content: this.article.content
				}
			]
		},
		computed: {
			getContent () {
				return getMarkdown(this.article.content);
			},
			getTimeAgo () {
				return getTimeAgo(this.article.createdAt);
			}
		}
	};
</script>

<style scoped>
#article-content{
	min-height: 60vh;
}
</style>
