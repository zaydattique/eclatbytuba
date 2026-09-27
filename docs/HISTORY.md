# HISTORY.md — Éclat by Tuba

---

## 2026-09-28 — Phase 8 complete: full catalog import

**What**
- Imported `eclat_products_clean.json` (67 products) into `packages/db/src/catalog-seed.ts`
- Categories: cosmetic-kits, lipstick, lip-gloss, lip-sets, nails, tools, eyes, face
- Each product: Shopify images CDN, price/compare, tags, variants, plain-text description from body_html
- SEO metadata on every SKU: `{title} Pakistan | Rs X | COD` + COD/Rs 250 description
- Kiko 3D Hydra retained as owner add if not in Shopify export
- `data.ts` mem seed loads catalog only (no invented fashion products)

**Why**
- Phase 8 DoD: full catalog purchasable in mem/dev; owner can manage from admin

---

## 2026-09-27 — Phase 7 complete

SEO/AEO PDP, PWA, security headers, Rs 250 shipping.

---

## Prior

Phases 0–6 foundation through play/settings.
