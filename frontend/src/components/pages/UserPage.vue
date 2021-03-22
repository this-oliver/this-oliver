<template>
  <div>
    <b-row align-h="center">
      <b-col
        class="mt-3"
        sm="11"
        md="8">
        <about-me-view
          :user="user"
          :edit-mode="editMode" />
      </b-col>
      <b-col
        class="mt-3"
        sm="11"
        md="8">
        <experiences
          :edit-mode="editMode"
          :educations="educations"
          :jobs="jobs" />
      </b-col>
    </b-row>
  </div>
</template>

<script>
	import { mapGetters } from "vuex";
	import ROUTES from "../../enums/router-enums";

	import AboutMeViewVue from "../views/AboutMeView.vue";
	import ExperiencesViewVue from "../views/ExperiencesView.vue";

	export default {
		name: "UserPage",
		components: {
			"about-me-view": AboutMeViewVue,
			"experiences": ExperiencesViewVue
		},
		props: {
			editMode: {
				type: Boolean,
				default: false
			}
		},
		computed: {
			...mapGetters({
				user: "user/getUser",
				jobs: "user/getJobs",
				educations: "user/getEducations",
				isDarkTheme: "theme/isDarkTheme"
			})
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
