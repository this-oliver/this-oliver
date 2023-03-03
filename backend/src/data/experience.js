const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;
const UserData = require("./user");
const { throwError } = require("../helpers/error");

exports.ExperienceModel = Mongoose.model("experience", new Schema({
	title: { type: String, required: true },
	org: { type: String, required: true },
	startYear: { type: Number, required: true },
	endYear: { type: Number },
	description: { type: String, required: true },
	type: { type: String, required: true },
	author: { type: Schema.Types.ObjectId, ref: "user" }, 
}, { timestamps: true }));


exports.postExperience = async (userId,
	title,
	org,
	startYear,
	endYear,
	description,
	type) => {
	let user = null;

	try {
		user = await UserData.getUser(userId);
	} catch (error) {
		throwError(error.message, error.status);
	}

	try {
		const xp = await this.ExperienceModel.create(new this.ExperienceModel({
			title: title,
			org: org,
			startYear: startYear,
			endYear: endYear,
			description: description,
			type: type,
			author: userId, 
		}));

		user.experiences.push(xp);
		await user.save();
		return xp;
	} catch (error) {
		throwError(error.message, error.status);
	}
};

exports.indexExperiences = async () => {
	try {
		return await this.ExperienceModel.find().exec();
	} catch (error) {
		throwError(error.message, error.status);
	}
};

exports.getExperience = async (id) => {
	if (!id) {
		throwError("missing id", 400);
	}

	try {
		const xp = await this.ExperienceModel.findById(id).exec();

		if (!xp) {
			throwError(`experience with id ${id} does not exist`, 404);
		}

		return xp;
	} catch (error) {
		throwError(error.message, error.status);
	}
};

exports.updateExperience = async (id, patch) => {
	let xp = null;

	try {
		xp = await this.getExperience(id);
	} catch (error) {
		throwError(error.message, error.status);
	}

	try {
		xp.title = patch.title || xp.title;
		xp.org = patch.org || xp.org;
		xp.startYear = patch.startYear || xp.startYear;
		xp.endYear = patch.endYear || xp.endYear;
		xp.description = patch.description || xp.description;
		xp.type = patch.type || xp.type;

		xp = await xp.save();
		return xp;
	} catch (error) {
		throwError(error, 400);
	}
};

exports.deleteExperience = async (id) => {
	try {
		let xp = await this.getExperience(id);
		xp = await xp.remove();

		return `${xp.title} with id ${id} deleted`;
	} catch (error) {
		throwError(error.message, error.status);
	}
};
