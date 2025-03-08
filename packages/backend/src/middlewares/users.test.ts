import type { IUser } from "../types/user";
import Chai from "chai";
import Supertest from "supertest";
import App from "../app";
import { ADMIN_SECRET } from "../config/env";
import { UserModel } from "../data/models/user";
import * as UserData from "../data/users";
import Database from "../database";
import * as Factory from "../tests/factory";
import * as TokenHelper from "../utils/token";

const Expect = Chai.expect;
const Request = Supertest(App);

describe("user MiddleWare", () => {
  before(async () => {
    await Database.connect();
  });

  after(async () => {
    await Database.drop();
    await Database.disconnect();
  });

  describe("post - user", () => {
    beforeEach(async () => {
      await UserModel.deleteMany({});
    });

    it("should return user and 201", async () => {
      const sampleUser = Factory.models.createUsers() as IUser;

      const response = await Request.post("/api/admin/users")
        .send({ ...sampleUser, adminSecret: ADMIN_SECRET }) // add admin secret to create user
        .expect(201);

      Expect(response.body.name).to.equal(sampleUser.name);
      Expect(response.body.email).to.equal(sampleUser.email);
    });

    it("should throw 400 if user has invalid fields", async () => {
      await Request.post("/api/admin/users")
        .send({ email: "", name: "", password: "", adminSecret: ADMIN_SECRET })
        .expect(400);
    });

    it("should throw 401 if admin secret is missing", async () => {
      const sampleUser = Factory.models.createUsers() as IUser;

      await Request.post("/api/admin/users")
        .send({ ...sampleUser })
        .expect(401);
    });
  });

  describe("get - users", () => {
    let user: IUser | undefined;

    before(async () => {
      await UserModel.deleteMany({});

      const factoryUser = Factory.models.createUsers();
      user = await UserModel.create(factoryUser);
    });

    after(async () => {
      await UserModel.deleteMany({});
    });

    it("get user should return 200 and user", async () => {
      const response = await Request.get("/api/users/oliver").expect(200);

      const body = response.body;
      Expect(body.name).to.equal(user?.name);
    });

    it("get user with 200 should not return user email", async () => {
      const response = await Request.get("/api/users/oliver").expect(200);

      const body = response.body;
      Expect(body.email).to.be.undefined;
    });
  });

  describe("patch - user", () => {
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

    it("should update user succesfully and return 200 + user", async () => {
      const user = await UserData.getUser();
      const token = TokenHelper.getToken(user._id);
      const patch: Partial<IUser> = {
        name: "new name",
        email: "new@email.com"
      };

      const response = await Request.patch("/api/admin/users")
        .auth(token, { type: "bearer" })
        .send(patch);

      Expect(response.statusCode).to.equal(200);
      Expect(response.body.name).to.equal(patch.name);
      Expect(response.body.email).to.equal(patch.email);
    });

    it("should return 401 + user if token is missing", async () => {
      const patch: Partial<IUser> = {
        name: "new name",
        email: "new@email.com"
      };

      const response = await Request.patch("/api/admin/users").send(patch);

      Expect(response.statusCode).to.equal(401);
      Expect(response.body).to.be.a.string;
    });
  });
});
