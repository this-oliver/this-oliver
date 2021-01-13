import Moment from "moment";


/**
 * returns current year as a number
 * @returns {Number}
 */
export let getCurrentYear = function(){
	return Moment().year();
};
