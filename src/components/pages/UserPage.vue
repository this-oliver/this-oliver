<template>
  <div>
    <b-row align-h="center">
      <b-col
        class="mt-3"
        sm="11"
        md="8">
        <about-me-view
          :user="user"
          :edit-mode="editMode" />
      </b-col>
      <b-col
        class="mt-3"
        sm="11"
        md="8">
        <articles
          :articles="articles"
          :edit-mode="editMode" />
      </b-col>
      <b-col
        class="mt-3"
        sm="11"
        md="8">
        <experiences
          :xp-list="experiences"
          :edit-mode="editMode" />
      </b-col>
    </b-row>
  </div>
</template>

<script>
	import { mapGetters } from "vuex";

	import AboutMeViewVue from "../views/AboutMeView.vue";
	import ArticlesViewVue from "../views/ArticlesView.vue";
	import ExperiencesViewVue from "../views/ExperiencesView.vue";

	export default {
		name: "UserPage",
		components: {
			"about-me-view": AboutMeViewVue,
			"experiences": ExperiencesViewVue,
			"articles": ArticlesViewVue
		},
		props: {
			editMode: {
				type: Boolean,
				default: false
			}
		},
		computed: {
			...mapGetters({
				user: "user/getUser",
				experiences: "user/getXp",
				articles: "user/article/getArticles",
				isDarkTheme: "theme/isDarkTheme"
			})
		},
	};
</script>
