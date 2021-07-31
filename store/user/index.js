/* eslint-disable no-console */
import { sortLatestExperiences } from "../../utils/time";
import { setCache,
	getCache,
	ENUMS as CachEnums } from "../../utils/cache";

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
		const user = state.user;
		return user ? sortLatestExperiences([...user.experiences]) : [];
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
			const response = await this.$api.user.get();
			const oliver = response.data;

			if (oliver) {
				context.commit("setUser", oliver);
			}

			return oliver;
		} catch (error) {
			context.commit("base/toaster/addError", { title: "Initiating User", message: error.message }, { root: true });
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
			context.commit("base/toaster/addError", { title: "Getting User", message: error.message }, { root: true });
		}
	},
	async incrementVisits (context) {
		try {
			const response = await this.$api.user.incrementVisits();
			const user = response.data;
			context.commit("setUser", user);
			return user;
		} catch (error) {
			context.commit("base/toaster/addError", { title: "Patching User", message: error.message }, { root: true });
		}
	}
};
