import JWT from "jsonwebtoken";

/**
 * Checks validity of token and (if successful, returns decoded token).
 * @param {String} token
 * @returns {String}
 */
export const verifyToken = (token) => {
	const decoded = JWT.verify(token, process.env.VUE_APP_JWT_SECRET);
	return decoded;
};
