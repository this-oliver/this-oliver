const { DB_URI } = require("./config/env");
const Database = require("mongoose");

process.env.MONGODB = DB_URI;

exports.connection = Database.connection;

exports.connect = async () => {
	return await Database.connect(
		process.env.MONGODB,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
		},
		function (err) {
			if (err) {
				console.error(
					`Failed to connect to MongoDB with URI '${process.env.MONGODB}' and NODE_ENV '${process.env.NODE_ENV}'`
				);
				console.error(err.stack);
				process.exit(1);
			}
		}
	);
};

exports.drop = async () => {
	return Database.connection.dropDatabase();
};

exports.disconnect = async () => {
	return await Database.disconnect();
};
