import Vue from "vue";
import App from "./app.vue";
import Router from "./router";

import i18n from "./i18n";
import Bootstrap from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
require("./assets/css/fonts.css");
require("./assets/css/theme.css");

Vue.config.productionTip = false;

// plugins
Vue.use(Bootstrap);

new Vue({
	i18n,
	Router,
	render: (h) => h(App),
}).$mount("#app");
