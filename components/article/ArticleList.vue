<template>
	<v-row>
		<!-- tags -->
		<v-col
			cols="12"
			md="2"
			order="2"
			order-md="1">
			<v-row v-if="!loading">
				<v-col
					v-if="tags.length > 0"
					cols="auto"
					md="6"
					class="text-center">
					<base-btn
						v-for="tag in tags"
						:key="tag._id"
						:color="tag.color"
						:text="selectedTags.length > 0 && !isTagSelected(tag)"
						:elevation="selectedTags.length > 0 && !isTagSelected(tag) ? 1 : 0"
						rounded
						class="ma-1"
						@click="selectTag(tag)">
						{{ tag.name }}
					</base-btn>
				</v-col>
			</v-row>
		</v-col>

		<!-- articles -->
		<v-col
			cols="12"
			md="8"
			order="1"
			order-md="2">
			<v-row>
				<v-col
					v-if="loading"
					:cols="cardCol"
					:md="cardColMd">
					<article-card
						v-for="skeleton in [0,1,2,3,4, 5]"
						:key="skeleton"
						:article="{}"
						:skeleton-mode="true" />
				</v-col>

				<v-col
					v-else-if="articles.length <= 0"
					cols="auto"
					class="mx-auto text-center">
					Nothing here at the moment...
				</v-col>

				<v-col
					v-else
					:cols="cardCol"
					:md="cardColMd">
					<article-card
						v-for="article in getArticles"
						:key="article._id"
						:article="article"
						:edit-mode="editMode" />
				</v-col>
			</v-row>
		</v-col>
	</v-row>
</template>

<script>
import ArticleCard from "~/components/article/ArticleCard.vue";
import BaseBtn from "../base/BaseBtn.vue";

export default {
	name: "ArticleList",
	components: {
		ArticleCard,
		BaseBtn
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
			cardCol: "12",
			cardColMd: "12",
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
