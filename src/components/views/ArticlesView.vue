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
          +
        </router-link>
      </b-col>
    </b-row>
    <b-row v-if="articles.length > 0">
      <b-col
        cols="12"
        v-for="(article, index) in articles"
        :key="article._id">
        <article-card
          :article="article"
          :edit-mode="editMode" />
        <hr v-if="index < articles.length - 1">
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
	import ArticleCardVue from "../cards/ArticleCard.vue";
	export default {
		name:"ArticlesView",
		props:{
			articles:{
				type: Array,
				required: true
			},
			editMode: {
				type: Boolean,
				default: false
			}
		},
		components:{
			"article-card": ArticleCardVue
		}
	};
</script>
