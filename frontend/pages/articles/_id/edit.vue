<template>
	<base-page :no-padding="true">
		<v-row justify="center">
			<v-col
				v-if="article"
				cols="11"
				sm="10">
				<article-form
					:article="article"
					:edit-mode="true" />
			</v-col>
		</v-row>
	</base-page>
</template>

<script>
import ArticleForm from "~/components/article/ArticleForm.vue";
import BasePage from "~/components/base/BasePage.vue";

export default {
	components: { ArticleForm, BasePage },
	data() {
		return {
			article: null
		};
	},
	computed: {
		isLoggedIn() {
			return this.$store.getters["auth/isLoggedIn"];
		}
	},
	async mounted(){
		this.article = await this.$store.dispatch("admin/articles/get", this.$route.params.id);
	}
};
</script>
