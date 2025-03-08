import type { Request } from "express";
import type { BaseError } from "../types/error";
import Jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env";
import * as UserData from "../data/users";

function getToken(value: string): string {
  const payload = { data: value };
  const signOptions = { expiresIn: "72h" };

  return Jwt.sign(payload, JWT_SECRET, signOptions);
}

function verifyToken(token: string): boolean {
  const result: Jwt.Jwt = Jwt.verify(token, JWT_SECRET, { complete: true });

  if (!result) {
    return false;
  }

  return true;
}

function extractToken(req: Request): string {
  const token = req.headers?.authorization?.split(" ")[1];

  if (!token) {
    throw { message: "invalid authentication credentials", status: 401 } as BaseError;
  }

  if (!verifyToken(token)) {
    throw { message: "invalid authentication credentials", status: 401 } as BaseError;
  }

  const result: Jwt.Jwt = Jwt.verify(token, JWT_SECRET, { complete: true });

  return (result.payload as any).data; // cast to any to avoid type error
}

async function authenticateRequest(req: Request) {
  const token = extractToken(req);
  let admin;

  try {
    admin = await UserData.getUser();
  } catch {
    throw { message: "invalid authentication credentials", status: 401 } as BaseError;
  }

  return admin._id === token;
}

export {
  authenticateRequest,
  extractToken,
  getToken,
  verifyToken
};
