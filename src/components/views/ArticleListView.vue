<template>
  <div>
    <b-row align-h="between">
      <b-col
        class="sub-header"
        sm="auto"
        md="auto">
        {{ $t("views.article.title") }}
      </b-col>
      <b-col
        v-if="editMode"
        cols="auto">
        <router-link
          class="simple-link"
          :to="{ name: ROUTES.admin.articleCreate }">
          <b> + </b>
        </router-link>
      </b-col>
    </b-row>
    <hr>
    <b-row
      v-if="getArticles.length > 0"
      class="mt-3">
      <b-col
        cols="12"
        v-for="(article, index) in getArticles"
        :key="article._id">
        <article-card
          :article="article"
          :edit-mode="editMode" />
        <hr v-if="index < getArticles.length - 1">
      </b-col>
    </b-row>
    <b-row
      v-else
      align-h="center">
      <b-col cols="auto">
        ...
      </b-col>
    </b-row>
  </div>
</template>

<script>
	import { mapGetters } from "vuex";
	import ArticleCardVue from "../cards/ArticleCard.vue";
	export default {
		name:"ArticleListView",
		props:{
			articles:{
				type: Array,
				default: null
			},
			editMode: {
				type: Boolean,
				default: false
			}
		},
		components:{
			"article-card": ArticleCardVue
		},
		computed: {
			...mapGetters({
				articleList: "user/article/getArticles"
			}),
			getArticles: function(){
				return this.articles? this.articles : this.articleList;
			}
		}
	};
</script>
