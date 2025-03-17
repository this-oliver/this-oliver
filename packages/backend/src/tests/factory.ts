import type { AuthenticatorTransportFuture } from "@simplewebauthn/server";
import type { INote } from "../types/note";
import type { IUser, IUserPasskey, IUserPasskeyChallenge } from "../types/user";
import mongoose from "mongoose";

const mongo = {
  createObjectId: () => {
    return new mongoose.Types.ObjectId();
  }
};

const models = {
  createUsers: (num = 1): Partial<IUser>[] | Partial<IUser> => {
    if (num <= 1) {
      return {
        name: "user 0",
        email: "user0@mail.com",
        password: "password"
      };
    } else {
      const users: Partial<IUser>[] = [];

      for (let i = 0; i < num; i++) {
        users.push({
          name: `user${i}`,
          email: `user${i}@mail.com`,
          password: `password${i}`
        });
      }
      return users;
    }
  },

  createNote: ({
    num = 1,
    publish = true,
    title = "test title",
    content = "content for stuff to test",
    tags = [] as string[]
  } = {}): Partial<INote> | Partial<INote>[] => {
    if (num <= 1) {
      return {
        title,
        content,
        tags,
        publish
      };
    } else {
      const notes: Partial<INote>[] = [];
      for (let i = 0; i < num; i++) {
        notes.push({
          title: `${title} ${i}`,
          content: `${content} ${i}`,
          tags,
          publish
        });
      }
      return notes;
    }
  },

  createPasskey: ({
    num = 1,
    name = "test key",
    publicKey = new Uint8Array(32),
    attestationObject = new Uint8Array(64),
    attestationFormat = "packed",
    transports = ["hybrid", "nfc", "usb", "ble", "internal"] as AuthenticatorTransportFuture[]
  } = {}): Partial<IUserPasskey> | Partial<IUserPasskey>[] => {
    const passkeys: Partial<IUserPasskey>[] = [];

    for (let i = 0; i < num; i++) {
      passkeys.push({
        name: `${name} ${i}`,
        publicKey: Array.from(publicKey).toString(),
        attestationObject: Array.from(attestationObject).toString(),
        attestationFormat,
        transports,
        counter: 0
      });
    }

    return num === 1 ? passkeys[0] : passkeys;
  },

  createPasskeyChallenge: ({
    num = 1,
    value = "test",
    type = "register" as "register" | "login",
    status = "pending" as "pending" | "completed"
  } = {}): Partial<IUserPasskeyChallenge> | Partial<IUserPasskeyChallenge>[] => {
    const passkeyChallenges: Partial<IUserPasskeyChallenge>[] = [];

    for (let i = 0; i < num; i++) {
      passkeyChallenges.push({
        value: `${value} ${i}`,
        type,
        status
      });
    }

    return num === 1 ? passkeyChallenges[0] : passkeyChallenges;
  }
};

export { models, mongo };
