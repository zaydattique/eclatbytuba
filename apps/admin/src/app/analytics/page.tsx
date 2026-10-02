"use client";

import { useEffect, useState } from "react";

type Summary = {
  periodDays: number;
  traffic: Record<string, number>;
  sources: Record<string, number>;
  devices: Record<string, number>;
  funnel: Record<string, number>;
  ecommerce: Record<string, number>;
  topPages: { path: string; count: number }[];
  externalPending: { note: string; seo: string[]; marketing: string[]; advanced: string[] };
};

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      className="rounded-[24px] border border-[#F0D6E0] bg-white p-6"
      style={{
        boxShadow:
          "0 4px 20px rgba(196, 92, 122, 0.08), 0 1px 3px rgba(196, 92, 122, 0.04)",
      }}
    >
      <h2 className="text-lg font-semibold text-[#2D2A2B]">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function MetricGrid({
  items,
}: {
  items: { label: string; value: string | number; hint?: string }[];
}) {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
      {items.map((m) => (
        <div
          key={m.label}
          className="rounded-[16px] border border-[#F0D6E0] bg-[#FFF0F5]/50 p-3"
        >
          <p className="text-xs text-[#6B5E62]">{m.label}</p>
          <p className="mt-1 text-lg font-semibold text-[#2D2A2B]">{m.value}</p>
          {m.hint && <p className="mt-0.5 text-[10px] text-[#6B5E62]">{m.hint}</p>}
        </div>
      ))}
    </div>
  );
}

function CatalogList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="mt-4">
      <p className="text-xs font-medium uppercase tracking-wide text-[#6B5E62]">{title}</p>
      <ul className="mt-2 flex flex-wrap gap-1.5">
        {items.map((x) => (
          <li
            key={x}
            className="rounded-full border border-[#F0D6E0] px-2 py-0.5 text-[11px] text-[#6B5E62]"
          >
            {x}
          </li>
        ))}
      </ul>
    </div>
  );
}

const PENDING = "—";

