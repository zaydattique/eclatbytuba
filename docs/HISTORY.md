# HISTORY.md — Éclat by Tuba

---

## 2026-10-08 — Phase 0 repository baseline

**What**
- `useDb()`: production requires remote `DATABASE_URL` (no silent in-memory products/orders)
- Added `packages/db/src/seed.ts` so `pnpm db:seed` works
- Added `@eclat/auth` dependency to `apps/web` (imports were already present)
- Updated `.env.example`, README, PHASES_STATUS for production/dev separation

**Why**
- Phase 0 audit: production must not run on demo/memory data

---

## 2026-09-28 — SEO 100 checklist: max code pass

**What**
- Image sitemap, security headers, en-PK, Organization schema
- Privacy, terms, HTML sitemap, 404 recovery
- Gallery alts + fetchPriority, HowTo helper, collection intros
- `docs/SEO_100_CHECKLIST.md` marks ✅ / 🟠 / ❌ for all 100 items

**Why**
- User asked to execute all 100; code-side done; owner-side listed

---

## 2026-09-28 — SEO/AEO hard upgrade

PDP engine, collections, guides, trust pages, sitemap, footer links.

---

## 2026-09-28 — Pakistan payments polish

COD/bank/JazzCash/EasyPaisa + customGateway; Stripe placeholder.

---

## Prior

Phases 0–8 + catalog 68.
