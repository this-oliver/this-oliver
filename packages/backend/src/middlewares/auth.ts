import type { AuthenticationResponseJSON, RegistrationResponseJSON } from "@simplewebauthn/server";
import type { NextFunction, Request, Response } from "express";
import type { BaseError } from "../types/error";
import * as UserData from "../data/users";
import * as ErrorHelper from "../utils/error";
import * as PasskeyHelper from "../utils/passkey";
import * as TokenHelper from "../utils/token";

export interface BaseAuthBody {
  type: "passkey" | "password"
  email: string
}

export interface PasswordAuthBody extends BaseAuthBody {
  type: "password"
  password: string
}

export interface PasskeyAuthBody extends BaseAuthBody {
  type: "passkey"
  stage: "init" | "complete"
}

export interface PasskeyRegistrationAuthBody extends PasskeyAuthBody {
  stage: "init" | "complete"
  type: "passkey"
}

export interface PasskeyRegistrationCompleteAuthBody extends PasskeyRegistrationAuthBody {
  stage: "complete"
  attestation: RegistrationResponseJSON
}

export interface PasskeyAuthCompleteBody extends PasskeyAuthBody {
  type: "passkey"
  stage: "complete"
  attestation: AuthenticationResponseJSON
}

export interface PasswordResetBody {
  oldPassword: string
  newPassword: string
}

const UNAUTHORIZED_MESSAGE = "invalid authentication credentials";

function redactUser(user: any) {
  return { ...user, password: undefined, email: undefined, passkeys: undefined, passkeyChallenges: undefined, salt: undefined };
}

async function authenticate(req: Request, res: Response, next: NextFunction) {
  let decodedToken;
  let user;

  const token = req.headers?.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).send(UNAUTHORIZED_MESSAGE);
  }

  try {
    decodedToken = TokenHelper.extractToken(token);
    user = await UserData.getUser();
  } catch {
    return res.status(401).send(UNAUTHORIZED_MESSAGE);
  }

  if (user.id !== decodedToken) {
    return res.status(401).send(UNAUTHORIZED_MESSAGE);
  }

  (req as any).authenticated = true; // add authenticated flag to request

  return next();
}

async function login(req: Request, res: Response) {
  const body: PasswordAuthBody = req.body;
  let user;
  let token: string;

  try {
    // get user by email
    user = await UserData.getUserByEmail(body.email, true);
  } catch {
    return res.status(401).send(UNAUTHORIZED_MESSAGE);
  }

  try {
    // verify password match
    const match = await user.verifyPassword(body.password);
    if (!match) {
      throw { message: UNAUTHORIZED_MESSAGE, status: 401 } as BaseError;
    }
  } catch {
    return res.status(401).send(UNAUTHORIZED_MESSAGE);
  }

  try {
    // generate token
    token = TokenHelper.getToken(user?._id) as any as string;
  } catch (error) {
    return res.status((error as BaseError).status || 500).send((error as BaseError).message);
  }

  return res.status(200).send({ user, token });
}

async function loginWithPasskey(req: Request, res: Response) {
  const body: PasskeyAuthBody = req.body;

  try {
    if (body.stage === "init") {
      const user = await UserData.getUser(true);
      const passkeyAuthRequest = await PasskeyHelper.getPasskeyAuthenticationRequest(user.passkeys);

      await UserData.addUserPasskeyChallenge({
        value: passkeyAuthRequest.challenge,
        type: "login",
        status: "pending"
      });

      return res.status(200).send(passkeyAuthRequest);
    } else if (body.stage === "complete") {
      const user = await UserData.getUser(true);
      const challenge = user.passkeyChallenges[user.passkeyChallenges.length - 1];

      const attestation = (body as PasskeyAuthCompleteBody).attestation;
      const verified = await PasskeyHelper.verifyPasskeyAuthentication(attestation, challenge.value, user.passkeys);

      if (!verified) {
        return res.status(401).send(UNAUTHORIZED_MESSAGE);
      }

      await UserData.updateUserPasskey(attestation.id, { increment: true });
      await UserData.updateUserPasskeyChallenge(challenge.value, { status: "completed" });

      // generate token
      let token: string;
      try {
        token = TokenHelper.getToken(user?._id) as any as string;
      } catch (error) {
        return res.status((error as BaseError).status || 500).send((error as BaseError).message);
      }

      // remove challenge, email, and passkey from user
      const restrictedUser = {
        ...user,
        email: undefined,
        passkeyChallenges: undefined,
        passkeys: undefined
      };

      return res.status(200).send({ user: restrictedUser, token });
    } else {
      throw { status: 400, message: `Invalid passkey stage: ${body.stage}` } as BaseError;
    }
  } catch (error) {
    return ErrorHelper.packageResponseError(error, res);
  }
}

