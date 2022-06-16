<template>
	<base-card :path="getUrl">
		<v-row
			dense
			justify="start"
			justify-md="space-between">
			<!-- title -->
			<v-col
				cols="12"
				md="8">
				<h2>{{ article.title }}</h2>
			</v-col>
			<!-- date -->
			<v-col
				cols="12"
				md="3">
				<b>{{ getDate }}</b>
			</v-col>
			<!-- likes -->
			<v-col
				cols="auto"
				class="mx-1">
				{{ `👏 ${article.likes}` }}
			</v-col>
			<!-- views -->
			<v-col
				v-if="editMode"
				cols="auto"
				class="mx-1 mr-md-auto">
				{{ `🔎 ${article.views}` }}
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

		<template
			v-if="editMode"
			#left-side>
			<!-- publish flag -->
			<base-icon
				v-if="article.publish"
				icon="check_circle"
				color="success" />
			<base-icon
				v-else
				icon="remove_circle"
				color="warning" />
		</template>

		<template
			v-if="editMode"
			#right-side>
			<!-- actions -->
			<v-row justify="space-between">
				<v-col
					cols="auto"
					class="mx-1">
					<nuxt-link
						class="simple-link"
						:to="`/admin/articles/${article._id}/edit`">
						update
					</nuxt-link>
				</v-col>
				<v-col
					cols="auto"
					class="mx-1">
					<span
						class="red--text simple-link"
						@click="deleteArticle(article._id)">
						delete
					</span>
				</v-col>
			</v-row>
		</template>
	</base-card>
</template>

<script>
import { mapActions } from "vuex";
import { getDate } from "../../utils/time";
import BaseCard from "../base/BaseCard.vue";
import BaseIcon from "../base/BaseIcon.vue";

export default {
	name: "ArticleCard",
	components: {
		BaseCard,
		BaseIcon
	},
	props: {
		article: {
			type: Object,
			required: true
		},
		editMode: {
			type: Boolean,
			default: false
		}
	},
	computed: {
		getDate () {
			return getDate(this.article.createdAt);
		},
		getUrl () {
			return this.editMode === true ? `/admin/articles/${this.article._id}` : `/articles/${this.article._id}`;
		}
	},
	methods: {
		...mapActions({
			deleteArticle: "admin/articles/delete"
		})
	}
};
</script>
