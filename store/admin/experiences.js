/* eslint-disable no-console */
export const actions = {
	async post (context, { title, org, startYear, endYear, description, type }) {
		try {
			const token = this.$auth.strategy.token.get();
			const id = this.$auth.user._id;

			const response = await this.$api.experience.post(id, title, org, startYear, endYear, description, type, token);

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
			const experiences = context.rootGetters["user/getExperiences"];

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

			const response = await this.$api.experience.patch(id, title, org, startYear, endYear, description, type, token);

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
	async delete (context, id) {
		try {
			const token = this.$auth.strategy.token.get();

			const response = await this.$api.experience.delete(id, token);

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
	}
};
