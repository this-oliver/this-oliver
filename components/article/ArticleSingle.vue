<template>
	<div id="article">
		<!-- article details -->
		<v-row>
			<!-- title -->
			<v-col
				class="article-title"
				cols="auto">
				{{ article.title }}
			</v-col>
			<v-col cols="12" />
			<!-- time ago -->
			<v-col
				class="my-2"
				cols="auto">
				<i>{{ getDate }}</i>
			</v-col>
			<v-col cols="12" />
			<!-- tags -->
			<v-col
				class="my-2"
				cols="auto">
				<small>
					<v-chip
						v-for="tag in article.tags"
						:key="tag._id"
						class="mr-1 mt-1">
						{{ tag.name }}
					</v-chip>
				</small>
			</v-col>
		</v-row>

		<!-- content -->
		<v-row justify="center">
			<v-col
				id="article-content"
				cols="12">
				<!-- eslint-disable-next-line vue/no-v-html -->
				<span v-html="getParsedContent" />
			</v-col>
		</v-row>

		<!-- back btn -->
		<v-row justify="space-around">
			<v-col
				class="my-2"
				cols="auto">
				<a
					class="simple-link"
					@click="$router.go(-1)">
					&larr; articles
				</a>
			</v-col>
			<v-col
				class="my-2"
				cols="auto">
				<v-btn
					pill
					@click="like">
					👏
					{{ article.likes }}
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