/**
 * Add a new passkey for a user.
 *
 * This is a two-step process:
 * 1. Initiate the passkey registration process by sending a challenge to the user
 * 2. Complete the passkey registration process by verifying the attestation response
 *
 * for more info, read see https://web.dev/articles/passkey-registration
 */
async function registerUserPasskey(req: Request, res: Response) {
  const body: PasskeyRegistrationAuthBody = req.body;

  try {
    const user = await UserData.getUser(true);

    if (body.stage === "init") {
      // generate passkey registration request
      const passkeyRegistrationRequest = await PasskeyHelper.getPasskeyRegistrationRequest(user.email, user.passkeys || []);

      // save passkey registration challenge
      await UserData.addUserPasskeyChallenge({
        value: passkeyRegistrationRequest.challenge,
        type: "register",
        status: "pending"
      });

      return res.status(200).send(passkeyRegistrationRequest);
    } else if (body.stage === "complete") {
      // get latest user challenge
      // note: if the latest challenge doesn't match the attestation, then it should fail anyways because it indicates brute-forcing
      const challenge = user.passkeyChallenges[user.passkeyChallenges.length - 1];

      // verify attestation
      const newPasskey = await PasskeyHelper.verifyPasskeyRegistration((body as PasskeyRegistrationCompleteAuthBody).attestation, challenge.value);

      // update passkey challenge
      await UserData.updateUserPasskeyChallenge(challenge.value, { status: "completed" });

      // save passkey credential
      await UserData.addUserPasskey(
        newPasskey.name,
        newPasskey.publicKey,
        newPasskey.attestationObject,
        newPasskey.attestationFormat,
        newPasskey.transports
      );

      return res.status(200).send({ message: "Passkey registration successful" });
    } else {
      throw { status: 400, message: `Invalid passkey stage: ${body.stage}` } as BaseError;
    }
  } catch (error) {
    return ErrorHelper.packageResponseError(error, res);
  }
}

/**
 * Update user's passkey name
 */
async function patchUserPasskey(req: Request, res: Response) {
  const body: { oldName: string, newName: string } = req.body;

  try {
    const user = await UserData.updateUserPasskey(body.oldName, { name: body.newName });
    return res.status(200).send(redactUser(user));
  } catch (error) {
    return ErrorHelper.packageResponseError(error, res);
  }
}

/**
 * Update a user's password.
 */
async function patchUserPassword(req: Request, res: Response) {
  const body: PasswordResetBody = req.body;

  try {
    const user = await UserData.updateUserPassword(body.oldPassword, body.newPassword);
    return res.status(200).send(redactUser(user));
  } catch (error) {
    return ErrorHelper.packageResponseError(error, res);
  }
}

/**
 * Delete a user's passkey.
 */
async function deleteUserPasskey(req: Request, res: Response) {
  const body: { name: string } = req.body;

  try {
    const user = await UserData.removeUserPasskey(body.name);
    return res.status(200).send(redactUser(user));
  } catch (error) {
    return ErrorHelper.packageResponseError(error, res);
  }
}

export {
  authenticate,
  deleteUserPasskey,
  login,
  loginWithPasskey,
  patchUserPasskey,
  patchUserPassword,
  registerUserPasskey
};
