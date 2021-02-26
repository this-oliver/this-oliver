// data
const User = require("../data/user");
// helpers
const TokenHelper = require("../helpers/token");

exports.getAllUsers = async function (req, res, next) {
	let users = null;

	try {
		users = await User.getAllUsers();
	} catch (error) {
		res.status(error.status || 500).send(error.message);
		return next();
	}

	res.status(200).send(users);
	return next();
};

exports.getSingleUser = async function (req, res, next) {
	let user = null;

	try {
		let id = req.params.id;
		user = await User.getSingleUser(id);
	} catch (error) {
		res.status(error.status || 500).send(error.message);
		return next();
	}

	if (user === null) {
		res.status(404).send(`user ${id} not found`);
	} else {
		res.status(200).send(user);
	}
	return next();
};

exports.patchUser = async function (req, res, next) {
	let id = null;
	let user = null;
	let patch = req.body;

	try {
		id = TokenHelper.verifyToken(req.headers.authorization.split(" ")[1]);
	} catch (error) {
		return res.status(error.status || 400).send(error.message);
	}

	try {
		user = await User.getSingleUser(id);
		user = await User.updateUser(user._id, patch);
	} catch (error) {
		return res.status(error.status || 400).send(error.message);
	}

	res.status(200).send(user);
	return next();
};

exports.deleteUser = async function (req, res, next) {
	let id = null;

	try {
		id = TokenHelper.verifyToken(req.headers.authorization.split(" ")[1]);
		await User.deleteUser(id);
	} catch (error) {
		res.status(error.status || 500).send(error.message);
		return next();
	}

	res.status(203).send(`deleted ${id}`);
	return next();
};
