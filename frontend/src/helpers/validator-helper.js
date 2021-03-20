// string

/**
 * Returns boolean if string is not valid and null if string is null
 * @param {String} string
 */
export let isNotEmpty = string => {
	if (string == null) return null;
	if (string.length <= 0) return false;
	return true;
};

export let isEmail = email => {
	let email_pattern = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/i;
	return email.match(email_pattern) === null ? false : true;
};

export let isValidPasswordLength = string => {
	return string.length >= 8;
};

export let equalObjectIds = (id1, id2) => {
	return String(id1) === String(id2);
};
