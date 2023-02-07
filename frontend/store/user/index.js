/* eslint-disable no-console */
import { sortLatestExperiences } from "~/logic/experience";
import StorgaUtil from "~/utils/storage";
import { STORAGE } from "~/logic/enums";

export const state = function () {
	return {
		user: StorgaUtil.getStorage(STORAGE.user) || null
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
		StorgaUtil.setStorage(STORAGE.user, user);
	}
};

export const actions = {
	async init (context) {
		try {
			const response = await this.$api.user.get();
			const user = response.data;

			if (user) {
				context.commit("setUser", user);
			}

			return user;
		} catch (error) {
			context.commit("app/toaster/addError", { title: "Initiating User", message: error.message }, { root: true });
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
			context.commit("app/toaster/addError", { title: "Getting User", message: error.message }, { root: true });
		}
	},
	async incrementVisits (context) {
		try {
			const response = await this.$api.user.incrementVisits();
			const user = response.data;
			context.commit("setUser", user);
			return user;
		} catch (error) {
			context.commit("app/toaster/addError", { title: "Patching User", message: error.message }, { root: true });
		}
	}
};
