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

			await context.dispatch("user/getUser", null, { root: true });

			return response.data;
		} catch (error) {
			console.log({ vuex_user_xp_error: error });
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

			await context.dispatch("user/getUser", null, { root: true });

			return response.data;
		} catch (error) {
			console.log({ vuex_user_xp_error: error });
		}
	},
	async delete (context, id) {
		try {
			const token = context.rootGetters["auth/getToken"];

			const response = await this.$api.experience.delete(id, token);

			await context.dispatch("user/getUser", null, { root: true });

			return response.data;
		} catch (error) {
			console.log({ vuex_user_xp_error: error });
		}
	}
};
