const chai = require("chai");
const expect = chai.expect;
const chaiAsPromise = require("chai-as-promised");
chai.use(chaiAsPromise);

const DB = require("../../src/database");
const userModel = require("../../src/models/user");
const userData = require("../../src/data/user");

const factory = require("../modelFactory");

describe("Data Handler: user model", function () {
	before(async function () {
		await DB.connect();
	});

	after(async function () {
		await DB.disconnect();
	});

	describe("register user", function () {
		beforeEach(async function () {
			await userModel.deleteMany({});
		});

		it("registers valid user", async function () {
			let dummy = factory.models.createUsers();
			await userData.register(dummy.name, dummy.email, dummy.password);
			let user = await userModel.findOne({ email: dummy.email });
			expect(user.name).to.equal(dummy.name);
		});

		it("should not register user with existing email", async function () {
			let user = factory.models.createUsers();
			await userData.register(user.name, user.email, user.password);
			let registerUser = userData.register(
				user.name,
				user.email,
				user.password
			);
			await expect(registerUser).to.be.rejectedWith({
				status: 400,
				message: "User already exists",
			});
		});

		it("should not register user with out name/email/password", async function () {
			await expect(userData.register("", "", "")).to.be.rejectedWith({
				status: 400,
				message: "user values are invalid",
			});
		});
	});

	describe("login user", function () {
		beforeEach(async function () {
			await userModel.deleteMany({});
		});

		it("invalid login should return null", async function () {
			let loginUser = userData.login("dummy@mail.com", "dummy_password");
			await expect(loginUser).to.be.rejectedWith({
				status: 404,
				message: "User does not exist",
			});
		});

		it("valid login should return user", async function () {
			let factoryUser = factory.models.createUsers();
			await userData.register(
				factoryUser.name,
				factoryUser.email,
				factoryUser.password
			);
			let user = await userData.login(factoryUser.email, factoryUser.password);
			expect(user.name).to.equal(factoryUser.name);
			expect(user.email).to.equal(factoryUser.email);
		});
	});

	describe("get user(s)", function () {
		beforeEach(async function () {
			await userModel.deleteMany({});
		});

		it("getAllUsers return empty list", async function () {
			let users = await userData.getAllUsers();
			expect(users.length).to.equal(0);
		});

		it("getAllUsers should return all five users", async function () {
			let factoryUsers = factory.models.createUsers(5);
			await userModel.create(factoryUsers);

			let users = await userData.getAllUsers();
			expect(users.length).to.equal(5);
		});

		it("get user with invalid userId should throw expected error", async function () {
			let invalidId = factory.mongoose.createObjectId();
			let getUser = userData.getUserById(invalidId);
			await expect(getUser).to.be.empty;
		});

		it("gets user with valid userId should return user", async function () {
			let factoryUser = factory.models.createUsers();

			let createdUser = await userModel.create(factoryUser);
			let user = await userData.getUserById(createdUser._id);
			expect(user.name).to.equal(createdUser.name);
			expect(user.email).to.equal(createdUser.email);
		});
	});

	describe("update user", function () {
		beforeEach(async function () {
			await userModel.deleteMany({});
		});
		it("update valid user should return updated user", async function () {
			let factoryUsers = factory.models.createUsers(2);

			let patch = { name: factoryUsers[1].name, email: factoryUsers[1].email };

			let user = await userModel.create(factoryUsers[0]);
			let update = await userData.updateUser(user._id, patch);

			expect(update.name).to.equal(patch.name);
			expect(update.email).to.equal(patch.email);
		});

		it("update invalid user should return error", async function () {
			let invalidUserId = factory.mongoose.createObjectId();
			let updateUser = userData.updateUser(invalidUserId, {});
			await expect(updateUser).to.be.rejectedWith({
				status: 404,
				message: "User does not exists",
			});
		});

		it("update user with email that already exists should throw error ", async function () {
			let factoryUsers = factory.models.createUsers(2);

			let user1 = await userModel.create(factoryUsers[0]);
			let patch = { email: user1.email };

			let user2 = await userModel.create(factoryUsers[1]);
			let updateUser = userData.updateUser(user2._id, patch);
			await expect(updateUser).to.be.rejectedWith({
				status: 404,
				message: patch.email + " already exists",
			});
		});
	});

	describe("delete user", function () {
		beforeEach(async function () {
			await userModel.deleteMany({});
		});
		it("delete with valid userId user should be success", async function () {
			let factoryUser = factory.models.createUsers();
			let user = await userModel.create(factoryUser);
			expect(await userModel.estimatedDocumentCount()).to.equal(1);
			await userData.deleteUser(user._id);
			expect(await userModel.estimatedDocumentCount()).to.equal(0);
		});
		it("user locations are deleted with user", async function () {
			let factoryUser = factory.models.createUsers();
			let user = await userModel.create(factoryUser);

			let factoryLocations = factory.models.createLocations(user._id, 5);
			await locationModel.create(factoryLocations);

			expect(await userModel.estimatedDocumentCount()).to.equal(1);
			expect(await locationModel.estimatedDocumentCount()).to.equal(5);
			await userData.deleteUser(user._id);
			expect(await userModel.estimatedDocumentCount()).to.equal(0);
			expect(await locationModel.estimatedDocumentCount()).to.equal(0);
		});
		it("delete with invalid userId should throw error", async function () {
			let invalidUserId = factory.mongoose.createObjectId();
			let deleteUser = userData.deleteUser(invalidUserId);
			await expect(deleteUser).to.be.rejectedWith({
				status: 404,
				message: "User does not exists",
			});
		});
	});
});
