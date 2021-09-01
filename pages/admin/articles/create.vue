<template>
	<div>
		<b-row align-h="center">
			<b-col class="mt-3" sm="11" md="8">
				<article-form />
			</b-col>
		</b-row>
	</div>
</template>

<script>
	import ArticleForm from "~/components/article/ArticleForm.vue";

	export default {
		components: { ArticleForm }
	};
</script>
