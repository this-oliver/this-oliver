// mongo
const User = require("../models/user");

exports.login = async (email, password) => {
	let user;

	try {
		user = await User.findOne({ email: email.toLowerCase() });

		if (user == null) {
			throw {
				status: 404,
				message: "Invalid email",
			};
		}
	} catch (error) {
		throw {
			status: error.status || 400,
			message: "error login:" + error.message || error,
		};
	}

	try {
		let isMatch = await user.verifyPassword(password);
		if (!isMatch) {
			throw {
				status: 404,
				message: "Failed login",
			};
		}
	} catch (error) {
		console.log(error);
		throw {
			status: error.status || 400,
			message: "error matching credentials:" + error.message || error,
		};
	}

	return Promise.resolve(user);
};

exports.postUser = async (name, email, password) => {
	try {
		let user = User.create(
			new User({
				name: name,
				email: email,
				password: password,
			})
		);

		return Promise.resolve({ name: user.name, email: user.email });
	} catch (error) {
		throw {
			status: error.status || 400,
			message: "Error posting user:" + error.message || error,
		};
	}
};

exports.getAllUsers = async () => {
	let users = null;

	try {
		users = await User.find({}, "-password -salt");
	} catch (error) {
		console.log(error);
		throw {
			status: error.status || 400,
			message: "error getting all users:" + error.message || error,
		};
	}
	return Promise.resolve(users);
};

exports.getSingleUser = async (id) => {
	let user = null;
	try {
		user = await User.findOne({ _id: id }).select("-salt -password");
	} catch (error) {
		console.log(error);
		throw {
			status: error.status || 400,
			message: "error getting single user:" + error.message || error,
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
			let isUniqueEmail = true; //TODO validate unique emails
			if (isUniqueEmail == false) {
				throw {
					status: 404,
					message: `${patch.email} already exists`,
				};
			}

			user.email = patch.email || user.email;
		}

		user.name = patch.name || user.name;
		user.updated = new Date().getTime();

		user = await user.save();
	} catch (error) {
		console.log(error);
		throw {
			status: error.status || 400,
			message: "error updating user:" + error.message || error,
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
			status: error.status || 400,
			message: "error updating password:" + error.message || error,
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
			status: error.status || 400,
			message: "error deleting user:" + error.message || error,
		};
	}

	return Promise.resolve(`${id} deleted`);
};
