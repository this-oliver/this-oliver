import Moment from "moment";

/**
 * returns current year as a number
 * @returns {Number}
 */
export const getCurrentYear = () => {
	return Moment().year();
};

/**
 * gets a representation of time that is readable to human eye
 * @param {Date} date
 * @return {String}
 */
export const getTimeAgo = (date) => {
	const time = Moment(date);
	return time.fromNow();
};

/**
 * Returns list of articles sorted by created date
 * @param {Array} articles - array of article objects
 * @returns {Array}
 */
export const sortLatestArticles = (articles) => {
	const compare = (articleA, articleB) => {
		const a = Moment(articleA.createdAt);
		const b = Moment(articleB.createdAt);

		if (a.isAfter(b)) {
			return -1;
		} else if (a.isBefore(b)) {
			return 1;
		} else {
			return 0;
		}
	};

	return articles.sort(compare);
};

/**
 * Returns list of experiences sorted by created date
 * @param {Array} articles - array of article objects
 * @returns {Array}
 */
export const sortLatestXp = (experiences) => {
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
