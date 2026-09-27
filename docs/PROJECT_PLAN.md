# Éclat by Tuba — Extremely Detailed Project Plan

**Version:** 2.0 (Master Build Plan aligned)  
**Date locked:** 26 Sep 2026  
**Theme:** Soft Gloss Pastel (LOCKED — do not change)  
**Font:** Plus Jakarta Sans ONLY (LOCKED — no other families)  
**Source of truth:** Master Build Plan v2.0 + this file  
**Product data:** 67 products only — never invent (see PRODUCTS_CATALOG.md / catalog JSON)

Any agent reading this must follow these phases in order. Do not invent new phases. Do not skip acceptance criteria.

---

## GLOBAL RULES (apply to every phase)

- **One font only:** Plus Jakarta Sans (weights 400/500/600/700). No Inter, no system-ui as primary, no second family.
- **Theme locked:** Soft Gloss Pastel tokens from DESIGN_TOKENS.md only. Backgrounds soft blush (#FFF0F5–#FFE8F0). Primary deep rose/berry (#C45C7A). Soft gold sparingly. Never pure white, grey, black, or dark luxury.
- **Mobile-first:** Target FCP < 1.2s on mid-range Pakistani mobile. Admin must be usable on phone (“owner in Lahore traffic”).
- **Surgical changes only:** Prefer editing existing files. Do not create new style/logic files if functionality fits an existing one. Do not overwrite large files wholesale.
- **Log everything:** Every change → HISTORY.md (date, what, why).
- **No invented products:** Use the 67-product catalog only.
- **Reviews:** Must be verified via real orderId. No guest/fake reviews.
- **Libraries:** No new heavy libs without justification written in HISTORY.md.
- **Performance sacred:** Justify every addition against load time.

---

## PHASE 0 — Design Token Lock + Repo Skeleton + Core Docs

**Goal:** Lock visual system and create the monorepo skeleton so every future agent starts from the same foundation.

### Tasks
1. Create / confirm DESIGN_TOKENS.md with exact hex, radii, shadows, spacing, font weights (Soft Gloss Pastel).
2. Create / confirm AGENTS.md with the 13 strict rules.
3. Create / confirm HISTORY.md and seed it with initial entries.
4. Create monorepo: Turborepo + pnpm, `apps/web`, `apps/admin`, packages (`db`, `ui`, `config`, `auth`, `emails`, `analytics`).
5. Root package.json, turbo.json, pnpm-workspace.yaml, tsconfig, .env.example.
6. Single font setup: Plus Jakarta Sans self-hosted or single fast source only.
7. Base Tailwind / CSS variables wired to DESIGN_TOKENS.
8. Soft Gloss Pastel applied to both storefront and admin shells (no black/gold).

### Acceptance Criteria
- [ ] DESIGN_TOKENS.md exists and matches Master Plan colors/radii/shadows.
- [ ] AGENTS.md and HISTORY.md exist and are referenced in README.
- [ ] `pnpm install && pnpm dev` starts both apps without error.
- [ ] No second font family anywhere in the codebase.
- [ ] Backgrounds are soft blush pink, not white/grey/black.

### Definition of Done
Phase 0 complete only when tokens are locked, docs exist, monorepo runs, and Soft Gloss Pastel is visibly applied on both apps.

**Status note:** Skeleton and tokens largely exist; any remaining black/gold or wrong font must be purged before calling Phase 0 fully done.

---

## PHASE 1 — Database Schema (Prisma) + Auth + Basic Admin Shell (Mobile)

**Goal:** Solid data model, secure admin login, mobile-usable admin shell.

### Tasks
1. Full Prisma schema: User, Product, Variant, Image, Collection, Order, OrderItem, Review (with required orderId FK), Discount, ShippingMethod, Media, Setting, AnalyticsEvent.
2. JWT session auth package (`@eclat/auth`): login, logout, httpOnly cookie, middleware protection for all admin routes.
3. Admin shell (mobile-first):
   - Top bar + bottom tabs or collapsible sidebar usable on phone
   - Login page
   - Dashboard placeholder cards
   - PWA manifest basics
4. Demo admin credentials from .env (ADMIN_EMAIL / ADMIN_PASSWORD).
5. Security headers + basic rate limiting on auth endpoints.
6. Seed script for admin user only (no fake products).

### Acceptance Criteria
- [ ] `pnpm db:generate && pnpm db:push` succeeds.
- [ ] Admin login works; unauthenticated users redirected to /login.
- [ ] Session cookie is httpOnly; logout clears it.
- [ ] Admin layout is usable on a 375px-wide viewport.
- [ ] Review model requires orderId (verified buyers only).
- [ ] No product seed data invented — empty catalog is fine.

### Definition of Done
Auth protects every admin route, schema is complete, admin shell is mobile-first, Soft Gloss Pastel applied to admin UI.

---

## PHASE 2 — Product CRUD + Media Pipeline (Auto Compression) + Product Grids

**Goal:** Full product management in admin + storefront product grids using Soft Gloss Pastel cards.

### Tasks
1. Admin Products list: search, filters (availability, category), card/table toggle, bulk actions.
2. Rich product create/edit form:
   - Title, handle, description (rich text or markdown)
   - Pricing (price, compare-at), inventory, variants (shade swatches if applicable)
   - SEO fields (title, description, slug)
   - Drag-drop multi-image upload
3. Media pipeline:
   - Accept JPEG/PNG/WebP/GIF (max size enforced)
   - Auto-compress → WebP/AVIF + responsive sizes
   - Blur placeholders
   - Store under controlled path (or R2 later)
4. Media library view in admin.
5. Storefront product grids:
   - Mobile-first ProductCard: large image, soft 20–28px radius, dual soft shadow, price + compare-at, review stars, quick-add
   - Skeleton loaders
   - Filters (availability, price, category) fast on mobile
   - Infinite scroll or smart pagination
6. Collection pages shell.

### Acceptance Criteria
- [ ] Admin can create/edit/delete products with images.
- [ ] Uploaded images are compressed and served as WebP/AVIF where possible.
- [ ] ProductCard matches Soft Gloss Pastel (blush bg context, rose primary, soft gold sparingly).
- [ ] Grids are mobile-first; filters work without jank.
- [ ] No second font; no black/gold theme regression.

### Definition of Done
Admin product CRUD + media pipeline working; storefront grids use correct Soft Gloss Pastel cards and are performant on mobile.

---

## PHASE 3 — Cart + Checkout (COD + Stripe + Local Methods) + Order Management

**Goal:** Complete purchase path and order handling.

### Tasks
1. Cart:
   - CartProvider (localStorage or server)
   - Cart drawer + /cart page
   - Quantity update, remove, subtotal
2. Checkout:
   - Contact + Pakistan address fields
   - Shipping method selection
   - Payment methods: COD, Bank Transfer, Stripe (card), JazzCash/EasyPaisa (configurable)
   - Order creation on success
3. Admin Orders:
   - Orders list (status, date, customer, total)
   - Rich order detail: line items, fulfill, tracking number, refund/notes, status transitions
4. Email notifications (order confirmation) via Resend when configured; graceful mock otherwise.
5. Rate limiting on checkout endpoints.

### Acceptance Criteria
- [ ] Full flow: add to cart → checkout → order created for COD and Stripe (mock mode OK without keys).
- [ ] Admin can view and update order status, add tracking.
- [ ] Payment methods are Admin-configurable (Settings later in Phase 6 can refine).
- [ ] No heavy new libraries without HISTORY justification.

### Definition of Done
Customer can place an order; admin can manage it end-to-end. Soft Gloss Pastel preserved on checkout UI.

---

## PHASE 4 — Advanced Product Page + Verified Reviews System

**Goal:** High-converting PDP + authentic reviews only.

### Tasks
1. Advanced Product Detail Page (PDP):
   - Image gallery: zoom + swipe (mobile)
   - Variant selectors (shade swatches)
   - Sticky add-to-cart on mobile
   - Accordion/tabs: Description, How to use, Ingredients, Shipping & Returns
   - Complete the look / frequently bought together
   - Real-time low-stock indicator
   - Structured data: Product + Review + FAQ JSON-LD
2. Verified Reviews system:
   - Only customers with a real order (orderId FK) can submit
   - Flow: after delivery → review link (secure token or logged-in) → star + text + optional photo
   - Admin moderation (approve / hide)
   - Display: average rating, count, photo reviews first, “Verified Buyer” badge
   - No guest reviews; enforce orderId
3. Review submission rate limit.

### Acceptance Criteria
- [ ] PDP is fully interactive on mobile (swipe gallery, sticky ATC).
- [ ] Review cannot be created without valid orderId.
- [ ] Admin can moderate reviews.
- [ ] JSON-LD present and valid.
- [ ] Soft Gloss Pastel + Plus Jakarta Sans only.

### Definition of Done
PDP is advanced and conversion-oriented; reviews are verified against real orders only.

---

## PHASE 5 — Analytics Dashboard (incl. Avg Session Duration) + Meta/Google Pixels

**Goal:** Shopify-level analytics + tracking pixels, all configurable.

### Tasks
1. Admin Analytics dashboard:
   - Total sales / revenue
   - Orders count + average order value (AOV)
   - Conversion rate
   - **Average session duration** (explicit requirement)
   - Sessions / visitors, bounce rate
   - Top products by revenue and by units
   - Traffic sources (UTM + referrer)
   - Device split (expect high mobile)
   - Sales by day/week/month with charts
   - Date range picker, CSV export
   - Mobile-optimized view
2. Pixels & tracking:
   - Meta Pixel + Conversions API (CAPI)
   - Google Analytics 4 + Google Ads conversion tracking
   - Events: page_view, view_item, add_to_cart, begin_checkout, purchase, search, view_item_list
   - Configurable from Admin (paste IDs, toggle events)
3. Lightweight chart library only if needed (justify in HISTORY.md).

### Acceptance Criteria
- [ ] All core metrics listed above are visible and correct.
- [ ] Avg session duration is tracked and shown.
- [ ] Pixels fire the required events (or are cleanly mocked when IDs empty).
- [ ] Dashboard is usable on phone.

### Definition of Done
Owner can open admin on phone and see sales, conversion, session time, and top products; pixels are ready for production IDs.

---

## PHASE 6 — Interactive Play Element + Email Config + Payment Config in Admin

**Goal:** Increase session duration with a lightweight play element; make payments & email fully Admin-configurable.

### Tasks
1. Interactive “Play” element (choose one or small combo):
   - Floating mascot (cute cherry / gloss-drop) that appears after 8–10s or on scroll
   - Can wave, react to cart, show tip (“Try the Rhode set — bestseller in Lahore”), or open mini shade-finder quiz
   - Alternative: “Which shade is yours?” quiz on homepage/PDP
   - Must be < 30–40 KB (SVG or small Lottie). No heavy canvas.
2. Admin Settings:
   - Payment methods toggle + credentials (Stripe, JazzCash, EasyPaisa, COD, Bank Transfer)
   - Email (Resend) API key + from address + template toggles
3. Graceful degradation when keys missing (mock mode).

### Acceptance Criteria
- [ ] Play element loads fast, stays on-brand, does not hurt FCP.
- [ ] Session-duration impact is measurable (or at least not negative).
- [ ] Payments and email are configurable from Admin without code deploy.
- [ ] HISTORY.md notes any new asset size.

### Definition of Done
Play element is live and lightweight; owner can configure payments and email from phone.

---

## PHASE 7 — SEO / AEO / PWA / Security / Performance Audit

**Goal:** Launch-ready polish, security, and performance.

### Tasks
1. SEO/AEO:
   - Dynamic sitemap.xml + robots.txt
   - Open Graph + Twitter cards
   - Product / Review / FAQ JSON-LD (already started in Phase 4 — complete)
2. PWA:
   - Installable (manifest + service worker basics)
   - Optional push for new orders (owner notification)
3. Security:
   - Cloudflare WAF / bot management notes
   - CSP, rate limits, secure headers already applied — audit and tighten
   - Sensitive keys never exposed to client
4. Performance audit:
   - Measure FCP / LCP / CLS on mid-range mobile
   - Fix regressions; stay under 1.2s FCP target
   - Image pipeline, font, code-splitting confirmed

### Acceptance Criteria
- [ ] Lighthouse / Web Vitals pass reasonable mobile thresholds.
- [ ] PWA installable on Android/iOS browser.
- [ ] No critical security headers missing.
- [ ] Soft Gloss Pastel + single font still enforced.

### Definition of Done
Site is performant, installable, and hardened; SEO/AEO basics complete.

---

## PHASE 8 — Import 67 Products + Content + Launch Checklist

**Goal:** Real catalog live + soft launch.

### Tasks
1. Import all 67 products from the official catalog JSON (images, prices, handles, descriptions).
2. Create collections and assign products.
3. Final settings (shipping rates, policies, contact).
4. End-to-end test: browse → cart → COD order → admin fulfill.
5. Soft-launch checklist:
   - [ ] Soft Gloss Pastel + Plus Jakarta Sans only
   - [ ] No invented products
   - [ ] Reviews verified only
   - [ ] Analytics + pixels ready
   - [ ] Play element live
   - [ ] Admin usable on mobile
   - [ ] HISTORY.md up to date

### Acceptance Criteria
- [ ] All 67 products visible and purchasable.
- [ ] Full COD path works in production-like env.
- [ ] Owner can manage everything from phone.

### Definition of Done
Catalog imported, launch checklist signed off, site ready for real traffic.

---

## How agents must use this file

1. Read Master Build Plan + this PROJECT_PLAN.md before any code change.
2. Work only on the current incomplete phase (see PHASES_STATUS.md).
3. When a task is finished, update PHASES_STATUS.md and append to HISTORY.md.
4. Never change theme colors, radii, or add a second font.
5. Prefer surgical edits to existing files.

**Soft Gloss Pastel + Plus Jakarta Sans + Verified Reviews + Avg Session Time + Play Element + Strict Agent Rules = the only path forward.**
