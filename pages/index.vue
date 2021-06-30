<template>
	<div>
		<b-row align-h="center">
			<b-col v-if="user" class="mt-3" sm="11" md="8">
				<about-page :user="user" :edit-mode="editMode" />
			</b-col>
			<b-col v-if="articles" class="mt-3" sm="11" md="8">
				<article-list-page :articles="articles" :edit-mode="editMode" />
			</b-col>
			<b-col v-if="experiences" class="mt-3" sm="11" md="8">
				<experiences-page
					:experience-list="experiences"
					:edit-mode="editMode" />
			</b-col>
		</b-row>
	</div>
</template>

<script>
	import { mapGetters } from "vuex";
	import AboutPage from "~/pages/about.vue";
	import ExperiencesPage from "~/pages/experiences.vue";
	import ArticleListPage from "~/pages/articles.vue";

	export default {
		name: "Landing",
		components: {
			AboutPage,
			ExperiencesPage,
			ArticleListPage
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
				experiences: "user/getExperiences",
				articles: "user/articles/getArticles"
			})
		}
	};
</script>
