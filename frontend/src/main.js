import Vue from "vue";
import App from "./App.vue";
import Router from "./router";

import I18n from "./I18n";
import Bootstrap from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
require("./assets/css/app.css");
require("./assets/css/fonts.css");
require("./assets/css/theme.css");

Vue.config.productionTip = false;

// plugins
Vue.use(Bootstrap);

new Vue({
	I18n,
	router: Router,
	render: h => h(App)
}).$mount("#app");
