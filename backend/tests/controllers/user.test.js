// server and database
const App = require("../../src/app");
const Database = require("../../src/database");

// framework
const Chai = require("chai");
const Expect = Chai.expect;
const supertest = require("supertest");
const Request = supertest(App);

// data
const { UserModel } = require("../../src/data/user");
const ArticleData = require("../../src/data/article");

// helpers
const Factory = require("../factory");

describe("User in MiddleWare", function () {
	before(async function () {
		await Database.connect();
	});

	after(async function () {
		await Database.drop();
		await Database.disconnect();
	});

	describe("[GET]", function () {
		beforeEach(async function () {
			await UserModel.deleteMany({});
		});

		it("get user should return 200 and user", async function () {
			const factoryUser = Factory.models.createUsers();
			const user = await UserModel.create(factoryUser);

			const response = await Request.get(`/api/user`).expect(200);

			const body = response.body;
			Expect(body.name).to.equal(user.name);
			Expect(body.email).to.equal(user.email);
		});

		it("get user should not return articles that haven't been published", async function () {
			const factoryUser = Factory.models.createUsers();
			const user = await UserModel.create(factoryUser);

			const factoryPublishedArticle = Factory.models.createArticle(
				user._id,
				true,
				"publsihed article"
			);
			const factorySecretArticle = Factory.models.createArticle(
				user._id,
				false,
				"not publsihed article"
			);

			try {
				await ArticleData.postArticle(
					factoryPublishedArticle.author,
					factoryPublishedArticle.title,
					factoryPublishedArticle.content,
					null,
					factoryPublishedArticle.publish
				);
				
				await ArticleData.postArticle(
					factorySecretArticle.author,
					factorySecretArticle.title,
					factorySecretArticle.content,
					null,
					factorySecretArticle.publish
				);
			} catch (error) {
				// do nothing
			}

			const response = await Request.get(`/api/user`).expect(200);

			const body = response.body;
			Expect(body.name).to.equal(user.name);
			Expect(body.email).to.equal(user.email);
			Expect(body.articles.length).to.equal(1);
		});
	});

	describe("[PATCH]", function () {
		beforeEach(async function () {
			await UserModel.deleteMany({});
		});

		it("incrementing user visits should increase user visits by one and return 200 and user", async function () {
			const factoryUser = Factory.models.createUsers();
			await UserModel.create(factoryUser);

			const firstResponse = await Request.patch(`/api/user/visits`).expect(200);
			Expect(firstResponse.body.visits).to.equal(1);
			
			const secondResponse = await Request.patch(`/api/user/visits`).expect(200);
			Expect(secondResponse.body.visits).to.equal(2);
		});
	});
});
