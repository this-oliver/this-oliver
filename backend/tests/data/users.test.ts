import Database from "../../src/database";
import Chai from "chai";
import ChaiAsPromise from "chai-as-promised";
import * as UserData from "../../src/data/users";
import { UserModel } from "../../src/data/models/user";
import * as Factory from "../factory";
import type { IUser } from "../../src/types/user";

Chai.use(ChaiAsPromise);
const Expect = Chai.expect;

describe("User Data", function () {
	before(async function () {
		await Database.connect();
	});

	after(async function () {
		await Database.drop();
		await Database.disconnect();
	});

	describe("createUser()", function () {
		beforeEach(async function () {
			await UserModel.deleteMany({});
		});

    it("should post user successfully", async function () {
      const user = Factory.models.createUsers() as IUser;
      const postedUser = await UserData.createUser(user.name, user.email, user.password);
      Expect(postedUser.name).to.equal(user.name);
      Expect(postedUser.email).to.equal(user.email);
    });

    it("should not save password as plain text", async function () {
      const user = Factory.models.createUsers() as IUser;
      const postedUser = await UserData.createUser(user.name, user.email, user.password);
      Expect(postedUser.password).to.not.equal(user.password);
    });

    it("should throw error if user already exists", async function () {
      const user = Factory.models.createUsers() as IUser;
      await UserData.createUser(user.name, user.email, user.password);

      let errorThrown = false;
      try {
        await UserData.createUser(user.name, user.email, user.password)
      } catch (error) {
        errorThrown = true;        
      }

      Expect(errorThrown).to.be.true;
    });
	});

	describe("getUser()", function () {
		let sampleUser: IUser;

		before(async function () {
			await UserModel.deleteMany({});

			sampleUser = Factory.models.createUsers() as IUser;
      await UserData.createUser(
				sampleUser.name,
				sampleUser.email,
				sampleUser.password
			);
		});

    it("should get user successfully", async function () {
      const user = await UserData.getUser();
      Expect(user.name).to.equal(sampleUser.name);
      Expect(user.email).to.equal(sampleUser.email);
    });

    it("should redact password and salt", async function () {
      const user = await UserData.getUser();
      Expect(user.password).to.be.undefined;
      Expect(user.salt).to.be.undefined;
    });

    it("should show password and salt if requested", async function () {
      const user = await UserData.getUser(true);
      Expect(user.password).to.not.be.undefined;
      Expect(user.salt).to.not.be.undefined;
    });

    it("should throw error if user does not exist", async function () {
      await UserModel.deleteMany({});

      let errorThrown = false;
      try {
        await UserData.getUser();
      } catch (error) {
        errorThrown = true;
      }

      Expect(errorThrown).to.be.true;
    });
  });

  describe("getUserByEmail()", function () {
    let sampleUser: IUser;

    before(async function () {
      await UserModel.deleteMany({});
      sampleUser = Factory.models.createUsers() as IUser;
      await UserData.createUser(
        sampleUser.name,
        sampleUser.email,
        sampleUser.password
      );
    });

    it("should get user successfully", async function () {
      const user = await UserData.getUserByEmail(sampleUser.email);
      Expect(user.name).to.equal(sampleUser.name);
      Expect(user.email).to.equal(sampleUser.email);
    });

    it("should redact password and salt", async function () {
      const user = await UserData.getUserByEmail(sampleUser.email);
      Expect(user.password).to.be.undefined;
      Expect(user.salt).to.be.undefined;
    });

    it("should show password and salt if requested", async function () {
      const user = await UserData.getUserByEmail(sampleUser.email, true);
      Expect(user.password).to.not.be.undefined;
      Expect(user.salt).to.not.be.undefined;
    });

    it("should throw error if user does not exist", async function () {
      let errorThrown = false;
      
      try {
        await UserData.getUserByEmail("invalid email");
      } catch (error) {
        errorThrown = true;
      }

      Expect(errorThrown).to.be.true;
    });
  });

	describe("updateUser()", function () {
    let sampleUser: IUser;

		before(async function () {
			await UserModel.deleteMany({});
      sampleUser = Factory.models.createUsers() as IUser;

      await UserData.createUser(
        sampleUser.name,
        sampleUser.email,
        sampleUser.password
      );
		});

    it("should update user successfully", async function () {
      const patch = {
        name: 'new name',
        email: 'new email',
      };

      const updatedUser = await UserData.updateUser(patch);
      Expect(updatedUser.name).to.equal(patch.name);
      Expect(updatedUser.email).to.equal(patch.email);
    });

    it("should not update password", async function () {
      const user = await UserData.getUser();

      const patch = {
        password: 'new password',
      };

      const updatedUser = await UserData.updateUser(patch);

      Expect(updatedUser.password).to.equal(user.password);
    });
	});
});
