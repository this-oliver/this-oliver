<template>
	<div id="article">
		<!-- article -->
		<b-row>
			<!-- title -->
			<b-col class="general-title" cols="auto">
				{{ article.title }}
			</b-col>
			<b-col cols="12" />
			<!-- time ago -->
			<b-col class="my-2" cols="auto">
				<i>{{ getTimeAgo }}</i>
			</b-col>
			<b-col cols="12" />
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

		<!-- content -->
		<b-row align-h="center">
			<b-col id="article-content" cols="12">
				<!-- eslint-disable-next-line vue/no-v-html -->
				<span v-html="getContent" />
			</b-col>
		</b-row>
		<!-- back btn -->
		<b-row align-h="around">
			<b-col class="my-2" cols="auto">
				<a class="simple-link" @click="$router.go(-1)">
					&larr; articles
				</a>
			</b-col>
			<b-col class="my-2" cols="auto">
				<b-button pill :variant="getBootstrapOutlineTheme" @click="like">
					👏
					{{ article.likes }}
				</b-button>
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
		emits: ["refresh"],
		computed: {
			getContent () {
				return getMarkdown(this.article.content);
			},
			getTimeAgo () {
				return getTimeAgo(this.article.createdAt);
			}
		},
		methods: {
			async like () {
				await this.$store.dispatch("user/articles/like", this.article._id);
				this.$emit("refresh");
			}
		}
	};
</script>

<style scoped>
#article{
	max-width: 100vw;
}

#article-content {
	min-height: 50vh;
}
</style>
