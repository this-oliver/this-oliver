/* eslint-disable no-console */
import { sortLatestExperiences } from "../../logic/user";

export const getters = {
	getUser (state, getters, rootState) {
		return rootState.auth.user;
	},
	getExperiences (state, getters, rootState) {
		const user = rootState.auth.user;
		return user ? sortLatestExperiences([...user.experiences]) : [];
	}
};

export const actions = {
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
	async patch (context, { name, email, short, long }) {
		try {
			const id = context.state.user._id;
			const token = this.$auth.strategy.token.get();

			const response = await this.$api.admin.patch(token, id, name, email, short, long);
			const user = response.data;

			context.commit("setUser", user);
			return user;
		} catch (error) {
			context.commit("base/toaster/addError", { title: "Patching User", message: error.message }, { root: true });
		}
	},
	reset (context) {
		context.commit("setUser", null);
	}
};
