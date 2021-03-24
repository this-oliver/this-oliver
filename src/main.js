import Vue from "vue";
import App from "./App.vue";
import Router from "./router";
import Store from "./data/store";
import {mixin} from "./mixin";

import Axios from "axios";
import VueAxios from "vue-axios";

import i18n from "./i18n";
import Bootstrap from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
require("./assets/css/app.css");
require("./assets/css/fonts.css");
require("./assets/css/themes.css");

Vue.config.productionTip = false;

// plugins and mixins
Vue.use(Bootstrap);
Vue.mixin(mixin);

// api - axios
Axios.defaults.baseURL = process.env.VUE_APP_API_URL;
Vue.use(VueAxios, Axios);

const vm = new Vue({
	i18n: i18n,
	store: Store,
	router: Router,
	render: h => h(App)
}).$mount("#app");

/**
 * 
 * @returns Vue instance
 */
export let getVm = () => {
	return vm;
};
