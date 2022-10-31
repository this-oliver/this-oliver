export const state = function () {
	return {
		darkMode: false
	};
};

export const getters = {
	isDarkMode (state) {
		return state.darkMode;
	}
};

export const mutations = {
	setDarkMode (state, darkMode) {
		state.darkMode = darkMode;
	},
	toggleDarkMode (state) {
		state.darkMode = !state.darkMode;
	}
};
