import type { IUser } from "../types/user";
import type { PasskeyAuthBody, PasskeyRegistrationAuthBody } from "./auth";
import Chai from "chai";
import Supertest from "supertest";
import App from "../app";
import { UserModel } from "../data/models/user";
import * as UserData from "../data/users";
import Database from "../database";
import * as Factory from "../tests/factory";
import * as TokenHelper from "../utils/token";

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

  describe("post - /api/auth/login", () => {
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

  describe("post - /api/auth/login/passkey", () => {
    let sampleUser: IUser;

    before(async () => {
      await UserModel.deleteMany({});

      sampleUser = Factory.models.createUsers() as IUser;
      await UserData.createUser(sampleUser.name, sampleUser.email, sampleUser.password);
    });

    it("(init stage) should return a challenge and 200", async () => {
      const response = await Request.post("/api/auth/login/passkey")
        .send({ stage: "init", type: "passkey" } as PasskeyAuthBody)
        .expect(200);

      Expect(response.body.challenge).to.exist;
    });

    it("(init stage) should add a 'login' challenge to the user's passkey challenge list and return 200", async () => {
      const response = await Request.post("/api/auth/login/passkey")
        .send({ email: sampleUser.email, stage: "init", type: "passkey" } as PasskeyAuthBody)
        .expect(200);

      Expect(response.body.challenge).to.exist;
      const challenge = response.body.challenge;

      const user = await UserData.getUser(true);

      const passkeyChallenge = user.passkeyChallenges.find((passkeyChallenge) => {
        return passkeyChallenge.value === challenge;
      });
      Expect(passkeyChallenge).to.not.be.undefined;
      Expect(passkeyChallenge?.type).to.equal("login");
      Expect(passkeyChallenge?.value).to.equal(challenge);
    });

    it("(completion phase) should return {user, token} and 200 if challenge is solved");

    it("(completion phase) should return 401 if challenge is not solved");
  });

  describe("post - /api/auth/register/passkey", () => {
    let sampleUser: IUser;
    let token: string;

    before(async () => {
      await UserModel.deleteMany({});

      sampleUser = Factory.models.createUsers() as IUser;
      const user = await UserData.createUser(sampleUser.name, sampleUser.email, sampleUser.password);
      token = TokenHelper.getToken(user.id);
    });

    it("(init stage) should return a public key request and 200", async () => {
      const response = await Request.post("/api/auth/register/passkey")
        .set("Authorization", `Bearer ${token}`)
        .send({ email: sampleUser.email, stage: "init", type: "passkey" } as PasskeyRegistrationAuthBody)
        .expect(200);

      Expect(response.body.challenge).to.exist;
    });

    it("(init stage) should add a 'registration' challenge to the user's passkey challenge list and return 200", async () => {
      const response = await Request.post("/api/auth/register/passkey")
        .set("Authorization", `Bearer ${token}`)
        .send({ email: sampleUser.email, stage: "init", type: "passkey" } as PasskeyRegistrationAuthBody)
        .expect(200);

      Expect(response.body.challenge).to.exist;
      const challenge = response.body.challenge;

      const user = await UserData.getUser(true);

      const passkeyChallenge = user.passkeyChallenges.find((passkeyChallenge) => {
        return passkeyChallenge.value === challenge;
      });
      Expect(passkeyChallenge).to.not.be.undefined;
      Expect(passkeyChallenge?.type).to.equal("register");
      Expect(passkeyChallenge?.value).to.equal(challenge);
    });

    it("(completion phase) should add a passkey to the user's passkey list if challenge is solved and return 200", async () => {
      // create a valid key pair
      // create registration challenge
      // solve the challenge with the key pair
      // check if the passkey is added to the user's passkey list
    });

    it("(completion phase) should return 401 if challenge is not solved");
  });

  describe("patch - /api/auth/passwords", () => {
    let sampleUser: IUser;
    let token: string;

    before(async () => {
      await UserModel.deleteMany({});

      sampleUser = Factory.models.createUsers() as IUser;
      const user = await UserData.createUser(sampleUser.name, sampleUser.email, sampleUser.password);
      token = TokenHelper.getToken(user.id);
    });

    it("should update user's passwords and return 200", async () => {
      const newPassword = "new_password";
      await Request.patch("/api/auth/passwords")
        .set("Authorization", `Bearer ${token}`)
        .send({
          oldPassword: sampleUser.password,
          newPassword
        })
        .expect(200);

      const user = await UserData.getUser(true);
      const isMatching = await user.verifyPassword(newPassword);
      Expect(isMatching).to.be.true;
    });

    it("should fail with 401 if provided token is invalid", async () => {
      await Request.patch("/api/auth/passwords")
        .set("Authorization", "Bearer invalid_token")
        .send({
          oldPassword: sampleUser.password,
          newPassword: "new_password"
        })
        .expect(401);
    });

    it("should fail with 401 if no token is provided", async () => {
      await Request.patch("/api/auth/passwords")
        .send({
          oldPassword: sampleUser.password,
          newPassword: "new_password"
        })
        .expect(401);
    });
  });
});
