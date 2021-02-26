// data
const User = require("../data/user");
// helpers
const TokenHelper = require("../helpers/token");

exports.registerUser = async function (req, res, next) {
	let data = req.body;
	let user = null;

	try {
		user = await User.postUser(data.name, data.email, data.password);
	} catch (error) {
		res.status(error.status || 500).send(error.message);
		return next();
	}

	res.status(201).send(user);
	return next();
};

exports.loginUser = async function (req, res, next) {
	let data = req.body;
	let user = null;
	let token = null;

	try {
		user = await User.login(data.email, data.password);
		token = await Auth.getToken(user._id);
	} catch (error) {
		res.status(error.status || 500).send(error.message);
		return next();
	}

	res.status(200).send({ user: user, token: token });
	return next();
};

exports.resetPassword = async function (req, res, next) {
	let oldPassword = req.body.oldPassword;
	let newPassword = req.body.newPassword;

	try {
		let user = await TokenHelper.verifyToken(
			req.headers.authorization.split(" ")[1]
		);
		await User.changePassword(user._id, oldPassword, newPassword);
	} catch (error) {
		res.status(error.status || 500).send(error.message);
		return next();
	}

	res.status(200).send({});
	return next();
};
