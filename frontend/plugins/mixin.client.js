import Vue from "vue";
import { mapGetters } from "vuex";

if (!Vue._GLOBAL_MIXIN_) {
	Vue._GLOBAL_MIXIN_ = true;

	Vue.mixin({
		computed: {
			...mapGetters({
				isDarkMode: "app/theme/isDarkMode"
			}),
			// screen size
			isScreenMobile() { return this.$vuetify.breakpoint.name === "xs"; },
			isScreenTablet() { return this.$vuetify.breakpoint.name === "sm"; },
			isScreenDesktop() { return this.$vuetify.breakpoint.name === "md" || this.$vuetify.breakpoint.name === "lg"; }
		}
	});
}
