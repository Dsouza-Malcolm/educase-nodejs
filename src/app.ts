import express from "express";
import type { Application } from "express";
import { errorMiddleware } from "./middleware/errorMiddleware.js";
import router from "./schools/routes.js";

const app: Application = express();

app.use(express.json());

app.use("/api", router);

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use(errorMiddleware);

export default app;
