/* eslint-disable no-console */
export const actions = {
	async post (context, { title, org, startYear, endYear, description, type }) {
		try {
			const token = context.rootGetters["auth/getToken"];
			const id = context.rootGetters["user/getUser"]._id;

			const response = await this.$api.experience.post(
				id,
				title,
				org,
				startYear,
				endYear,
				description,
				type,
				token
			);

			await context.dispatch("user/get", null, { root: true });

			return response.data;
		} catch (error) {
			this.$handleError({
				statusCode: 400,
				message: {
					type: "vuex experience",
					error
				}
			});
		}
	},
	async patch (
		context,
		{ id, title, org, startYear, endYear, description, type }
	) {
		try {
			const token = context.rootGetters["auth/getToken"];

			const response = await this.$api.experience.patch(
				id,
				title,
				org,
				startYear,
				endYear,
				description,
				type,
				token
			);

			await context.dispatch("user/get", null, { root: true });

			return response.data;
		} catch (error) {
			this.$handleError({
				statusCode: 400,
				message: {
					type: "vuex experience",
					error
				}
			});
		}
	},
	async delete (context, id) {
		try {
			const token = context.rootGetters["auth/getToken"];

			const response = await this.$api.experience.delete(id, token);

			await context.dispatch("user/get", null, { root: true });

			return response.data;
		} catch (error) {
			this.$handleError({
				statusCode: 400,
				message: {
					type: "vuex experience",
					error
				}
			});
		}
	}
};
