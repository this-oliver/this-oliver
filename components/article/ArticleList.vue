<template>
	<div>
		<b-row :align-h="editMode == true ? 'between' : 'center'" align-v="baseline">
			<b-col
				v-if="hideTitle == false"
				class="layout-title center-text"
				cols="7">
				articles
			</b-col>
			<b-col
				v-if="editMode"
				cols="2">
				<nuxt-link
					class="simple-link"
					to="/admin/articles/create">
					<b> + </b>
				</nuxt-link>
			</b-col>
		</b-row>
		<hr v-if="hideTitle == false || editMode == true">
		<b-row v-if="articles.length > 0">
			<b-col
				v-for="(article, index) in articles"
				:key="article._id"
				cols="12">
				<article-card
					:article="article"
					:edit-mode="editMode" />
				<hr v-if="index < articles.length - 1">
			</b-col>
		</b-row>
		<b-row
			v-else
			align-h="center">
			<b-col cols="auto">
				...
			</b-col>
		</b-row>
	</div>
</template>

<script>
	import ArticleCard from "~/components/article/ArticleCard.vue";
	export default {
		name: "ArticleList",
		components: {
			ArticleCard
		},
		props: {
			articles: {
				type: Array,
				default: null
			},
			hideTitle: {
				type: Boolean,
				default: false
			},
			editMode: {
				type: Boolean,
				default: false
			}
		}
	};
</script>
