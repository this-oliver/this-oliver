import JWT from "jsonwebtoken";
const SECRET = process.env.VUE_APP_JWT_SECRET;

/**
 * Checks validity of token and (if successful, returns decoded token).
 * @param {String} token
 * @returns {String | Object}
 */
export let verifyToken = token => {
	let decoded = JWT.verify(token, SECRET);
	return decoded;
};

/**
 * returns header with auth token 
 * @param {String} token 
 * @returns {Object}
 */
export let config = token => {
	return { headers: { Authorization: `Bearer ${token}` } };
};
