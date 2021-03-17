import Vue from "vue";
import Router from "vue-router";

import I18n from "./I18n";
import { ROUTES, handleLocale } from "./helpers/router-helper";
import { scrollToTop } from "./mixin";

// pages
import LandingPage from "./pages/LandingPage";
import ResumePage from "./pages/ResumePage";
import UserPage from "./pages/UserPage";
import WipPage from "./components/WipCard";

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
					path: "admin",
					name: ROUTES.admin.profile,
					component: UserPage,
				},
				{
					path: "*",
					name: ROUTES.wip,
					component: WipPage
				},
			]
		}
	]
});

router.beforeEach((to, from, next) => {
	scrollToTop();
	handleLocale(to, from, next);
});

export default router;
