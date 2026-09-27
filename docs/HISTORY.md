# HISTORY.md — Éclat by Tuba

---

## 2026-09-27 — Phase 6 complete

**What**
- Play element: floating cherry SVG mascot + tip bubble (appears ~9s, dismiss per session)
- Admin Settings page: payment toggles + credentials, Resend email config, play tip text, pixel ID overrides
- `packages/db/src/settings-store.ts` + exports from `@eclat/db`
- `GET/PUT /api/settings` — public GET strips secrets; `?admin=1` full settings

**Why**
- Master Plan Phase 6: increase session time with lightweight play; payments/email configurable without deploy

**Asset size**
- Cherry SVG inline ~1KB — under 30–40KB budget

---

## 2026-09-27 — Phase 5 complete

First-party analytics, session duration, GA4/Meta pixels, admin analytics UI.

---

## 2026-09-27 — Phase 4 complete

Advanced PDP + verified reviews (orderId) + Plus Jakarta Sans only.

---

## 2026-09-27 — Phase 3–2 complete

Checkout/orders; product CRUD + media.
