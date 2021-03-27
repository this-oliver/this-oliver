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
import MissingPage from "./components/pages/404Page";

// forms
import ArticleForm from "./components/forms/ArticleForm";
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
					path: "auth/login",
					name: ROUTES.auth.login,
					component: AuthPage
				},
				{
					path: "auth/register",
					name: ROUTES.auth.register,
					component: AuthPage,
					props: { registerMode: true }
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
						},
						{
							path: "articles/create",
							name: ROUTES.admin.articleCreate,
							component: ArticleForm,
							props: { editMode: false }
						},
						{
							path: "articles/:title/update",
							name: ROUTES.admin.articleUpdate,
							component: ArticleForm,
							props: { default: true, editMode: true }
						}
					]
				},
				{
					path: "*",
					name: ROUTES.missing,
					component: MissingPage
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
		name: ROUTES.missing
	};

	let LoginPage = {
		name: ROUTES.auth.login
	};

	for (let i = 0; i < matched.length; i++) {
		
		let route = matched[i];
		if (route.components.default.name === "AdminPage") {
			adminMode = true;
		}
	}

	try {
		let isAuthenticated = await Store.dispatch("auth/authenticate");
		let hasAccess = Store.getters["auth/getLoginStatus"];

		if (adminMode === true) {
			if (isAuthenticated === true && hasAccess === true) {
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
