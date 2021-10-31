<template>
	<base-page>
		<article-form
			:article="article"
			:edit-mode="true" />
	</base-page>
</template>

<script>
import ArticleForm from "~/components/article/ArticleForm.vue";
import BasePage from "~/components/base/BasePage.vue";

export default {
	components: { ArticleForm, BasePage },
	data(){
		return {
			article: null
		};
	},
	async mounted () {
		const id = this.$route.params.id;
		this.article = await this.$store.dispatch("admin/articles/get", id);
	}
};
</script>
