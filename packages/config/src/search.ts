/**
 * Product search helpers — UX (Postgres now; Meilisearch later if needed)
 */

export type ProductSearchParams = {
  q?: string;
  status?: "ACTIVE" | "DRAFT" | "ARCHIVED";
  productType?: string;
  minPrice?: number;
  maxPrice?: number;
  availableOnly?: boolean;
  limit?: number;
  offset?: number;
};

export function normalizeSearchQuery(q: string): string {
  return q.trim().replace(/\s+/g, " ").slice(0, 100);
}

export function searchTokens(q: string): string[] {
  const n = normalizeSearchQuery(q).toLowerCase();
  if (!n) return [];
  return n.split(" ").filter((t) => t.length >= 2);
}
