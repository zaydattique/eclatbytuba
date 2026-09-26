# Éclat by Tuba — E-commerce Platform

Luxury fashion e-commerce monorepo built with Turborepo + pnpm + Next.js 14.

## Structure

```
eclat-by-tuba/
├── apps/
│   ├── web/          # Customer storefront (port 3000)
│   └── admin/        # Admin dashboard (port 3001)
└── packages/
    ├── config/       # Shared config + brand tokens
    ├── db/           # Prisma schema + client
    ├── ui/           # Shared React components
    ├── emails/       # Email templates
    └── analytics/    # Tracking helpers
```

## Tech Stack

- **Monorepo**: Turborepo + pnpm workspaces
- **Frontend**: Next.js 14 (App Router) + Tailwind CSS
- **Database**: PostgreSQL + Prisma
- **Language**: TypeScript

## Getting Started

```bash
# Install dependencies
pnpm install

# Copy env
cp .env.example .env

# Generate Prisma client
pnpm db:generate

# Push schema to database
pnpm db:push

# Run both apps
pnpm dev
```

- Storefront → http://localhost:3000  
- Admin → http://localhost:3001  

## Phases

| Phase | Status | Description |
|-------|--------|-------------|
| **Phase 1** | ✅ Done | Monorepo skeleton, design tokens, shared packages |
| **Phase 2** | ✅ Done | Database schema, basic storefront + admin shells |
| **Phase 3** | 🔜 Next | Product catalog, cart, checkout, admin CRUD |
| **Phase 4** | — | Payments, orders, shipping, emails |
| **Phase 5** | — | Polish, SEO, performance, deploy |

## Brand

- **Name**: Éclat by Tuba  
- **Primary**: `#1a1a1a`  
- **Accent (Gold)**: `#c9a86c`  
- **Background**: `#faf9f7`
