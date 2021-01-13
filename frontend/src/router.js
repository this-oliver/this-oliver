import Vue from "vue";
import Router from "vue-router";

import I18n from "./I18n";
import { ROUTES, handleLocale } from "./helpers/router-helper";
import { scrollToTop } from "./helpers/mixins";

import Landing from "./components/landing";

Vue.use(Router);

const router = new Router({
	mode: "history",
	routes: [
		{
			path: "/",
			redirect: `/${I18n.locale}`
		},
		{
			path: "/:locale",
			props: true,
			beforeEnter: handleLocale,
			component: {
				render(c) {
					return c("router-view");
				}
			},
			children: [
				{
					path: "",
					name: ROUTES.landing,
					component: Landing
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
