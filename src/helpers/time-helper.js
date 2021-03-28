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

export let sortLatestArticles = articles =>{
	let compare = (articleA, articleB) => {
		let a = Moment(articleA.createdAt);
		let b = Moment(articleB.createdAt);

		if (a.isBefore(b)) {
			return -1;
		} else if (a.isAfter(b)) {
			return 1;
		} else {
			return 0;
		}
	};

	return articles.sort(compare);
};

export let sortLatestXp = xpList => {

	let compare = (a, b) => {
		if (a < b) {
			return -1;
		} else if (a > b) {
			return 1;
		} else {
			return 0;
		}
	};

	xpList.sort(compare);

	let present = [];

	for (let i = 0; i < xpList.length; i++) {
		let xp = xpList[i];

		if(xp.endYear == null){
			present.push(xp);
			xpList.splice(i, 1);
			
			if(xpList.length == i){
				break;
			}
		}
	}

	return present.concat(xpList);
};
