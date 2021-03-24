import {login} from "../api/auth";
import {postUser} from "../api/user";

import i18n from "../../i18n";
import Router from "../../router";
import {toastError} from "../../mixin";

import ROUTES from "../../enums/router-enums";
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
	authenticate: context => {
		let token = context.state.token;
		
		if(!token){
			toastError(i18n.t("error.auth.title"), i18n.t("error.auth.missingToken"));
			return false;
		}

		try {
			verifyToken(token);	
			context.commit("setLoginStatus", true);
			return true;
		} catch (error) {
			toastError(i18n.t("error.auth.title"), {error});
			context.dispatch("logout");
			return false;
		}
	},
	login: async (context, { email, password }) => {
		await context.dispatch("user/reset", null, {root: true});
		try {
			let response = await login(email, password);
			let token = response.data.token;
			let user = response.data.user;

			context.commit("setToken", token);
			context.commit("setLoginStatus", true);
			context.commit("user/setUser", user, { root: true });
			
			Router.push({name: ROUTES.admin.profile});
			
			return user;
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
	},
	register: async (context, { name, email, password }) => {
		await context.dispatch("user/reset", null, { root: true });
		try {
			let response = await postUser(name, email, password, null, null);
			let user = response.data.user;
			Router.push({name: ROUTES.auth.login});
			return user;
		} catch (error) {
			if (error.response) {
				toastError(
					i18n.t("error.auth.title"),
					`${i18n.t("error.api.request.post", { name: "user" })}: ${error.response.data}`
				);
			} else if (error.request) {
				toastError(i18n.t("error.api.request.noConnection"), error.message);
			} else {
				toastError(i18n.t("error.title"), error);
			}
		}
	},
	logout: async context => {
		context.commit("setToken", null);
		context.commit("setLoginStatus", false);
		Router.push({ name: ROUTES.user.landing });
	},
};

export default {
	namespaced,
	state,
	getters,
	mutations,
	actions
};
