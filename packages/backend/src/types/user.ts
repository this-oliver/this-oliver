import type { AuthenticatorTransportFuture } from "@simplewebauthn/server";

interface IUserPasskey {
  name: string
  publicKey: string
  attestationObject: string
  attestationFormat: string
  transports: AuthenticatorTransportFuture[]
  counter: number
}

interface IUserPasskeyChallenge {
  value: string
  type: "register" | "login"
  status: "pending" | "completed"
}

interface IUser {
  name: string
  email: string
  status: string
  password: string
  passkeys: IUserPasskey[]
  passkeyChallenges: IUserPasskeyChallenge[]
  salt: string
}

export { IUser, IUserPasskey, IUserPasskeyChallenge };
