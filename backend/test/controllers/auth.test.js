const app = require("../../src/app");
const DB = require("../../src/database");

const userSchema = require("../../src/models/user_schema");

const factory = require("../modelFactory");
const testTool = require("../apiTestTool");

const chai = require("chai");
const expect = chai.expect;
const supertest = require("supertest");
const request = supertest(app);

describe("MiddleWare: Auth and Register", function () {
	before(async function () {
		await DB.connect();
	});

	// disconnect the db after testing everything
	after(async function () {
		await DB.disconnect();
	});

	// delete all users before each test
	beforeEach(async function () {
		await userSchema.deleteMany({});
	});

	describe("Register user", function () {
		beforeEach(async function () {
			await userSchema.deleteMany({});
		});

		it("register valid user returns 201 and user", async function () {
			let factoryUser = factory.models.createUsers();
			let res = await request
				.post("/api/auth/register")
				.send(factoryUser)
				.expect(201);
			let user = testTool.parseTextIntoJson(res.text);
			expect(user.name).to.equal(factoryUser.name);
		});

		it("register invalid user fields returns 400", async function () {
			let res = await request
				.post("/api/auth/register")
				.send({ email: "", name: "", password: "" })
				.expect(400);
		});

		it("register user with existing email returns 400", async function () {
			let factoryUser = factory.models.createUsers();
			await userSchema.create(factoryUser);

			let res = await request
				.post("/api/auth/register")
				.send({
					email: factoryUser.email,
					name: "bob Test",
					password: "bob pa55word",
				})
				.expect(400);
		});
	});

	describe("Login user", function () {
		beforeEach(async function () {
			await userSchema.deleteMany({});
		});

		it("login valid user returns 200 and user+token", async function () {
			let factoryUser = factory.models.createUsers();
			await userSchema.create(factoryUser);

			let res = await request
				.post("/api/auth/login")
				.set("Accept", "application/json")
				.send({
					email: factoryUser.email,
					password: factoryUser.password,
				})
				.expect(200);
			let body = testTool.parseTextIntoJson(res.text);
			expect(body.token).to.exist;
			expect(body.user).to.exist;
		});

		it("login with invalid email returns 404", async function () {
			let factoryUser = factory.models.createUsers();

			await userSchema.create(factoryUser);
			await request
				.post("/api/auth/login")
				.send({
					email: "invalid@mail.com",
					password: factoryUser.password,
				})
				.expect(404);
		});

		it("login with invalid password returns 404", async function () {
			let factoryUser = factory.models.createUsers();

			await userSchema.create(factoryUser);
			await request
				.post("/api/auth/login")
				.send({
					email: factoryUser.email,
					password: "invalid_password",
				})
				.expect(404);
		});

		it("login with invalid email and password returns 404", async function () {
			let factoryUser = factory.models.createUsers();

			await userSchema.create(factoryUser);
			await request
				.post("/api/auth/login")
				.send({
					email: "invalid@mail.com",
					password: "invalid_password",
				})
				.expect(404);
		});
	});
});
