/**
 * In-memory first-party analytics store (dev + single-instance).
 * Production: swap for Postgres AnalyticsEvent table or warehouse.
 */

export type AnalyticsHit = {
  id: string;
  type: string;
  path?: string;
  sessionId: string;
  userId?: string;
  ts: number;
  durationMs?: number;
  engaged?: boolean;
  props?: Record<string, unknown>;
  source?: string;
  medium?: string;
  campaign?: string;
  device?: string;
  country?: string;
};

const hits: AnalyticsHit[] = [];
const MAX = 50_000;

export function recordHit(hit: Omit<AnalyticsHit, "id" | "ts"> & { ts?: number }) {
  const row: AnalyticsHit = {
    id: `h${Date.now()}${Math.random().toString(36).slice(2, 7)}`,
    ts: hit.ts ?? Date.now(),
    type: hit.type,
    path: hit.path,
    sessionId: hit.sessionId,
    userId: hit.userId,
    durationMs: hit.durationMs,
    engaged: hit.engaged,
    props: hit.props,
    source: hit.source,
    medium: hit.medium,
    campaign: hit.campaign,
    device: hit.device,
    country: hit.country,
  };
  hits.push(row);
  if (hits.length > MAX) hits.splice(0, hits.length - MAX);
  return row;
}

export function getHits(sinceMs?: number): AnalyticsHit[] {
  if (!sinceMs) return [...hits];
  return hits.filter((h) => h.ts >= sinceMs);
}

export function summarizeAnalytics(orders: any[], sinceDays = 30) {
  const since = Date.now() - sinceDays * 24 * 60 * 60 * 1000;
  const window = getHits(since);

  const sessions = new Set(window.map((h) => h.sessionId));
  const pageViews = window.filter((h) => h.type === "page_view");
  const sessionEnds = window.filter((h) => h.type === "session_end");
  const engagedSessions = new Set(
    window.filter((h) => h.engaged || (h.durationMs && h.durationMs >= 10000)).map((h) => h.sessionId)
  );

  const durations = sessionEnds
    .map((h) => h.durationMs || 0)
    .filter((d) => d > 0);
  const avgSessionDurationSec =
    durations.length > 0
      ? Math.round(durations.reduce((a, b) => a + b, 0) / durations.length / 1000)
      : 0;

  const engagementTimes = window
    .filter((h) => h.type === "engagement" && h.durationMs)
    .map((h) => h.durationMs!);
  const avgEngagementSec =
    engagementTimes.length > 0
      ? Math.round(
          engagementTimes.reduce((a, b) => a + b, 0) / engagementTimes.length / 1000
        )
      : avgSessionDurationSec;

  const users = sessions.size;
  const sessionCount = sessions.size;
  const views = pageViews.length;
  const viewsPerSession = sessionCount ? +(views / sessionCount).toFixed(2) : 0;
  const engagedCount = engagedSessions.size;
  const engagementRate = sessionCount
    ? +((engagedCount / sessionCount) * 100).toFixed(1)
    : 0;
  const bounceRate =
    sessionCount > 0
      ? +(((sessionCount - engagedCount) / sessionCount) * 100).toFixed(1)
      : 0;

  // Traffic sources (from UTM on hits)
  const bySource: Record<string, number> = {};
  for (const h of pageViews) {
    const key = h.source || h.medium || "direct";
    bySource[key] = (bySource[key] || 0) + 1;
  }

  // Devices
  const byDevice: Record<string, number> = {};
  for (const h of window) {
    const d = h.device || "unknown";
    byDevice[d] = (byDevice[d] || 0) + 1;
  }

  // Funnel
  const viewItem = window.filter((h) => h.type === "view_item").length;
  const addToCart = window.filter((h) => h.type === "add_to_cart").length;
  const beginCheckout = window.filter((h) => h.type === "begin_checkout").length;
  const purchaseEvents = window.filter((h) => h.type === "purchase").length;

  const orderWindow = orders.filter((o) => {
    const t = o.createdAt ? new Date(o.createdAt).getTime() : 0;
    return t >= since;
  });
  const revenue = orderWindow.reduce((s, o) => s + Number(o.total || 0), 0);
  const purchases = orderWindow.length;
  const aov = purchases ? Math.round(revenue / purchases) : 0;
  const itemsPurchased = orderWindow.reduce(
    (s, o) => s + ((o.items || []).reduce((n: number, i: any) => n + (i.quantity || 0), 0) || 0),
    0
  );

  const pathCounts: Record<string, number> = {};
  for (const h of pageViews) {
    const p = h.path || "/";
    pathCounts[p] = (pathCounts[p] || 0) + 1;
  }
  const topPages = Object.entries(pathCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([path, count]) => ({ path, count }));

  return {
    periodDays: sinceDays,
    traffic: {
      users,
      newUsers: users, // first-party approx until identity graph
      returningUsers: 0,
      activeUsers: users,
      sessions: sessionCount,
      engagedSessions: engagedCount,
      sessionsPerUser: users ? +(sessionCount / users).toFixed(2) : 0,
      views,
      viewsPerSession,
      engagementRate,
      bounceRate,
      averageEngagementTimeSec: avgEngagementSec,
      averageSessionDurationSec: avgSessionDurationSec,
    },
    sources: bySource,
    devices: byDevice,
    funnel: {
      viewItem,
      addToCart,
      beginCheckout,
      purchase: Math.max(purchaseEvents, purchases),
      addToCartRate: viewItem ? +((addToCart / viewItem) * 100).toFixed(1) : 0,
      checkoutStartRate: addToCart
        ? +((beginCheckout / addToCart) * 100).toFixed(1)
        : 0,
      purchaseRate: beginCheckout
        ? +((purchases / beginCheckout) * 100).toFixed(1)
        : 0,
      cartAbandonment:
        addToCart > 0
          ? +(((addToCart - beginCheckout) / addToCart) * 100).toFixed(1)
          : 0,
      checkoutAbandonment:
        beginCheckout > 0
          ? +(((beginCheckout - purchases) / beginCheckout) * 100).toFixed(1)
          : 0,
    },
    ecommerce: {
      revenue,
      purchases,
      averageOrderValue: aov,
      itemsPurchased,
      revenuePerUser: users ? Math.round(revenue / users) : 0,
      revenuePerSession: sessionCount ? Math.round(revenue / sessionCount) : 0,
      purchaseConversionRate: sessionCount
        ? +((purchases / sessionCount) * 100).toFixed(2)
        : 0,
    },
    topPages,
    externalPending: {
      note: "SEO impressions/CTR/position, ads ROAS, heatmaps, session recordings require GA4, Search Console, Meta Ads, or third-party tools when connected.",
      seo: [
        "organicUsers",
        "impressions",
        "clicks",
        "ctr",
        "averagePosition",
        "keywords",
        "backlinks",
        "coreWebVitals",
      ],
      marketing: ["cpc", "cpm", "roas", "attribution", "reach"],
      advanced: ["heatmaps", "sessionRecordings", "abTesting", "cohortAnalysis"],
    },
  };
}
