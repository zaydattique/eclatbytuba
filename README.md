# Éclat by Tuba — E-commerce Platform

Luxury fashion e-commerce monorepo built with Turborepo + pnpm + Next.js 14.

## Structure

```
eclat-by-tuba/
├── apps/
│   ├── web/          # Customer storefront (port 3000) + API routes
│   └── admin/        # Admin dashboard (port 3001)
└── packages/
    ├── config/       # Shared config + brand tokens
    ├── db/           # Prisma schema + data access layer
    ├── ui/           # Shared React components
    ├── emails/       # Email templates
    └── analytics/    # Tracking helpers
```

## Tech Stack

- **Monorepo**: Turborepo + pnpm workspaces
- **Frontend**: Next.js 14 (App Router) + Tailwind CSS
- **Database**: PostgreSQL + Prisma (with in-memory fallback)
- **Language**: TypeScript

## Getting Started

```bash
# Install dependencies
pnpm install

# Copy env
cp .env.example .env

# Optional: set DATABASE_URL for real Postgres
# DATABASE_URL="postgresql://user:pass@localhost:5432/eclat_by_tuba"

# Generate Prisma client (if using DB)
pnpm db:generate

# Push schema + seed (if using DB)
pnpm db:push
pnpm db:seed

# Run both apps
pnpm dev
```

- Storefront → http://localhost:3000  
- Admin → http://localhost:3001  

> Without `DATABASE_URL`, the app runs on an in-memory data store so you can demo immediately.

## API Routes (apps/web)

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/products` | List products (`?category=&featured=true`) |
| POST | `/api/products` | Create product |
| GET | `/api/products/[slug]` | Product by slug |
| GET | `/api/categories` | List categories |
| GET | `/api/orders` | List orders |
| POST | `/api/orders` | Create order (checkout) |
| GET | `/api/orders/[id]` | Order detail |
| PATCH | `/api/orders/[id]` | Update order status |
| GET | `/api/dashboard` | Dashboard stats |

## Phases

| Phase | Status | Description |
|-------|--------|-------------|
| **Phase 1** | ✅ Done | Monorepo skeleton, design tokens, shared packages |
| **Phase 2** | ✅ Done | Database schema, basic storefront + admin shells |
| **Phase 3** | ✅ Done | Product catalog, cart, checkout, admin CRUD |
| **Phase 4** | ✅ Done | Data layer, API routes, real orders, payments (COD/bank), order management |
| **Phase 5** | 🔜 Next | Auth, image uploads, Stripe, SEO, deploy |

## Phase 4 Features

### Data & API
- Hybrid data layer (Prisma when `DATABASE_URL` set, else in-memory)
- Full REST API for products, categories, orders, dashboard
- Seed script for demo data

### Storefront
- Products loaded from data layer
- Checkout creates real orders via API
- Payment methods: Cash on Delivery + Bank Transfer

### Admin
- Live dashboard stats
- Products & categories from data layer
- Orders list + detail page
- Order status updates (PENDING → CONFIRMED → SHIPPED → DELIVERED)

## Brand

- **Name**: Éclat by Tuba  
- **Primary**: `#1a1a1a`  
- **Accent (Gold)**: `#c9a86c`  
- **Background**: `#faf9f7`
