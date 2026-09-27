# AGENTS.md — Strict Rules for Every Agent

**Project:** Éclat by Tuba  
**Single source of truth:** Master Build Plan v2.0 (attached / user-provided) + `docs/PROJECT_PLAN.md`  
**Theme:** Soft Gloss Pastel (LOCKED)  
**Font:** Plus Jakarta Sans ONLY (LOCKED)  

Read the Master Build Plan and `PROJECT_PLAN.md` before any work. Follow only the phases defined there (0–8). Do not invent new phases or skip acceptance criteria.

---

## Non-Negotiable Rules

1. **Never create a new file for styles or logic** if the functionality can be added to an existing file. Prefer editing the existing file.
2. **Do not overwrite large existing files** with completely new code. Make surgical fixes and additions only.
3. **One font family only: Plus Jakarta Sans.** Adding any other font is forbidden.
4. **Do not add new heavy libraries** without strong justification written in HISTORY.md.
5. **Every single change** (no matter how small) must be logged in HISTORY.md with date, what changed, and why.
6. **Before starting any task**, read PROJECT_PLAN.md and the relevant section of the Master Plan. Check PHASES_STATUS.md for current phase.
7. **Mobile performance is sacred.** Measure impact of every addition on load time. Target FCP < 1.2s on mid-range Pakistani mobile.
8. **Never invent product data.** Use the extracted 67-product catalog only (`PRODUCTS_CATALOG.md` / catalog JSON).
9. **Theme and design tokens are locked.** Soft Gloss Pastel only. Do not change colors, radii, or font without explicit user approval. **Black + gold is forbidden** (previous regression — do not reintroduce).
10. **Admin must remain fully usable on mobile.** Mental model: “owner is on phone in Lahore traffic”.
11. **Reviews must be verified against real orders.** No guest fake reviews. `orderId` is required.
12. **Keep the interactive play element lightweight** (< 30–40 KB).
13. **When in doubt**, choose the simpler, faster, more maintainable solution.

---

## Design System Quick Reference (Soft Gloss Pastel)

| Token | Value | Notes |
|-------|-------|-------|
| Backgrounds | `#FFF0F5` – `#FFE8F0` | Soft blush / peachy-pink. Never pure white, grey, or dark. |
| Primary | `#C45C7A` | Deep rose/berry |
| Soft gold | `#D4A574` | Use very sparingly for perceived value |
| Text | `#2D2A2B` / muted `#6B5E62` | |
| Radii | 20–28px cards/buttons | Soft dual shadow (clay-lite) |
| Font | Plus Jakarta Sans only | Weights 400, 500, 600, 700 |
| Motifs | bows, hearts, pearls, sparkles, cherries | Sparse |

Full tokens: `docs/DESIGN_TOKENS.md`.

---

## Phase discipline

- Work only on the earliest incomplete phase in `docs/PHASES_STATUS.md`.
- When a phase meets its Definition of Done in PROJECT_PLAN.md, mark it ✅ in PHASES_STATUS.md and log completion in HISTORY.md.
- Do not start later phases early.

---

## Required files to keep updated

- `HISTORY.md` — every change
- `PHASES_STATUS.md` — phase completion
- `PROJECT_PLAN.md` — mark tasks done when completed (checkbox style preferred)

Any agent that violates these rules or reintroduces black/gold or a second font is working against the project goals.
