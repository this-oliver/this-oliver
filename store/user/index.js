/* eslint-disable no-console */
import { sortLatestExperiences } from "../../middleware/time";
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
		return state.user ? sortLatestExperiences([...state.user.experiences]) : [];
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
			const response = await this.$api.user.index();
			const users = response.data;

			if (users.length > 0) {
				const oliver = users[0];

				context.commit("setUser", oliver);
				await context.dispatch("user/articles/indexUser", oliver._id, {
					root: true
				});
			}

			return users[0];
		} catch (error) {
			this.$handleError({
				statusCode: 400,
				message: {
					type: "vuex user",
					error
				}
			});
		}
	},
	async initAdmin (context) {
		try {
			const id = context.rootGetters["auth/getDecodedToken"];
			const response = await this.$api.user.get(id);
			const oliver = response.data;

			context.commit("setUser", oliver);
			await context.dispatch("user/articles/indexUserSecrets", oliver._id, {
				root: true
			});

			return oliver;
		} catch (error) {
			this.$handleError({
				statusCode: 400,
				message: {
					type: "vuex user",
					error
				}
			});
		}
	},
	async get (context) {
		try {
			const id = context.state.user._id;
			const response = await this.$api.user.get(id);
			const user = response.data;
			context.commit("setUser", user);
			return user;
		} catch (error) {
			this.$handleError({
				statusCode: 400,
				message: {
					type: "vuex user",
					error
				}
			});
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
			this.$handleError({
				statusCode: 400,
				message: {
					type: "vuex user",
					error
				}
			});
		}
	},
	reset (context) {
		context.commit("setUser", null);
	}
};
