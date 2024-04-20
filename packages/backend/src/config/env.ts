import dotenv from "dotenv";

if (process.env.NODE_ENV === "testing") {
	// get .env.test file
	dotenv.config({ path: ".env.test" });
} else {
	// get .env file
	dotenv.config();
}

const NODE_ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || "4000";
const DB_URI: string = process.env.DB_URI as string;
const JWT_SECRET: string = process.env.JWT_SECRET as string;
const ADMIN_SECRET: string | undefined = process.env.ADMIN_SECRET;

if(!DB_URI) {
	console.error("No database URI. Set DB_URI environment variable.");
	process.exit(1);
}

if(!JWT_SECRET) {
	console.error("No JWT secret. Set JWT_SECRET environment variable.");
	process.exit(1);
}

export { NODE_ENV, PORT, DB_URI, JWT_SECRET, ADMIN_SECRET };
