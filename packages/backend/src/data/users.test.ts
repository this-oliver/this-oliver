import type { IUser, IUserPasskey, IUserPasskeyChallenge } from "../types/user";
import Chai from "chai";
import ChaiAsPromise from "chai-as-promised";
import Database from "../database";
import * as Factory from "../tests/factory";
import { UserModel } from "./models/user";
import * as UserData from "./users";

Chai.use(ChaiAsPromise);
const Expect = Chai.expect;

describe("user Data", () => {
  before(async () => {
    await Database.connect();
  });

  after(async () => {
    await Database.drop();
    await Database.disconnect();
  });

  describe("createUser()", () => {
    beforeEach(async () => {
      await UserModel.deleteMany({});
    });

    it("should post user successfully", async () => {
      const user = Factory.models.createUsers() as IUser;
      const postedUser = await UserData.createUser(user.name, user.email, user.password);
      Expect(postedUser.name).to.equal(user.name);
      Expect(postedUser.email).to.equal(user.email);
    });

    it("should not save password as plain text", async () => {
      const user = Factory.models.createUsers() as IUser;
      const postedUser = await UserData.createUser(user.name, user.email, user.password);
      Expect(postedUser.password).to.not.equal(user.password);
    });

    it("should throw error if user already exists", async () => {
      const user = Factory.models.createUsers() as IUser;
      await UserData.createUser(user.name, user.email, user.password);

      let errorThrown = false;
      try {
        await UserData.createUser(user.name, user.email, user.password);
      } catch {
        errorThrown = true;
      }

      Expect(errorThrown).to.be.true;
    });
  });

  describe("getUser()", () => {
    let sampleUser: IUser;

    before(async () => {
      await UserModel.deleteMany({});

      sampleUser = Factory.models.createUsers() as IUser;
      await UserData.createUser(
        sampleUser.name,
        sampleUser.email,
        sampleUser.password
      );
    });

    it("should get user successfully", async () => {
      const user = await UserData.getUser(true);
      Expect(user.name).to.equal(sampleUser.name);
      Expect(user.email).to.equal(sampleUser.email);
    });

    it("should redact password and salt", async () => {
      const user = await UserData.getUser();
      Expect(user.password).to.be.undefined;
      Expect(user.salt).to.be.undefined;
    });

    it("should show password and salt if requested", async () => {
      const user = await UserData.getUser(true);
      Expect(user.password).to.not.be.undefined;
      Expect(user.salt).to.not.be.undefined;
    });

    it("should throw error if user does not exist", async () => {
      await UserModel.deleteMany({});

      let errorThrown = false;
      try {
        await UserData.getUser();
      } catch {
        errorThrown = true;
      }

      Expect(errorThrown).to.be.true;
    });
  });

  describe("getUserByEmail()", () => {
    let sampleUser: IUser;

    before(async () => {
      await UserModel.deleteMany({});
      sampleUser = Factory.models.createUsers() as IUser;
      await UserData.createUser(
        sampleUser.name,
        sampleUser.email,
        sampleUser.password
      );
    });

    it("should get user successfully", async () => {
      const user = await UserData.getUserByEmail(sampleUser.email);
      Expect(user.name).to.equal(sampleUser.name);
    });

    it("should redact email, password and salt by default", async () => {
      const user = await UserData.getUserByEmail(sampleUser.email);
      Expect(user.email).to.be.undefined;
      Expect(user.password).to.be.undefined;
      Expect(user.salt).to.be.undefined;
    });

    it("should show email, password and salt if requested", async () => {
      const user = await UserData.getUserByEmail(sampleUser.email, true);
      Expect(user.password).to.not.be.undefined;
      Expect(user.salt).to.not.be.undefined;
    });

    it("should throw error if user does not exist", async () => {
      let errorThrown = false;

      try {
        await UserData.getUserByEmail("invalid email");
      } catch {
        errorThrown = true;
      }

      Expect(errorThrown).to.be.true;
    });
  });

  describe("updateUser()", () => {
    let sampleUser: IUser;

    before(async () => {
      await UserModel.deleteMany({});
      sampleUser = Factory.models.createUsers() as IUser;

      await UserData.createUser(
        sampleUser.name,
        sampleUser.email,
        sampleUser.password
      );
    });

    it("should update user successfully", async () => {
      const patch = {
        name: "new name",
        email: "new email"
      };

      const updatedUser = await UserData.updateUser(patch);
      Expect(updatedUser.name).to.equal(patch.name);
      Expect(updatedUser.email).to.equal(patch.email);
    });

    it("should not update password", async () => {
      const user = await UserData.getUser();

      const patch = { password: "new password" };

      const updatedUser = await UserData.updateUser(patch);

      Expect(updatedUser.password).to.equal(user.password);
    });
  });

  describe("updateUserPassword()", () => {
    let sampleUser: IUser;

    before(async () => {
      await UserModel.deleteMany({});
      sampleUser = Factory.models.createUsers() as IUser;

      await UserData.createUser(
        sampleUser.name,
        sampleUser.email,
        sampleUser.password
      );
    });

    it("should update password successfully", async () => {
      const oldPassword = sampleUser.password;
      const newPassword = "new password";

      const updatedUser = await UserData.updateUserPassword(
        oldPassword,
        newPassword
      );

      const match = await updatedUser.verifyPassword(newPassword);
      Expect(match).to.be.true;
    });

    it("should throw error if old password is incorrect", async () => {
      let errorThrown = false;

      try {
        await UserData.updateUserPassword("invalid old password", "new password");
      } catch {
        errorThrown = true;
      }

      Expect(errorThrown).to.be.true;
    });
  });

  describe("addUserPasskey()", () => {
    let sampleUser: IUser;

    beforeEach(async () => {
      await UserModel.deleteMany({});
      sampleUser = Factory.models.createUsers() as IUser;

      await UserData.createUser(
        sampleUser.name,
        sampleUser.email,
        sampleUser.password
      );
    });

    it("should add passkey successfully", async () => {
      const passkey = Factory.models.createPasskey() as IUserPasskey;

      const updatedUser = await UserData.addUserPasskey(
        passkey.name,
        passkey.publicKey,
        passkey.attestationObject,
        passkey.attestationFormat,
        passkey.transports
      );

      const addedPasskey = updatedUser.passkeys[0];
      Expect(addedPasskey.name).to.equal(passkey.name);
      Expect(addedPasskey.publicKey).to.equal(passkey.publicKey);
      Expect(addedPasskey.attestationObject).to.equal(passkey.attestationObject);
      Expect(addedPasskey.attestationFormat).to.equal(passkey.attestationFormat);
      Expect(addedPasskey.transports).to.deep.equal(passkey.transports);
    });

    it("should throw an error if passkey with same name already exists", async () => {
      const passkey = Factory.models.createPasskey() as IUserPasskey;

      await UserData.addUserPasskey(
        passkey.name,
        passkey.publicKey,
        passkey.attestationObject,
        passkey.attestationFormat,
        passkey.transports
      );

      let errorThrown = false;
      try {
        await UserData.addUserPasskey(
          passkey.name,
          passkey.publicKey,
          passkey.attestationObject,
          passkey.attestationFormat,
          passkey.transports
        );
      } catch {
        errorThrown = true;
      }

      Expect(errorThrown).to.be.true;
    });
  });

  describe("addUserPasskeyChallenge()", () => {
    let sampleUser: IUser;

    beforeEach(async () => {
      await UserModel.deleteMany({});
      sampleUser = Factory.models.createUsers() as IUser;

      await UserData.createUser(
        sampleUser.name,
        sampleUser.email,
        sampleUser.password
      );
    });

    it("should add a challenge to list of passkey challenges", async () => {
      const challenge: IUserPasskeyChallenge = { value: "challenge value", type: "register", status: "pending" };
      const updatedUser = await UserData.addUserPasskeyChallenge(challenge);

      Expect(updatedUser.passkeyChallenges.length).to.equal(1);
      Expect(updatedUser.passkeyChallenges[0].value).to.equal(challenge.value);
      Expect(updatedUser.passkeyChallenges[0].type).to.equal(challenge.type);
      Expect(updatedUser.passkeyChallenges[0].status).to.equal(challenge.status);
      Expect((updatedUser.passkeyChallenges[0] as unknown as any).createdAt).to.not.be.undefined;
    });
  });

  describe("updateUserPasskey()", () => {
    let sampleUser: IUser;
    let samplePasskeys: IUserPasskey[];

    beforeEach(async () => {
      await UserModel.deleteMany({});
      sampleUser = Factory.models.createUsers() as IUser;
      samplePasskeys = Factory.models.createPasskey({ num: 3 }) as IUserPasskey[];

      await UserData.createUser(
        sampleUser.name,
        sampleUser.email,
        sampleUser.password
      );

      for (const passkey of samplePasskeys) {
        await UserData.addUserPasskey(
          passkey.name,
          passkey.publicKey,
          passkey.attestationObject,
          passkey.attestationFormat,
          passkey.transports
        );
      }
    });

    it("should change passkey name if name is provided in patch", async () => {
      const newName = "new passkey name";
      const updatedUser = await UserData.updateUserPasskey(samplePasskeys[0].name, { name: newName });

      const updatedPasskey = updatedUser.passkeys.find(passkey => passkey.name === newName);
      Expect(updatedPasskey).to.not.be.undefined;
      Expect(updatedPasskey!.name).to.equal(newName);
      Expect(updatedPasskey!.counter).to.equal(samplePasskeys[0].counter);
    });

    it("should increment passkey counter if increment is true in patch", async () => {
      const updatedUser = await UserData.updateUserPasskey(samplePasskeys[0].name, { increment: true });

      const updatedPasskey = updatedUser.passkeys.find(passkey => passkey.name === samplePasskeys[0].name);
      Expect(updatedPasskey).to.not.be.undefined;
      Expect(updatedPasskey!.counter).to.equal(samplePasskeys[0].counter + 1);
    });

    it("should change name and increment counter if both are provided in patch", async () => {
      const newName = "new passkey name";
      const updatedUser = await UserData.updateUserPasskey(samplePasskeys[0].name, { name: newName, increment: true });

      const updatedPasskey = updatedUser.passkeys.find(passkey => passkey.name === newName);
      Expect(updatedPasskey).to.not.be.undefined;
      Expect(updatedPasskey!.name).to.equal(newName);
      Expect(updatedPasskey!.counter).to.equal(samplePasskeys[0].counter + 1);
    });

    it("should throw an error if new passkey name is the same as user's existing passkeys", async () => {
      let errorThrown = false;
      try {
        await UserData.updateUserPasskey(samplePasskeys[0].name, { name: samplePasskeys[1].name });
      } catch {
        errorThrown = true;
      }

      Expect(errorThrown).to.be.true;
    });
  });

  describe("updateUserPasskeyChallenge()", () => {
    let sampleUser: IUser;
    let samplePasskeyChallenges: IUserPasskeyChallenge[];

    beforeEach(async () => {
      await UserModel.deleteMany({});
      sampleUser = Factory.models.createUsers() as IUser;
      samplePasskeyChallenges = Factory.models.createPasskeyChallenge({ num: 3 }) as IUserPasskeyChallenge[];

      await UserData.createUser(
        sampleUser.name,
        sampleUser.email,
        sampleUser.password
      );

      for (const challenge of samplePasskeyChallenges) {
        await UserData.addUserPasskeyChallenge({
          value: challenge.value,
          status: challenge.status,
          type: challenge.type
        });
      }
    });

    it("should change passkey challenge status if challenge is provided in patch", async () => {
      // all passkey challenges should have a default status of "pending"
      for (const challenge of samplePasskeyChallenges) {
        Expect(challenge.status).to.equal("pending");
      }

      const newstatus = "completed";
      const updatedUser = await UserData.updateUserPasskeyChallenge(samplePasskeyChallenges[0].value, { status: newstatus });
      Expect(updatedUser.passkeyChallenges[0].status).to.equal(newstatus);
    });

    it("should throw an error if challenge passed does not exist in user's passkey challenges list", async () => {
      let errorThrown = false;
      try {
        await UserData.updateUserPasskeyChallenge("invalid passkey challenge value", { status: "completed" });
      } catch {
        errorThrown = true;
      }

      Expect(errorThrown).to.be.true;
    });
  });

  describe("removeUserPasskey()", () => {
    let sampleUser: IUser;
    let samplePasskeys: IUserPasskey[];

    beforeEach(async () => {
      await UserModel.deleteMany({});
      sampleUser = Factory.models.createUsers() as IUser;
      samplePasskeys = Factory.models.createPasskey({ num: 3 }) as IUserPasskey[];

      await UserData.createUser(
        sampleUser.name,
        sampleUser.email,
        sampleUser.password
      );

      for (const passkey of samplePasskeys) {
        await UserData.addUserPasskey(
          passkey.name,
          passkey.publicKey,
          passkey.attestationObject,
          passkey.attestationFormat,
          passkey.transports
        );
      }
    });

    it("should remove a passkey from user's passkey list by name", async () => {
      const updatedUser = await UserData.removeUserPasskey(samplePasskeys[0].name);

      Expect(updatedUser.passkeys.length).to.equal(samplePasskeys.length - 1);

      for (const passkey of updatedUser.passkeys) {
        Expect(passkey.name).to.not.equal(samplePasskeys[0].name);
      }
    });

    it("should throw an error if passkey with given name doesn't exist", async () => {
      let errorThrown = false;
      try {
        await UserData.removeUserPasskey("invalid passkey name");
      } catch {
        errorThrown = true;
      }

      Expect(errorThrown).to.be.true;
    });
  });
});
