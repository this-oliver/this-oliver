<template>
  <div>
    <b-row>
      <b-col cols="1">
        <span class="sub-header"> 📰 </span>
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
          <b-col cols="11">
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
          {{ $t("form.actions.update") }}
        </span>
      </b-col>
      <b-col
        v-if="editMode"
        sm="auto"
        md="auto">
        <span
          class="simple-link"
          @click="deleteArticle(article._id)">
          {{ $t("form.actions.delete") }}
        </span>
      </b-col>
    </b-row>
  </div>
</template>

<script>
	import { mapActions } from "vuex";
	import { getTimeAgo } from "../../helpers/time-helper";
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
			},
		},
		computed: {
			getContent: function() {
				const MAX_LENGTH = 50;
				let content = this.article.content;
				
				if(content.length > MAX_LENGTH){
					content = content.substring(0, MAX_LENGTH);
				}
				
				content = content.replace("\n\n", " ");

				return content;
			},
			getTimeAgo: function(){
				return getTimeAgo(this.article.createdAt);
			}
		},
		methods:{
			...mapActions({
				deleteArticle: "user/article/deleteArticle"
			}),
			open: function(){
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
			update: function(){
				this.$router.push(
					{ 
						name: this.ROUTES.admin.articleUpdate, 
						params: { 
							title: this.article.title.replaceAll(" ", "-"),
							article: this.article
						}
					}
				);
			},
		}
	};
</script>
