# HISTORY.md — Éclat by Tuba

Chronological log of every decision and code change. Every agent must append here.

---

## 2026-09-27 — Phase 2 complete

**What**
- `updateProduct` + `getAllProductImages` in packages/db; export from index.
- PUT `/api/products` for updates; GET supports `?admin=true` for inactive products.
- Admin edit page `/products/[id]` (load + save + images).
- Admin media library `/media` (grid of product images).
- Product list uses `getAdminProducts`, links name → edit, shows Inactive badge.
- Soft Gloss Sidebar + Media nav item.
- media.ts: production compression via Cloudflare Images preferred; no Sharp (perf).

**Why**
- Close remaining Phase 2 gaps (edit, media library, pipeline clarity) without heavy new deps or wholesale rewrites.

---

## 2026-09-27 — Phase 2 progress (surgical fixes)

**What**
- Replaced invented fashion products with catalog beauty items.
- Soft Gloss Pastel on Button, Badge, Input, Card, ProductCard.
- ProductCard: discount, low-stock, stars hooks.
- Admin products search + Soft Gloss table.
- Upload validation; createProduct accepts images; siteConfig + homepage beauty copy.

**Why**
- Align UI and data with Master Plan Soft Gloss Pastel + real catalog only.

---

## 2026-09-27 — Docs realigned to Master Build Plan v2.0

Rewrote PROJECT_PLAN phases 0–8; PHASES_STATUS, AGENTS, README fixed (no black/gold).

---

## Prior

- Phase 0–1 foundation; storefront cart/header Soft Gloss work; security helpers.
