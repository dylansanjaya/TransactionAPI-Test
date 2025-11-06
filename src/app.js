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
app.get("/", (req, res) => {
  res.send("Welcome to the Transaction API");
});

app.use("/", routes);

// Error handler
app.use(errorHandler);

// Run migrations before starting
await runMigrations();

app.listen(3000, () => {
  console.log(`Server running on port 3000`);
});

export default app;
