/* eslint-disable no-console */
export const actions = {
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
	}
};
