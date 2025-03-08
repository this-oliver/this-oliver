import process from "node:process";
import dotenv from "dotenv";

if (process.env.NODE_ENV === "testing") {
  dotenv.config({ path: ".env.test" });
} else {
  dotenv.config();
}

const NODE_ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || "4000";
const DB_URI: string = process.env.DB_URI as string;
const JWT_SECRET: string = process.env.JWT_SECRET as string;
const ADMIN_SECRET: string | undefined = process.env.ADMIN_SECRET;
const CORS_ORIGIN: string | undefined = process.env.CORS_ORIGIN;

if (!DB_URI) {
  console.error("No database URI. Set DB_URI environment variable.");
  process.exit(1);
}

if (!JWT_SECRET) {
  console.error("No JWT secret. Set JWT_SECRET environment variable.");
  process.exit(1);
}

export { ADMIN_SECRET, CORS_ORIGIN, DB_URI, JWT_SECRET, NODE_ENV, PORT };
