/**
 * Analytics config — first-party events + env-gated GA4 / Meta Pixel.
 * Full metric catalog is rendered in admin; external SEO/ads need GA4/GSC/Meta APIs later.
 */

export const analyticsEnv = {
  gaMeasurementId: process.env.NEXT_PUBLIC_GA_ID || "",
  metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID || "",
};

export const ANALYTICS_EVENTS = {
  page_view: "page_view",
  session_start: "session_start",
  session_end: "session_end",
  engagement: "engagement",
  add_to_cart: "add_to_cart",
  begin_checkout: "begin_checkout",
  purchase: "purchase",
  view_item: "view_item",
  search: "search",
  cta_click: "cta_click",
  outbound_click: "outbound_click",
  whatsapp_click: "whatsapp_click",
  form_start: "form_start",
  form_submit: "form_submit",
  error: "error",
} as const;

export type AnalyticsEventName =
  (typeof ANALYTICS_EVENTS)[keyof typeof ANALYTICS_EVENTS];
