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
          :xp-list="xpList"
          :edit-mode="editMode" />
      </b-col>
    </b-row>
  </div>
</template>

<script>
	import { mapGetters } from "vuex";

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
				xpList: "user/getXp",
				isDarkTheme: "theme/isDarkTheme"
			})
		},
	};
</script>
