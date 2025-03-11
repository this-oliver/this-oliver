interface IUserPasskey {
  name: string
  publicKey: Uint8Array
  attestationObject: Uint8Array
  attestationFormat: string
  transports: string[]
  counter: number
}

interface IUserPasskeyChallenge {
  value: string
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
