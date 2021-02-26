//auth
const Jwt = require("jsonwebtoken");
const Key = process.env.JWT_SECRET;
const User = require("../data/user");

exports.getToken = (value) => {
	let payload = { data: value };
	let secret = Key;
	let token;
	let signOptions = {
		expiresIn: "72h",
	};

	try {
		token = Jwt.sign(payload, secret, signOptions);
	} catch (error) {
		throw {
			status: 401,
			message: "error getting token:" + error.message || error,
		};
	}

	return Promise.resolve(token);
};

exports.verifyToken = (token) => {
	if (!token)
		throw {
			status: 400,
			message: "missing token",
		};

	let secret = Key;
	let decoded = null;

	try {
		decoded = Jwt.verify(token, secret);
	} catch (error) {
		throw {
			status: 401,
			message: "error verifying token:" + error.message || error,
		};
	}

	return Promise.resolve(decoded);
};
