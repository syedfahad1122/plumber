#!/usr/bin/env node
/**
 * FloridaWaterDamage.us — pre-publish safety gate.
 * Run from the site root:  node seo/validate.mjs
 * Exit code 0 = safe to publish. Non-zero = do NOT push; fix or revert.
 * No dependencies. Node 18+.
 */
import { readFileSync, readdirSync, existsSync } from 'node:fs';

const ORIGIN = 'https://floridawaterdamage.us';
const PHONE_TEXT = '(800) 948-4321';
const PHONE_TEL = '+18009484321';
const errors = [];
const warns = [];
const err = (f, m) => errors.push(`${f}: ${m}`);
const warn = (f, m) => warns.push(`${f}: ${m}`);

// Claims the business cannot make (referral service, no crews, no reviews).
const FORBIDDEN = [
  [/aggregateRating/i, 'rating schema (fake review markup)'],
  [/"@type"\s*:\s*"Review"/i, 'Review schema'],
  [/\bour (crews?|technicians|team of technicians|trucks)\b/i, '"our crews/technicians" claim'],
  [/\bwe (dispatch|send) (a |our )?(crew|technician|team)/i, '"we dispatch crews" claim'],
  [/\bavg\.?\s*\d+[-\s]?min/i, 'average arrival-time claim'],
  [/\b(arrive|arrival|there) (in|within) \d+\s*(min|minutes)\b/i, 'arrival-time promise'],
  [/\bguarantee(d)?\b/i, 'guarantee claim'],
  [/\bdirect billing\b/i, 'direct-billing claim'],
  [/\b(our|we are) (licensed|certified|IICRC[- ]certified)\b/i, 'license/certification claim about us'],
  [/\b\d{1,3}(,\d{3})+\+? (homes|customers|families|jobs) (served|restored|helped)\b/i, 'unverifiable volume claim'],
  [/lorem ipsum|\[(insert|todo|tbd)[^\]]*\]|TODO:/i, 'placeholder text'],
];

const files = readdirSync('.').filter(f => f.endsWith('.html'));
const fileSet = new Set(files);
const titles = new Map();

