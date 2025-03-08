import cors from "cors";
import express from "express";
import morgan from "morgan";
import { CORS_ORIGIN, NODE_ENV } from "./config/env";
import router from "./router";

const app = express();

app.use(express.json());

if (NODE_ENV === "development") {
  app.use(morgan("dev"));
}

if (CORS_ORIGIN) {
  app.use(cors({ origin: CORS_ORIGIN }));
} else {
  app.use(cors());
}

app.use(router);

export default app;
