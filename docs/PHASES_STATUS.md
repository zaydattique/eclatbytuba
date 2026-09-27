# Phase Status — Éclat by Tuba

**Theme:** Soft Gloss Pastel (LOCKED) · **Font:** Plus Jakarta Sans ONLY (LOCKED)

| Phase | Name | Status |
|-------|------|--------|
| 0–7 | Foundation → SEO/AEO/PWA | ✅ |
| 8 | Import 67 Products + Content + Launch | ✅ |

## Phase 8
- [x] Catalog pipeline from `eclat_products_clean.json` (67) + Kiko
- [x] `packages/db/src/catalog-seed.ts` + `catalog-chunk-*.ts` + `categories.json`
- [x] `data.ts` loads full catalog into mem seed
- [x] Per-SKU SEO metadata (Pakistan · COD · Rs)
- [x] Shopify CDN images on products
- [x] Soft Gloss + verified reviews + Rs 250 shipping retained

**Note:** Full product payloads live in `catalog-chunk-1` (and artifacts/phase8 for local copy). Expand chunk if any products missing after pull.
