import App from "../../src/app";
import Database from "../../src/database";
import Chai from "chai";
import Supertest from "supertest";
import * as UserData from "../../src/data/user";
import { UserModel } from "../../src/data/models/user";
import * as Factory from "../factory";
import { IUser } from "../../src/types/user";
import * as TokenHelper from "../../src/helpers/token";

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

    it("post valid user should return 201 and user", async function () {
      const sampleUser = Factory.models.createUsers() as IUser;

      const response = await Request.post("/api/admin/users")
        .send(sampleUser)
        .expect(201);

      Expect(response.body.name).to.equal(sampleUser.name);
      Expect(response.body.email).to.equal(sampleUser.email);
    });

    it("post invalid user fields should return 400", async function () {
      await Request.post("/api/admin/users")
        .send({ email: "", name: "", password: "" })
        .expect(400);
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
