# Florida Water Damage — referral website

88 SEO pages in plain HTML/CSS/JS. Deploy as-is to Cloudflare Pages (or any static host).

## Pages
- Home (`index.html`) with before/after slider, cost calculator, services, regions, FAQ
- 16 service pages (e.g. `burst-pipe-repair.html`, `ac-drain-overflow.html`, `slab-leak-detection.html`)
- 8 region pages (`water-damage-south-florida.html` …) and 53 city pages (`water-damage-miami-fl.html` …)
- Calculator, insurance claim guide, hurricane guide, FAQ, how it works, contact, privacy, terms, 404
- `sitemap.xml`, `robots.txt`, `_headers`, `favicon.svg`, WebP images

## Call popup
Phone links dial directly on phones. On desktop, phone links open a popup showing the number.
Ordinary clicks and links behave normally. Logic is in `script.js` (search for "Call popup").

## Before going live
1. Replace the phone number everywhere: find `(800) 948-4321` and `+18009484321` across all files.
2. Set your real domain: find `https://floridawaterdamage.us` across all files.
3. Have `privacy.html` and `terms.html` reviewed.
4. Submit `https://YOURDOMAIN/sitemap.xml` in Google Search Console.

## SEO included
Unique titles/descriptions, canonical URLs (Cloudflare Pages style, no .html), Open Graph, JSON-LD
(Organization, WebSite, Service, BreadcrumbList, FAQPage, Article, WebApplication), breadcrumbs,
internal links between services, regions and cities, fast WebP images, mobile-first layout.

The site states clearly that it's a referral service. Keep it that way: no fake reviews, ratings,
arrival-time promises or "our crews" claims.
