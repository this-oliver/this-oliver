import type {
  AuthenticationResponseJSON,
  AuthenticatorTransportFuture,
  PublicKeyCredentialRequestOptionsJSON,
  RegistrationResponseJSON,
  VerifiedRegistrationResponse
} from "@simplewebauthn/server";

import type { IUserPasskey } from "../types/user";

import {
  generateAuthenticationOptions,
  generateRegistrationOptions,
  verifyAuthenticationResponse,
  verifyRegistrationResponse
} from "@simplewebauthn/server";

const RP_NAME = "oliverrr";
const RP_ID = "localhost";

async function getPasskeyRegistration(username: string, userPasskeys: IUserPasskey[]) {
  return await generateRegistrationOptions({
    rpName: RP_NAME,
    rpID: RP_ID,
    userName: username,
    attestationType: "none",

    // Prevent users from re-registering existing authenticators
    excludeCredentials: userPasskeys.map(passkey => ({
      id: passkey.name,
      transports: passkey.transports as AuthenticatorTransportFuture[]
    })),

    // See "Guiding use of authenticators via authenticatorSelection" below
    authenticatorSelection: {
      residentKey: "preferred",
      userVerification: "preferred",
      authenticatorAttachment: "platform"
    }
  });
}

async function verifyPasskeyRegistration(attestation: RegistrationResponseJSON, expectedChallenge: string): Promise<VerifiedRegistrationResponse> {
  return await verifyRegistrationResponse({
    response: attestation,
    expectedChallenge,
    expectedOrigin: RP_NAME,
    expectedRPID: RP_ID
  });
}

async function getPasskeyAuthentication(userPasskeys: IUserPasskey[]): Promise<PublicKeyCredentialRequestOptionsJSON> {
  if (!userPasskeys.length) {
    throw new Error("No passkeys found for user");
  }

  return await generateAuthenticationOptions({
    rpID: RP_ID,
    allowCredentials: userPasskeys.map(passkey => ({
      id: passkey.name,
      transports: passkey.transports as AuthenticatorTransportFuture[]
    }))
  });
}

async function verifyPasskeyAuthentication(attestation: AuthenticationResponseJSON, expectedChallenge: string, passkeys: IUserPasskey[]) {
  const passkey = passkeys.find(passkey => passkey.name === attestation.id);

  if (!passkey) {
    throw new Error("Passkey not found");
  }

  let verification;

  try {
    verification = await verifyAuthenticationResponse({
      response: attestation,
      expectedChallenge,
      expectedOrigin: RP_NAME,
      expectedRPID: RP_ID,
      credential: {
        id: passkey.name,
        publicKey: passkey.publicKey,
        counter: passkey.counter,
        transports: passkey.transports as AuthenticatorTransportFuture[]
      }
    });
  } catch (error) {
    throw new Error(`Passkey verification failed - ${(error as Error).message}`);
  }

  return verification;
}

export {
  getPasskeyAuthentication,
  getPasskeyRegistration,
  verifyPasskeyAuthentication,
  verifyPasskeyRegistration
};
