<template>
	<div>
		<b-row v-if="!article" align-h="center">
			<b-col cols="auto">
				<b-badge variant="warning">
					🚦 article could not load
				</b-badge>
			</b-col>
		</b-row>
		<b-row v-else>
			<b-col cols="12">
				<article-single :article="article" />
			</b-col>
		</b-row>
	</div>
</template>

<script>
	import ArticleSingle from "~/components/article/ArticleSingle.vue";

	export default {
		name: "ArticleSinglePage",
		components: {
			ArticleSingle
		},
		async asyncData ({ store, params, error }) {
			const id = params.id;
			const article = await store.dispatch("user/articles/get", id);

			if (article === null) {
				return error({ statusCode: 404, message: "article couldn't load" });
			}

			return { article };
		}
	};
</script>

<style scoped>
#article-content{
	min-height: 60vh;
}
</style>
