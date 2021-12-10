/**
 * Returns list of experiences sorted by latest ongoing experiences first
 * @param {Array} articles - array of article objects
 * @returns {Array}
 */
export const sortLatestExperiences = function (experiences) {
	const sortedByStartDate = experiences.sort(function (experienceA, experienceB) {
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

	return sortedByStartDate.sort(function (experienceA, experienceB) {
		/**
		 * when comparing A and B:
		 * - return 1 to sort B before A,
		 * - return -1 to sort A before B, and
		 * - return 0 to sort A and B equally
		 */
		if (experienceA.endYear < experienceB.endYear) {
			return 1;
		} else if (experienceA.endYear > experienceB.endYear) {
			return -1;
		} else {
			return 0;
		}
	});
};
