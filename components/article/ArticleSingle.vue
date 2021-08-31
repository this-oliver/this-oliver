<template>
	<div id="article">
		<!-- article details -->
		<b-row>
			<!-- title -->
			<b-col class="article-title" cols="auto">
				{{ article.title }}
			</b-col>
			<b-col cols="12" />
			<!-- time ago -->
			<b-col class="my-2" cols="auto">
				<i>{{ getDate }}</i>
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
				<span v-html="getParsedContent" />
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
	import { MarkdownToHtml } from "../../utils/markdown";
	import { getDate } from "../../utils/time";

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
			getParsedContent () {
				return MarkdownToHtml(this.article.content);
			},
			getDate () {
				return getDate(this.article.createdAt);
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
