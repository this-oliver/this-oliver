import { getVm } from "./main";
import Router from "./router";
import {mapActions, mapGetters} from "vuex";

import ROUTES from "./enums/router-enums";

/**
 * returns mixin
 */
export const mixin = {
	data: function() {
		return {
			ROUTES: ROUTES
		};
	},
	computed: {
		...mapGetters({
			isDarkTheme: "theme/isDarkTheme",
			getTheme: "theme/getTheme",
			getBootstrapTheme: "theme/getBootstrapTheme",
			getBootstrapOutlineTheme: "theme/getBootstrapOutlineTheme",
			getOppositeBootstrapTheme: "theme/getOppositeBootstrapTheme",
			getOppositeBootstrapOutlineTheme:
								"theme/getOppositeBootstrapOutlineTheme"
		}),
		adminMode: function() {
			return this.$route.path.includes(
				`${this.$i18n.locale}/admin/`
			);
		},
	},
	methods: {
		...mapActions({
			toggleTheme: "theme/toggleTheme"
		}),
		goTo,
		scrollToTop,
		toastError
	}
};

/**
 * scrolls view to the top of screen if user enters sub-component
 */
export function scrollToTop() {
	window.scrollTo(0, 0);
}

/**
 * pushes router to route with routename
 * @param {String} routeName 
 */
export function goTo(routeName) {
	if (Router.currentRoute.name != routeName) {
		Router.push({
			name: routeName
		});
	}
}

/**
 * Toasts error
 * @param {String} title 
 * @param {String} message 
 */
export function toastError(title, message) {
	getVm().$root.$bvToast.toast(message, {
		title: title,
		solid: true,
		autoHideDelay: 5000,
		variant: "danger",
		toaster: "b-toaster-bottom-center"
	});
}
