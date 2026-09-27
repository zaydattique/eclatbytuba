# DESIGN_TOKENS.md — Soft Gloss Pastel (LOCKED)

**Do not change without explicit user approval.**

## Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-bg` | `#FFF0F5` | Main page background (soft blush) |
| `--color-bg-alt` | `#FFE8F0` | Alternate / section background |
| `--color-bg-card` | `#FFFFFF` | Cards (with soft shadow) |
| `--color-primary` | `#C45C7A` | Deep rose/berry — buttons, links, accents |
| `--color-primary-hover` | `#A84A66` | Primary hover state |
| `--color-accent-gold` | `#D4A574` | Soft gold — use very sparingly for perceived value |
| `--color-text` | `#2D2A2B` | Primary text |
| `--color-text-muted` | `#6B5E62` | Secondary text |
| `--color-text-on-primary` | `#FFFFFF` | Text on primary buttons |
| `--color-success` | `#4A7C59` | Success states |
| `--color-warning` | `#C49A3C` | Low stock, warnings |
| `--color-error` | `#C45C5C` | Errors |
| `--color-border` | `#F0D6E0` | Soft borders |
| `--color-star` | `#F5A623` | Review stars |

## Typography

- **Font family (ONLY):** `Plus Jakarta Sans`
- Variable font preferred.
- Allowed weights: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)
- No other font families allowed.

## Radii

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-sm` | `12px` | Small chips, inputs |
| `--radius-md` | `20px` | Buttons, small cards |
| `--radius-lg` | `24px` | Product cards, modals |
| `--radius-xl` | `28px` | Large cards, gallery |
| `--radius-full` | `9999px` | Pills, avatars, swatches |

## Shadows (Soft Clay-lite)

```css
--shadow-card: 0 4px 20px rgba(196, 92, 122, 0.08), 0 1px 3px rgba(196, 92, 122, 0.04);
--shadow-elevated: 0 8px 30px rgba(196, 92, 122, 0.12), 0 2px 6px rgba(196, 92, 122, 0.06);
--shadow-button: 0 2px 8px rgba(196, 92, 122, 0.2);
```

## Spacing Scale

4, 8, 12, 16, 20, 24, 32, 40, 48, 64 px

## Motifs (Sparse)

Allowed SVG motifs only: small bows, hearts, pearls, soft sparkles, cherries/peach/strawberry. Use sparingly.

## Motion

- Prefer CSS transform + opacity
- Duration: 150–250ms
- No heavy animation libraries unless justified in HISTORY.md

## Performance

- Self-host Plus Jakarta Sans or one fast source only
- All images through compression pipeline → WebP/AVIF + responsive sizes
- Blur placeholders required