for (const f of files) {
  const html = readFileSync(f, 'utf8');
  const isUtility = f === '404.html';
  const noindex = /<meta[^>]+name=["']robots["'][^>]+noindex/i.test(html);
  const slug = f === 'index.html' ? '' : f.replace(/\.html$/, '');
  const expectCanon = `${ORIGIN}/${slug}`;

  if (!/^\s*<!doctype html>/i.test(html)) err(f, 'missing <!doctype html>');
  if (!/<\/html>\s*$/i.test(html)) err(f, 'file does not end with </html> (truncated?)');
  const tCount = (html.match(/<title>/gi) || []).length;
  if (tCount !== 1) err(f, `${tCount} <title> tags`);
  const title = (html.match(/<title>([^<]*)<\/title>/i) || [])[1] || '';
  if (!isUtility) {
    if (title.length < 15 || title.length > 70) warn(f, `title length ${title.length}`);
    if (titles.has(title)) err(f, `duplicate title with ${titles.get(title)}`); else titles.set(title, f);
  }
  const desc = (html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)/i) || [])[1];
  if (!isUtility && !desc) err(f, 'missing meta description');
  if (desc && (desc.length < 70 || desc.length > 170)) warn(f, `meta description length ${desc.length}`);
  const h1 = (html.match(/<h1[\s>]/gi) || []).length;
  if (h1 !== 1) err(f, `${h1} <h1> tags`);
  if (!isUtility && !noindex) {
    const canon = (html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)/i) || [])[1];
    if (canon !== expectCanon && !(slug === '' && canon === `${ORIGIN}/`)) err(f, `canonical is ${canon}, expected ${expectCanon}`);
  }
  // JSON-LD must parse
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)) {
    try { JSON.parse(m[1]); } catch (e) { err(f, `invalid JSON-LD: ${e.message}`); }
  }
  // Referral disclosure + phone
  if (!/referral service|servicio de referidos/i.test(html)) err(f, 'referral-service disclosure missing');
  if (!html.includes(PHONE_TEL)) err(f, `tel:${PHONE_TEL} link missing`);
  const phones = html.replace(/<span class="official-tel">[^<]*<\/span>/g, '').replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/gi, '').match(/\(\d{3}\)\s?\d{3}-\d{4}/g) || [];
  for (const p of new Set(phones)) if (p !== PHONE_TEXT) err(f, `unexpected phone number ${p}`);
  // Forbidden claims (check visible text + JSON-LD, skip <style>)
  const text = html.replace(/<style[\s\S]*?<\/style>/gi, '');
  const legal = f === 'terms.html' || f === 'privacy.html';
  for (const [re, label] of FORBIDDEN) if (!(legal && label === 'guarantee claim') && re.test(text)) err(f, `forbidden: ${label} -> "${text.match(re)[0]}"`);
  // Internal links must resolve to a real page
  for (const m of html.matchAll(/<a\b[^>]*\bhref=["']([^"']+)["']/gi)) {
    let h = m[1];
    if (h.startsWith(ORIGIN)) h = h.slice(ORIGIN.length) || '/';
    if (/^(https?:|mailto:|tel:|#|javascript:|data:)/i.test(h)) continue;
    let p = h.split(/[?#]/)[0].replace(/^\.?\//, '');
    if (p === '' ) continue;
    if (!p.endsWith('.html') && !p.includes('.')) p += '.html';
    if (p.endsWith('.html') && !fileSet.has(p)) err(f, `broken internal link ${m[1]}`);
  }
  // Images need alt text
  for (const m of html.matchAll(/<img\b[^>]*>/gi)) if (!/\balt=["'][^"']+["']/i.test(m[0])) err(f, 'img without alt text');
}

// Sitemap: every indexable page listed, nothing listed that doesn't exist
if (existsSync('sitemap.xml')) {
  const sm = readFileSync('sitemap.xml', 'utf8');
  const locs = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
  for (const loc of locs) {
    const slug = loc.replace(ORIGIN, '').replace(/^\//, '');
    const file = slug === '' ? 'index.html' : `${slug}.html`;
    if (!fileSet.has(file)) err('sitemap.xml', `lists ${loc} but ${file} does not exist`);
  }
  for (const f of files) {
    if (f === '404.html') continue;
    const html = readFileSync(f, 'utf8');
    if (/<meta[^>]+name=["']robots["'][^>]+noindex/i.test(html)) continue;
    const loc = f === 'index.html' ? `${ORIGIN}/` : `${ORIGIN}/${f.replace(/\.html$/, '')}`;
    if (!locs.includes(loc)) err('sitemap.xml', `missing ${loc}`);
  }
  const today = new Date(Date.now() + 86400000).toISOString().slice(0, 10); // +1 day slack for time zones
  const lm = [...sm.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)].map(m => m[1]);
  if (lm.length > 5 && lm.every(d => d === lm[0])) warn('sitemap.xml', `all ${lm.length} lastmod dates identical (${lm[0]})`);
  if (lm.some(d => d > today)) err('sitemap.xml', 'lastmod in the future');
} else err('sitemap.xml', 'missing');

if (!existsSync('robots.txt') || !/Sitemap:\s*https:\/\/floridawaterdamage\.us\/sitemap\.xml/.test(readFileSync('robots.txt', 'utf8'))) err('robots.txt', 'missing or no Sitemap line');

for (const w of warns) console.log(`WARN  ${w}`);
for (const e of errors) console.log(`ERROR ${e}`);
console.log(`\n${files.length} pages checked: ${errors.length} errors, ${warns.length} warnings.`);
process.exit(errors.length ? 1 : 0);
