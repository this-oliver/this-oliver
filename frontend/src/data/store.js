import Vue from "vue";
import Vuex from "vuex";

import Theme from "./module/theme";

Vue.use(Vuex);

const store = new Vuex.Store({
	modules: {
		theme: Theme
	}
});

export default store;
