<template>
  <div>
    <b-row>
      <b-col cols="1">
        📁
      </b-col>
      <b-col cols="10">
        <b-row>
          <b-col cols="12">
            <b>{{ job.title }}</b>
          </b-col>
          <b-col cols="12">
            <small>
              <b>
                {{ `${job.org} (${job.startYear}-${getEndYear})` }}
              </b>
            </small>
          </b-col>
          <b-col cols="12">
            <small>
              ->
              <span v-html="getDescription" />
            </small>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
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
    </b-row>
  </div>
</template>

<script>
	import i18n from "../../i18n";
	import { getMarkdown } from "../../helpers/markdown-helper";
	export default {
		name: "JobCard",
		props: {
			job: {
				type: Object,
				required: true
			},
			editMode: {
				type: Boolean,
				default: false
			},
			shortMode: {
				type: Boolean,
				default: true
			}
		},
		computed: {
			getDescription: function() {
				const MAX_LENGTH = 40;
				let description = this.job.description;

				if (this.shortMode == true) {
					let shortDescription = description.substr(0, MAX_LENGTH);
					return `${shortDescription}...`;
				} else {
					return getMarkdown(description);
				}
			},
			getEndYear: function() {
				let endYear = this.job.endYear;
				return endYear ? endYear : i18n.t("cards.job.presentYear");
			}
		},
		methods:{
			update: function(){
				this.$router.push(
					{ 
						name: this.ROUTES.admin.experienceUpdate, 
						params: { 
							title: this.job.title.replaceAll(" ", "-"),
							experience: this.job
						}
					}
				);
			}
		}
	};
</script>
