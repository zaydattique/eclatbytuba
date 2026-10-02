# HISTORY.md — Éclat by Tuba

---

## 2026-10-02 — Phase 10: Data & Storage Foundation

**What**
- Postgres primary when DATABASE_URL set; mem seed demo-only
- Durable settings via Prisma Setting key `store`
- Catalog seed script (`pnpm db:seed`)
- S3/R2 upload helper + admin upload wired
- Upstash Redis rate limit with memory fallback

**Why**
- Phase 10 big chunk after security merge

---

## 2026-10-02 — Phase 9: Security Hardening merged

PR #1 merged to main — admin same-origin APIs, web locks, fail-closed auth.

---

## 2026-09-28 — SEO 100 checklist: max code pass

**What**
- Image sitemap, security headers, en-PK, Organization schema
- Privacy, terms, HTML sitemap, 404 recovery
- Gallery alts + fetchPriority, HowTo helper, collection intros
- `docs/SEO_100_CHECKLIST.md` marks ✅ / 🔶 / ❌ for all 100 items

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
