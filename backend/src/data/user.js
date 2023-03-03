// mongo
const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;
const bcrypt = require("bcrypt");

const SALT_WORK_FACTOR = 10;

const UserSchema = new Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		bio: {
			short: { type: String, default: "" },
			long: { type: String, default: "" },
		},
		experiences: [{ type: Schema.Types.ObjectId, ref: "experience" }],
		articles: [{ type: Schema.Types.ObjectId, ref: "article" }],
		visits: { type: Number, default: 0 },
		salt: { type: String },
	},
	{ timestamps: true }
).pre("save", async function (next) {
	const thisUser = this;
	// only hash the password if it has been modified (or is new)
	if (!thisUser.isModified("password")) return next();

	try {
		// generate a salt
		const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
		thisUser.salt = salt;
		// hash the password along with our new salt
		const hash = await bcrypt.hash(thisUser.password, salt);
		// override the cleartext password with the hashed one
		thisUser.password = hash;
		next();
	} catch (error) {
		return next(error);
	}
});

UserSchema.methods.verifyPassword = async function (candidate) {
	const thisUser = this;
	try {
		const isMatch = await bcrypt.compare(candidate, thisUser.password);
		return isMatch;
	} catch (error) {
		throw { status: 500, message: error };
	}
};

exports.UserModel = Mongoose.model("user", UserSchema);


exports.indexUsers = async () => {
	try {
		const users = await this.UserModel.find()
			.select("-password -salt")
			.populate("experiences")
			.exec();
		return users;
	} catch (error) {
		throw {
			status: error.status || 400,
			message: error.message || error, 
		};
	}
};

exports.getOliver = async (showSecrets = false) => {
	try {
		let user;

		if(showSecrets){
			user = await this.UserModel.findOne()
				.select("-password -salt")
				.populate("experiences")
				.populate("articles")
				.exec();

		}else {
			user = await this.UserModel.findOne()
				.select("-password -salt")
				.populate("experiences")
				.populate({
					path: "articles",
					match: { publish: true },
				})
				.exec();
		}
		return user;
	} catch (error) {
		throw {
			status: error.status || 400,
			message: error.message || error,
		};
	}
};

exports.getUser = async (id) => {
	try {
		const user = await this.UserModel.findOne({ _id: id })
			.select("-password -salt")
			.populate("experiences")
			.populate({
				path: "articles",
				populate: { path: "author tags" },
			})
			.exec();
		return user;
	} catch (error) {
		throw {
			status: error.status || 400,
			message: error.message || error, 
		};
	}
};

exports.updateUser = async (id, patch) => {
	try {
		let user = await this.getUser(id);

		if (user == null)
			throw {
				status: 404,
				message: `user ${id} does not exist`, 
			};

		if (patch.email && patch.email !== user.email) {
			const emailExists = await this.UserModel.findOne({ email: patch.email }).exec();

			if (emailExists) {
				throw {
					status: 404,
					message: `${patch.email} already exists`, 
				};
			}

			user.email = patch.email || user.email;
		}

		user.name = patch.name || user.name;
		
		if(patch.bio){
			user.bio.short = patch.bio.short || user.bio.short;
			user.bio.long = patch.bio.long || user.bio.long;
		}

		user = await user.save();
		return user;
	} catch (error) {
		throw {
			status: error.status || 400,
			message: error.message || error, 
		};
	}
};

exports.incrementUserVisits = async (id) => {
	try {
		let user = await this.getUser(id);

		if (user == null)
			throw {
				status: 404,
				message: `user ${id} does not exist`, 
			};

		user.visits = user.visits + 1;
		
		user = await user.save();
		return user;
	} catch (error) {
		throw {
			status: error.status || 400,
			message: error.message || error, 
		};
	}
};

exports.updateUserPassword = async (userId, oldPwd, newPwd) => {
	try {
		let user = await this.UserModel.findOne({ _id: userId });
		const match = await user.verifyPassword(oldPwd);
		if (!match) {
			throw {
				status: 400,
				message: "invalid credentials", 
			};
		}

		user.password = newPwd;
		user.save();
		user = await this.UserModel.findOne({ _id: userId });

		return user;
	} catch (error) {
		throw {
			status: error.status || 400,
			message: error.message || error, 
		};
	}
};

exports.deleteUser = async (id) => {
	try {
		const user = await this.getUser(id);

		if (user == null) {
			throw {
				status: 404,
				message: `user ${id} doesn't exists`, 
			};
		}
		await user.remove();

		return `${id} deleted`;
	} catch (error) {
		throw {
			status: error.status || 400,
			message: error.message || error, 
		};
	}
};
