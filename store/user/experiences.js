/* eslint-disable no-console */
import { sortLatestExperiences } from "~/logic/experience";

export const getters = {
	getExperiences(state, getters, rootState) {
		const user = rootState.auth.user;
		return user ? sortLatestExperiences([...user.experiences]) : [];
	}
};

export const actions = {
	get (context, id) {
		try {
			const experiences = context.rootGetters["user/experiences/getExperiences"];

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
