import type { NextFunction, Request, Response } from "express";
import type { BaseError } from "../types/error";
import * as UserData from "../data/users";
import * as ErrorHelper from "../utils/error";
import * as TokenHelper from "../utils/token";

const UNAUTHORIZED_MESSAGE = "invalid authentication credentials";

async function authenticate(req: Request, res: Response, next: NextFunction) {
  let decodedToken;
  let user;

  try {
    decodedToken = TokenHelper.extractToken(req);
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
  let user;
  let token: string;

  try {
    // get user by email
    user = await UserData.getUserByEmail(req.body.email, true);
  } catch {
    return res.status(401).send(UNAUTHORIZED_MESSAGE);
  }

  try {
    // verify password match
    const match = await user.verifyPassword(req.body.password);
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
  try {
    const user = await UserData.updateUserPassword(req.body.oldPassword, req.body.newPassword);
    return res.status(200).send(user);
  } catch (error) {
    return ErrorHelper.packageResponseError(error, res);
  }
}

export {
  authenticate,
  login,
  resetPassword
};
