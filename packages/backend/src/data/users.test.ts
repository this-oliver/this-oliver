import type { IUser } from "../types/user";
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
});
