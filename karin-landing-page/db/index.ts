import postgres from "postgres";
let client: ReturnType<typeof postgres> | undefined;
/** Lazy connections let the page build before a database is configured. */
export function getDb() {
  const connection = process.env.DATABASE_URL;
  if (!connection) throw new Error("DATABASE_URL is not configured.");
  if (!client)
    client = postgres(connection, {
      prepare: false,
      max: 2,
      idle_timeout: 20,
      connect_timeout: 10,
    });
  return client;
}
