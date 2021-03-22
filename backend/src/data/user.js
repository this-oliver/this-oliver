// mongo
const User = require("../models/user");

exports.login = async (email, password) => {
	let user;

	try {
		user = await User.findOne({ email: email.toLowerCase() });

		if (user == null) {
			throw {
				status: 404,
				message: "invalid login details",
			};
		}
	} catch (error) {
		throw {
			status: error.status || 400,
			message: error.message || error,
		};
	}

	try {
		let isMatch = await user.verifyPassword(password);
		if (!isMatch) {
			throw {
				status: 404,
				message: "invalid token",
			};
		}
	} catch (error) {
		throw {
			status: error.status || 400,
			message: error.message || error,
		};
	}

	return Promise.resolve(user);
};

exports.postUser = async (name, email, password) => {
	try {
		let user = await User.create(
			new User({
				name: name,
				email: email,
				password: password,
			})
		);

		let result = this.getSingleUser(user._id);
		return Promise.resolve(result);
	} catch (error) {
		throw {
			status: error.status || 400,
			message: error.message || error,
		};
	}
};

exports.getAllUsers = async () => {
	let users = null;

	try {
		users = await User.find({}, "-password -salt");
	} catch (error) {
		throw {
			status: error.status || 400,
			message: error.message || error,
		};
	}
	return Promise.resolve(users);
};

exports.getSingleUser = async (id) => {
	let user = null;
	try {
		user = await User.findOne({ _id: id }, "-salt -password").exec();
	} catch (error) {
		throw {
			status: error.status,
			message: error.message || error,
		};
	}
	return Promise.resolve(user);
};

exports.updateUser = async (id, patch) => {
	let user = null;

	try {
		user = await this.getSingleUser(id);

		if (user == null)
			throw {
				status: 404,
				message: `user ${id} does not exist`,
			};

		if (patch.email && patch.email !== user.email) {
			let emailExists = await User.findOne({ email: patch.email }).exec();

			if (emailExists) {
				throw {
					status: 404,
					message: `${patch.email} already exists`,
				};
			}

			user.email = patch.email || user.email;
		}

		user.name = patch.name || user.name;
		user.bio.short = patch.bio.short || user.bio.short;
		user.bio.long = patch.bio.long || user.bio.long;
		user = await user.save();
	} catch (error) {
		throw {
			status: error.status,
			message: error.message || error,
		};
	}

	return Promise.resolve(user);
};

exports.updateUserPassword = async (userId, oldPwd, newPwd) => {
	let user = null;

	try {
		user = await User.findOne({ _id: userId });
		let match = await user.verifyPassword(oldPwd);
		if (!match) {
			throw {
				status: 400,
				message: "invalid credentials",
			};
		}

		user.password = newPwd;
		user.save();
		user = await User.findOne({ _id: userId });
	} catch (error) {
		throw {
			status: error.status,
			message: error.message || error,
		};
	}

	return Promise.resolve(user);
};

exports.deleteUser = async (id) => {
	try {
		let user = await this.getSingleUser(id);

		if (user == null) {
			throw {
				status: 404,
				message: `user ${id} doesn't exists`,
			};
		}
		await user.remove();
	} catch (error) {
		throw {
			status: error.status,
			message: error.message || error,
		};
	}

	return Promise.resolve(`${id} deleted`);
};
