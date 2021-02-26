const app = require("../../src/app");
const DB = require("../../src/data");

const userSchema = require("../../src/models/user_schema");

const factory = require("../modelFactory");
const testTool = require("../apiTestTool");
const auth = require("../../src/controllers/helper/auth_helper");

const chai = require("chai");
const expect = chai.expect;
const supertest = require("supertest");
const request = supertest(app);

describe("MiddleWare: user endpoints", function () {
	before(async function () {
		await DB.connect();
	});

	after(async function () {
		await userSchema.deleteMany({});
		await DB.disconnect();
	});

	describe("GET user", function () {
		beforeEach(async function () {
			await userSchema.deleteMany({});
		});

		it("get user by id returns 200 and user", async function () {
			let factoryUser = factory.models.createUsers();
			let user = await userSchema.create(factoryUser);
			let token = await auth.getToken(user._id);
			let response = await request
				.get("/api/users/" + user._id)
				.set("Authorization", "bearer", +token)
				.expect(200);
			let body = testTool.parseTextIntoJson(response.text);
			expect(body.name).to.equal(user.name);
			expect(body.email).to.equal(user.email);
		});

		it("get all users returns 200 and array of users", async function () {
			let factoryUsers = factory.models.createUsers(5);
			let users = await userSchema.create(factoryUsers);
			let token = await auth.getToken(users[0]._id);
			let response = await request
				.get("/api/users/")
				.set("Authorization", "bearer" + token)
				.expect(200);
			let body = testTool.parseTextIntoJson(response.text);
			expect(body.length).to.equal(5);
		});
	});

	describe("PATCH user", function () {
		beforeEach(async function () {
			await userSchema.deleteMany({});
		});

		it("patch valid user id returns 200 and updated user", async function () {
			let factoryUser = factory.models.createUsers(2);

			let user1 = await userSchema.create(factoryUser[0]);
			let token = await auth.getToken(user1._id);

			let user2 = factoryUser[1];
			let patch = { name: user2.name, email: user2.email };

			let response = await request
				.patch("/api/users/" + user1._id)
				.set("Authorization", "bearer " + token)
				.send(patch)
				.expect(200);

			let body = testTool.parseTextIntoJson(response.text);
			expect(body.name).to.equal(patch.name);
			expect(body.email).to.equal(patch.email);
		});

		it("patch user with invalid token should return 401", async function () {
			let factoryObjectId = factory.mongoose.createObjectId();
			let patch = {};
			await request
				.patch("/api/users/" + factoryObjectId)
				.set("Authorization", "bearer " + 0)
				.send(patch)
				.expect(401);
		});
	});

	describe("DELETE user", function () {
		beforeEach(async function () {
			await userSchema.deleteMany({});
		});

		it("delete valid user id returns 203", async function () {
			let factoryUser = factory.models.createUsers();
			let user = await userSchema.create(factoryUser);
			let token = await auth.getToken(user._id);

			expect(await userSchema.countDocuments({})).to.equal(1);
			await request
				.delete("/api/users/" + user._id)
				.set("Authorization", "bearer " + token)
				.expect(203);
		});

		it("delete invalid user id returns 400", async function () {
			let factoryUser = factory.models.createUsers();
			let user = await userSchema.create(factoryUser);
			let token = await auth.getToken(user._id);
			let invalidUserId = "x";
			await request
				.delete("/api/users/" + invalidUserId)
				.set("Authorization", "bearer " + token)
				.expect(400);
		});
	});
});
