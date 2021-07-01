<template>
	<div>
		<b-row align-h="center">
			<b-col class="mt-3" sm="11" md="8">
				<about-me :user="user" :edit-mode="true" />
			</b-col>
			<b-col class="mt-3" sm="11" md="8">
				<article-list :articles="articles" :edit-mode="true" />
			</b-col>
			<b-col class="mt-3" sm="11" md="8">
				<experience-list :experiences="experiences" :edit-mode="true" />
			</b-col>
		</b-row>
	</div>
</template>

<script>
	import { mapGetters } from "vuex";
	import AboutMe from "~/components/about/AboutMe.vue";
	import ArticleList from "~/components/article/ArticleList.vue";
	import ExperienceList from "~/components/experience/ExperienceList.vue";

	export default {
		name: "AdminPage",
		components: {
			AboutMe,
			ArticleList,
			ExperienceList
		},
		middleware: "auth",
		async asyncData ({ store }) {
			await store.dispatch("user/initUser");
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
