import { readFile } from "node:fs/promises";
import postgres from "postgres";
if (!process.env.DATABASE_URL) {
  console.error(
    "Set DATABASE_URL in .env.local or the shell environment first.",
  );
  process.exit(1);
}
const sql = postgres(process.env.DATABASE_URL, { max: 1, prepare: false });
try {
  const schema = await readFile(
    new URL("../db/schema.sql", import.meta.url),
    "utf8",
  );
  // The checked-in schema, never user-provided SQL.
  await sql.unsafe(schema);
  console.log("Seller review database schema is ready.");
} catch {
  console.error(
    "Database setup failed. Check your connection and database permissions.",
  );
  process.exitCode = 1;
} finally {
  await sql.end();
}
