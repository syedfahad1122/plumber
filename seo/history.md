# SEO topic and URL history (floridawaterdamage.us)

Newest first. Check this file before choosing a task so nothing is repeated.

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
