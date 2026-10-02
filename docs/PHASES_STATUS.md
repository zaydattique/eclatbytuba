# Phase Status — Éclat by Tuba

**Theme:** Soft Gloss Pastel (LOCKED) · **Font:** Plus Jakarta Sans ONLY (LOCKED)

| Phase | Name | Status |
|-------|------|--------|
| 0–7 | Foundation → SEO/AEO/PWA | ✅ |
| 8 | Import 67 Products + Content + Launch | ✅ |
| **9** | **Security Hardening** | 🔄 In progress |
| 10 | Data & Storage Foundation | ⬜ |
| 11 | Production Observability & Quality | ⬜ |
| 12 | Payments, Trust & Operations | ⬜ |
| 13 | UX Scale & Polish | ⬜ |

## Phase 9 — Security Hardening (big chunk)

- [x] Harden auth: no production fallback JWT secret; no production demo password defaults
- [x] `requireAdminSession` helper
- [x] Move admin mutations to **admin app** same-origin APIs (orders, settings, upload, products, reviews, analytics)
- [x] Lock public web APIs: no open order list/update, no settings secrets, no open upload/product mutate
- [x] Admin middleware returns JSON 401 for API routes
- [x] Remove demo credentials from login UI
- [x] Update `.env.example`
- [ ] Owner: set strong `AUTH_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD` on deploy
- [ ] Owner: verify admin flows after deploy (login → settings save → order status → upload)

## Phase 10 — Data & Storage Foundation

- Postgres as primary path (not mem seed)
- Object storage for uploads (R2/S3/Cloudflare Images)
- Durable rate limiting (Redis or Upstash)
- Settings/orders durable when DB live

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

## Owner-side (unchanged)

| Item | Status |
|------|--------|
| Real Postgres `DATABASE_URL` | 🔶 Owner sets on deploy |
| Live JazzCash/EasyPaisa credentials | 🔶 When merchant ready |
| Vercel domain + GSC | 🔶 Owner deploy |
| Strong secrets in production env | 🔶 **Required for Phase 9** |
