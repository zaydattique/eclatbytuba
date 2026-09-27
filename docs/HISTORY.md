# HISTORY.md — Éclat by Tuba

Chronological log of every decision and code change. Every agent must append here.

---

## 2026-09-27 — Docs realigned to Master Build Plan v2.0

**What**
- Rewrote `docs/PROJECT_PLAN.md` to match Master Build Plan phases 0–8 with full tasks, acceptance criteria, and Definition of Done for each phase.
- Updated `docs/PHASES_STATUS.md` to the same phase list and realistic current status.
- Strengthened `docs/AGENTS.md` so every agent treats Master Plan + PROJECT_PLAN as single source of truth.
- Fixed `README.md` brand colors (removed black/gold) and outdated phase table; pointed to Soft Gloss Pastel + Plus Jakarta Sans.

**Why**
- Previous phase numbering and README still reflected an older (black/gold) theme and a simplified phase list. One agent had applied black + gold; user corrected theme to Soft Gloss Pastel. Docs must prevent that regression and give every future agent exact, detailed instructions so work does not diverge.

---

## 2026-09-27 — Phase 4 storefront work (pre-realignment note)

Storefront Soft Gloss Pastel progress (now mapped under Phases 2–3):
- Header + Footer + Cart drawer (localStorage)
- Product cards, homepage, collections grid, quick PDP
- Policy pages; checkout still placeholder
- Real sample products from extracted catalog

Theme confirmed: Soft Gloss Pastel · Font: Plus Jakarta Sans only.

---

## Prior

- Phase 0–1 foundation: monorepo, Prisma schema, auth, admin shell.
- Security: rate-limit, headers, queue helpers added.
- Theme locked to Soft Gloss Pastel after black/gold correction.
