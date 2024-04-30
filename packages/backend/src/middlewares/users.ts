import { ADMIN_SECRET } from "../config/env";
import * as UserData from "../data/users";
import * as ErrorHelper from "../utils/error";
import type { BaseError } from "../types/error";
import type { Request, Response } from "express";

async function postUser(req: Request, res: Response) {
	try {

		/**
     * If an admin secret is set, check that the request contains the secret
     * and that it matches the admin secret. Otherwise, throw an error to prevent
     * unauthorized creation of users.
     */
		if(req.body.adminSecret !== ADMIN_SECRET || !ADMIN_SECRET) {
			throw { message: "not authorized to create a user!", status: 401 } as BaseError;
		}

		const user = await UserData.createUser(req.body.name, req.body.email, req.body.password, req.body.status);

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

export { postUser, getUser, getAdmin, patchUser };
