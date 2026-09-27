# HISTORY.md — Éclat by Tuba

---

## 2026-09-27 — Phase 7 complete (SEO / AEO / PWA / security)

**What**
- Kiko 3D Hydra merged into mem seed (p7) with 6 shade variants + SEO metadata; Rhode/Glam SEO patches
- PDP: answer-first blurb, canonical/seoTitle/seoDescription, BreadcrumbList + Product/Offer + FAQ + Organization JSON-LD, shade table, COD·Rs250 trust box
- Sitewide trust: footer strip COD · Shipping Rs 250 · All Pakistan; createOrder default shipping Rs 250
- PWA: public/manifest.webmanifest + layout themeColor/manifest link
- Security: CSP + nosniff + frame-deny headers in next.config
- robots disallow cart/checkout/api

**Security/perf notes**
- Rate limits already on checkout/reviews/login
- Secrets not returned on public settings GET
- Pixels env-gated; no Sharp (Cloudflare path documented Phase 2)
- Next headers CSP allows Stripe + GTM + Meta pixel only as needed

**Why**
- Phase 7 acceptance: technical SEO + AEO on PDPs + Kiko + shipping facts + PWA basics

---

## 2026-09-27 — Phase 6 wire-up

Play + settings-driven payments/email.

---

## Prior

Phases 0–5 foundation through analytics.
