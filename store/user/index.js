/* eslint-disable no-console */
import { sortLatestXp } from "../../middleware/time";
import { setCache,
	getCache,
	ENUMS as CachEnums } from "../../middleware/base/cache";

export const state = function () {
	return {
		user: getCache(CachEnums.USER) || null
	};
};

export const getters = {
	getUser (state) {
		return state.user;
	},
	getExperiences (state) {
		return state.user ? sortLatestXp([...state.user.experiences]) : [];
	}
};

export const mutations = {
	setUser (state, user) {
		state.user = user;
		setCache(CachEnums.USER, user);
	}
};

export const actions = {
	async initUser (context) {
		try {
			const response = await this.$api.user.getAll();
			const users = response.data;

			if (users.length > 0) {
				const oliver = users[0];

				context.commit("setUser", oliver);
				await context.dispatch("user/article/getUserArticles", oliver._id, {
					root: true
				});
			}

			return users[0];
		} catch (error) {
			console.log({ vuex_user_error: error });
		}
	},
	async initAdmin (context) {
		try {
			const id = context.rootGetters["auth/getDecodedToken"];
			const response = await this.$api.user.getSingle(id);
			const oliver = response.data;

			context.commit("setUser", oliver);
			await context.dispatch("user/article/getSecretUserArticles", oliver._id, {
				root: true
			});

			return oliver;
		} catch (error) {
			console.log({ vuex_user_error: error });
		}
	},
	async getUser (context) {
		try {
			const id = context.state.user._id;
			const response = await this.$api.user.getSingle(id);
			const user = response.data;
			context.commit("setUser", user);
			return user;
		} catch (error) {
			console.log({ vuex_user_error: error });
		}
	},
	async patch (context, { name, email, short, long }) {
		try {
			const id = context.state.user._id;
			const token = context.rootGetters["auth/getToken"];

			const response = await this.$api.user.patch(
				id,
				name,
				email,
				short,
				long,
				token
			);
			const user = response.data;

			context.commit("setUser", user);
			return user;
		} catch (error) {
			console.log({ vuex_user_error: error });
		}
	},
	reset (context) {
		context.commit("setUser", null);
	}
};
