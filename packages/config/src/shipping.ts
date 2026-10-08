/**
 * Server-authoritative shipping rates (Phase 1).
 * Client may select a method key only — never a cost.
 */

export type ShippingMethodId = "standard" | "express";

export const SHIPPING_METHODS: Record<
  ShippingMethodId,
  { label: string; costPkr: number }
> = {
  standard: {
    label: "Standard (3–5 days) · All Pakistan",
    costPkr: 250,
  },
  express: {
    label: "Express (1–2 days)",
    costPkr: 350,
  },
};

export const DEFAULT_SHIPPING_METHOD: ShippingMethodId = "standard";

/** Max units per line item (anti-abuse). */
export const MAX_LINE_QUANTITY = 20;

/** Max distinct line items per order. */
export const MAX_ORDER_LINES = 30;

export function resolveShippingCost(method?: string | null): {
  method: ShippingMethodId;
  costPkr: number;
} {
  const key =
    method === "express" ? "express" : ("standard" as ShippingMethodId);
  return { method: key, costPkr: SHIPPING_METHODS[key].costPkr };
}

export function isValidShippingMethod(
  method: string | null | undefined
): method is ShippingMethodId {
  return method === "standard" || method === "express";
}
