<template>
	<div>
		<b-row align-h="center">
			<b-col class="mt-3" sm="11" md="8">
				<article-form :article="article" :edit-mode="true" />
			</b-col>
		</b-row>
	</div>
</template>

<script>
	import ArticleForm from "~/components/article/ArticleForm.vue";

	export default {
		components: { ArticleForm },
		async asyncData ({ params, store }) {
			const id = params.id;
			const article = await store.dispatch("admin/articles/get", id);

			return { article };
		}
	};
</script>
