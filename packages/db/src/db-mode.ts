/**
 * Database mode — Postgres is primary when DATABASE_URL is set.
 * In-memory catalog/seed is only for local demo without a database.
 */
export function useDb(): boolean {
  const url = process.env.DATABASE_URL?.trim();
  return Boolean(url);
}
