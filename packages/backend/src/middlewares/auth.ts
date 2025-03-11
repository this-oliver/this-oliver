import type { AuthenticationResponseJSON } from "@simplewebauthn/server";
import type { NextFunction, Request, Response } from "express";
import type { BaseError } from "../types/error";
import * as UserData from "../data/users";
import * as PasskeyHelper from "../utils/passkey";
import * as TokenHelper from "../utils/token";

export interface BaseAuthBody {
  type: "passkey" | "password"
  email: string
}

interface PasswordAuthBody extends BaseAuthBody {
  type: "password"
  password: string
}

interface PasskeyAuthBody extends BaseAuthBody {
  type: "passkey"
  stage: "init" | "complete"
}

interface PasskeyAuthCompleteBody extends PasskeyAuthBody {
  type: "passkey"
  stage: "complete"
  attestation: AuthenticationResponseJSON
}

const UNAUTHORIZED_MESSAGE = "invalid authentication credentials";

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

async function loginWithPasskey(req: Request, res: Response) {
  const body = req.body as PasskeyAuthBody;

  if (body.stage === "init") {
    const user = await UserData.getUser(true);
    const challenge = PasskeyHelper.getPasskeyAuthentication(user.passkeys);

    return res.status(200).send({ challenge });
  } else if (body.stage === "complete") {
    const user = await UserData.getUser(true);
    const challenge = user.passkeyChallenges[user.passkeyChallenges.length - 1];

    const attestation = (body as PasskeyAuthCompleteBody).attestation;
    const verified = await PasskeyHelper.verifyPasskeyAuthentication(attestation, challenge.value, user.passkeys);

    if (!verified || !verified.verified) {
      return res.status(401).send(UNAUTHORIZED_MESSAGE);
    }

    await UserData.incrementPasskeyCounter(attestation.id);

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
    return res.status(400).send("Invalid passkey stage");
  }
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

export {
  authenticate,
  login,
  loginWithPasskey
};
