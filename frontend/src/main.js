import Vue from "vue";
import App from "./App.vue";
import Router from "./router";

import I18n from "./I18n";
import Bootstrap from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
require("./assets/css/app.css");
require("./assets/css/fonts.css");
require("./assets/css/themes.css");
import {mixin} from "./mixin";

Vue.config.productionTip = false;

// plugins
Vue.use(Bootstrap);

//mixins
Vue.mixin(mixin);

new Vue({
	i18n: I18n,
	router: Router,
	render: h => h(App)
}).$mount("#app");
