/* eslint-disable no-console */
import { sortLatestExperiences } from "~/logic/experience";

export const getters = {
	getExperiences(state, getters, rootState) {
		const user = rootState.auth.user;
		return user ? sortLatestExperiences([...user.experiences]) : [];
	}
};

export const actions = {
	async post (context, { title, org, startYear, endYear, description, type }) {
		try {
			const token = this.$auth.strategy.token.get();

			const response = await this.$api.experience.post(token, title, org, startYear, endYear, description, type);

			await context.dispatch("user/get", null, { root: true });

			return response.data;
		} catch (error) {
			this.$handleError.api({
				status: 400,
				message: {
					type: "vuex experience",
					error
				}
			});
		}
	},
	get (context, id) {
		try {
			const experiences = context.getters["getExperiences"];

			if (!experiences) { throw new Error("Experiences are missing"); }

			// eslint-disable-next-line eqeqeq
			return experiences.find(experience => experience._id == id);
		} catch (error) {
			this.$handleError.api({
				status: 400,
				message: {
					type: "vuex experience",
					error
				}
			});
		}
	},
	async patch (context,
		{ id, title, org, startYear, endYear, description, type }) {
		try {
			const token = this.$auth.strategy.token.get();

			const response = await this.$api.experience.patch(token, id, title, org, startYear, endYear, description, type);

			await context.dispatch("admin/init", null, { root: true });

			return response.data;
		} catch (error) {
			this.$handleError.api({
				status: 400,
				message: {
					type: "vuex experience",
					error
				}
			});
		}
	},
	async delete (context, id) {
		try {
			const token = this.$auth.strategy.token.get();

			const response = await this.$api.experience.delete(token, id);

			await this.$auth.fetchUser();

			return response.data;
		} catch (error) {
			this.$handleError.api({
				status: 400,
				message: {
					type: "vuex experience",
					error
				}
			});
		}
	}
};
