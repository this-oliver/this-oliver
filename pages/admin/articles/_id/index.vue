<template>
	<base-page>
		<v-row
			v-if="!article"
			justify="center">
			<v-col cols="auto">
				<v-chip color="warning">
					🚦 article could not load
				</v-chip>
			</v-col>
		</v-row>
		<v-row v-else>
			<v-col cols="12">
				<article-single :article="article" />
			</v-col>
		</v-row>
	</base-page>
</template>

<script>
import ArticleSingle from "~/components/article/ArticleSingle.vue";
import BasePage from "~/components/base/BasePage.vue";

export default {
	components: {
		ArticleSingle,
		BasePage
	},
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
