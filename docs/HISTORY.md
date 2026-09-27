# HISTORY.md — Éclat by Tuba

Chronological log of every decision and code change. Every agent must append here.

---

## 2026-09-27 — Phase 3 complete

**What**
- Checkout Soft Gloss UI: shipping (standard/express), payments COD, bank transfer, JazzCash, EasyPaisa, Stripe.
- POST /api/orders: checkout rate limit + sendOrderConfirmation (Resend or console mock).
- updateOrderStatus accepts notes + trackingNumber (stored in notes as TRACKING: for Prisma).
- Admin orders Soft Gloss list/detail; OrderStatusForm with tracking + notes + full status set.
- Cart page Soft Gloss polish.

**Why**
- Close Phase 3 acceptance: full purchase path + admin fulfill without heavy new deps.

---

## 2026-09-27 — Phase 2 complete

updateProduct, edit page, media library, Soft Gloss admin nav, catalog seed only.

---

## 2026-09-27 — Phase 2 progress + docs realign

Soft Gloss UI tokens; Master Plan phases 0–8 docs; no black/gold.

---

## Prior

Phase 0–1 foundation; storefront cart context; security rate-limit helpers.
