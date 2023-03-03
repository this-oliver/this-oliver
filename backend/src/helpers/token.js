//auth
const Jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET;
const UserData = require("../data/user");
const { throwError } = require("./error");

exports.getToken = (value) => {
	const payload = { data: value };
	const signOptions = { expiresIn: "72h" };

	try {
		const token = Jwt.sign(payload, SECRET, signOptions);
		return token;
	} catch (error) {
		throwError("error getting token:" + error.message || error, 401);
	}
};

exports.verifyToken = (token) => {
	if (!token) {
		throwError("missing token", 400);
	} else {
		try {
			const decoded = Jwt.verify(token, SECRET);
			return decoded;
		} catch (error) {
			throwError("error verifying token:" + error.message || error, 401);
		}
	}
};

exports.extractToken = (req) => {
	if (req === undefined || req === null) {
		return false;
	} else if (
		req.headers.authorization === undefined ||
		req.headers.authorization === null
	) {
		return false;
	} else {
		const token = req.headers.authorization.split(" ")[1];

		try {
			return this.verifyToken(token).data;
		} catch (error) {
			return false;
		}
	}
};

exports.authenticateRequest = async function (req) {
	if (req === undefined || req === null) {
		return false;
	} else if (
		req.headers.authorization === undefined ||
		req.headers.authorization === null
	) {
		return false;
	} else {
		const token = req.headers.authorization.split(" ")[1];
		let decoded = undefined;

		try {
			decoded = this.verifyToken(token);
		} catch (error) {
			return false;
		}

		try {
			const admin = await UserData.getOliver();
			if (admin === undefined || admin === null){
				throwError("host is missing", 404);
			}

			return admin._id == decoded.data;
		} catch (error) {
			return false;
		}
	}
};
