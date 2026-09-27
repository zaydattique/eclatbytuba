# HISTORY.md — Éclat by Tuba

Chronological log of every decision and code change. Every agent must append here.

---

## 2026-09-27 — Phase 2 progress (surgical fixes)

**What**
- Replaced invented fashion products (Silk Gown, Cashmere Coat, etc.) with real catalog beauty items from PRODUCTS_CATALOG.md in `packages/db/src/data.ts` and admin products lib.
- Soft Gloss Pastel applied to Button, Badge, Input, Card, ProductCard (removed black #1a1a1a / gold #c9a86c).
- ProductCard: 24px radius, dual soft shadow, discount %, low-stock badge, optional stars.
- Admin products list: Soft Gloss table, search by q, low-stock hint.
- Upload route uses `validateImageFile` from packages/ui/media; max 5MB aligned.
- createProduct accepts `images` array.
- ImageUpload Soft Gloss borders/buttons.
- siteConfig exported from @eclat/config; homepage beauty copy (no fashion/luxury black theme).
- media.ts MAX 5MB to match upload route.

**Why**
- Phase 2 requires Soft Gloss Pastel grids/cards, real product data only, working media validation, admin product list usable.
- No new files; surgical edits only. Compression (Sharp/R2) still deferred for performance — validation + storage in place.

---

## 2026-09-27 — Docs realigned to Master Build Plan v2.0

**What**
- Rewrote PROJECT_PLAN.md phases 0–8 with full tasks/AC/DoD.
- Updated PHASES_STATUS, AGENTS, README (Soft Gloss; no black/gold).

**Why**
- Prevent theme regression and give agents exact instructions.

---

## 2026-09-27 — Phase 4 storefront work (pre-realignment note)

Storefront Soft Gloss Pastel progress (mapped under Phases 2–3):
- Header + Footer + Cart drawer (localStorage)
- Product cards, homepage, collections grid, quick PDP
- Policy pages; checkout still placeholder

---

## Prior

- Phase 0–1 foundation: monorepo, Prisma schema, auth, admin shell.
- Security: rate-limit, headers, queue helpers added.
- Theme locked to Soft Gloss Pastel after black/gold correction.
