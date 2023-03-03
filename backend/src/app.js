const { NODE_ENV } = require("./config/env");
const express = require("express");
const cors = require("cors");
const router = require("./router");
const app = express();

app.use(express.json());
app.use(cors());

if (NODE_ENV == "development") {
	const morgan = require("morgan");
	app.use(morgan("dev"));
}

app.use(router);

app.use(function (err, req, res) {
	console.error(err.stack);
	
	const err_res = {
		message: err.message,
		error: {}, 
	};

	if (NODE_ENV == "development") {
		err_res.error = err;
	}
	
	res.status(err.status || 500);
	res.json(err_res);
});

module.exports = app;
