import type { NextFunction, Request, Response } from "express";
import type { BaseError } from "../types/error";
import crypto from "node:crypto";
import * as UserData from "../data/users";
import * as ErrorHelper from "../utils/error";
import * as TokenHelper from "../utils/token";

interface BaseAuthBody {
  type: "passkey" | "password"
  email: string
}

interface PasswordAuthBody extends BaseAuthBody {
  type: "password"
  password: string
}

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

const UNAUTHORIZED_MESSAGE = "invalid authentication credentials";

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

// generates a public key challenge for the user to register with
async function registerWithPasskey(req: Request, res: Response) {
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

async function login(req: Request, res: Response) {
  let user;
  let token: string;
  const body: PasswordAuthBody = req.body;

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

async function resetPassword(req: Request, res: Response) {
  const body: ResetPasswordBody = req.body;

  try {
    const user = await UserData.updateUserPassword(body.oldPassword, body.newPassword);
    return res.status(200).send(user);
  } catch (error) {
    return ErrorHelper.packageResponseError(error, res);
  }
}

export {
  authenticate,
  login,
  registerWithPasskey,
  resetPassword
};
