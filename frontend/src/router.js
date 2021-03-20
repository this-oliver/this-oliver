import Vue from "vue";
import Router from "vue-router";

import i18n from "./i18n";
import Store from "./data/store";
import {scrollToTop} from "./mixin";
import ROUTES from "./enums/router-enums";

// pages
import AuthPage from "./pages/AuthPage";
import AdminPage from "./pages/AdminPage";
import LandingPage from "./pages/LandingPage";
import ResumePage from "./pages/ResumePage";
import UserPage from "./pages/UserPage";

// components
import WipCard from "./components/cards/WipCard";

Vue.use(Router);

const router = new Router({
	mode: "history",
	routes: [
		{
			path: "/",
			redirect: `/${i18n.locale}`
		},
		{
			path: "/:locale/",
			props: true,
			beforeEnter: handleLocale,
			component: {
				render(c) {
					return c("router-view");
				}
			},
			children: [
				{
					path: "/",
					name: ROUTES.user.landing,
					component: LandingPage
				},
				{
					path: "resume",
					name: ROUTES.user.resume,
					component: ResumePage
				},
				{
					path: "admin",
					component: AdminPage,
					children: [
						{
							path: "/",
							name: ROUTES.auth.login,
							component: AuthPage
						},
						{
							path: "profile",
							name: ROUTES.admin.profile,
							component: UserPage,
							beforeEnter: checkAuthorized
						}
					]
				},
				{
					path: "*",
					name: ROUTES.wip,
					component: WipCard
				}
			]
		}
	]
});

router.beforeEach((to, from, next) => {
	scrollToTop();
	handleLocale(to, from, next);
});

// router helpers
/**
 * handles user locale
 * @param {*} to
 * @param {*} from
 * @param {*} next
 */
function handleLocale(to, from, next) {
	let language = to.params.locale;

	if (!language) language = process.env.VUE_APP_i18n_FALLBACK_LOCALE;

	// checks if lang param is valid
	let validLocaleFlag = false;
	i18n.availableLocales.forEach(locale => {
		if (locale == language) {
			validLocaleFlag = true;
			return;
		}
	});

	//if lang param is invalid, set it to locale and continue routing
	if (!validLocaleFlag) {
		let params = to.params;
		params.locale = process.env.VUE_APP_i18n_LOCALE || i18n.locale;
		return next({ name: to.name, params: params });
	} else {
		i18n.locale = language;
		return next({ params: { locale: i18n.locale } });
	}
}

/**
 * checks whether user is authorized
 * @param {*} to 
 * @param {*} from 
 * @param {*} next
 */
async function checkAuthorized(to, from, next) {
	/* if client is going to business side, make sure 
	they have business access priveleges or higher and 
	the same for admin side*/

	let matched = to.matched;
	let adminMode = false;

	let WildCard = {
		name: ROUTES.wip
	};
	let LoginPage = {
		name: ROUTES.auth.login
	};

	for (let i = 0; i < matched.length; i++) {
		let route = matched[i];

		if (route.components.default.name === "UserPage") {
			adminMode = true;
			break;
		}
	}

	try {
		let hasAccess = Store.getters["auth/getLoginStatus"];
		let authenticated = await Store.dispatch("auth/authenticate");

		if (adminMode === true) {
			if (authenticated === true && hasAccess === true) {
				return next();
			} else {
				await Store.dispatch("auth/logout");
				return next(LoginPage);
			}
		}

		return next(WildCard);
	} catch (error) {
		next(WildCard);
	}
}


export default router;
