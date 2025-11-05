import express from "express";
import cors from "cors";
import { runMigrations } from "./config/db.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import routes from "./routes/index.js";

const app = express();

// Middlewares //
app.use(cors());
app.use(express.json());

app.use("/", routes);

app.use(errorHandler);

// Run migrations before starting the app //
await runMigrations();

export default app;