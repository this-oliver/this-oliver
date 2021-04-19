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
      align-h="end"
      v-else>
      <b-col
        sm="11"
        md="4">
        <b-row>
          <!-- title -->
          <b-col
            class="view-title"
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
                class="mr-1 mt-1"
                v-for="tag in getArticle.tags"
                :key="tag._id">
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
        <router-link
          class="simple-link"
          :to="{ name: ROUTES.user.articleList }">
          &larr; {{ $t("nav.articles") }}
        </router-link>
      </b-col>
    </b-row>
  </div>
</template>

<script>
	import { getMarkdown } from "../../helpers/markdown-helper";
	import { getTimeAgo } from "../../helpers/time-helper";
	import LoadingCardVue from "../cards/LoadingCard.vue";

	export default {
		name:"ArticleView",
		props:{
			article:{
				type: Object,
				default: null
			}
		},
		components:{
			"loading-card": LoadingCardVue
		},
		data: function(){
			return {
				loading: false,
				fallbackArticle: null
			};
		},
		computed: {
			getArticle: function(){
				return (this.article)? this.article : this.fallbackArticle;
			},
			getContent: function(){
				return getMarkdown(this.getArticle.content);
			},
			getTimeAgo: function(){
				return getTimeAgo(this.getArticle.createdAt);
			}
		},
		created: async function(){

			// fetches article
			let articleId = this.$route.params.id;
			let paramArticle = this.$route.params.article;
			if(paramArticle || this.article){
				this.fallbackArticle = paramArticle;
			} else if(articleId){
				this.loading = true;
				this.fallbackArticle = await this.$store.dispatch("user/article/getArticle", articleId);
				this.loading = false;
			}

			// set page title
			let article = this.getArticle;

			if(article){
				document.title = `${article.title} - ${article.author.name}`;
			}
		}
	};
</script>

<style scoped>
#article-content{
	min-height: 60vh;
}
</style>
