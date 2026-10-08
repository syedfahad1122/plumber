# 🚀 Complete Cloudflare Deployment Guide

Deploying your modern **Florida Water Damage & Emergency Plumbing Website** to Cloudflare is 100% FREE, lightning fast, and takes less than 2 minutes!

You have two easy ways to upload to Cloudflare:

---

## Method 1: Cloudflare Pages (RECOMMENDED - Easiest & Fastest)

Cloudflare Pages is designed specifically for pure HTML, CSS, JavaScript, and image websites.

### Step-by-Step Direct Upload:
1. Log in to your [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. Click on **Workers & Pages** in the left sidebar menu.
3. Click **Create Application** -> Select the **Pages** tab.
4. Click **Upload Assets** (Direct Upload).
5. Give your project a name (e.g. `florida-water-damage`).
6. Drag & drop the entire folder (`C:\Users\Hp\.gemini\antigravity\scratch\florida-water-damage`) OR select all files inside it (`index.html`, `styles.css`, `script.js`, and the `images/` folder).
7. Click **Deploy Site**! 🎉

Your website will immediately be live on a free `.pages.dev` SSL domain with global CDN acceleration!

---

## Method 2: Cloudflare Workers (Using `worker.js`)

If you want to deploy using **Cloudflare Workers** (where `worker.js` is used):

### Step-by-Step Cloudflare Worker Setup:
1. Open [Cloudflare Dashboard](https://dash.cloudflare.com/) -> **Workers & Pages** -> **Create Worker**.
2. Name your worker (e.g. `florida-water-damage-worker`).
3. Click **Deploy**.
4. In the worker dashboard, click **Edit Code**.
5. Replace the code in the online editor with the contents of your local [`worker.js`](file:///C:/Users/Hp/.gemini/antigravity/scratch/florida-water-damage/worker.js).
6. Under **Settings** -> **Variables & Assets**:
   - Enable **Static Assets** binding.
   - Upload the static folder containing `index.html`, `styles.css`, `script.js`, and `images/`.
7. Click **Save and Deploy**!

---

## Checklist of Files to Upload to Cloudflare:
- `index.html` (Main website structure & SEO markup)
- `styles.css` (Ultra-modern glassmorphic design system & mobile layout)
- `script.js` (Calculator engine, slider, dropdowns, FAQs)
- `images/` folder (Hero, before/after images, service photos)
- `worker.js` (Optional for Workers runtime)
