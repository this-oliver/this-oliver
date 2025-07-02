import type {
  AuthenticationResponseJSON,
  AuthenticatorTransportFuture,
  PublicKeyCredentialRequestOptionsJSON,
  RegistrationResponseJSON
} from "@simplewebauthn/server";
import type { BaseError } from "../types/error";
import type { IUserPasskey } from "../types/user";
import { Buffer } from "node:buffer";
import {
  generateAuthenticationOptions,
  generateRegistrationOptions,
  verifyAuthenticationResponse,
  verifyRegistrationResponse

} from "@simplewebauthn/server";
import { NODE_ENV } from "../config/env";

/**
 * Human-readable title for your website
 */
const RP_NAME = "oliverrr.net";
/**
 * A unique identifier for your website. 'localhost' is okay for
 * local dev.
 */
const RP_ID = NODE_ENV === "development" ? "localhost" : "www.oliverrr.net";
/**
 * The URL at which registrations and authentications should occur.
 * 'http://localhost' and 'http://localhost:PORT' are also valid.
 * Do NOT include any trailing /
 */
const RP_ORIGIN = NODE_ENV === "development" ? `http://${RP_ID}:3000` : `https://${RP_ID}`;

function _fromStringToBase64(str: string): string {
  return Buffer.from(str).toString("base64");
}

function _fromBase64ToString(base64: string): string {
  return Buffer.from(base64, "base64").toString();
}

async function getPasskeyRegistrationRequest(username: string, userPasskeys: IUserPasskey[]): Promise<PublicKeyCredentialRequestOptionsJSON> {
  return await generateRegistrationOptions({
    rpID: RP_ID,
    rpName: RP_NAME,
    userName: username,
    attestationType: "none",

    // Prevent users from re-registering existing authenticators
    excludeCredentials: userPasskeys.map(passkey => ({
      id: _fromStringToBase64(passkey.name),
      transports: passkey.transports as AuthenticatorTransportFuture[]
    })),

    // See "Guiding use of authenticators via authenticatorSelection" below
    authenticatorSelection: {
      residentKey: "preferred",
      userVerification: "preferred",
      authenticatorAttachment: "cross-platform" // cross-platform lets you use non-platform authenticators (e.g. security keys)
    }
  });
}

async function verifyPasskeyRegistration(attestation: RegistrationResponseJSON, expectedChallenge: string): Promise<IUserPasskey> {
  const result = await verifyRegistrationResponse({
    response: attestation,
    expectedChallenge,
    expectedOrigin: RP_ORIGIN,
    expectedRPID: RP_ID
  });

  if (!result.verified) {
    throw { status: 400, message: "Passkey registration verification failed" } as BaseError;
  }

  if (!result.registrationInfo) {
    throw { status: 400, message: "Missing passkey registration info" } as BaseError;
  }

  // convert uint8array to something that can be stored in mongodb
  const castedPublicKey = Array.from(result.registrationInfo.credential.publicKey).toString();
  const castedAttestationObject = Array.from(result.registrationInfo.attestationObject).toString();

  return {
    name: _fromBase64ToString(result.registrationInfo.credential.id),
    publicKey: castedPublicKey,
    attestationObject: castedAttestationObject,
    attestationFormat: result.registrationInfo.fmt,
    transports: result.registrationInfo.credential.transports || [],
    counter: 0
  };
}

async function getPasskeyAuthenticationRequest(userPasskeys: IUserPasskey[]): Promise<PublicKeyCredentialRequestOptionsJSON> {
  if (!userPasskeys.length) {
    throw { status: 404, message: "No passkeys found for user" } as BaseError;
  }

  return await generateAuthenticationOptions({
    rpID: RP_ID,
    allowCredentials: userPasskeys.map(passkey => ({
      id: _fromStringToBase64(passkey.name),
      transports: passkey.transports as AuthenticatorTransportFuture[]
    }))
  });
}

async function verifyPasskeyAuthentication(attestation: AuthenticationResponseJSON, expectedChallenge: string, passkeys: IUserPasskey[]): Promise<boolean> {
  const passkey = passkeys.find(passkey => passkey.name === attestation.id);

  if (!passkey) {
    throw { status: 404, message: "Passkey not found" } as BaseError;
  }

  // cast string to uint8array
  const castedPublicKey = new Uint8Array(passkey.publicKey.split(",").map(Number));

  let verification;

  try {
    verification = await verifyAuthenticationResponse({
      response: attestation,
      expectedChallenge,
      expectedOrigin: RP_ORIGIN,
      expectedRPID: RP_ID,
      credential: {
        id: passkey.name,
        publicKey: castedPublicKey,
        counter: passkey.counter,
        transports: passkey.transports as AuthenticatorTransportFuture[]
      }
    });
  } catch (error) {
    throw { status: 400, message: `Passkey verification failed - ${(error as Error).message}` } as BaseError;
  }

  return verification.verified;
}

export {
  getPasskeyAuthenticationRequest,
  getPasskeyRegistrationRequest,
  verifyPasskeyAuthentication,
  verifyPasskeyRegistration
};
