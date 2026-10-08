# Phase Status — Éclat by Tuba

**Theme:** Soft Gloss Pastel (LOCKED) · **Font:** Plus Jakarta Sans ONLY (LOCKED)

| Phase | Name | Status |
|-------|------|--------|
| 0–7 | Foundation → SEO/AEO/PWA | ✅ |
| 8 | Import 67 Products + Content + Launch | ✅ |
| **9** | **Security Hardening** | ✅ |
| 10 | Data & Storage Foundation | ⬜ |
| 11 | Production Observability & Quality | ⬜ |
| 12 | Payments, Trust & Operations | ⬜ |
| 13 | UX Scale & Polish | ⬜ |

## Phase 9 — Security Hardening ✅

- [x] Harden auth: no production fallback JWT secret; no production demo password defaults
- [x] `requireAdminSession` + `requireAdminApiSecret` helpers
- [x] Admin mutations on **admin app** same-origin APIs (orders, settings, upload, products, reviews, analytics)
- [x] Public web APIs locked (no open order list/update, settings secrets, upload, product mutate, admin reviews)
- [x] Admin middleware returns JSON 401 for API routes
- [x] Login rate limiting (5 / 15 min)
- [x] Remove demo credentials from login UI
- [x] Update `.env.example`
- [ ] Owner: set strong `AUTH_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD` on deploy
- [ ] Owner: verify admin flows after deploy (login → settings save → order status → upload)

## Phase 0 baseline (repo audit) — 2026-10-08

- [x] Production refuses silent in-memory catalog/orders (`useDb` hard-fail without remote `DATABASE_URL`)
- [x] `packages/db/src/seed.ts` added (`pnpm db:seed` was broken — script pointed at missing file)
- [x] `@eclat/auth` added to `apps/web` dependencies (web APIs already imported it)
- [x] README / `.env.example` aligned with production requirements (no demo password as primary docs)
- [ ] **CRITICAL:** ensure `packages/db/src/data.ts` on main is the full data layer (not a placeholder)
- [ ] pnpm-lock.yaml still missing in repo — run `pnpm install` and commit lockfile
- [ ] Settings + analytics stores remain process-memory (deferred to Phase 10)

## Phase 10 — Data & Storage Foundation

- Postgres as primary path for all environments that matter (dev may still use mem with `ALLOW_IN_MEMORY=1`)
- Object storage for uploads (R2/S3/Cloudflare Images)
- Durable rate limiting (Redis or Upstash)
- Settings/orders/analytics durable when DB live
- Wire Prisma `Setting` model for admin settings persistence

## Phase 11 — Production Observability & Quality

- Error monitoring (Sentry or equivalent)
- Structured logging
- Critical path TypeScript `any` cleanup
- Smoke / e2e tests for checkout + admin auth
- Pagination on admin lists
- Loading / empty / error states

## Phase 12 — Payments, Trust & Operations

- Real JazzCash / EasyPaisa / custom gateway adapters + webhooks
- Review ownership verification (email + orderId must match paid order)
- Order lifecycle / tracking UX improvements

## Phase 13 — UX Scale & Polish

- Accessibility pass
- Customer order-tracking portal basics
- Performance (caching, image pipeline)
- Dead code / residual deprecated lists cleanup
- Feature flags / background jobs as needed

## Owner-side

| Item | Status |
|------|--------|
| Real Postgres `DATABASE_URL` | 🟠 Owner sets on deploy |
| Live JazzCash/EasyPaisa credentials | 🟠 When merchant ready |
| Vercel domain + GSC | 🟠 Owner deploy |
| Strong secrets in production env | 🟠 **Required for Phase 9** |
