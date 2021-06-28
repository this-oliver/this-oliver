import Vue from "vue";
import { mapGetters } from "vuex";

export default Vue.mixin({
	computed: {
		...mapGetters({
			isDarkTheme: "theme/isDarkTheme",
			getTheme: "theme/getTheme",
			getBootstrapTheme: "theme/getBootstrapTheme",
			getBootstrapOutlineTheme: "theme/getBootstrapOutlineTheme",
			getOppositeBootstrapTheme: "theme/getOppositeBootstrapTheme",
			getOppositeBootstrapOutlineTheme: "theme/getOppositeBootstrapOutlineTheme"
		}),
		inAdminMode () {
			return false;
		}
	}
});
