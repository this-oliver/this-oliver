import Jwt from "jsonwebtoken";
const JwtSecret = process.env.VUE_APP_JWT_SECRET;

if (!JwtSecret) {
	throw new Error("[.env] Env variable 'VUE_APP_JWT_SECRET' is undefined.");
}

/**
 * Checks validity of token and (if successful, returns decoded token).
 * @param {String} token
 * @returns {String}
 */
export const verifyToken = (token) => {
	const decoded = Jwt.verify(token, JwtSecret);
	return decoded;
};
