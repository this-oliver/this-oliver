<template>
	<div id="article">
		<!-- article details -->
		<!-- title -->
		<h1>{{ article.title }}</h1>
		<!-- time ago -->
		<h4>{{ getDate }}</h4>
		<!-- tags -->
		<v-chip
			v-for="tag in article.tags"
			:key="tag._id"
			class="mr-1 mt-1">
			{{ tag.name }}
		</v-chip>

		<!-- content -->
		<div
			id="article-content"
			class="mt-2">
			<!-- eslint-disable-next-line vue/no-v-html -->
			<span v-html="getParsedContent" />
		</div>

		<!-- back btn -->
		<v-row justify="space-around">
			<v-col cols="auto">
				<a
					class="simple-link"
					@click="$router.go(-1)">
					&larr; more articles
				</a>
			</v-col>
			<v-col cols="auto">
				<v-btn
					rounded
					@click="like">
					{{ `👏 ${article.likes}` }}
				</v-btn>
			</v-col>
		</v-row>
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
