<template>
  <div>
    <b-row align-h="around">
      <b-col
        class="mt-3"
        sm="11"
        md="6">
        <span class="sub-header">{{ $t("landingPage.about") }}</span>
        <b-row>
          <b-col cols="12">
            <bio-card
              :short="user.bio.short"
              :long="user.bio.long" />
          </b-col>
        </b-row>
      </b-col>
      <b-col
        class="mt-3"
        sm="11"
        md="4">
        <b-row>
          <!-- work -->
          <b-col cols="12">
            <span class="sub-header mb-2">{{ $t("landingPage.work") }}</span>
            <b-row>
              <b-col
                cols="12"
                v-for="job in jobs"
                :key="job.title">
                <job-card
                  class="mt-1"
                  :title="job.title"
                  :org="job.org"
                  :start-year="job.startYear"
                  :end-year="job.endYear"
                  :description="job.description"
                  :short-mode="true" />
              </b-col>
            </b-row>
          </b-col>
          <!-- education -->
          <b-col
            class="mt-3"
            cols="12">
            <span class="sub-header mb-2">{{ $t("landingPage.education") }}</span>
            <b-row>
              <b-col
                cols="12"
                v-for="education in educations"
                :key="education.title">
                <education-card
                  class="mt-1"
                  :title="education.title"
                  :org="education.org"
                  :start-year="education.startYear"
                  :end-year="education.endYear"
                  :description="education.description"
                  :short-mode="true" />
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </div>
</template>

<script>
	import BioCardVue from "../components/cards/BioCard.vue";
	import EducationCardVue from "../components/cards/EducationCard.vue";
	import JobCardVue from "../components/cards/JobCard.vue";

	import { mapGetters } from "vuex";
	import ROUTES from "../enums/router-enums";

	export default {
		name: "LandingPage",
		components:{
			"bio-card": BioCardVue,
			"education-card":EducationCardVue,
			"job-card":JobCardVue
		},
		computed: {
			...mapGetters({
				user: "user/getUser",
				jobs: "user/getJobs",
				educations: "user/getEducations",
				isDarkTheme: "theme/isDarkTheme",
			}),
		},
		methods: {
			goToResume: function() {
				this.goTo(ROUTES.user.resume);
			},
			getActiveVariant: function(variant) {
				let removeOutline = variant.substring(8, variant.length);
				return removeOutline;
			}
		}
	};
</script>

<style>
.bio-text {
	text-align: justify;
}
</style>
