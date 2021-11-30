/* eslint-disable no-console */
import { sortLatestExperiences } from "~/logic/experience";

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
	async initAdmin(context) {
		try {
			await this.$auth.fetchUser();
		} catch (error) {
			context.commit(
				"app/toaster/addError",
				{ title: "Initiating User", message: error.message },
				{ root: true }
			);
		}
	},
	async register(context, { name, email, password }) {
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
	async patch(context, { name, email, short, long }) {
		try {
			const id = context.rootState.auth.user._id;
			const token = this.$auth.strategy.token.get();

			const response = await this.$api.user.patch(
				token,
				id,
				name,
				email,
				short,
				long
			);
			const user = response.data;

			await this.$auth.fetchUser();
			return user;
		} catch (error) {
			context.commit(
				"app/toaster/addError",
				{ title: "Patching User", message: error.message },
				{ root: true }
			);
		}
	},
	async reset(context) {
		await this.$auth.logout(/* .... */);
	}
};
