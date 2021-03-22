/**
 * Returns a number that represents number of words in string
 * @param {String} string 
 * @returns {Number}
 */
export const getWordCount = (string) =>{
	if (string) {
		return string.split(" ").length;
	} else {
		return 0;
	}
};
