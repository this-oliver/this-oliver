/**
 * Returns a number that represents number of words in string
 * @param {String} string
 * @returns {Number}
 */
export const getWordCount = (string) => {
	if (string) {
		return string.split(" ").length;
	} else {
		return 0;
	}
};

/**
 * Returns a short version of the text provided.
 * @param {String} text - text
 * @param {Number} maxChar - maximum characters allowed in description
 * @param {Number} maxWords - maxiumum words allowed in description
 * @returns {String}
 */
export const getTextDescription = (text, maxChar = 100, maxWords = 15) => {
	let description = text;

	// enter code block if article content exceeds `maxChar`
	if (text.length > maxChar) {
		// split content into an array of words
		const words = text.split(" ");
		let tempText = "";

		// loop through array of words and append each word to the `tempText` instance
		// as long as it does not exceed `maxWords`
		for (let i = 0; i < words.length && i < maxWords; i++) {
			const word = words[i];
			tempText = tempText + `${word} `;
		}

		description = tempText;
	}

	return description;
};
