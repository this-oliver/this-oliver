<template>
	<base-page :no-padding="true">
		<v-row
			v-if="getArticle"
			justify="center">
			<v-col
				id="article-content"
				class="mt-1 mt-md-2"
				cols="11"
				sm="9"
				md="8">
				<!-- title -->
				<h1 id="article-title">
					{{ getArticle.title }}
				</h1>
				<!-- time ago -->
				<h4 id="article-date">
					{{ getArticleDate }}
				</h4>
				<!-- content -->
				<base-html :html="getArticleHtml" />
			</v-col>

			<v-col cols="12" />
			<v-col
				cols="12"
				sm="6"
				md="4"
				class="text-center">
				<base-btn
					v-for="option in getArticleOptions"
					:key="option.text"
					:color="option.color || null"
					:outline="option.outline || false"
					:class="`mt-1 mx-1 ${option.class || ''}`"
					@click="option.action">
					{{ option.text }}
				</base-btn>
			</v-col>
			<v-col
				v-if="getArticle.tags.length > 0"
				id="article-info"
				cols="11"
				sm="6"
				md="4">
				<!-- tags -->
				<v-chip
					v-for="tag in getArticle.tags"
					:key="tag._id"
					class="mr-1 mt-1">
					{{ tag.name }}
				</v-chip>
			</v-col>

			<!-- TODO: add suggestions -->
		</v-row>
		<v-row
			v-else
			justify="center">
			<v-col
				cols="auto"
				class="error-text">
				<h2>🚦 article could not load</h2>
			</v-col>
		</v-row>
	</base-page>
</template>

<script>
import { mapGetters } from "vuex";
import { getDate } from "~/utils/time";
import { MarkdownToHtml } from "~/utils/parser";
import { getTextDescription } from "~/utils/string";

import BasePage from "~/components/base/BasePage.vue";
import BaseHtml from "~/components/base/BaseHtml.vue";
import BaseBtn from "~/components/base/BaseBtn.vue";

export default {
	components: {
		BasePage,
		BaseHtml,
		BaseBtn
	},
	async asyncData({ store, params }) {
		const slug = params.id;
		const isLoggedIn = store.getters["admin/isLoggedIn"];
		const storeQuery = isLoggedIn ? "admin/articles/getBySlug" : "user/articles/getBySlug";
		const article = await store.dispatch(storeQuery, slug);

		// increment views if viewer is not admin
		if(!isLoggedIn){
			await store.dispatch("user/articles/incrementViews", article._id);
		}

		return { article };
	},
	data () {
		return {
			refreshedArticle: null
		};
	},
	head () {
		return {
			title: this.getArticle ? this.getArticle.title : "Article",
			meta: [
				{ charset: "utf-8" },
				{ name: "viewport", content: "width=device-width, initial-scale=1" },
				{ hid: "description", name: "description", content: `${getTextDescription(this.getArticle ? this.getArticle.content : "")}...` }
			],
			link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
		};
	},
	computed: {
		...mapGetters({
			isLoggedIn: "admin/isLoggedIn"
		}),
		getArticle () {
			return this.refreshedArticle || this.article;
		},
		getArticleHtml () {
			return MarkdownToHtml(
				this.getArticle.content,
				{ darkMode: this.isDarkMode }
			);
		},
		getArticleDate () {
			return getDate(this.getArticle.createdAt);
		},
		getArticleOptions(){
			const options = [
				{
					text: "Go Back",
					color: "secondary",
					outline: !this.isDarkMode,
					action: () => {this.$router.go(-1);}
				}
			];

			if(this.isLoggedIn){
				options.push({
					text: "Update Article",
					color: "warning",
					outline: !this.isDarkMode,
					action: () => {this.$router.push(`/articles/${this.getArticle._id}/edit`);}
				});
			}

			return options;
		}
	},
	methods: {
		async like () {
			this.refreshedArticle = await this.$store.dispatch("user/articles/like", this.getArticle._id);
		},
		async refreshArticle () {
			// refresh articles
			const storeIndexQuery = this.isLoggedIn ? "admin/articles/index" : "user/articles/index";
			await this.$store.dispatch(storeIndexQuery);

			// get new version of current article
			const slug = this.$route.params.slug;
			const storeGetQuery = this.isLoggedIn ? "admin/articles/get" : "user/articles/get";
			const articles = this.$store.getters[storeGetQuery];
			this.refreshedArticle = articles.find((article) => article.slug === slug);
		}
	}
};
</script>

<style>
#article-info a {
	color: inherit;
}

#article-title{
	font-size: 3rem;
}

#article-date{
	font-size: 1.25rem;
}

.table-of-content{
	padding: 25px 10px 5px 10px;
}

.see-through{
	opacity: 0.5;
}

/* style article info for large screens */
@media (min-width: 960px) {
	#article-content{
    max-height: 90vh;
    overflow-y: auto;
  }

	.table-of-content{
	padding-top: 0;
	}

	.table-of-content{
		min-height: 150px;
	}
}
</style>
