/* eslint-disable no-console */
import { verifyToken } from "../middleware/web-token";
import { getCache,
	setCache,
	ENUMS as CacheEnums } from "../middleware/base/cache";

export const state = function () {
	return {
		token: null || getCache(CacheEnums.TOKEN),
		loggedIn: false
	};
};

export const getters = {
	getToken (state) {
		return state.token;
	},
	getDecodedToken (state) {
		return verifyToken(state.token).data;
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
	authenticate (context) {
		const token = context.state.token;

		if (!token) {
			console.log({ vuex_auth: "missing token" });
			return false;
		}

		try {
			verifyToken(token);
			context.commit("setLoginStatus", true);
			return true;
		} catch (error) {
			context.dispatch("logout");
			return false;
		}
	},
	async login (context, { email, password }) {
		await context.dispatch("user/reset", null, { root: true });
		try {
			const response = await this.$api.auth.login(email, password);
			const token = response.data.token;
			const user = response.data.user;

			context.commit("setToken", token);
			context.commit("setLoginStatus", true);
			context.commit("user/setUser", user, { root: true });
			context.dispatch("user/initAdmin", null, { root: true });

			return user;
		} catch (error) {
			this.$handleError({
				statusCode: 401,
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
			this.$handleError({
				statusCode: 401,
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
		await context.dispatch("user/initUser", null, { root: true });
	}
};
