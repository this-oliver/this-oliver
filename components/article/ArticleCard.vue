<template>
	<base-card :path="getUrl">
		<!-- title -->
		<h3>{{ article.title }}</h3>

		<!-- content -->
		<!-- eslint-disable-next-line vue/no-v-html -->
		<span v-html="getParsedContent" />

		<!-- date -->
		<v-row dense>
			<v-col
				v-if="article.tags.length"
				cols="12">
				<!-- tags -->
				<v-chip
					v-for="tag in article.tags"
					:key="tag._id"
					small
					class="mr-1"
					:color="tag.color">
					{{ tag.name }}
				</v-chip>
			</v-col>
			<v-col cols="auto">
				{{ getDate }}
			</v-col>
		</v-row>

		<template #footer>
			<!-- footer -->
			<v-row justify="space-between">
				<!-- views and likes -->
				<v-col
					v-if="editMode"
					cols="2"
					sm="auto"
					class="mx-1">
					<!-- publish flag -->
					<v-icon
						v-if="article.publish"
						color="success">
						check_circle
					</v-icon>
					<v-icon
						v-else
						color="warning">
						remove_circle
					</v-icon>
				</v-col>
				<v-col
					v-if="editMode"
					cols="2"
					sm="auto"
					class="mx-1">
					{{ `🔎 ${article.views}` }}
				</v-col>
				<v-col
					cols="2"
					sm="auto"
					class="mx-1 mr-sm-auto">
					{{ `👏 ${article.likes}` }}
				</v-col>
				<!-- actions -->
				<v-col
					v-if="editMode"
					cols="auto"
					sm="auto"
					class="mx-1">
					<nuxt-link
						class="simple-link"
						:to="`/admin/articles/${article._id}/edit`">
						update
					</nuxt-link>
				</v-col>
				<v-col
					v-if="editMode"
					cols="auto"
					sm="auto"
					class="mx-1">
					<span
						class="red--text simple-link"
						@click="deleteArticle(article._id)">
						delete
					</span>
				</v-col>
			</v-row>
		</template>
	</base-card>
</template>

<script>
import { mapActions } from "vuex";
import BaseCardVue from "../base/BaseCard.vue";
import { getDate } from "../../utils/time";
import { getTextDescription } from "../../utils/string";
import { MarkdownToHtml } from "../../utils/markdown";

export default {
	name: "ArticleCard",
	components: {
		"base-card": BaseCardVue
	},
	props: {
		article: {
			type: Object,
			required: true
		},
		editMode: {
			type: Boolean,
			default: false
		}
	},
	computed: {
		getParsedContent () {
			const content = `${getTextDescription(this.article.content)}...`;
			return MarkdownToHtml(content, true);
		},
		getDate () {
			return getDate(this.article.createdAt);
		},
		getUrl () {
			return this.editMode === true ? `/admin/articles/${this.article._id}` : `/articles/${this.article._id}`;
		}
	},
	methods: {
		...mapActions({
			deleteArticle: "admin/articles/delete"
		})
	}
};
</script>
