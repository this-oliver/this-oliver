import type { BaseError } from "./types/error";
import mongoose from "mongoose";
import { DB_URI } from "./config/env";

let connection: mongoose.Connection | undefined;

/**
 * Connect to database
 */
async function connect(): Promise<typeof mongoose> {
  const database = await mongoose.connect(DB_URI);
  connection = database.connection;

  return database;
}

/**
 * Disconnect from database
 */
async function disconnect() {
  await mongoose.disconnect();
  connection = undefined;
}

/**
 * Drop database
 */
async function drop() {
  if (!connection) {
    throw { status: 500, message: "no connection to database" } as BaseError;
  }

  return connection.dropDatabase();
}

export default {
  connection,
  connect,
  disconnect,
  drop
};
