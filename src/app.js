import express from "express";
import cors from "cors";
import { runMigrations } from "./config/db.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import routes from "./routes/index.js";


const app = express();

app.use(cors());
app.use(express.json());

// Swagger docs

// Routes
app.use("/", routes);

// Error handler
app.use(errorHandler);

// Run migrations before starting
await runMigrations();

export default app;
