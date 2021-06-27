<template>
	<div>
		<b-row align-h="center">
			<b-col class="mt-3" sm="11" md="8">
				<about-layout :user="user" :edit-mode="editMode" />
			</b-col>
			<b-col class="mt-3" sm="11" md="8">
				<article-list-layout :articles="articles" :edit-mode="editMode" />
			</b-col>
			<b-col class="mt-3" sm="11" md="8">
				<experiences-layout
					:xp-list="experiences"
					:edit-mode="editMode" />
			</b-col>
		</b-row>
	</div>
</template>

<script>
	import { mapGetters } from "vuex";
	import AboutLayout from "~/layouts/AboutLayout.vue";
	import ArticleListLayout from "~/layouts/ArticleListLayout.vue";
	import ExperiencesLayout from "~/layouts/ExperiencesLayout.vue";

	export default {
		name: "Home",
		components: {
			AboutLayout,
			ArticleListLayout,
			ExperiencesLayout
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
		}
	};
</script>
