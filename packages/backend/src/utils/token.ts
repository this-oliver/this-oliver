import type { BaseError } from "../types/error";
import Jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env";

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

function extractToken(token: string): any {
  if (!token) {
    throw { message: "invalid authentication credentials", status: 401 } as BaseError;
  }

  if (!verifyToken(token)) {
    throw { message: "invalid authentication credentials", status: 401 } as BaseError;
  }

  const result: Jwt.Jwt = Jwt.verify(token, JWT_SECRET, { complete: true });

  return (result.payload as any).data; // cast to any to avoid type error
}

export {
  extractToken,
  getToken,
  verifyToken
};
