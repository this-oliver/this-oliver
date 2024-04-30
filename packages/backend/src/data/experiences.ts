import Mongoose from "mongoose";
import { ExperienceModel, ExperienceDocument } from "./models/experience";
import type { IExperience } from "../types/experience";
import type { BaseError } from "../types/error";

async function postExperience(
	title: string,
	org: string,
	startYear: number,
	endYear: number,
	description: string,
	type: string,
	link?: string,
	image?: string
): Promise<ExperienceDocument> {

	try {
		return await ExperienceModel.create(
			new ExperienceModel({
				title: title,
				org: org,
				startYear: startYear,
				endYear: endYear,
				description: description,
				link: link,
				image: image,
				type: type
			}));

	} catch (error) {

		if (error instanceof Mongoose.Error.ValidationError) {
			throw { message: error.message, status: 400 } as BaseError;
		}

		throw { message: (error as Error).message || error || 'Failed to create experience', status: 500 } as BaseError;
	}
}

async function indexExperiences(): Promise<ExperienceDocument[]> {
	return await ExperienceModel.find().exec();
}

async function getExperience(id: string): Promise<ExperienceDocument> {
	const experience = await ExperienceModel.findById(id).exec();

	if (!experience) {
		throw { message: `experience with id ${id} does not exist`, status: 404 } as BaseError;
	}

	return experience;
}

async function updateExperience(id: string, patch: Partial<IExperience>): Promise<ExperienceDocument> {
	const experience = await getExperience(id);

	if (patch.title !== undefined) experience.title = patch.title;
	if (patch.org !== undefined) experience.org = patch.org;
	if (patch.startYear !== undefined) experience.startYear = patch.startYear;
	if (patch.endYear !== undefined) experience.endYear = patch.endYear;
	if (patch.description !== undefined) experience.description = patch.description;
	if (patch.type !== undefined) experience.type = patch.type;
	if (patch.link !== undefined) experience.link = patch.link;
	if (patch.image !== undefined) experience.image = patch.image;

	try {
		return await experience.save();
	} catch (error) {
		if (error instanceof Mongoose.Error.ValidationError) {
			throw { message: error.message, status: 400 } as BaseError;
		}

		throw { message: (error as Error).message || error || 'Failed to update experience', status: 500 } as BaseError;
	}
}

async function deleteExperience(id: string): Promise<ExperienceDocument> {
	const experience = await getExperience(id);

	try {
		await experience.deleteOne();
		return experience;
	} catch (error) {
		if (error instanceof Mongoose.Error.ValidationError) {
			throw { message: error.message, status: 400 } as BaseError;
		}

		throw { message: (error as Error).message || error || 'Failed to delete experience', status: 500 } as BaseError;
	}
}

export {
	postExperience,
	indexExperiences,
	getExperience,
	updateExperience,
	deleteExperience,
};