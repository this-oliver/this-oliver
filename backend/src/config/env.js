const dotenv = require("dotenv");

if (process.env.NODE_ENV === "testing") {
	// get .env.test file
	dotenv.config({ path: ".env.test" });
} else {
	// get .env file
	dotenv.config();
}

module.exports = {
	// node environment
	NODE_ENV: process.env.NODE_ENV,
	// server port
	PORT: process.env.PORT || 3001,
	// database uri
	DB_URI: process.env.DB_URI,
	// json web token secret
	JWT_SECRET: process.env.JWT_SECRET,
};
