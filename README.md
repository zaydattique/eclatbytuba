# Éclat by Tuba — E-commerce Platform

Luxury beauty / soft-gloss e-commerce monorepo.  
**Theme:** Soft Gloss Pastel (LOCKED) · **Font:** Plus Jakarta Sans ONLY (LOCKED)

Single-shop e-commerce platform · Mobile-first · Pakistan-first (COD, JazzCash/EasyPaisa-ready).

> **Agents:** Read `docs/PROJECT_PLAN.md` + `docs/AGENTS.md` before any change. Do not reintroduce black/gold or a second font.

## Architecture

```
Storefront (apps/web)  +  Admin (apps/admin)
         ↓                        ↓
    Next.js API routes      Next.js API routes (session-protected)
         ↓                        ↓
              packages/db (Prisma + data access)
         ↓
    PostgreSQL (production required)
         ↓
    External: Resend (email), payment providers (credentials in admin)
```

## Structure

```
eclat-by-tuba/
─── apps/
│   ─── web/          # Storefront (port 3000) + public APIs
│   ─── admin/        # Admin dashboard (port 3001) — JWT session protected
─── packages/
│   ─── auth/         # JWT session auth (admin)
│   ─── config/       # Site config, rate-limit, security helpers
│   ─── db/           # Prisma schema + data access + catalog seed
│   ─── ui/           # Shared React components
│   ─── emails/       # Order email helpers (Resend or console mock in dev)
│   ─── analytics/    # Tracking helpers
─── docs/             # PROJECT_PLAN, PHASES_STATUS, AGENTS, DESIGN_TOKENS, HISTORY
```

## Tech Stack

- **Monorepo**: Turborepo + pnpm
- **Frontend**: Next.js (App Router) + Tailwind CSS
- **Database**: PostgreSQL + Prisma (**required in production**; in-memory only for local dev when `DATABASE_URL` is unset)
- **Auth**: JWT sessions (`@eclat/auth`) — production requires `AUTH_SECRET` + admin env credentials
- **Payments (Pakistan-first)**: COD · Bank Transfer · JazzCash · EasyPaisa · custom PK gateway (admin settings)
- **Stripe**: optional placeholder only (not available for most PK merchants)
- **Deploy**: Vercel-ready (web + admin as separate projects)

## Getting Started (development)

```bash
pnpm install
cp .env.example .env
# Optional: set DATABASE_URL for local Postgres; otherwise in-memory demo data is used
pnpm dev
```

| App | URL |
|-----|-----|
| Storefront | http://localhost:3000 |
| Admin | http://localhost:3001 |
| Admin login | http://localhost:3001/login |

Admin credentials: set `ADMIN_EMAIL` and `ADMIN_PASSWORD` in `.env`.  
In development only, if those are unset, the auth package falls back to local demo defaults (never used when `NODE_ENV=production`).

### Real database (recommended before any deploy)

```bash
# Set DATABASE_URL in .env to a reachable Postgres, then:
pnpm db:generate
pnpm db:push
pnpm db:seed
```

## Production requirements

| Variable | Required | Notes |
|----------|----------|--------|
| `DATABASE_URL` | **Yes** | Remote Postgres only (not localhost) |
| `AUTH_SECRET` or `NEXTAUTH_SECRET` | **Yes** | No fallback in production |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | **Yes** | No demo defaults in production |
| `NEXT_PUBLIC_APP_URL` | **Yes** | Canonical storefront domain |
| `NEXT_PUBLIC_ADMIN_URL` | Recommended | Admin origin |
| `RESEND_API_KEY` | Optional | Real order emails |
| Payment credentials | Optional | Set in Admin → Settings when ready |

Production **will not** silently use in-memory products/orders. Missing `DATABASE_URL` causes a hard error.

## Phase status

See `docs/PHASES_STATUS.md` for the live checklist. Feature UI may exist while durable storage, real payment adapters, and observability remain open (Phases 10–13).

### Owner-side before go-live

- Set remote `DATABASE_URL` and run migrate/seed
- Set strong `AUTH_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`
- Deploy web + admin on Vercel + custom domain
- Configure payment credentials in Admin → Settings when merchant accounts are ready
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

1. `docs/PROJECT_PLAN.md` — detailed phases
2. `docs/PHASES_STATUS.md` — live status
3. `docs/AGENTS.md` — strict rules
4. `docs/DESIGN_TOKENS.md` — tokens
5. `docs/HISTORY.md` — append every change
