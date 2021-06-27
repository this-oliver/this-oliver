export const state = () => {
	return {
		darkTheme: false
	};
};

export const getters = {
	isDarkTheme: (state) => {
		return state.darkTheme;
	},
	getTheme: (state) => {
		return state.darkTheme ? "dark-theme" : "light-theme";
	},
	getBootstrapTheme: (state) => {
		return state.darkTheme ? "dark" : "light";
	},
	getOppositeBootstrapTheme: (state) => {
		return state.darkTheme ? "light" : "dark";
	},
	getBootstrapOutlineTheme: (state) => {
		return state.darkTheme ? "outline-light" : "outline-dark";
	},
	getOppositeBootstrapOutlineTheme: (state) => {
		return state.darkTheme ? "outline-dark" : "outline-light";
	}
};

export const mutations = {
	setTheme: (state, isDarkTheme) => {
		state.darkTheme = isDarkTheme;
	},
	toggleTheme: (state) => {
		state.darkTheme = !state.darkTheme;
	}
};
