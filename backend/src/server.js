const { NODE_ENV, PORT, DB_URI } = require("./config/env");
const app = require("./app");
const db = require("./database");

db.connect().catch((error) => {
	console.error(error);
	return;
});

app.listen(PORT, function (err) {
	if (err) throw err;
	console.log(`\nExpress server listening on port ${PORT}, in ${NODE_ENV} mode`);
	console.log(`Server: http://localhost:${PORT}/api/`);
	console.log(`Database: ${DB_URI}\n`);
});

module.exports = app;
