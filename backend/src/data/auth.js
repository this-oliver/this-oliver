// mongo
const UserData = require("./user");
const { throwError } = require("../helpers/error");

const UserModel = UserData.UserModel;

exports.login = async (email, password) => {
	let user;

	try {
		user = await UserModel.findOne({ email: email.toLowerCase() });

		if (user == null) {
			throwError("invalid login details", 404);
		}
	} catch (error) {
		throwError(error.message, error.status);
	}

	try {
		const isMatch = await user.verifyPassword(password);
		if (!isMatch) {
			throwError("invalid login details", 404);
		}
	} catch (error) {
		throwError(error.message, error.status);
	}

	try {
		user = await UserData.getUser(user._id);
		return user;
	} catch (error) {
		throwError(error.message, error.status);
	}
};

exports.register = async (name, email, password) => {
	try {
		const users = await UserData.indexUsers();

		if (users.length > 0) {
			throwError("sorry buddy but there can only be one user in this server 🤪", 400);
		}
	} catch (error) {
		throwError(error.message, error.status);
	}

	try {
		const user = await UserModel.create(
			new UserModel({
				name: name,
				email: email,
				password: password,
			})
		);

		const result = UserData.getUser(user._id);
		return Promise.resolve(result);
	} catch (error) {
		throwError(error.message, error.status);
	}
};
