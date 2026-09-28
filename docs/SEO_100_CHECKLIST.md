# SEO / AEO — 100 ways checklist (Éclat by Tuba)

Status key: ✅ code done · 🔶 partial / needs owner · ❌ owner-only / time

## Technical (1–20)
1. ✅ Production-oriented `siteConfig.url` (set real domain in env on deploy)
2. 🔶 Real `og.png` asset in `apps/web/public/og.png` (owner design)
3. ✅ Image sitemap `/sitemap-images.xml`
4. ✅ Sitemap includes products + collections + guides
5. ✅ Canonicals on PDP, collections, guides, trust pages
6. 🔶 301 from old Shopify URLs (owner list of old paths)
7. ✅ Helpful 404 with shop links
8. ✅ No infinite filter URLs (collections are clean paths)
9. ❌ hreflang only if dual-language site ships
10. ✅ `fetchPriority` on main gallery image
11. ✅ next.config image AVIF/WebP + Shopify CDN patterns
12. ✅ Fixed aspect ratios on cards/gallery
13. ✅ Security headers in next.config
14. ✅ robots disallow cart/checkout/api
15. ✅ `lang="en-PK"`
16. 🔶 Rich Results test after deploy (owner)
17. ✅ Breadcrumbs PDP + collections
18. 🔶 ItemList on homepage (featured cards — extend if needed)
19. ✅ Organization JSON-LD (add real sameAs when socials exist)
20. 🔶 Weekly GSC crawl after go-live

## On-page (21–40)
21. 🔶 Hand-write top 15 SKUs (engine covers all; hand copy still wins)
22. ✅ Varied long-form sections via engine
23. ✅ Shade lists; HTML tables optional next
24. ✅ Dynamic last-updated on PDP
25. 🔶 Author bylines with real names
26. 🔶 Ingredients only when verified
27. ✅ Honest compare-at when present
28. ✅ Low-stock messaging
29. ✅ Descriptive image alts
30. 🔶 Upload filenames on new media
31. ✅ No keyword stuffing in engine titles
32. ✅ Guides link to products only when relevant
33. ✅ Internal links PDP ↔ collection ↔ guides
34. 🔶 TOC on longest pages if needed
35. 🔶 Video + transcript (owner content)
36. ✅ Kit overview from description
37. 🔶 Seasonal pages (owner calendar)
38. 🔶 Prune cannibal SKUs (catalog ops)
39. 🔶 Price audit cadence
40. ✅ Engine avoids thin paste-only pages

## AEO (41–55)
41. ✅ Answer-first block
42. ✅ FAQ answers lead with direct sentence
43. 🔶 Expand from GSC queries post-launch
44. ✅ HowTo helper in seo.ts (wire on lip PDPs)
45. ✅ Definition subsection in long copy
46. 🔶 Comparison tables (Kiko vs generic) as guide content
47. ✅ Short FAQ answers for voice/AI
48. ✅ Consistent product names
49. 🔶 Urdu FAQ if GSC shows demand
50. ✅ Guide TL;DR-style openers
51. ✅ Date only when page renders
52. ✅ Product-specific FAQs
53. ✅ Pakistan / COD / price phrasing
54. ✅ Text carries claims
55. ❌ Monthly Overview win/loss (process)

## IA (56–65)
56. ✅ Collection intros
57. ✅ Clean collection URLs
58. ✅ Prefer `/collections` over query params
59. ✅ Shop + collection nav
60. ✅ Bidirectional guide links
61. ✅ Homepage collection chips
62. ✅ Under Rs 2000 guide
63. ❌ City doorway pages — do not spam
64. ✅ 404 recovery links
65. ✅ HTML sitemap `/site-map`

## E-E-A-T (66–78)
66. 🔶 Expand About with real founder story
67. 🔶 Real phone/WhatsApp
68. ✅ Shipping, returns, privacy, terms
69. 🔶 Real verified reviews over time
70. 🔶 Photo reviews
71. 🔶 Authenticity process in plain language
72. ✅ No fake timers in code
73. 🔶 GBP only if real local presence
74. ✅ Trust strip checkout/PDP
75. 🔶 Weekly review moderation
76. ✅ HISTORY + this checklist
77. 🔶 Support FAQ from WhatsApp
78. N/A affiliates

## Off-page (79–90)
79–90. ❌ Owner: GSC, Bing, social, PR, UGC, no spam

## Measurement (91–100)
91–100. ❌ Owner process after deploy (GSC, CWV, title CTR, rank track)

---

**Code cannot complete all 100.** Items marked ❌/🔶 need your domain, content, socials, or time. Everything ✅ is in the repo as of this commit.
