# plumber - Florida Water Damage & Emergency Plumbing Restoration

A state-of-the-art, ultra-modern emergency restoration and plumbing web application tailored for Florida homeowners and commercial properties, built using **Pure HTML5, Vanilla CSS3, and Vanilla JavaScript**.

## 🚀 Key Features

1. **Pure HTML5 & Vanilla CSS3 Architecture**: No framework build steps required; zero dependencies, lightning fast load time, fully responsive.
2. **Emergency Header & Live Dispatch Bar**: Dynamic live status ticker ("Crews Active Across All 67 Florida Counties"), 24/7 hotline CTA, mobile navigation drawer.
3. **Multi-Level Desktop & Mobile Dropdown Submenus**: Services mega-menu, Service Areas directory, Resources, and Company pages.
4. **Click-to-Call Emergency Popup Modal**: Global interception of all phone links to trigger a high-converting confirmation modal with direct 1-click dialing.
5. **Interactive IICRC S500 + Plumbing Sizing & Cost Calculator**:
   - Sq ft slider with live numerical display & range bounds
   - Contamination Category cards (Cat 1 Clean, Cat 2 Grey, Cat 3 Biohazard)
   - Evaporation Class selector (Class 1 - 4)
   - Peril/Plumbing Type selector (Burst Pipe, Slab Leak, Hurricane/Storm Flood, AC Drain Overflow)
   - Florida City dropdown (Miami, Tampa, Orlando, Jacksonville, Fort Lauderdale, Naples, Sarasota, etc.)
   - Instant calculation: Estimated Xactimate cost range, drying timeline, commercial LGR dehumidifiers count, air movers count, AHAM target.
6. **Interactive Before/After Restoration Visual Comparison Slider**: Smooth mouse/touch drag slider comparing flooded damage vs restored property.
7. **Dedicated Subpages & SEO Microdata**:
   - `index.html`: Main home page.
   - `burst-pipe-repair.html`: Burst & Leaking Pipe Repair subpage with Xactimate pricing schedule & emergency checklist.
   - `services.html`: Services directory.
   - `water-damage-restoration.html`: 24/7 Water Extraction subpage.
   - `service-areas.html`: Florida 67 Counties directory.
   - `calculator.html`: Dedicated calculator page.
8. **Cloudflare Deployment Package**: Includes production-ready `worker.js` and `CLOUDFLARE_GUIDE.md` for 1-click deployment on Cloudflare Pages and Cloudflare Workers.

---

## ⚡ Cloudflare Deployment Quick Start

### Cloudflare Pages (Easiest)
1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/) -> **Workers & Pages** -> **Create Application** -> **Pages**.
2. Select **Upload Assets** (Direct Upload).
3. Drag & drop the project folder or select `index.html`, `styles.css`, `script.js`, and `images/`.
4. Click **Deploy Site**!

### Cloudflare Workers (`worker.js`)
1. Create a Worker in Cloudflare Dashboard.
2. Replace code in editor with [`worker.js`](worker.js).
3. Bind your static assets folder under **Settings -> Variables & Assets**.
4. Deploy!

---

## 📁 Repository Structure
- `index.html` - Home page
- `burst-pipe-repair.html` - Burst Pipe & Emergency Plumbing subpage
- `services.html` - Services hub page
- `water-damage-restoration.html` - Water extraction subpage
- `service-areas.html` - Service areas page
- `calculator.html` - Calculator page
- `styles.css` - Design system stylesheet
- `script.js` - Interactive JavaScript engine
- `worker.js` - Cloudflare Workers deployment script
- `CLOUDFLARE_GUIDE.md` - Deployment instructions
- `images/` - Photorealistic site assets
