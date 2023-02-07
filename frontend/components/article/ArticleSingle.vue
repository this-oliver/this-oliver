<template>
	<div>
		<v-row
			v-if="isLoggedIn"
			justify="end">
			<v-col
				cols="12"
				md="auto">
				<base-btn
					color="warning"
					:block="true"
					:to="`/articles/${article._id}/edit`">
					update
				</base-btn>
			</v-col>
		</v-row>

		<v-row justify-md="center">
			<v-col
				cols="12"
				md="4">
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
			</v-col>

			<v-col
				id="article-content"
				class="mt-2 mt-md-0"
				md="8">
				<base-html :html="getParsedContent" />
			</v-col>

			<v-col cols="12">
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
			</v-col>
		</v-row>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
import { MarkdownToHtml } from "../../utils/parser";
import { getDate } from "../../utils/time";
import BaseHtml from "../base/BaseHtml.vue";
import BaseBtn from "../base/BaseBtn.vue";

export default {
	name: "ArticleSingle",
	components: { BaseHtml, BaseBtn },
	props: {
		article: {
			type: Object,
			required: true
		}
	},
	emits: ["refresh"],
	computed: {
		...mapGetters({
			isLoggedIn: "admin/isLoggedIn"
		}),
		getParsedContent () {
			return MarkdownToHtml(this.article.content, { darkMode: this.isDarkMode});
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
#article-content {
	min-height: 60vh;
}
</style>
