# Éclat by Tuba — Extremely Detailed Project Plan
**Version:** 2.0 (10 solid phases)  
**Theme:** Soft Gloss Pastel (LOCKED)  
**Font:** Plus Jakarta Sans ONLY (LOCKED)  
**Product Data:** 67 products in docs/products_catalog_slim.json

Full component-level specs live in this file and in the project artifacts. Summary of phases:

## GLOBAL RULES
- One font: Plus Jakarta Sans only
- Soft Gloss Pastel tokens only (see DESIGN_TOKENS.md)
- Mobile-first, FCP < 1.2s on Pakistani mid-range mobile
- Never invent product data — use the 67-product catalog
- Log every change in HISTORY.md
- Prefer editing existing files; surgical changes only
- Reviews require orderId (verified buyers only)
- Admin usable on phone

## PHASE 1 — Foundation ✅
Monorepo (Turborepo + pnpm), apps/web + apps/admin, packages/db|ui|config|emails|analytics, DESIGN_TOKENS, AGENTS, .env.example

## PHASE 2 — Database + Auth + Admin Shell ✅
Full Prisma schema (User, Product, Variant, Image, Collection, Order, Review with orderId, Discount, Shipping, Media, Setting, AnalyticsEvent). Admin: TopBar, BottomTabs, Sidebar, Dashboard, Login, PWA manifest basics.

## PHASE 3 — Product Management + Media Pipeline ❌
Admin Products list (search, filters, bulk, card/table). Rich product create/edit (title, rich text, drag-drop media, auto-compress WebP/AVIF, pricing, inventory, variants, SEO). Media library.

## PHASE 4 — Storefront Grids + Cart ❌
Collection pages, product cards (soft radius, dual shadow, price, stars, quick-add), filters, sort, cart drawer, homepage shell, basic policy pages.

## PHASE 5 — Advanced PDP + Verified Reviews ❌
Gallery zoom/swipe, variant swatches, sticky ATC, accordions, complete-the-look, JSON-LD. Reviews only with orderId; moderate in Admin; Verified Buyer badge.

## PHASE 6 — Checkout + Orders ❌
Checkout (contact, PK address, shipping, COD + Stripe + JazzCash/EasyPaisa). Admin orders list + rich order detail (fulfill, tracking, refund, notes).

## PHASE 7 — Analytics + Pixels ❌
Dashboard: sales, orders, AOV, conversion, **avg session duration**, sessions, bounce, charts, top products, traffic sources, CSV. Meta Pixel + CAPI, GA4. Configurable in Admin.

## PHASE 8 — Settings + Play Element ❌
Payments/email config in Admin. Lightweight floating mascot or shade quiz (<40KB) for session time.

## PHASE 9 — SEO / PWA / Security / Performance ❌
Sitemap, robots, OG, PWA installable, push for new orders, WAF/CSP/rate limits, Web Vitals pass.

## PHASE 10 — Import + Launch ❌
Import 67 products from catalog, collections, settings, end-to-end COD test, soft launch.

See docs/PHASES_STATUS.md and docs/HISTORY.md for live status.
