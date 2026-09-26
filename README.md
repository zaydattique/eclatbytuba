# Éclat by Tuba — E-commerce Platform

Luxury fashion e-commerce monorepo built with Turborepo + pnpm + Next.js 14.

## Structure

```
eclat-by-tuba/
├── apps/
│   ├── web/          # Storefront (port 3000) + API + payments
│   └── admin/        # Admin dashboard (port 3001) — auth protected
└── packages/
    ├── auth/         # JWT session auth
    ├── config/       # Brand tokens + site config
    ├── db/           # Prisma + data access layer
    ├── ui/           # Shared React components
    ├── emails/       # Email templates
    └── analytics/    # Tracking helpers
```

## Tech Stack

- **Monorepo**: Turborepo + pnpm
- **Frontend**: Next.js 14 (App Router) + Tailwind CSS
- **Database**: PostgreSQL + Prisma (in-memory fallback)
- **Auth**: JWT sessions (`@eclat/auth`)
- **Payments**: COD · Bank Transfer · Stripe
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
pnpm db:generate
pnpm db:push
pnpm db:seed
```

### Optional: Stripe

```bash
# Add keys to .env, then:
pnpm --filter @eclat/web add stripe
```

## Phases

| Phase | Status | Description |
|-------|--------|-------------|
| **1** | ✅ | Monorepo skeleton, design tokens |
| **2** | ✅ | Database schema, app shells |
| **3** | ✅ | Catalog, cart, checkout, admin CRUD |
| **4** | ✅ | Data layer, API, orders, COD/bank |
| **5** | ✅ | Auth, image uploads, Stripe, SEO, deploy |

## Phase 5 Features

### Auth
- Admin login with JWT session cookies
- Middleware protects all admin routes
- Demo: `admin@eclatbytuba.com` / `eclat2026`
- Sign out button

### Image uploads
- `POST /api/upload` — JPEG/PNG/WebP/GIF (max 5MB)
- Admin product form multi-image upload
- Swap `public/uploads` for Cloudinary/S3 in production

### Stripe
- `POST /api/payments/create-intent`
- `POST /api/payments/webhook`
- Checkout: COD · Bank Transfer · Card (Stripe)
- Mock mode without Stripe keys

### SEO
- Dynamic sitemap.xml + robots.txt
- Open Graph + Twitter cards
- JSON-LD Product schema

### Deploy (Vercel)
1. Import monorepo on Vercel
2. Two projects: `apps/web` and `apps/admin`
3. Set env vars from `.env.example`
4. Point `NEXT_PUBLIC_*_URL` to production domains

## Brand

- **Name**: Éclat by Tuba
- **Primary**: `#1a1a1a`
- **Accent**: `#c9a86c`
- **Background**: `#faf9f7`
