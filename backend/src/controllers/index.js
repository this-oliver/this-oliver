const router = require("express").Router();
const bodyParser = require("body-parser");

const Auth = require("./auth");
const User = require("./user");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const BaseRoute = "/api";

router.get("/", (req, res) => {
	return res.status(200).send("welcome to olivermanzi's api");
});

router.get(BaseRoute, (req, res) => {
	return res.status(200).send("root");
});

/* ROUTES */
//* Authentication
router.post(BaseRoute + "/auth/register", Auth.registerUser);
router.post(BaseRoute + "/auth/login", Auth.loginUser);

module.exports = router;
