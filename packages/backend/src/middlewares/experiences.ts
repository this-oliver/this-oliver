import type { Request, Response } from "express";
import * as ExperienceData from "../data/experiences";
import * as ErrorHelper from "../utils/error";

async function postExperience (req: Request, res: Response) {
	try {
		const experience = await ExperienceData.postExperience(
			req.body.title,
			req.body.org,
			req.body.startYear,
			req.body.endYear,
			req.body.description,
			req.body.type,
			req.body.link,
			req.body.image
		);
		return res.status(201).send(experience);
	} catch (error) {
		return ErrorHelper.packageResponseError(error, res);
	}
}

async function indexExperiences (req: Request, res: Response) {
	try {
		const experience = await ExperienceData.indexExperiences();
		return res.status(200).send(experience);
	} catch (error) {
		return ErrorHelper.packageResponseError(error, res);
	}
}

async function getExperience (req: Request, res: Response) {
	try {
		const experience = await ExperienceData.getExperience(req.params.id);
		return res.status(200).send(experience);
	} catch (error) {
		return ErrorHelper.packageResponseError(error, res);
	}
}

async function patchExperience (req: Request, res: Response) {
	try {
		const experience = await ExperienceData.updateExperience(req.params.id, req.body);
		return res.status(200).send(experience);
	} catch (error) {
		return ErrorHelper.packageResponseError(error, res);
	}
}

async function deleteExperience (req: Request, res: Response) {
	try {
		const experience = await ExperienceData.deleteExperience(req.params.id);
		return res.status(203).send(experience);
	} catch (error) {
		return ErrorHelper.packageResponseError(error, res);
	}
}

export {
	postExperience,
	indexExperiences,
	getExperience,
	patchExperience,
	deleteExperience
};