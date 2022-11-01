import { EXPERIENCES } from "./enums";

/**
 * Returns list of experiences sorted by latest ongoing experiences first
 * @param {Array} articles - array of article objects
 * @returns {Array}
 */
export function sortLatestExperiences (experiences) {
	// sort experiences by start date: experiences that
	// started earlier should be at the end of the array
	const sortedByStartDate = experiences.sort(function (
		experienceA,
		experienceB
	) {
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

	// sort experiences by end date: experiences that
	// ended earlier should be at the end of the array
	const sortedByEndDate = sortedByStartDate.sort(function (
		experienceA,
		experienceB
	) {
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

	// sort experiences by end date: experiences that
	// have no end date (null) should be at the beginning of the array
	return sortedByEndDate.sort(function (experienceA, experienceB) {
		/**
		 * when comparing A and B:
		 * - return 1 to sort B before A,
		 * - return -1 to sort A before B, and
		 * - return 0 to sort A and B equally
		 */

		// check if any of the experiences have null (e.g. present)
		if (experienceA.endYear === null && experienceB.endYear !== null) {
			return -1;
		} else if (experienceA.endYear !== null && experienceB.endYear === null) {
			return 1;
		} else if (experienceA.endYear === null && experienceB.endYear === null) {
			return 0;
		}
	});
};

/**
 * Returns color for experience based on experience type
 * @param {string} type - experience type
 * @returns {string} color
 */
export function getExperienceColor(type){
	switch (type) {
	case EXPERIENCES.job:
		return "error";
	case EXPERIENCES.education:
		return "primary";
	case EXPERIENCES.projects:
		return "success";
	case EXPERIENCES.other:
		return "secondary";
	default:
		return "warning";
	}
}
