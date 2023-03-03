<template>
	<base-card v-if="skeletonMode">
		<v-skeleton-loader type="list-item-three-line" />
	</base-card>

	<base-card
		v-else
		:color-border="getCardBorderColor">
		<!-- hide link style -->
		<nuxt-link
			:to="`/articles/${article ? article.slug : '#'}`"
			class="article-link">
			<v-row
				dense
				justify="start">
				<!-- likes -->
				<v-col
					cols="2"
					class="mx-1">
					<b>{{ article.likes }}</b>
					likes
				</v-col>
				<!-- views -->
				<v-col
					v-if="editMode"
					cols="2"
					class="mx-1">
					<b>{{ article.views }}</b>
					views
				</v-col>
				<!-- title -->
				<v-col cols="12">
					<h2>{{ article.title }}</h2>
				</v-col>
				<!-- date -->
				<v-col
					cols="12"
					md="4">
					<b>{{ getDate }}</b>
				</v-col>
				<!-- tags -->
				<v-col
					v-if="article.tags.length"
					cols="12"
					md="auto"
					class="ml-md-auto">
					<v-chip
						v-for="tag in article.tags"
						:key="tag._id"
						small
						class="mr-1"
						:color="tag.color">
						{{ tag.name }}
					</v-chip>
				</v-col>
			</v-row>
		</nuxt-link>

		<v-divider
			v-if="editMode"
			class="my-2" />

		<v-row
			v-if="editMode"
			justify="space-between">
			<v-col
				cols="12"
				md="auto">
				<base-btn
					:block="true"
					:rounded="true"
					@click="setPublish(article.publish ? false : true)">
					<base-icon
						:icon="article.publish ? 'remove_circle' : 'check_circle'"
						:color="article.publish ? 'warning' : 'success'"
						class="mx-1" />
					{{ article.publish ? "Hide" : "Show" }}
				</base-btn>
			</v-col>
			<v-col
				cols="6"
				md="auto">
				<base-btn
					color="warning"
					:block="true"
					:rounded="true"
					:to="`/articles/${article._id}/edit`">
					update
				</base-btn>
			</v-col>
			<v-col
				cols="6"
				md="auto">
				<base-btn
					color="error"
					:block="true"
					:rounded="true"
					@click="deleteArticle(article._id)">
					delete
				</base-btn>
			</v-col>
		</v-row>
	</base-card>
</template>

<script>
import { mapActions } from "vuex";
import { getDate } from "../../utils/time";
import BaseBtn from "../base/BaseBtn.vue";
import BaseCard from "../base/BaseCard.vue";
import BaseIcon from "../base/BaseIcon.vue";

export default {
	name: "ArticleCard",
	components: {
		BaseCard,
		BaseIcon,
		BaseBtn
	},
	props: {
		article: {
			type: Object,
			required: true
		},
		editMode: {
			type: Boolean,
			default: false
		},
		skeletonMode: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			localArticle: this.article
		};
	},
	computed: {
		getArticle(){
			return this.localArticle;
		},
		getCardBorderColor () {
			if(this.editMode){
				return this.article.publish ? "green" : "orange";
			}
			return "";
		},
		getDate () {
			return this.skeletonMode
				? getDate()
				: getDate(this.article.createdAt);
		}
	},
	mounted(){
		this.localArticle = this.article;
	},
	methods: {
		...mapActions({
			patchArticle: "admin/articles/patch",
			deleteArticle: "admin/articles/delete"
		}),
		async setPublish (publish) {
			this.localArticle = await this.patchArticle({
				id: this.article._id,
				patch: { publish }
			});
		}
	}
};
</script>

<style scoped>
.article-link {
	text-decoration: none;
	/* remove blue color */
	color: inherit;
}
</style>
