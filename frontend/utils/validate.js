/**
 * Returns true if string is not empty
 * @param {String} string
 * @returns {Boolean}
 */
export const isNotEmpty = (string) => {
	if (string === null) return false;

	if (string.length <= 0) {
		return false;
	}
	return true;
};

/**
 * Returns true if email text is valid email format
 * @param {String} email - email
 * @returns {Boolean}
 */
export const isEmail = (email) => {
	if (email === null) return false;
	const emailPattern = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/i;
	return email.match(emailPattern) !== null;
};

/**
 * Returns true if password length is valid
 * @param {String} string - password
 * @returns {Boolean}
 */
export const isValidPasswordLength = (password) => {
	if (password === null) return false;
	return password.length >= 8;
};

/**
 * Returns true if id1 is equal to id2
 * @param {String} id1 - id 1
 * @param {String} id2 - id 2
 * @returns {Boolean}
 */
export const equalObjectIds = (id1, id2) => {
	return String(id1) === String(id2);
};

/**
 * Returns true if values match
 * @param {String} val1
 * @param {String} val2
 * @returns {Boolean}
 */
export const isMatching = (val1, val2) => {
	return val1 === val2;
};
