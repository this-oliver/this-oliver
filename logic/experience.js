/**
 * Returns list of experiences sorted by created date
 * @param {Array} articles - array of article objects
 * @returns {Array}
 */
export const sortLatestExperiences = (experiences) => {
	return experiences.sort((experienceA, experienceB) => {
		/**
		 * when comparing A and B:
		 * - return 1 to sort B before A,
		 * - return -1 to sort A before B, and
		 * - return 0 to sort A and B equally
		 */
		if (experienceA.startYear < experienceB.startYear) {
			return 1;
		} else if (experienceA.startYear > experienceB.startYear) {
			return -1;
		} else {
			return 0;
		}
	});
};
