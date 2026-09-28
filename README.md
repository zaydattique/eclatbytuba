# Éclat by Tuba — E-commerce Platform

Luxury beauty / soft-gloss e-commerce monorepo.  
**Theme:** Soft Gloss Pastel (LOCKED) · **Font:** Plus Jakarta Sans ONLY (LOCKED)

Single-shop Shopify-level platform · Mobile-first · High-paying GenZ + young professional women focus.

> **Agents:** Read `docs/PROJECT_PLAN.md` + `docs/AGENTS.md` before any change. Do not reintroduce black/gold or a second font.

## Structure

```
eclat-by-tuba/
├── apps/
│   ├── web/          # Storefront (port 3000) + API + payments
│   └── admin/        # Admin dashboard (port 3001) — auth protected
├── packages/
│   ├── auth/         # JWT session auth
│   ├── config/       # Brand tokens + site config
│   ├── db/           # Prisma + data access layer + catalog
│   ├── ui/           # Shared React components
│   ├── emails/       # Email templates (Resend / mock)
│   └── analytics/    # Tracking helpers
└── docs/             # PROJECT_PLAN, PHASES_STATUS, AGENTS, DESIGN_TOKENS, HISTORY
```

## Tech Stack

- **Monorepo**: Turborepo + pnpm
- **Frontend**: Next.js (App Router) + Tailwind CSS
- **Database**: PostgreSQL + Prisma (in-memory fallback for demo)
- **Auth**: JWT sessions (`@eclat/auth`)
- **Payments (Pakistan-first)**: COD · Bank Transfer · JazzCash · EasyPaisa · custom PK gateway (admin)
- **Stripe**: optional placeholder only (not available for most PK merchants)
- **Deploy**: Vercel-ready

## Getting Started

```bash
pnpm install
cp .env.example .env
pnpm dev
```

| App | URL |
|-----|-----|
| Storefront | http://localhost:3000 |
| Admin | http://localhost:3001 |
| Admin login | http://localhost:3001/login |

**Demo admin:** `admin@eclatbytuba.com` / `eclat2026`

### Optional: real database

```bash
# Set DATABASE_URL in .env, then:
pnpm db:generate
pnpm db:push
pnpm db:seed
```

## Phase Status (see docs/PHASES_STATUS.md)

| Phase | Name | Status |
|-------|------|--------|
| 0 | Design Token Lock + Repo Skeleton + Core Docs | ✅ |
| 1 | Database Schema + Auth + Admin Shell | ✅ |
| 2 | Product CRUD + Media Pipeline + Grids | ✅ |
| 3 | Cart + Checkout + Order Management | ✅ |
| 4 | Advanced PDP + Verified Reviews | ✅ |
| 5 | Analytics + Pixels | ✅ |
| 6 | Play Element + Settings (email/payments) | ✅ |
| 7 | SEO / PWA / Security / Performance | ✅ |
| 8 | Import catalog + Launch pipeline | ✅ |

### Still owner-side for go-live

- Set `DATABASE_URL` (Postgres) on host
- Deploy web + admin on Vercel + custom domain
- Paste JazzCash / EasyPaisa / PK gateway credentials in **Admin → Settings**
- Add `RESEND_API_KEY` for real order emails
- Submit sitemap in Google Search Console

## Brand (Soft Gloss Pastel — LOCKED)

- **Backgrounds:** soft blush pink `#FFF0F5` – `#FFE8F0`
- **Primary:** deep rose/berry `#C45C7A`
- **Soft gold:** `#D4A574` (sparingly)
- **Font:** Plus Jakarta Sans only
- **Radii:** 20–28px + soft dual shadow

See `docs/DESIGN_TOKENS.md`. Do not change without explicit approval.

## Docs every agent must read

1. `docs/PROJECT_PLAN.md` — detailed phases 0–8
2. `docs/PHASES_STATUS.md` — live status
3. `docs/AGENTS.md` — strict rules
4. `docs/DESIGN_TOKENS.md` — tokens
5. `docs/HISTORY.md` — append every change
