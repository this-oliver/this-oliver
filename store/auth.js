/* eslint-disable no-console */
import { verifyToken } from "../utils/jwt";
import { getCache,
	setCache,
	ENUMS as CacheEnums } from "../utils/cache";

export const state = function () {
	return {
		token: getCache(CacheEnums.TOKEN) || null,
		loggedIn: false
	};
};

export const getters = {
	getToken (state) {
		return state.token;
	},
	getLoginStatus (state) {
		return state.loggedIn;
	}
};

export const mutations = {
	setToken (state, token) {
		state.token = token;
		setCache(CacheEnums.TOKEN, token);
	},
	setLoginStatus (state, loginStatus) {
		state.loggedIn = loginStatus;
	}
};

export const actions = {
	async authenticate (context) {
		const token = context.getters.getToken;

		if (!token) {
			return false;
		}

		try {
			verifyToken(token);
			context.commit("setLoginStatus", true);
			return true;
		} catch (error) {
			await context.dispatch("logout");
			return false;
		}
	},
	async login (context, { email, password }) {
		await context.dispatch("logout");
		try {
			const response = await this.$api.auth.login(email, password);
			const token = response.data.token;
			const user = response.data.user;

			context.commit("setToken", token);
			context.commit("setLoginStatus", true);

			await context.dispatch("user/initAdmin", user, { root: true });

			return user;
		} catch (error) {
			this.$handleError.api({
				status: 401,
				message: {
					type: "vuex authentication",
					error
				}
			});
		}
	},
	async register (context, { name, email, password }) {
		await context.dispatch("user/reset", null, { root: true });
		try {
			const response = await this.$api.auth.register(name, email, password);
			const user = response.data.user;
			return user;
		} catch (error) {
			this.$handleError.api({
				status: 401,
				message: {
					type: "vuex authentication",
					error
				}
			});
		}
	},
	async logout (context) {
		context.commit("setToken", null);
		context.commit("setLoginStatus", false);
		await context.dispatch("user/reset", null, { root: true });
	}
};
