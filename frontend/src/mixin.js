import Router from "./router";
import {mapGetters, mapMutations} from "vuex";

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
			getBootstrapInverseTheme: "theme/getBootstrapInverseTheme"
		})
	},
	methods: {
		...mapMutations({
			toggleTheme: "theme/toggleTheme"
		}),
		goTo,
		scrollToTop,
		toastAnnouncement, 
		toastSuccess,
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
 * 
 * @param {String} title 
 * @param {String} message 
 * @param {Date} time 
 */
export function toastAnnouncement(title, message, time) {
	// Use a shorter name for this.$createElement
	const h = this.$createElement;
	const elementId = "ANNOUNCEMENT-TOAST";

	// Create the message
	const messageNode = h("div", [h("p", { class: "mr-2" }, message)]);

	// Create the title
	const titleNode = h(
		"div",
		{
			class: ["d-flex", "flex-grow-1", "align-items-baseline", "mr-2"]
		},
		[
			h("strong", { class: "mr-2" }, `📬 ${title}`),
			h("small", { class: "ml-auto text-italics" }, time)
		]
	);

	this.$bvToast.toast([messageNode], {
		id: elementId,
		title: titleNode,
		solid: true,
		variant: "dark",
		noAutoHide: true,
		appendToast: true,
		toaster: "b-toaster-bottom-full"
	});
}

/**
 * Toasts success
 * @param {String} title 
 * @param {String} message 
 */
export function toastSuccess(title, message) {
	this.$bvToast.toast(message, {
		title: title,
		solid: true,
		autoHideDelay: 5000,
		variant: "success",
		toaster: "b-toaster-top-center"
	});
}

/**
 * Toasts error
 * @param {String} title 
 * @param {String} message 
 */
export function toastError(title, message) {
	this.$root.$bvToast.toast(message, {
		title: title,
		solid: true,
		autoHideDelay: 5000,
		variant: "danger",
		toaster: "b-toaster-bottom-center"
	});
}
