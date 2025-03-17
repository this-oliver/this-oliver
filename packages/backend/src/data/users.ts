import type { AuthenticatorTransportFuture } from "@simplewebauthn/server";
import type { BaseError } from "../types/error";
import type { IUser, IUserPasskeyChallenge } from "../types/user";
import type { UserDocument } from "./models/user";
import { UserModel } from "./models/user";

const QUERY_PROJECTION = "-email -password -salt -passkeyChallenges -passkeys";

async function createUser(name: string, email: string, password: string, status?: string) {
  const userCount = await UserModel.countDocuments({});

  if (userCount > 1) {
    throw { status: 400, message: "sorry buddy but there can only be one user in this server 🤪" } as BaseError;
  }

  try {
    return await UserModel.create(
      new UserModel({
        name,
        email,
        password,
        status
      })
    );
  } catch (error) {
    if ((error as Error).name === "ValidationError") {
      throw { status: 400, message: (error as any).message } as BaseError;
    }

    throw { status: 500, message: (error as Error).message || error || "Failed to create user" } as BaseError;
  }
}

async function getUser(showSecrets?: boolean): Promise<UserDocument> {
  const user = showSecrets
    ? await UserModel.findOne()
      .exec()
    : await UserModel.findOne()
      .select(QUERY_PROJECTION)
      .exec();

  if (user === null) {
    throw { status: 404, message: "user does not exist" } as BaseError;
  }

  return user as UserDocument;
}

async function getUserByEmail(email: string, showSecrets?: boolean): Promise<UserDocument> {
  const user = showSecrets
    ? await UserModel.findOne({ email: email.toLowerCase() })
      .exec()
    : await UserModel.findOne({ email: email.toLowerCase() })
      .select(QUERY_PROJECTION)
      .exec();

  if (user === null) {
    throw { status: 404, message: `user with email '${email}' does not exist` } as BaseError;
  }

  return user as UserDocument;
}

async function updateUser(patch: Partial<IUser>): Promise<UserDocument> {
  const user = await getUser();

  if (patch.email && patch.email !== user.email) {
    const emailExists = await UserModel.findOne({ email: patch.email }).exec();

    if (emailExists) {
      throw { status: 400, message: `${patch.email} already exists` } as BaseError;
    }

    user.email = patch.email || user.email;
  }

  if (patch.name !== undefined)
    user.name = patch.name;
  if (patch.status !== undefined)
    user.status = patch.status;

  return await user.save();
}

async function updateUserPassword(oldPwd: string, newPwd: string): Promise<UserDocument> {
  const user = await getUser(true);
  const isMatching = await user.verifyPassword(oldPwd);

  if (!isMatching) {
    throw { status: 401, message: "invalid credentials" } as BaseError;
  }

  user.password = newPwd;

  return await user.save();
}

async function addUserPasskey(
  name: string,
  publicKey: string,
  attestationObject: string,
  attestationFormat: string,
  transports: AuthenticatorTransportFuture[]
): Promise<UserDocument> {
  const user = await getUser(true);

  if (user.passkeys.some(passkey => passkey.name === name)) {
    throw { status: 400, message: `passkey '${name}' already exists` } as BaseError;
  }

  user.passkeys.push({
    name,
    publicKey,
    attestationObject,
    transports,
    attestationFormat,
    counter: 0
  });

  return await user.save();
}

async function addUserPasskeyChallenge(challenge: IUserPasskeyChallenge): Promise<UserDocument> {
  const user = await getUser(true);

  user.passkeyChallenges.push(challenge);

  return await user.save();
}

async function updateUserPasskey(name: string, patch: { increment?: boolean, name?: string }): Promise<UserDocument> {
  const user = await getUser(true);

  if (user.passkeys.find(passkey => passkey.name === name) === undefined) {
    throw { status: 404, message: `passkey '${name}' does not exist` } as BaseError;
  }

  if (patch.name && user.passkeys.find(passkey => passkey.name === patch.name)) {
    throw { status: 400, message: `passkey with '${patch.name}' name already exists` } as BaseError;
  }

  for (let i = 0; i < user.passkeys.length; i++) {
    if (user.passkeys[i].name === name) {
      user.passkeys[i].name = patch.name || user.passkeys[i].name;
      user.passkeys[i].counter = patch.increment ? user.passkeys[i].counter + 1 : user.passkeys[i].counter;
      break;
    }
  }

  return await user.save();
}

async function updateUserPasskeyChallenge(challenge: string, patch: { status?: "pending" | "completed" }): Promise<UserDocument> {
  const user = await getUser(true);

  if (user.passkeyChallenges.find(item => item.value === challenge) === undefined) {
    throw { status: 404, message: `passkey challenge '${challenge}' does not exist` } as BaseError;
  }

  for (let i = 0; i < user.passkeyChallenges.length; i++) {
    if (user.passkeyChallenges[i].value === challenge) {
      user.passkeyChallenges[i].status = patch.status || user.passkeyChallenges[i].status;
      break;
    }
  }

  return await user.save();
}

async function removeUserPasskey(name: string): Promise<UserDocument> {
  const user = await getUser(true);

  if (user.passkeys.find(passkey => passkey.name === name) === undefined) {
    throw { status: 404, message: `passkey '${name}' does not exist` } as BaseError;
  }

  user.passkeys = user.passkeys.filter(passkey => passkey.name !== name);

  return await user.save();
}

export {
  addUserPasskey,
  addUserPasskeyChallenge,
  createUser,
  getUser,
  getUserByEmail,
  removeUserPasskey,
  updateUser,
  updateUserPasskey,
  updateUserPasskeyChallenge,
  updateUserPassword,
  UserDocument,
  UserModel
};
