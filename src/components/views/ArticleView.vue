<template>
  <div>
    <b-row v-if="loading">
      <b-col cols="4">
        <loading-card />
      </b-col>
      <b-col cols="8">
        <loading-card />
      </b-col>
    </b-row>
    <b-row v-else>
      <b-col
        sm="11"
        md="4">
        <b-row>
          <!-- title -->
          <b-col
            class="sub-header"
            cols="12">
            {{ getArticle.title }}
          </b-col>
          <!-- time ago -->
          <b-col
            class="my-2"
            cols="12">
            <i>{{ getTimeAgo(getArticle.createdAt) }}</i>
          </b-col>
        </b-row>
      </b-col>
      <!-- content -->
      <b-col
        sm="11"
        md="8">
        <b-row>
          <b-col cols="12">
            <span v-html="getMarkdown(getArticle.content)" />
          </b-col>
          <b-col cols="auto">
            <b-row>
              <!-- tags -->
              <b-col cols="12">
                <small>
                  <b-badge
                    class="mr-1 mt-1"
                    v-for="tag in getArticle.tags"
                    :key="tag._id">
                    {{ tag.name }}
                  </b-badge>
                </small>
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
          </b-col>
        </b-row>
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
			}
		},
		methods: {
			getMarkdown: function(text){
				return getMarkdown(text);
			},
			getTimeAgo: function(time){
				return getTimeAgo(time);
			}
		},
		created: async function(){
			this.loading = true;
			let articleId = this.$route.params.id;
			let paramArticle = this.$route.params.article;
			if(paramArticle || this.article){
				this.fallbackArticle = paramArticle;
			} else if(articleId){
				this.fallbackArticle = await this.$store.dispatch("user/article/getSingleArticle", articleId);
			}
			this.loading = false;
		}
	};
</script>
