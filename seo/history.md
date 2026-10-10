# SEO topic and URL history (floridawaterdamage.us)

Newest first. Check this file before choosing a task so nothing is repeated.

## 2026-10-11 (3): homepage reworked to a call-first layout
- Same section flow as competitor ad pages, in our own words and design: a shorter hero ("24/7 water damage help anywhere in Florida"), a "Water still coming in?" strip, a 12-tile "What happened? Pick your problem." grid, call buttons after How it works and after the FAQ, and the "5 questions to ask before you hire" list. No ratings, arrival-time or badge claims.

## 2026-10-11 (2): "First 48 hours" interactive timeline (homepage)
- New homepage section `#first-48-hours`: drag through four stages (minutes, first day, 24–48 hours, after 48 hours). A room drawing shows water rising, drywall wicking and mold appearing. Each stage says what to do. Based on EPA guidance; claims kept soft ("can"). Every stage's text shows without JavaScript.

## 2026-10-11: Google Ads landing page
- New `/emergency-water-damage-help`: a focused landing page for paid ads, with the same call-first flow as competitor ad pages, kept honest (no ratings, arrival times, badges or insurance-billing claims). Main menus are hidden on this page. It is set to noindex and left out of the sitemap so it doesn't compete with the homepage in search.

## 2026-10-10 (3): Spanish pages + Google Analytics
- Added Google Analytics (G-BY1B0T5HX1) to every page. script.js already sends `call_click` events. Privacy policy updated.
- New Spanish pages: `/es` (homepage) and `/es-emergencia-danos-por-agua` (emergency guide). Both have hreflang pairs with `/` and `/water-damage-emergency-steps` and translated menus, footer and popup. Links to pages that only exist in English are marked "(en inglés)". Both pages say honestly that not every provider speaks Spanish.
- Top bar on every page has an Español / English switch.
- Next language candidates for Florida: Haitian Creole, Portuguese. These need native review before publishing.

## 2026-10-10 (2): emergency guide + call popup fix
- New page `/water-damage-emergency-steps`: pick the water source (burst pipe, AC, water heater, appliance, sewage, roof, flood) to get first steps, who to call and what to avoid. Covers safety rules (CDC), the 24-48 hour drying window (EPA) and Florida claim-notice deadlines (s. 627.70132: 1 year for new or reopened claims, 18 months for supplemental). Has Article, FAQPage and BreadcrumbList schema. Every step is visible without JavaScript.
- Linked from the Resources menu on every page and from the homepage's "What to do right now" box.
- Call popup: removed "any click opens the popup". On phones, phone links now dial directly; on desktop they open the number popup. Ordinary links work normally.
- Primary keyword: "what to do water damage" / "water damage emergency steps" (no volume data available).

## 2026-10-10: technical cleanup and the first deep city page
- **Internal links:** 12,840 internal links now use the clean canonical URLs (`/burst-pipe-repair`, not `.html`). Home links to `/`.
- **Sitemap:** removed `<priority>`. `lastmod` now changes only when a page's content changes.
- **Misleading anchors:** fixed on 53 city pages and 16 service pages. City pages had "{Service} in {City}" links that pointed to statewide service pages; they now use the plain service name. Service pages had "{Service} in {City}" links that pointed to general city pages; they now say "Water damage help in {City}".
- **Tampa page** (`/water-damage-tampa-fl`), now with verified local content:
  - Helene storm surge, with NWS gauge readings (via Axios)
  - Milton rainfall and the record Hillsborough River crest (via Bay News 9)
  - City of Tampa rules: who may operate the shut-off at the meter, and the utilities number
  - Hillsborough County's 2026 evacuation-zone changes
  - Tampa's post-hurricane permitting rules
  - 3 new FAQs, with the FAQPage schema updated to match
- **Meta descriptions:** shortened on water-extraction and water-damage-restoration.
- **Tooling:** added `seo/validate.mjs` (the pre-publish safety check) and `seo/fix-internal-links.mjs`.
- **Primary keyword:** "water damage restoration Tampa" (no volume data; no Search Console access yet).