export default function AnalyticsPage() {
  const [data, setData] = useState<Summary | null>(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    fetch(`/api/analytics?days=30`)
      .then((r) => r.json())
      .then((d) => {
        if (d.error) setErr(d.error);
        else setData(d);
      })
      .catch((e) => setErr(e.message));
  }, []);

  const t = data?.traffic;
  const f = data?.funnel;
  const e = data?.ecommerce;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-[#2D2A2B]">Analytics</h1>
        <p className="mt-1 text-sm text-[#6B5E62]">
          Last {data?.periodDays ?? 30} days · first-party store + order data. Set{" "}
          <code className="text-xs">NEXT_PUBLIC_GA_ID</code> /{" "}
          <code className="text-xs">NEXT_PUBLIC_META_PIXEL_ID</code> for pixels.
        </p>
        {err && <p className="mt-2 text-sm text-[#C45C5C]">{err}</p>}
      </div>

      <Card title="👥 Traffic & visitors">
        <MetricGrid
          items={[
            { label: "Users", value: t?.users ?? 0 },
            { label: "New users", value: t?.newUsers ?? 0, hint: "approx" },
            { label: "Returning users", value: t?.returningUsers ?? 0, hint: "needs identity" },
            { label: "Active users", value: t?.activeUsers ?? 0 },
            { label: "Sessions", value: t?.sessions ?? 0 },
            { label: "Engaged sessions", value: t?.engagedSessions ?? 0 },
            { label: "Sessions / user", value: t?.sessionsPerUser ?? 0 },
            { label: "Views", value: t?.views ?? 0 },
            { label: "Views / session", value: t?.viewsPerSession ?? 0 },
            { label: "Engagement rate %", value: t?.engagementRate ?? 0 },
            { label: "Bounce rate %", value: t?.bounceRate ?? 0 },
            { label: "Avg engagement (s)", value: t?.averageEngagementTimeSec ?? 0 },
            { label: "Avg session duration (s)", value: t?.averageSessionDurationSec ?? 0 },
          ]}
        />
      </Card>

      <Card title="📈 Traffic sources">
        <MetricGrid
          items={Object.entries(data?.sources || { direct: 0 }).map(([k, v]) => ({
            label: k,
            value: v,
          }))}
        />
        <CatalogList
          title="Also tracked when UTM present"
          items={[
            "Organic search",
            "Direct",
            "Referral",
            "Social",
            "Paid search",
            "Paid social",
            "Email",
            "Display",
            "Affiliates",
            "Source / Medium / Campaign",
          ]}
        />
      </Card>

      <Card title="🔎 SEO (external)">
        <p className="text-sm text-[#6B5E62]">
          Connect Google Search Console + GA4 for live values.
        </p>
        <MetricGrid
          items={[
            "Organic users",
            "Organic sessions",
            "Impressions",
            "Clicks",
            "CTR",
            "Average position",
            "Keywords",
            "Landing pages",
            "Indexed pages",
            "Backlinks",
            "Referring domains",
            "Search visibility",
            "Core Web Vitals",
          ].map((label) => ({ label, value: PENDING }))}
        />
      </Card>

      <Card title="📄 Page performance">
        <MetricGrid
          items={[
            { label: "Page views", value: t?.views ?? 0 },
            { label: "Unique (sessions)", value: t?.sessions ?? 0 },
            { label: "Bounce rate %", value: t?.bounceRate ?? 0 },
            { label: "Avg engagement (s)", value: t?.averageEngagementTimeSec ?? 0 },
            { label: "Pages / session", value: t?.viewsPerSession ?? 0 },
            { label: "Scroll depth", value: PENDING, hint: "extend beacon" },
            { label: "Exit rate", value: PENDING },
            { label: "Downloads", value: PENDING },
          ]}
        />
        {data?.topPages?.length ? (
          <div className="mt-4">
            <p className="text-xs font-medium text-[#6B5E62]">Top pages</p>
            <ul className="mt-2 space-y-1 text-sm text-[#2D2A2B]">
              {data.topPages.map((p) => (
                <li key={p.path} className="flex justify-between gap-4">
                  <span className="truncate">{p.path}</span>
                  <span className="text-[#6B5E62]">{p.count}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </Card>

      <Card title="🖱️ User behavior">
        <CatalogList
          title="Events supported via trackEvent / pixels"
          items={[
            "Clicks",
            "CTA clicks",
            "Form starts/submits",
            "Outbound clicks",
            "WhatsApp clicks",
            "Search usage",
            "Error events",
            "Video (when wired)",
            "Copy events (when wired)",
          ]}
        />
      </Card>

      <Card title="🎯 Conversion & 💰 E-commerce">
        <MetricGrid
          items={[
            { label: "Purchases", value: e?.purchases ?? 0 },
            { label: "Revenue (PKR)", value: e?.revenue ?? 0 },
            { label: "AOV", value: e?.averageOrderValue ?? 0 },
            { label: "Items purchased", value: e?.itemsPurchased ?? 0 },
            { label: "Purchase CVR %", value: e?.purchaseConversionRate ?? 0 },
            { label: "Revenue / user", value: e?.revenuePerUser ?? 0 },
            { label: "Revenue / session", value: e?.revenuePerSession ?? 0 },
            { label: "View item", value: f?.viewItem ?? 0 },
            { label: "Add to cart", value: f?.addToCart ?? 0 },
            { label: "Checkout starts", value: f?.beginCheckout ?? 0 },
            { label: "ATC rate %", value: f?.addToCartRate ?? 0 },
            { label: "Cart abandon %", value: f?.cartAbandonment ?? 0 },
            { label: "Checkout abandon %", value: f?.checkoutAbandonment ?? 0 },
          ]}
        />
      </Card>

      <Card title="🧭 Funnel">
        <p className="mb-3 text-sm text-[#6B5E62]">
          Landing → Product → ATC → Checkout → Purchase
        </p>
        <MetricGrid
          items={[
            { label: "Product views", value: f?.viewItem ?? 0 },
            { label: "Add to cart", value: f?.addToCart ?? 0 },
            { label: "Checkout", value: f?.beginCheckout ?? 0 },
            { label: "Purchase", value: f?.purchase ?? 0 },
          ]}
        />
      </Card>

      <Card title="📱 Device">
        <MetricGrid
          items={Object.entries(data?.devices || {}).map(([k, v]) => ({
            label: k,
            value: v,
          }))}
        />
        <CatalogList
          title="Catalog"
          items={[
            "Desktop / Mobile / Tablet",
            "OS",
            "Browser",
            "Screen resolution",
            "Connection type",
          ]}
        />
      </Card>

      <Card title="🌍 Audience · ⚡ Performance · 📣 Ads · 🔄 Retention · 🧪 Advanced">
        <p className="text-sm text-[#6B5E62]">{data?.externalPending?.note}</p>
        <CatalogList title="SEO pending" items={data?.externalPending?.seo || []} />
        <CatalogList
          title="Marketing / ads pending"
          items={data?.externalPending?.marketing || []}
        />
        <CatalogList
          title="Advanced pending"
          items={data?.externalPending?.advanced || []}
        />
        <CatalogList
          title="Your full wishlist (tracked or pending)"
          items={[
            "Country / City / Language",
            "FCP / LCP / INP / CLS / TTFB",
            "JS / 404 / server errors",
            "CPC / CPM / ROAS / CPA",
            "Retention 1/7/30 · LTV",
            "Cohorts · paths · attribution",
            "Heatmaps · session recordings · A/B",
          ]}
        />
      </Card>
    </div>
  );
}
