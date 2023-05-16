import App from "../../src/app";
import Database from "../../src/database";
import Chai from "chai";
import Supertest from "supertest";
import { UserModel } from "../../src/data/models/user";
import * as UserData from "../../src/data/users";
import * as Factory from "../factory";
import type { IUser } from "../../src/types/user";

const Expect = Chai.expect;
const Request = Supertest(App);

describe("Auth Middleware", function () {
	before(async function () {
		await Database.connect();
	});

	// disconnect the db after testing everything
	after(async function () {
		await Database.drop();
		await Database.disconnect();
	});

	describe("POST - /api/auth/login", function () {
		let sampleUser: IUser;
		
		before(async function () {
			await UserModel.deleteMany({});

			sampleUser = Factory.models.createUsers() as IUser;
      await UserData.createUser(sampleUser.name, sampleUser.email, sampleUser.password);
		});

		it("should return a user + token + 200 on a valid login", async function () {
			const response = await Request.post("/api/auth/login")
				.send({
					email: sampleUser.email,
					password: sampleUser.password,
				})
				.expect(200);

			Expect(response.body.token).to.exist;
			Expect(response.body.user).to.exist;
		});

		it("login with invalid email returns 401", async function () {
			await Request.post("/api/auth/login")
				.send({
					email: "invalid@mail.com",
					password: sampleUser.password,
				})
				.expect(401);
		});

		it("login with invalid password returns 401", async function () {
			await Request.post("/api/auth/login")
				.send({
					email: sampleUser.email,
					password: "invalid_password",
				})
				.expect(401);
		});

		it("login with invalid email and password returns 401", async function () {
			await Request.post("/api/auth/login")
				.send({
					email: "invalid@mail.com",
					password: "invalid_password",
				})
				.expect(401);
		});
	});
});
