const namespaced = true;

const state = {
	darkTheme: false
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
