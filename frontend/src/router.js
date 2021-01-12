import Vue from "vue";
import Router from "vue-router";

import I18n from "./locale";
import { ROUTES, handleLocale } from "./helpers/router-helper";
import { scrollToTop } from "./helpers/mixins";

Vue.use(Router);

const router = new Router({
	routes: [
		{
			path: "/",
			redirect: `/${I18n.locale}`,
		},
		{
			path: "/:locale",
			props: true,
			beforeEnter: handleLocale,
			component: {
				render(c) {
					return c("router-view");
				},
			},
			children: [],
		},
	],
});

router.beforeEach((to, from, next) => {
	handleLocale(to, from, next);
	scrollToTop();
});

export default router;
