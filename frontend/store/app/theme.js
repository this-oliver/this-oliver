import { STORAGE } from "../../logic/enums";
import StorageUtil from "../../utils/storage";

// get theme from local storage
const storedTheme = StorageUtil.getStorage(STORAGE.theme);
// get system theme
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
// set default theme - if no theme is set in local storage, use system theme
const defaultTheme = storedTheme === null ? systemTheme : storedTheme;

export const state = function () {
	return {
		darkMode: defaultTheme || null
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
		// save to local storage
		StorageUtil.setStorage(STORAGE.theme, darkMode);
	}
};
