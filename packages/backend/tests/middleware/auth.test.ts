import type { IUser } from "../../src/types/user";
import Chai from "chai";
import Supertest from "supertest";
import App from "../../src/app";
import { UserModel } from "../../src/data/models/user";
import * as UserData from "../../src/data/users";
import Database from "../../src/database";
import * as Factory from "../factory";

const Expect = Chai.expect;
const Request = Supertest(App);

describe("auth Middleware", () => {
  before(async () => {
    await Database.connect();
  });

  // disconnect the db after testing everything
  after(async () => {
    await Database.drop();
    await Database.disconnect();
  });

  describe("pOST - /api/auth/login", () => {
    let sampleUser: IUser;

    before(async () => {
      await UserModel.deleteMany({});

      sampleUser = Factory.models.createUsers() as IUser;
      await UserData.createUser(sampleUser.name, sampleUser.email, sampleUser.password);
    });

    it("should return a user + token + 200 on a valid login", async () => {
      const response = await Request.post("/api/auth/login")
        .send({
          email: sampleUser.email,
          password: sampleUser.password
        })
        .expect(200);

      Expect(response.body.token).to.exist;
      Expect(response.body.user).to.exist;
    });

    it("login with invalid email returns 401", async () => {
      await Request.post("/api/auth/login")
        .send({
          email: "invalid@mail.com",
          password: sampleUser.password
        })
        .expect(401);
    });

    it("login with invalid password returns 401", async () => {
      await Request.post("/api/auth/login")
        .send({
          email: sampleUser.email,
          password: "invalid_password"
        })
        .expect(401);
    });

    it("login with invalid email and password returns 401", async () => {
      await Request.post("/api/auth/login")
        .send({
          email: "invalid@mail.com",
          password: "invalid_password"
        })
        .expect(401);
    });
  });
});
