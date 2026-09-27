# AGENTS.md — Strict Rules for Every Agent

**Project:** Éclat by Tuba  
**Theme:** Soft Gloss Pastel (LOCKED)  
**Font:** Plus Jakarta Sans ONLY (LOCKED)  

Read `PROJECT_PLAN.md` and the Master Build Plan before any work.

## Non-Negotiable Rules

1. **Never create a new file for styles or logic** if the functionality can be added to an existing file. Prefer editing the existing file.
2. **Do not overwrite large existing files** with completely new code. Make surgical fixes and additions only.
3. **One font family only: Plus Jakarta Sans.** Adding any other font is forbidden.
4. **Do not add new heavy libraries** without strong justification written in HISTORY.md.
5. **Every single change** (no matter how small) must be logged in HISTORY.md with date, what changed, and why.
6. **Before starting any task**, read PROJECT_PLAN.md and the relevant section of the Master Plan.
7. **Mobile performance is sacred.** Measure impact of every addition on load time. Target FCP < 1.2s.
8. **Never invent product data.** Use the extracted 67-product catalog (`eclat_products_clean.json` / `docs/products_catalog_slim.json`).
9. **Theme and design tokens are locked.** Do not change colors, radii, or font without explicit user approval. Soft Gloss Pastel only.
10. **Admin must remain fully usable on mobile.** Mental model: "owner is on phone in Lahore traffic".
11. **Reviews must be verified against real orders.** No guest fake reviews. orderId is required.
12. **Keep the interactive play element lightweight** (< 30–40 KB).
13. **When in doubt**, choose the simpler, faster, more maintainable solution.

## Design System Quick Reference
- Backgrounds: soft blush pink (#FFF0F5 – #FFE8F0)
- Primary accent: deep rose/berry (#C45C7A)
- Soft gold accent: use very sparingly
- Cards/buttons: 20–28px radius + soft dual shadow
- Motifs: bows, hearts, pearls, sparkles, cherries (sparse)
- Font: Plus Jakarta Sans only

## Required Files to Keep Updated
- HISTORY.md — every change
- PROJECT_PLAN.md — mark tasks done when completed

Any agent that violates these rules is working against the project goals.
