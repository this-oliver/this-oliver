import type { RegistrationResponseJSON } from "@simplewebauthn/server";
import type { Request, Response } from "express";
import type { BaseError } from "../types/error";
import type { BaseAuthBody } from "./auth";
import { ADMIN_SECRET } from "../config/env";
import * as UserData from "../data/users";
import * as ErrorHelper from "../utils/error";
import * as PasskeyHelper from "../utils/passkey";

interface PasskeyRegistrationAuthBody extends BaseAuthBody {
  type: "passkey"
  stage: "init" | "complete"
}

interface PasskeyRegistrationCompleteAuthBody extends PasskeyRegistrationAuthBody {
  stage: "complete"
  attestation: RegistrationResponseJSON
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

/**
 * Creates a new passkey for the user in two stages:
 * 1. init - generates a challenge for the user to sign
 * 2. complete - verifies the signed challenge and saves the passkey to the user
 *
 * for more info, read see https://web.dev/articles/passkey-registration
 */
async function patchUserPasskey(req: Request, res: Response) {
  const body: PasskeyRegistrationAuthBody = req.body;
  const user = await UserData.getUser(true);

  if (body.stage === "init") {
    const passkeySetup = await PasskeyHelper.getPasskeyRegistration(user.email, user.passkeys || []);

    // save the challenge to the user
    await UserData.addUserPasskeyChallenge({ value: passkeySetup.challenge });
    return res.status(200).send(passkeySetup);
  } else if (body.stage === "complete") {
    // get latest user challenge
    const challenge = user.passkeyChallenges[user.passkeyChallenges.length - 1];
    const result = await PasskeyHelper.verifyPasskeyRegistration((body as PasskeyRegistrationCompleteAuthBody).attestation, challenge.value);

    if (!result.verified) {
      return res.status(400).send({ message: "Passkey registration invalid" });
    }

    if (!result.registrationInfo) {
      return res.status(400).send({ message: "Missing passkey regsitration info" });
    }

    await UserData.addUserPasskey(
      result.registrationInfo?.credential.id,
      result.registrationInfo?.credential.publicKey,
      result.registrationInfo?.attestationObject,
      result.registrationInfo?.fmt,
      result.registrationInfo?.credential.transports as string[] || []
    );

    return res.status(200).send({ message: "Passkey registration successful" });
  } else {
    return res.status(400).send("Invalid passkey stage");
  }
}

// TODO - implement passkey name change
// TODO - implement passkey deletion

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
