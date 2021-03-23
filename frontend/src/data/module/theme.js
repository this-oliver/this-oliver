import {setCache, getCache} from "../../helpers/cache-helper";

const CACHED_THEME = "CACHED_THEME";

const namespaced = true;

const state = {
	darkTheme: getCache(CACHED_THEME) || false
};

const getters = {
	isDarkTheme: state =>{
		return state.darkTheme;
	},
	getTheme: state => {
		return state.darkTheme ? "dark-theme" : "light-theme";
	},
	getBootstrapTheme: state => {
		return state.darkTheme ? "dark" : "light";
	},
	getBootstrapInverseTheme: state => {
		return state.darkTheme ? "outline-light" : "outline-dark";
	}
};

const mutations = {
	toggleTheme: (state) =>{
		state.darkTheme = !state.darkTheme;
		setCache(CACHED_THEME, state);
	}
};

const actions = {};

export default {
	namespaced,
	state,
	getters,
	mutations,
	actions
};
