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
 * Returns -1 if time1 is after time2, 1 if time1 is before time2 and 0 if both dates are equal
 * @param {Date} time1 - date
 * @param {Date} time2 - date
 * @returns {Number}
 */
export const compareDates = (time1, time2) => {
	const a = Moment(time1);
	const b = Moment(time2);

	if (a.isAfter(b)) {
		return -1;
	} else if (a.isBefore(b)) {
		return 1;
	} else {
		return 0;
	}
};
