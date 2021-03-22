import Vue from "vue";
import Router from "vue-router";

import i18n from "./i18n";
import Store from "./data/store";
import { scrollToTop } from "./mixin";
import ROUTES from "./enums/router-enums";

// pages
import AuthPage from "./components/pages/AuthPage";
import AdminPage from "./components/pages/AdminPage";
import UserPage from "./components/pages/UserPage";
import ResumePage from "./components/pages/ResumePage";
import WipPage from "./components/pages/WipPage";

// views and other
import ExperiencesView from "./components/views/ExperiencesView";
import BioForm from "./components/forms/BioForm";
import ExperienceForm from "./components/forms/ExperienceForm";

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
					component: UserPage
				},
				{
					path: "resume",
					name: ROUTES.user.resume,
					component: ResumePage
				},
				{
					path: "auth",
					name: ROUTES.auth.login,
					component: AuthPage
				},
				{
					path: "admin",
					component: AdminPage,
					beforeEnter: checkAuthorized,
					children: [
						{
							path: "/",
							name: ROUTES.admin.profile,
							component: UserPage,
							props: { editMode: true }
						},
						{
							path: "bio",
							name: ROUTES.admin.bio,
							component: BioForm,
							props: { editMode: true }
						},
						{
							path: "experiences",
							name: ROUTES.admin.experiences,
							component: ExperiencesView,
							props: { editMode: true }
						},
						{
							path: "experiences/create",
							name: ROUTES.admin.experienceCreate,
							component: ExperienceForm,
							props: { editMode: false }
						},
						{
							path: "experiences/:title/update",
							name: ROUTES.admin.experienceUpdate,
							component: ExperienceForm,
							props: { default: true, editMode: true }
						}
					]
				},
				{
					path: "*",
					name: ROUTES.wip,
					component: WipPage
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
