/**
 * Returns list of experiences sorted by created date
 * @param {Array} articles - array of article objects
 * @returns {Array}
 */
export const sortLatestExperiences = (experiences) => {
	const compare = (a, b) => {
		return b.startYear - a.startYear;
	};

	experiences.sort(compare);

	const present = [];

	for (let i = 0; i < experiences.length; i++) {
		const xp = experiences[i];

		if (xp.endYear === null) {
			present.push(xp);
			experiences.splice(i, 1);

			if (experiences.length === i) {
				break;
			}
		}
	}

	return present.concat(experiences);
};
