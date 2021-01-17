import {mapGetters, mapMutations} from "vuex";
import Router from "./router";
/**
 * returns mixin
 */
export const mixin = {
	data: function() {
		return {};
	},
	computed: {
		...mapGetters({
			isDarkTheme: "theme/isDarkTheme",
			getTheme: "theme/getTheme",
			getBootstrapTheme: "theme/getBootstrapTheme",
			getBootstrapInverseTheme: "theme/getBootstrapInverseTheme"
		})
	},
	methods: {
		...mapMutations({
			toggleTheme: "theme/toggleTheme"
		}),
		goTo: function(routeName) {
			if (Router.currentRoute.name != routeName) {
				Router.push({
					name: routeName
				});
			}
		}
	}
};

/**
 * scrolls view to the top of screen if user enters sub-component
 */
export const scrollToTop = function() {
	window.scrollTo(0, 0);
};
