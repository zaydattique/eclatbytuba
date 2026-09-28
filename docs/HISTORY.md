# HISTORY.md — Éclat by Tuba

---

## 2026-09-28 — Launch polish: Pakistan payments

**What**
- Defaults: COD + bank + JazzCash + EasyPaisa enabled; Stripe disabled
- New admin slot: **customGateway** (any PK third-party provider — PayFast/PayPro/etc.)
- Checkout: PK methods only in primary list; thank-you copy per method
- Stripe kept as optional admin placeholder (not available for most PK merchants)
- Settings UI labels Pakistan-first

**Why**
- Stripe unavailable in Pakistan; owner will connect local gateway via admin later

---

## 2026-09-28 — Catalog chunks pushed (68 products)

**What**
- Pushed `catalog-chunk-1` … `catalog-chunk-5` with full Shopify catalog + Kiko
- Counts: 14 + 14 + 14 + 14 + 12 = **68 products**
- Each product: slug, price, compareAt, image CDN, SEO metadata (Pakistan · COD · Rs 250)
- `catalog-seed.ts` spreads all five chunks into mem seed via `data.ts`

**Why**
- Complete Phase 8 product import in repo

---

## Prior

Phases 0–8 foundation through SEO/AEO and catalog pipeline.
