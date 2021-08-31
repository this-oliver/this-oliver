<template>
	<div>
		<base-card :path="getUrl">
			<!-- title -->
			<b-row align-h="between">
				<b-col cols="auto">
					<b>{{ article.title }}</b>
				</b-col>
				<!-- publish flag -->
				<b-col v-if="editMode" cols="auto">
					<span v-if="article.publish">
						<check-circle variant="success" />
					</span>
					<span v-else>
						<dash-circle variant="warning" />
					</span>
				</b-col>
			</b-row>
			<!-- date -->
			<b-row>
				<b-col cols="auto">
					<small>
						<b-badge variant="primary"> {{ getDate }} </b-badge>
					</small>
				</b-col>
			</b-row>
			<!-- tags -->
			<b-row>
				<b-col cols="auto">
					<small>
						<b-badge v-for="tag in article.tags" :key="tag" class="mr-1"> {{ tag.name }} </b-badge>
					</small>
				</b-col>
			</b-row>
			<!-- tags -->
			<small>
				<b-badge v-for="tag in article.tags" :key="tag" class="mx-1"> {{ tag.name }} </b-badge>
			</small>
			<!-- content -->
			<b-row>
				<b-col cols="auto">
					<small>
						<!-- eslint-disable-next-line vue/no-v-html -->
						<span v-html="getContent" />
					</small>
				</b-col>
			</b-row>
			<!-- footer -->
			<template #footer>
				<b-row align-h="between">
					<!-- views and likes -->
					<b-col sm="12" md="auto">
						<b-row>
							<b-col cols="auto" class="mx-1">
								<small>
									👏 {{ article.likes }}
								</small>
							</b-col>
							<b-col v-if="editMode" cols="auto" class="mx-1">
								<small>
									🔎 {{ article.views }}
								</small>
							</b-col>
						</b-row>
					</b-col>
					<!-- actions -->
					<b-col v-if="editMode" sm="12" md="auto">
						<b-row>
							<b-col class="mx-1" cols="auto">
								<nuxt-link class="simple-link" :to="`/admin/articles/${article._id}/edit`">
									update
								</nuxt-link>
							</b-col>
							<b-col class="mx-1" cols="auto">
								<span class="red-text simple-link" @click="deleteArticle(article._id)">
									delete
								</span>
							</b-col>
						</b-row>
					</b-col>
				</b-row>
			</template>
		</base-card>
	</div>
</template>

<script>
	import { mapActions } from "vuex";
	import { BIconCheckCircleFill, BIconDashCircleFill } from "bootstrap-vue";
	import BaseCardVue from "../base/BaseCard.vue";
	import { getDate } from "../../utils/time";
	import { getTextDescription } from "../../utils/string";
	import { cleanMarkdown } from "../../utils/markdown";

	export default {
		name: "ArticleCard",
		components: {
			"base-card": BaseCardVue,
			"check-circle": BIconCheckCircleFill,
			"dash-circle": BIconDashCircleFill
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
			getContent () {
				const content = `${getTextDescription(this.article.content)}...`;
				return cleanMarkdown(content);
			},
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
