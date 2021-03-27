import {setCache, getCache} from "../../helpers/cache-helper";

const CACHED_THEME = "CACHED_THEME";

const namespaced = true;

const state = {
	darkTheme: getCache(CACHED_THEME) || false
};

const getters = {
	isDarkTheme: state => {
		return state.darkTheme;
	},
	getTheme: state => {
		return state.darkTheme ? "dark-theme" : "light-theme";
	},
	getBootstrapTheme: state => {
		return state.darkTheme ? "dark" : "light";
	},
	getOppositeBootstrapTheme: state => {
		return state.darkTheme ? "light" : "dark";
	},
	getBootstrapOutlineTheme: state => {
		return state.darkTheme ? "outline-light" : "outline-dark";
	},
	getOppositeBootstrapOutlineTheme: state => {
		return state.darkTheme ? "outline-dark" : "outline-light";
	}
};

const mutations = {
	toggleTheme: (state) =>{
		state.darkTheme = !state.darkTheme;
		setCache(CACHED_THEME, state.darkTheme);
	}
};

const actions = {
	toggleTheme: context => {
		context.dispatch("toggleTheme");
	}
};

export default {
	namespaced,
	state,
	getters,
	mutations,
	actions
};
