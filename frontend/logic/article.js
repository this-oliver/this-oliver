import * as TimeHelper from "../utils/time";

/**
 * Returns list of articles sorted by created date
 * @param {Array} list - array of article objects
 * @returns {Array}
 */
export const sortLatestArticles = (list) => {
	const articles = list;

	return articles.sort((article1, article2) => {
		return TimeHelper.compareDates(article1.createdAt, article2.createdAt);
	});
};
