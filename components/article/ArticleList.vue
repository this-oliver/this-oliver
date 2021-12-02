<template>
	<div
		v-if="loading"
		class="text-center">
		<v-progress-circular
			:size="50"
			color="primary"
			indeterminate />

		<v-progress-circular
			:width="3"
			color="red"
			indeterminate />

		<v-progress-circular
			:size="70"
			:width="7"
			color="purple"
			indeterminate />

		<v-progress-circular
			:width="3"
			color="green"
			indeterminate />

		<v-progress-circular
			:size="50"
			color="amber"
			indeterminate />
	</div>
	<v-row
		v-else-if="articles.length > 0"
		justify="center">
		<v-col
			cols="12"
			md="9">
			<article-card
				v-for="article in getArticles"
				:key="article._id"
				:article="article"
				:edit-mode="editMode" />
		</v-col>
		<v-col
			v-if="tags && tags.length > 0"
			cols="auto"
			md="6"
			class="text-center">
			<v-btn
				v-for="tag in tags"
				:key="tag._id"
				:color="tag.color"
				class="ma-1"
				rounded
				:text="isTagSelected(tag)"
				:elevation="isTagSelected(tag) ? 2 : 0"
				@click="selectTag(tag)">
				{{ tag.name }}
			</v-btn>
		</v-col>
	</v-row>
	<v-row
		v-else
		justify="center">
		<v-col cols="auto">
			...
		</v-col>
	</v-row>
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
			required: true
		},
		tags: {
			type: Array,
			default: null
		},
		loading: {
			type: Boolean,
			default: false
		},
		editMode: {
			type: Boolean,
			default: false
		}
	},
	data(){
		return {
			/* tag ids */
			selectedTags: []
		};
	},
	computed: {
		getArticles(){
			const selectedTags = this.selectedTags;

			if(selectedTags.length == 0){
				return this.articles;
			}else {
				return this.articles.filter(function(article){
					let found = false;

					for(let i = 0; i < article.tags.length; i++){
						const tag = article.tags[i];

						const included = selectedTags.includes(tag._id);
						if(included){
							found = true;
							break;
						}
					}

					return found;
				});
			}
			return true;
		}
	},
	methods: {
		selectTag(tag = null){
			if(tag == null) return;

			let found = false;

			for(let i = 0; i < this.selectedTags.length; i++){
				const id = this.selectedTags[i];

				if(tag._id === id){
					found = true;
					this.selectedTags.splice(i, 1);
					break;
				}
			}

			if(!found){
				this.selectedTags.push(tag._id);
			}
		},
		isTagSelected(tag = null){
			if(tag == null) return false;
			return this.selectedTags.includes(tag._id);
		}
	}
};
</script>
