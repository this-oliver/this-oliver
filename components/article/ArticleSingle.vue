<template>
	<div>
		<b-row v-if="!article" align-h="center">
			<b-col cols="auto">
				<b-badge variant="warning">
					🚦 article could not load
				</b-badge>
			</b-col>
		</b-row>
		<!-- article -->
		<b-row v-else>
			<b-col id="article-info" sm="11" md="4">
				<b-row align-v="stretch">
					<!-- title -->
					<b-col class="layout-title" cols="12">
						{{ article.title }}
					</b-col>
					<!-- time ago -->
					<b-col class="my-2" cols="12">
						<i>{{ getTimeAgo }}</i>
					</b-col>
					<!-- tags -->
					<b-col class="my-2" cols="auto">
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
			<b-col id="article-content" sm="11" md="8">
				<span v-html="getContent" />
			</b-col>
			<!-- back btn -->
			<b-col class="my-2" cols="auto">
				<a class="simple-link" @click="$router.go(-1)">
					&larr; articles
				</a>
			</b-col>
		</b-row>
	</div>
</template>

<script>
	import { getMarkdown } from "../../utils/markdown";
	import { getTimeAgo } from "../../utils/time";

	export default {
		name: "ArticleSingle",
		props: {
			article: {
				type: Object,
				required: true
			}
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
#article-info {
	max-width: 25vw;
}

#article-content {
	min-height: 60vh;
}
</style>
