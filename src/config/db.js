import fs from "fs";
import path from "path";
import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function runMigrations() {
  try {
    const schemaPath = path.resolve(process.cwd(), "ddl", "database_schema.sql");
    const schema = fs.readFileSync(schemaPath, "utf8");
    await pool.query(schema);
    console.log("Database schema applied successfully!");
  } catch (err) {
    console.error("Error running migrations:", err.message);
    throw err;
  }
}

export default pool;
