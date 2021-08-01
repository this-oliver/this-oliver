<template>
	<div class="clickable" @click="goToArticle">
		<b-card>
			<!-- title -->
			<b-row>
				<b-col cols="auto">
					<small v-if="editMode">
						<span v-if="article.publish">
							<check-circle variant="success" />
						</span>
						<span v-else>
							<dash-circle variant="warning" />
						</span>
					</small>
					<b>{{ article.title }}</b>
				</b-col>
			</b-row>
			<!-- date -->
			<b-row>
				<b-col cols="auto">
					<small>
						<b>
							{{ getTimeAgo }}
						</b>
					</small>
				</b-col>
			</b-row>
			<!-- content -->
			<b-row>
				<b-col cols="auto">
					<small>
						<!-- eslint-disable-next-line vue/no-v-html -->
						<span v-html="getContent" />
					</small>
				</b-col>
			</b-row>
			<template #footer>
				<b-row :align-h="editMode ? 'between' : 'end'">
					<b-col sm="12" md="auto">
						<!-- views and likes -->
						<b-row>
							<b-col cols="auto" class="mx-1">
								<small>
									👏 {{ article.likes }}
								</small>
							</b-col>
							<b-col v-if="adminMode" cols="auto" class="mx-1">
								<small>
									🔎 {{ article.views }}
								</small>
							</b-col>
						</b-row>
					</b-col>
					<b-col sm="12" md="auto">
						<!-- actions -->
						<b-row v-if="editMode">
							<b-col class="mx-1" cols="auto">
								<nuxt-link class="simple-link" :to="`/admin/articles/${article._id}/update`">
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
		</b-card>
	</div>
</template>

<script>
	import { mapActions } from "vuex";
	import { BIconCheckCircleFill, BIconDashCircleFill } from "bootstrap-vue";
	import { getTimeAgo } from "../../utils/time";
	import { getTextDescription } from "../../utils/string";
	import { cleanMarkdown } from "../../utils/markdown";

	export default {
		name: "ArticleCard",
		components: {
			"check-circle": BIconCheckCircleFill,
			"dash-circle": BIconDashCircleFill
		},
		props: {
			article: {
				type: Object,
				required: true
			},
			adminMode: {
				type: Boolean,
				default: false
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
			getTimeAgo () {
				return getTimeAgo(this.article.createdAt);
			}
		},
		methods: {
			...mapActions({
				deleteArticle: "admin/articles/delete"
			}),
			goToArticle () {
				const url = this.editMode === true ? `/admin/articles/${this.article._id}` : `/articles/${this.article._id}`;
				this.$router.push(url);
			}
		}
	};
</script>
