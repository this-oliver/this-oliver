import App from "../../src/app";
import Database from "../../src/database";
import Chai from "chai";
import Supertest from "supertest";
import * as UserData from "../../src/data/users";
import { UserModel } from "../../src/data/models/user";
import * as Factory from "../factory";
import { IUser } from "../../src/types/user";
import * as TokenHelper from "../../src/utils/token";
import { ADMIN_SECRET } from "../../src/config/env";

const Expect = Chai.expect;
const Request = Supertest(App);

describe("User MiddleWare", function () {
  before(async function () {
    await Database.connect();
  });

  after(async function () {
    await Database.drop();
    await Database.disconnect();
  });

  describe("POST - user", function () {
    beforeEach(async function () {
      await UserModel.deleteMany({});
    });

    it("should return user and 201", async function () {
      const sampleUser = Factory.models.createUsers() as IUser;

      const response = await Request.post("/api/admin/users")
        .send({...sampleUser, adminSecret: ADMIN_SECRET}) // add admin secret to create user
        .expect(201);

      Expect(response.body.name).to.equal(sampleUser.name);
      Expect(response.body.email).to.equal(sampleUser.email);
    });

    it("should throw 400 if user has invalid fields", async function () {
      await Request.post("/api/admin/users")
        .send({ email: "", name: "", password: "", adminSecret: ADMIN_SECRET})
        .expect(400);
    });

    it("should throw 401 if admin secret is missing", async function () {
      const sampleUser = Factory.models.createUsers() as IUser;

      await Request.post("/api/admin/users")
        .send({...sampleUser})
        .expect(401);
    });
  });

  describe("GET - users", function () {
    beforeEach(async function () {
      await UserModel.deleteMany({});
    });

    it("get user should return 200 and user", async function () {
      const factoryUser = Factory.models.createUsers();
      const user = await UserModel.create(factoryUser);

      const response = await Request.get(`/api/users/oliver`).expect(200);

      const body = response.body;
      Expect(body.name).to.equal(user.name);
      Expect(body.email).to.equal(user.email);
    });
  });

  describe("PATCH - user", function () {
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

    it("should update user succesfully and return 200 + user", async function () {
      const user = await UserData.getUser();
      const token = TokenHelper.getToken(user._id)
      const patch: Partial<IUser> = { name: "new name", email: "new@email.com" };

      const response = await Request.patch(`/api/admin/users`)
        .auth(token, { type: "bearer" })
        .send(patch);

      Expect(response.statusCode).to.equal(200);
      Expect(response.body.name).to.equal(patch.name);
      Expect(response.body.email).to.equal(patch.email);
    });

    it("should return 401 + user if token is missing", async function () {
      const user = await UserData.getUser();
      const patch: Partial<IUser> = { name: "new name", email: "new@email.com" };

      const response = await Request.patch(`/api/admin/users`)
        .send(patch);

      Expect(response.statusCode).to.equal(401);
      Expect(response.body).to.be.a.string;
    });
  });
});
