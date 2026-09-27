/**
 * Message queue job types — keep UI fast (async emails, compress, CAPI)
 */

export type JobName =
  | "email.order_confirmation"
  | "email.shipping_update"
  | "email.review_request"
  | "email.abandoned_cart"
  | "media.compress"
  | "analytics.purchase"
  | "analytics.capi"
  | "search.reindex_product";

export type JobPayload = {
  "email.order_confirmation": { orderId: string };
  "email.shipping_update": { orderId: string };
  "email.review_request": { orderId: string; productId: string };
  "email.abandoned_cart": { email: string; cartId: string };
  "media.compress": { mediaId: string; sourceUrl: string };
  "analytics.purchase": { orderId: string };
  "analytics.capi": { event: string; data: Record<string, unknown> };
  "search.reindex_product": { productId: string };
};

export async function enqueue<T extends JobName>(
  name: T,
  payload: JobPayload[T]
): Promise<{ id: string; name: T }> {
  const id = `job_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  if (process.env.NODE_ENV === "development") {
    console.info("[queue:enqueue]", name, payload, id);
  }
  return { id, name };
}
