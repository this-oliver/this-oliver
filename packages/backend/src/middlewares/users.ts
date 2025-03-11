import type { Request, Response } from "express";
import type { BaseError } from "../types/error";
import type { BaseAuthBody } from "./auth";
import crypto from "node:crypto";
import { ADMIN_SECRET } from "../config/env";
import * as UserData from "../data/users";
import * as ErrorHelper from "../utils/error";

interface PasskeyRegistrationAuthBody extends BaseAuthBody {
  type: "passkey"
  stage: "init" | "complete"
}

interface PasskeyRegistrationCompleteAuthBody extends PasskeyRegistrationAuthBody {
  stage: "complete"
  id: string
  publicKey: string
  publicKeyAlgorithm: number
  transports: string[]
}

interface ResetPasswordBody {
  oldPassword: string
  newPassword: string
}

async function postUser(req: Request, res: Response) {
  try {
    /**
     * If an admin secret is set, check that the request contains the secret
     * and that it matches the admin secret. Otherwise, throw an error to prevent
     * unauthorized creation of users.
     */
    if (req.body.adminSecret !== ADMIN_SECRET || !ADMIN_SECRET) {
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

async function patchUserPasskey(req: Request, res: Response) {
  const body: PasskeyRegistrationAuthBody = req.body;

  if (!body.email) {
    return res.status(400).send("invalid request - missing email");
  }

  if (body.stage === "init") {
    const challenge: string = crypto.randomBytes(16).toString("hex");
    const userId: string = crypto.randomBytes(16).toString("hex");
    const userName: string = body.email;
    const userDisplayName: string = body.email;

    return res.status(200).send({
      challenge,
      userId,
      userName,
      userDisplayName
    });
  } else {
    const publicKey = (body as PasskeyRegistrationCompleteAuthBody).publicKey;
    const publicKeyAlgorithm = (body as PasskeyRegistrationCompleteAuthBody).publicKeyAlgorithm;
    const transports = (body as PasskeyRegistrationCompleteAuthBody).transports;

    // eslint-disable-next-line no-console
    console.log({
      publicKey,
      publicKeyAlgorithm,
      transports
    });

    if (!publicKey || !publicKeyAlgorithm || !transports) {
      return res.status(400).send("invalid request - missing publicKey, publicKeyAlgorithm, or transports");
    } else {
      return res.status(200).send("registration complete");
    }
  }
}

async function patchUserPassword(req: Request, res: Response) {
  const body: ResetPasswordBody = req.body;

  try {
    const user = await UserData.updateUserPassword(body.oldPassword, body.newPassword);
    return res.status(200).send(user);
  } catch (error) {
    return ErrorHelper.packageResponseError(error, res);
  }
}

export { getAdmin, getUser, patchUser, patchUserPasskey, patchUserPassword, postUser };
