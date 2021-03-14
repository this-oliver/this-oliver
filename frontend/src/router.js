import Vue from "vue";
import Router from "vue-router";

import I18n from "./I18n";
import { ROUTES, handleLocale } from "./helpers/router-helper";
import { scrollToTop } from "./mixin";

// public
import Landing from "./components/public/landing";
import Resume from "./components/public/resume";

import WorkInProgress from "./components/wip-card";

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
					name: ROUTES.landing,
					component: Landing
				},
				{
					path: "resume",
					name: ROUTES.resume,
					component: Resume
				},
				{
					path: "wip",
					name: ROUTES.wip,
					component: WorkInProgress
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
