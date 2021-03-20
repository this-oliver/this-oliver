import Vue from "vue";
import Router from "vue-router";

import I18n from "./I18n";
import {scrollToTop} from "./mixin";
import { ROUTES, checkAuthorized, handleLocale } from "./helpers/router-helper";

// pages
import LandingPage from "./pages/LandingPage";
import ResumePage from "./pages/ResumePage";
import UserPage from "./pages/UserPage";
import AuthPage from "./pages/AuthPage";

// components
import LoginForm from "./components/LoginForm";
import UserForm from "./components/UserForm";
import WipCard from "./components/WipCard";

Vue.use(Router);

const router = new Router({
	mode: "history",
	routes: [
		{
			path: "/",
			redirect: `/${I18n.locale}`
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
					path: "auth",
					component: AuthPage,
					children: [
						{
							path: "/",
							name: ROUTES.auth.login,
							component: LoginForm
						}
					]
				},
				{
					path: "admin",
					component: UserPage,
					beforeEnter: checkAuthorized,
					children: [
						{
							path: "/",
							name: ROUTES.admin.profile,
							component: UserForm,
							props: { editMode: true }
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

export default router;
