import Moment from "moment";

/**
 * returns current year as a number
 * @returns {Number}
 */
export let getCurrentYear = function(){
	return Moment().year();
};

/**
 * gets a representation of time that is readable to human eye
 * @param {Date} date
 * @return {String}
 */
export let getTimeAgo = date => {
	let time = Moment(date);
	return time.fromNow();
};
