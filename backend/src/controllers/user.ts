import type { Request, Response } from "express";
import * as UserData from "../data/user";
import * as ErrorHelper from "../helpers/error";

async function postUser(req: Request, res: Response) {
  try {
    const user = await UserData.createUser(req.body.name, req.body.email, req.body.password);

    return res.status(201).send(user);
  } catch (error) {
    return ErrorHelper.packageResponseError(error, res);
  }
}

async function getUser(req: Request, res: Response) {
	try {
		const user = await UserData.getUser();
		return res.status(200).send(user);
	} catch (error) {
		return ErrorHelper.packageResponseError(error, res);
	}
}

async function getAdmin(req: Request, res: Response) {
	try {
		const user = await UserData.getUser(true);

		return res.status(200).send(user);
	} catch (error) {
		return ErrorHelper.packageResponseError(error, res);
	}
}

async function patchUser(req: Request, res: Response) {
	try {
		const user = await UserData.updateUser(req.body);
		return res.status(200).send(user);
	} catch (error) {
		return ErrorHelper.packageResponseError(error, res);
	}
}

async function incrementVisits(req: Request, res: Response) {
	try {
		const user = await UserData.incrementUserVisits();
		return res.status(200).send(user);
	} catch (error) {
		return ErrorHelper.packageResponseError(error, res);
	}
}

export { postUser, getUser, getAdmin, patchUser, incrementVisits };
