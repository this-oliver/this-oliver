import {login} from "../api/auth";

import i18n from "../../I18n";
import {toastError} from "../../mixin";
import {verifyToken} from "../../helpers/token-helper";
import {setCache, getCache, enums} from "../../helpers/cache-helper";

const namespaced = true;

const state = {
	token: null || getCache(enums.TOKEN),
	loggedIn: false
};

const getters = {
	getToken: state => state.token,
	getLoginStatus: state => state.loggedIn
};

const mutations = {
	setToken: (state, token) => {
		state.token = token;
		setCache(enums.TOKEN, token);
	},
	setLoginStatus: (state, loginStatus) => {
		state.loggedIn = loginStatus;
	},
};

const actions = {
	login: async (context, { email, password }) => {
		let response = null;

		try {
			response = await login(email, password);
		} catch (error) {
			if (error.response) {
				toastError(
					i18n.t("error.auth.title"),
					`${i18n.t("error.auth.login")}: ${error.response.data}`
				);
			} else if (error.request) {
				toastError(i18n.t("error.api.request.noConnection"), error.message);
			} else {
				toastError(i18n.t("error.title"), error);
			}
		}

		let token = response.data.token;
		let user = response.data.user;

		context.commit("setToken", token);
		context.commit("setLoginStatus", true);
		context.dispatch("user/initUser", user, { root: true });
		return Promise.resolve(response);
	},
	logout: context => {
		context.commit("setToken", null);
		context.commit("setLoginStatus", false);
	},
	authenticate: context => {
		let token = context.state.token;

		try {
			verifyToken(token).data;	
		} catch (error) {
			context.dispatch("logout");
			return false;
		}
		context.commit("setLoginStatus", true);
		return true;
	}
};

export default {
	namespaced,
	state,
	getters,
	mutations,
	actions
};
