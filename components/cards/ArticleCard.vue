<template>
	<div>
		<b-row>
			<b-col cols="1">
				<b-row>
					<b-col cols="12">
						<span class="card-title"> 📰 </span>
					</b-col>
					<b-col
						v-if="editMode"
						cols="12">
						<small>
							<span v-if="article.publish">
								👍
							</span>
							<span v-else>
								📝
							</span>
						</small>
					</b-col>
				</b-row>
			</b-col>
			<b-col cols="10">
				<b-row>
					<b-col cols="12">
						<a
							class="simple-link"
							@click="open">
							<b>{{ article.title }}</b>
						</a>
					</b-col>
					<b-col cols="12">
						<small>
							<b>
								{{ getTimeAgo }}
							</b>
						</small>
					</b-col>
					<b-col

						cols="11">
						<small>
							<span v-html="getContent" />
						</small>
					</b-col>
				</b-row>
			</b-col>
		</b-row>
		<!-- actions -->
		<b-row
			v-if="editMode"
			align-h="end">
			<b-col
				v-if="editMode"
				sm="auto"
				md="auto">
				<span
					class="simple-link"
					@click="update">
					Update
				</span>
			</b-col>
			<b-col
				v-if="editMode"
				sm="auto"
				md="auto">
				<span
					class="simple-link"
					@click="deleteArticle(article._id)">
					Delete
				</span>
			</b-col>
		</b-row>
	</div>
</template>

<script>
	import { mapActions } from "vuex";
	import { cleanMarkdown } from "../../middleware/markdown";
	import { getTimeAgo } from "../../middleware/time";
	export default {
		name: "ArticleCard",
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
				const MAX_LENGTH = 100;
				let content = this.article.content;

				if (content.length > MAX_LENGTH) {
					const MAX_WORDS = 15;
					const words = content.split(" ");
					let text = "";

					for (let i = 0; i < words.length; i++) {
						if (i > MAX_WORDS) { break; }

						const word = words[i];
						text = text + `${word} `;
					}

					content = `${text}...`;
				}

				return cleanMarkdown(content);
			},
			getTimeAgo () {
				return getTimeAgo(this.article.createdAt);
			}
		},
		methods: {
			...mapActions({
				deleteArticle: "user/article/deleteArticle"
			}),
			open () {
				this.$router.push(
					{
						name: this.ROUTES.user.articleSingle,
						params: {
							id: this.article._id,
							article: this.article
						}
					}
				);
			},
			update () {
				this.$router.push(
					{
						name: this.ROUTES.admin.articleUpdate,
						params: {
							id: this.article._id,
							article: this.article
						}
					}
				);
			}
		}
	};
</script>
