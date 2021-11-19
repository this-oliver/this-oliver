//! TODO: setup gdpr compliance with cookies (source: https://www.carlcassar.com/articles/add-google-analytics-to-a-nuxt-js-app )

import Vue from "vue";
import VueGtag from "vue-gtag";

const ENV = process.env.NODE_ENV;
const GOOGLE_ANALYTICS = process.env.VUE_APP_GOOGLE_ANALYTICS;

if (!GOOGLE_ANALYTICS) {
	throw new Error(
		"(.env) Enviromental variable 'VUE_APP_GOOGLE_ANALYTICS' is not defined"
	);
}

Vue.use(VueGtag, {
	config: { id: GOOGLE_ANALYTICS },
	enabled: ENV === "production"
});
