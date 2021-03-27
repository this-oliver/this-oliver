import Vue from "vue";
import Router from "vue-router";

import i18n from "./i18n";
import Store from "./data/store";
import { scrollToTop } from "./mixin";
import {handleLocale} from "./helpers/locale-helper";
import ROUTES from "./enums/router-enums";

// pages
import AuthPage from "./components/pages/AuthPage";
import AdminPage from "./components/pages/AdminPage";
import UserPage from "./components/pages/UserPage";
import ResumePage from "./components/pages/ResumePage";
import ArticlePage from "./components/pages/ArticlePage";
import MissingPage from "./components/pages/404Page";

// views
import ArticleListView from "./components/views/ArticleListView";
import ArticleView from "./components/views/ArticleView";

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
					path: "articles",
					component: ArticlePage,
					children: [
						{
							path: "/",
							name: ROUTES.user.articleList,
							component: ArticleListView,
							props: true
						},
						{
							path: ":id",
							name: ROUTES.user.articleSingle,
							component: ArticleView,
							props: true
						}
					]
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
