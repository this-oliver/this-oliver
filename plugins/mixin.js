import Vue from "vue";
import { mapGetters } from "vuex";

if (!Vue._GLOBAL_MIXIN_) {
	Vue._GLOBAL_MIXIN_ = true;

	Vue.mixin({
		computed: {
			...mapGetters({
				isDarkTheme: "base/ui/isDarkTheme",
				getTheme: "base/ui/getTheme",
				getBootstrapTheme: "base/ui/getBootstrapTheme",
				getBootstrapOutlineTheme: "base/ui/getBootstrapOutlineTheme",
				getOppositeBootstrapTheme: "base/ui/getOppositeBootstrapTheme",
				getOppositeBootstrapOutlineTheme: "base/ui/getOppositeBootstrapOutlineTheme"
			}),
			inAdminMode () {
				return false;
			}
		}
	});
}
