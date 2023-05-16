import { DB_URI } from "./config/env";
import mongoose from "mongoose";

const connection = mongoose.connection;

/**
 * Connect to database
 */
async function connect(): Promise<typeof mongoose> {
	return await mongoose.connect(DB_URI);
}

/**
 * Disconnect from database
 */
async function disconnect() {
	return await mongoose.disconnect();
}

/**
 * Drop database
 */
async function drop () {
	return connection.dropDatabase();
}

export default {
	connection,
	connect,
	disconnect,
	drop
};