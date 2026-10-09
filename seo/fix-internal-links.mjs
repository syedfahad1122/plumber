#!/usr/bin/env node
/**
 * FloridaWaterDamage.us — internal link + sitemap fix
 *
 * Problem (audited 2026-10-09):
 *   - Every nav, body and footer link points to *.html URLs (and Home -> /index.html),
 *     but canonicals and sitemap.xml use extensionless URLs. The .html URLs resolve to the
 *     clean URLs, so every internal link sends crawlers through a redirect/duplicate
 *     instead of straight to the canonical page.
 *   - sitemap.xml stamps every URL with lastmod = build date, which tells Google every
 *     page changed today. Google ignores lastmod it can't trust.
 *
 * What this script does (run from the site root, the folder that holds the .html files):
 *   1. Rewrites internal hrefs to the canonical clean form:
 *        https://floridawaterdamage.us/burst-pipe-repair.html -> /burst-pipe-repair
 *        /index.html, index.html, https://floridawaterdamage.us/index.html -> /
 *      Query strings and #fragments are kept. Canonical/og:url tags, images, scripts and
 *      external links are not touched.
 *   2. Regenerates sitemap.xml with lastmod = the date the page's content last changed
 *      in git (falls back to omitting lastmod rather than inventing one). <priority> is
 *      dropped because Google ignores it. Pages with a noindex robots meta are excluded.
 *
 * Usage:
 *   node fix-internal-links.mjs --dry-run      # report only, writes nothing
 *   node fix-internal-links.mjs                # rewrite files + sitemap.xml
 *   node fix-internal-links.mjs --root ./dist  # if the built site lives elsewhere
 *
 * No dependencies. Node 18+.
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { execFileSync } from 'node:child_process';

const ORIGIN = 'https://floridawaterdamage.us';
const args = process.argv.slice(2);
const DRY = args.includes('--dry-run');
const rootIdx = args.indexOf('--root');
const ROOT = rootIdx >= 0 ? args[rootIdx + 1] : '.';
const SKIP_DIRS = new Set(['node_modules', '.git', '.vercel', '.netlify', '.wrangler']);

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (SKIP_DIRS.has(name)) continue;
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) walk(p, out);
    else if (name.endsWith('.html')) out.push(p);
  }
  return out;
}

/** Turn an internal .html href into its canonical clean path; return null if not ours. */
export function cleanHref(href) {
  let h = href.trim();
  if (h.startsWith(ORIGIN)) h = h.slice(ORIGIN.length) || '/';
  else if (/^(https?:)?\/\//i.test(h) || /^(mailto|tel|javascript|data):/i.test(h) || h.startsWith('#')) {
    return null; // external, protocol or same-page anchor
  }
  const m = h.match(/^([^?#]*)([?#].*)?$/);
  let path = m[1];
  const tail = m[2] || '';
  if (!path.endsWith('.html')) return null;
  if (!path.startsWith('/')) path = '/' + path.replace(/^\.\//, ''); // site is flat; relative == root
  if (path === '/index.html') path = '/';
  else if (path.endsWith('/index.html')) path = path.slice(0, -'index.html'.length);
  else path = path.slice(0, -'.html'.length);
  return path + tail;
}

function rewriteLinks(html) {
  let count = 0;
  // Only <a href> and <area href>; leave <link rel=canonical>, og tags, src= alone.
  const out = html.replace(/(<(?:a|area)\b[^>]*?\bhref\s*=\s*)(["'])([^"']*)\2/gi, (full, pre, q, href) => {
    const c = cleanHref(href);
    if (c === null || c === href) return full;
    count++;
    return `${pre}${q}${c}${q}`;
  });
  return { out, count };
}

// lastmod policy (works with shallow clones):
//   page changed in this working tree (vs HEAD) or new -> today
//   otherwise -> keep the lastmod already in sitemap.xml
//   no previous value -> last commit date for the file, else omitted
const prevLastmod = new Map();
try {
  const old = readFileSync(join(ROOT, 'sitemap.xml'), 'utf8');
  for (const m of old.matchAll(/<loc>([^<]+)<\/loc>\s*(?:<lastmod>([^<]+)<\/lastmod>)?/g)) if (m[2]) prevLastmod.set(m[1], m[2]);
} catch {}
function git(args) {
  try { return execFileSync('git', args, { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim(); } catch { return null; }
}
const TODAY = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/New_York' }).format(new Date());
function lastmodFor(file, loc, contentChanged, current) {
  const rel = relative(ROOT, file);
  if (contentChanged) return TODAY;
  const head = git(['show', `HEAD:${rel.split(sep).join('/')}`]);
  if (head === null) return TODAY; // new file
  // Only link normalization since HEAD? Then the page content hasn't changed.
  const now = current.trim();
  if (rewriteLinks(head).out.trim() !== now) return TODAY;
  if (prevLastmod.has(loc)) return prevLastmod.get(loc);
  const d = git(['log', '-1', '--format=%cs', '--', rel]);
  return d && /^\d{4}-\d{2}-\d{2}$/.test(d) ? d : null;
}

function urlFor(file) {
  const rel = relative(ROOT, file).split(sep).join('/');
  if (rel === 'index.html') return `${ORIGIN}/`;
  if (rel.endsWith('/index.html')) return `${ORIGIN}/${rel.slice(0, -'index.html'.length)}`;
  return `${ORIGIN}/${rel.slice(0, -'.html'.length)}`;
}

const files = walk(ROOT).sort();
let totalLinks = 0;
const entries = [];

for (const file of files) {
  const src = readFileSync(file, 'utf8');
  const { out, count } = rewriteLinks(src);
  totalLinks += count;
  if (count && !DRY) writeFileSync(file, out);
  if (count) console.log(`${DRY ? '[dry] ' : ''}${relative(ROOT, file)}: ${count} links cleaned`);

  const base = file.split(sep).pop();
  if (/^(404|500)\.html$/.test(base) || base.startsWith('_')) continue;
  if (/<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex/i.test(src)) continue;
  const loc = urlFor(file);
  entries.push({ loc, lastmod: lastmodFor(file, loc, false, out) });
}

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...entries.map(e => `  <url><loc>${e.loc}</loc>${e.lastmod ? `<lastmod>${e.lastmod}</lastmod>` : ''}</url>`),
  '</urlset>',
  ''
].join('\n');

const noDate = entries.filter(e => !e.lastmod).length;
if (!DRY) writeFileSync(join(ROOT, 'sitemap.xml'), sitemap);
console.log(`\n${files.length} HTML files scanned, ${totalLinks} internal links ${DRY ? 'would be ' : ''}rewritten.`);
console.log(`sitemap.xml: ${entries.length} URLs${noDate ? `, ${noDate} without lastmod` : ''}${DRY ? ' (not written, dry run)' : ' written'}.`);
