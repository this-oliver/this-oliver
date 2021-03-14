const Router = require("express").Router();
const BodyParser = require("body-parser");

const Auth = require("./auth");
const User = require("./user");

Router.use(BodyParser.urlencoded({ extended: false }));
Router.use(BodyParser.json());

const BaseRoute = "/api";

Router.get("/", (req, res) => {
	return res.status(200).send("welcome to olivermanzi's api");
});

Router.get(BaseRoute, (req, res) => {
	return res.status(200).send("root");
});

/* ROUTES */
//* Authentication
Router.post(BaseRoute + "/auth/login", Auth.loginUser);

//* Users
Router.post(BaseRoute + "/users", User.postUser);
Router.get(BaseRoute + "/users", User.getAllUsers);
Router.get(BaseRoute + "/users/:id", User.getSingleUser);
Router.patch(BaseRoute + "/users/:id", User.patchUser);
Router.delete(BaseRoute + "/users/:id", User.deleteUser);

module.exports = Router;
