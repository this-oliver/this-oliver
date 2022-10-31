<template>
	<v-row justify="center">
		<v-col
			cols="12"
			md="8">
			<v-row
				justify="center"
				align="baseline">
				<v-col
					cols="8"
					md="10">
					<input-text
						v-model="searchString"
						label="search"
						:dense="true" />
				</v-col>
				<v-col cols="2">
					<base-btn
						:rounded="true"
						:dark="!showFilters"
						:light="showFilters"
						:small="isSmallScreen"
						@click="showFilters = !showFilters">
						filter
					</base-btn>
				</v-col>
			</v-row>
		</v-col>

		<!-- tags -->
		<v-col
			v-if="showFilters && tags.length > 0 && !loading"
			cols="12"
			md="8">
			<base-btn
				v-for="tag in tags"
				:key="tag._id"
				:color="tag.color"
				:text="selectedTags.length > 0 && !isTagSelected(tag)"
				:elevation="selectedTags.length > 0 && !isTagSelected(tag) ? 1 : 0"
				rounded
				class="ma-1 text-center"
				@click="selectTag(tag)">
				{{ tag.name }}
			</base-btn>
		</v-col>

		<!-- articles -->
		<v-col
			cols="12"
			md="8">
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
					v-else-if="articles.length > 0"
					:cols="cardCol"
					:md="cardColMd">
					<article-card
						v-for="article in getArticles"
						:key="article._id"
						:article="article"
						:edit-mode="editMode" />
				</v-col>

				<v-col
					v-else
					cols="auto"
					class="mx-auto text-center">
					Nothing here at the moment...
				</v-col>
			</v-row>
		</v-col>
	</v-row>
</template>

<script>
import ArticleCard from "~/components/article/ArticleCard.vue";
import BaseBtn from "../base/BaseBtn.vue";
import InputText from "../base/InputText.vue";

export default {
	name: "ArticleList",
	components: {
		ArticleCard,
		BaseBtn,
		InputText
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
			searchString: null,
			selectedTags: [],
			showFilters: false
		};
	},
	computed: {
		getArticles(){
			const searchString = this.searchString;
			const selectedTags = this.selectedTags;

			if(searchString && searchString.trim().length > 0){
				// search by title
				return this.articles.filter(article => {
					return article.title.toLowerCase().includes(searchString.toLowerCase());
				});
			}
			else if (selectedTags.length > 0){
				// search by tags
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
			else {
				return this.articles;
			}
		},
		isSmallScreen(){
			return this.$vuetify.breakpoint.smAndDown;
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
