// Run after the build:  node _build/check.mjs   (or: npm run check:site)
// Checks the generated pages: SEO (title, description, H1, JSON-LD), copy gate, ids and local links.
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';

const R = join(dirname(fileURLToPath(import.meta.url)), '..');
const files = readdirSync(R).filter(f => f.endsWith('.html'));
const html = Object.fromEntries(files.map(f => [f, readFileSync(join(R, f), 'utf8')]));
let fails = 0;
const bad = (f, m) => { fails++; console.log(`FAIL ${f}: ${m}`); };
const dec = s => s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const titles = new Map(), descs = new Map();

for (const f of files) {
  const raw = html[f], noCom = raw.replace(/<!--[\s\S]*?-->/g, '');
  const title = (raw.match(/<title>([^<]*)<\/title>/) || [])[1], desc = (raw.match(/<meta name="description" content="([^"]*)"/) || [])[1];
  if (!title || title.length > 60) bad(f, `title ${title ? title.length : 'missing'}`);
  if (!desc || desc.length > 155) bad(f, `description ${desc ? desc.length : 'missing'}`);
  if (titles.has(title)) bad(f, 'duplicate title with ' + titles.get(title)); titles.set(title, f);
  if (descs.has(desc)) bad(f, 'duplicate description with ' + descs.get(desc)); descs.set(desc, f);
  if ((raw.match(/<h1[ >]/g) || []).length !== 1) bad(f, 'H1 count is not 1');
  if (/<meta name="keywords"/.test(raw)) bad(f, 'meta keywords present');
  for (const t of ['<link rel="canonical"', 'property="og:title"', 'property="og:description"', 'property="og:locale" content="en_NP"', 'name="geo.region" content="NP"']) if (!raw.includes(t)) bad(f, 'missing ' + t);
  for (const m of raw.matchAll(/<img\b[^>]*>/g)) if (!/\balt="/.test(m[0])) bad(f, 'img without alt');
  // JSON-LD
  const blocks = [...raw.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m => { try { return JSON.parse(m[1]); } catch (e) { bad(f, 'JSON-LD does not parse: ' + e.message); return null; } }).filter(Boolean);
  const types = blocks.map(b => b['@type']);
  if (f.startsWith('product-') && !types.includes('SoftwareApplication')) bad(f, 'SoftwareApplication JSON-LD missing');
  if (f === 'index.html') {
    for (const t of ['Organization', 'WebSite', 'FAQPage']) if (!types.includes(t)) bad(f, t + ' JSON-LD missing');
    const org = blocks.find(b => b['@type'] === 'Organization');
    assert.ok(org.address.streetAddress.includes('Divine Complex') && org.address.addressLocality === 'Kathmandu' && org.contactPoint.length >= 2, 'Organization address or contact points');
    const faq = blocks.find(b => b['@type'] === 'FAQPage').mainEntity;
    const vis = [...raw.matchAll(/<details class="qa"><summary>([\s\S]*?)<span class="pm"[\s\S]*?<div class="ans"><p>([\s\S]*?)<\/p>/g)].map(m => [dec(m[1]), dec(m[2])]);
    if (vis.length !== faq.length || vis.some(([q, a], i) => q !== faq[i].name || a !== faq[i].acceptedAnswer.text)) bad(f, 'FAQPage JSON-LD does not match the visible FAQ');
  }
  // copy gate
  const text = noCom.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<style[\s\S]*?<\/style>/g, '');
  if (/[–—]|&mdash;|&ndash;|&#821[12];/.test(text)) bad(f, 'em or en dash');
  const vtext = text.replace(/<[^>]+>/g, ' ');
  const rules = [[/Accounting software since 1998/, 0], [/25\+/, 0], [/Sir0061ha/, 0], [/head office/i, 0], [/Launching soon/i, 0], [/Mahendranagar/, f === 'partners.html'], [/Pharmacies/i, 0], [/HiTech ERP/, 0], [/Gurukul/i, 0], [/Pharmacy/, f === 'product-avocare.html']];
  for (const [re, allowed] of rules) if (re.test(vtext) && !allowed) bad(f, `banned text ${re}`);
  if (/fourteen modules|14 modules|works like your best manager/i.test(raw)) bad(f, 'banned wording (module count or old slogan) in the page, meta or JSON-LD');
  if (f === 'index.html') {
    if (!raw.includes('youtube-nocookie.com/embed/n_rTzRJFkqw')) bad(f, 'Tivora YouTube embed missing');
    const core = raw.slice(raw.indexOf('id="core"'), raw.indexOf('</section>', raw.indexOf('id="core"')));
    if (/<img[^>]*assets\/img\/(dashboards|exec-dash|sales-dash|home-paint|home-jewelry)/.test(core)) bad(f, 'Tivora screenshot left in the home highlight');
    if (/<img[^>]*(dashboards|exec-dash|sales-dash|home-paint|home-jewelry)\.jpg/.test(raw.slice(raw.indexOf('id="suite"'), raw.indexOf('id="core"')))) bad(f, 'Tivora screenshot left in the home suite tile');
  }
  if (f === 'index.html' || f === 'tivora.html') for (const t of ['Intelligent', 'Plans your business in advance', 'Focused', 'Makes no mistakes']) if (!raw.includes(t)) bad(f, 'Tivora strength missing: ' + t);
  // ids and links
  const ids = [...noCom.matchAll(/\sid="([^"]+)"/g)].map(m => m[1]);
  const dup = ids.filter((x, i) => ids.indexOf(x) !== i); if (dup.length) bad(f, 'duplicate ids ' + [...new Set(dup)].join(','));
  html[f + '#ids'] = new Set(ids);
}
for (const f of files) {
  for (const m of html[f].matchAll(/<a\b[^>]*\shref="([^"]+)"/g)) {
    const h = dec(m[1]);
    if (/^(https?:|mailto:|tel:|javascript:)/.test(h)) continue;
    const [p, hash] = h.split('#'), q = p.split('?')[0] || f;
    if (!existsSync(join(R, q))) { bad(f, 'dead link ' + h); continue; }
    if (hash && q.endsWith('.html') && !html[q + '#ids']?.has(hash)) bad(f, 'dead anchor ' + h);
  }
}
for (const m of readFileSync(join(R, 'sitemap.xml'), 'utf8').matchAll(/<loc>[^<]*\/([^/<]*)<\/loc><lastmod>(\d{4}-\d\d-\d\d)<\/lastmod>/g)) if (m[1] && !files.includes(m[1])) bad('sitemap.xml', 'lists missing page ' + m[1]);
assert.ok(/<lastmod>/.test(readFileSync(join(R, 'sitemap.xml'), 'utf8')), 'sitemap has no lastmod');
console.log(fails ? `${fails} failures` : `site check clean (${files.length} pages)`);
process.exit(fails ? 1 : 0);
