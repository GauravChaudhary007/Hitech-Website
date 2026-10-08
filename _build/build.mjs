// HiTech website v2 generator (Revision 2, visual-first). Zero dependencies, Node 22+.  Run: node _build/build.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SITE_URL = (process.env.SITE_URL || 'https://www.hitechnepal.com.np').replace(/\/+$/, '');
const out = (f, s) => writeFileSync(join(ROOT, f), s);
const NP = '<!-- NAME PENDING -->';
const IMG = 'assets/img/';
let PAGE = '';
const BGD = 'assets/img/bg/';
/* page-matched photography (spec 11): src, vertical focus, flip so the subject sits away from the left text column */
const HB = {
  products: { src: 'bazaar', pos: '50% 62%', flip: true }, solutions: { src: 'devspace', pos: '50% 42%' },
  about: { src: 'street-morning', pos: '50% 60%' }, support: { src: 'support-desk', pos: '50% 45%' }, careers: { src: 'team', pos: '0% 40%', size: '140% auto' },
  contact: { src: 'kathmandu-street', pos: '50% 58%', flip: true }, partners: { src: 'ca-desk', pos: '50% 50%' },
  swastik: { src: 'ledger', pos: '50% 55%', flip: true }, myswastikonline: { src: 'cafe-tablet', pos: '50% 40%', flip: true }, pos: { src: 'checkout', pos: '50% 55%', flip: true },
  restaurant: { src: 'kitchen', pos: '50% 50%', flip: true }, pharmasoft: { src: 'pharmacy', pos: '50% 50%' }, avocare: { src: 'hospital', pos: '50% 55%' },
  bizant: { src: 'motorbike', pos: '0% 62%', size: '150% auto' },
};
const PRELOAD = { 'index.html': { src: 'hero-office' }, 'products.html': HB.products, 'solutions.html': HB.solutions, 'about.html': HB.about, 'support.html': HB.support, 'careers.html': HB.careers, 'contact.html': HB.contact, 'partners.html': HB.partners };
for (const id of ['swastik', 'myswastikonline', 'pos', 'restaurant', 'pharmasoft', 'avocare', 'bizant']) PRELOAD[`product-${id}.html`] = HB[id];
/* photo layer: hero layers set their image inline (and are preloaded); others are set lazily by JS near the viewport */
const bgl = (src, { mode = 'dl', pos = '50% 50%', flip = false, hero = false, band = 0, size = '', inner = '' } = {}) => `<div class="bgl ${mode}${band ? ' band' : ''}${flip ? ' flip' : ''}" aria-hidden="true"${hero ? '' : ` data-bg="${BGD}${src}.jpg"`} style="--pos:${pos.replace(/([0-9]+)%/g, '$1.0%')}${size ? `;--bs:${size.replace(/([0-9]+)%/g, '$1.0%')}` : ''}${band ? `;--bh:${band}px` : ''}"><i${hero ? ` style="background-image:url(${BGD}${src}.jpg)"` : ''}>${inner}</i></div>`;

/* ---------- icons (48x48 line set, stroke 2.4) ---------- */
const ICON = {
  tivora: '<rect x="7" y="7" width="14" height="14" rx="4"/><rect x="27" y="7" width="14" height="14" rx="4"/><rect x="7" y="27" width="14" height="14" rx="4"/><rect x="27" y="27" width="14" height="14" rx="4"/><path d="M21 14h6M14 21v6M34 21v6M21 34h6"/>',
  swastik: '<rect x="10" y="7" width="28" height="34" rx="4"/><path d="M16 16h16M16 23h16M16 30h10"/>',
  myswastikonline: '<path d="M15 35h19a8 8 0 0 0 1.4-15.9A11 11 0 0 0 14.2 20 7.5 7.5 0 0 0 15 35z"/><path d="M24 22v9M20 27l4 4 4-4"/>',
  pos: '<path d="M14 6h20v36l-4-3-3 3-3-3-3 3-3-3-4 3z"/><path d="M19 15h10M19 21h10M19 27h6"/>',
  restaurant: '<path d="M15 6v12a4 4 0 0 0 8 0V6M19 6v36"/><path d="M33 6c-5 4-5 15 0 19v17"/>',
  pharmasoft: '<path d="M16.5 31.5l15-15a6.4 6.4 0 0 1 9 9l-15 15a6.4 6.4 0 0 1-9-9z"/><path d="M24 24l9 9"/><path d="M8 14h10M13 9v10"/>',
  avocare: '<rect x="7" y="7" width="34" height="34" rx="9"/><path d="M24 15v18M15 24h18"/>',
  grad: '<path d="M4 18l20-9 20 9-20 9z"/><path d="M12 22v9c0 3 5.4 6 12 6s12-3 12-6v-9M44 18v10"/>',
  bizant: '<rect x="14" y="4" width="20" height="40" rx="5"/><path d="M21 38h6"/><path d="M24 26s-6-5.2-6-9.6a6 6 0 0 1 12 0c0 4.4-6 9.6-6 9.6z"/>',
  payroll: '<rect x="6" y="12" width="36" height="26" rx="5"/><path d="M6 19h36M30 29h6"/><path d="M14 8h20"/>',
  smartsuite: '<path d="M8 40h32M14 34V24M22 34V12M30 34V28M38 34V18"/>',
  hospitality: '<path d="M6 38V12M6 30h36v8M42 38V28a6 6 0 0 0-6-6H22v8"/><circle cx="14" cy="24" r="3.5"/>',
  cal: '<rect x="7" y="10" width="34" height="31" rx="5"/><path d="M7 20h34M16 6v8M32 6v8M15 28h4M22 28h4M29 28h4M15 34h4M22 34h4"/>',
  vat: '<circle cx="16" cy="16" r="5"/><circle cx="32" cy="32" r="5"/><path d="M36 10L12 38"/>',
  tds: '<rect x="9" y="7" width="30" height="34" rx="4"/><path d="M16 17h16M16 24h8"/><path d="M28 29l6 6M34 29l-6 6"/>',
  inv: '<path d="M13 6h16l8 8v28H13z"/><path d="M29 6v8h8"/><path d="M19 29l4 4 8-9"/>',
  db: '<ellipse cx="24" cy="12" rx="14" ry="6"/><path d="M10 12v24c0 3.3 6.3 6 14 6s14-2.7 14-6V12M10 24c0 3.3 6.3 6 14 6s14-2.7 14-6"/>',
  backup: '<path d="M38 24a14 14 0 1 1-4.1-9.9"/><path d="M38 8v8h-8"/><path d="M24 17v8l5 3"/>',
  lock: '<rect x="10" y="21" width="28" height="20" rx="5"/><path d="M16 21v-6a8 8 0 0 1 16 0v6M24 29v5"/>',
  log: '<circle cx="20" cy="20" r="13"/><path d="M20 12v8l5 3"/><path d="M30 34l5 5 7-8"/>',
  eye: '<path d="M4 24s8-14 20-14 20 14 20 14-8 14-20 14S4 24 4 24z"/><circle cx="24" cy="24" r="6"/>',
  shield: '<path d="M24 5l15 6v11c0 10-6.5 17-15 21C15.5 39 9 32 9 22V11z"/><path d="M17 24l5 5 10-11"/>',
  clock: '<circle cx="24" cy="24" r="17"/><path d="M24 13v11l8 5"/>',
  headset: '<path d="M8 28v-4a16 16 0 0 1 32 0v4"/><rect x="6" y="27" width="8" height="12" rx="3"/><rect x="34" y="27" width="8" height="12" rx="3"/><path d="M38 39c0 3-4 4-9 4"/>',
  pin: '<path d="M24 43s13-11.5 13-22a13 13 0 0 0-26 0c0 10.5 13 22 13 22z"/><circle cx="24" cy="21" r="4.5"/>',
  mail: '<rect x="6" y="10" width="36" height="28" rx="5"/><path d="M8 14l16 12 16-12"/>',
  phone: '<path d="M13 6h7l3 10-5 3a24 24 0 0 0 11 11l3-5 10 3v7a4 4 0 0 1-4 4A32 32 0 0 1 9 10a4 4 0 0 1 4-4z"/>',
  gem: '<path d="M14 8h20l8 10-18 22L6 18z"/><path d="M6 18h36M18 8l6 10 6-10M24 18v22"/>',
  user: '<circle cx="24" cy="16" r="7"/><path d="M10 40c0-8 6-13 14-13s14 5 14 13"/>',
  users: '<circle cx="18" cy="17" r="6"/><path d="M6 38c0-7 5-11 12-11s12 4 12 11"/><circle cx="34" cy="19" r="5"/><path d="M33 28c6 0 9 4 9 10"/>',
  doc: '<path d="M13 6h16l8 8v28H13z"/><path d="M29 6v8h8M19 24h12M19 31h12"/>',
  cart: '<path d="M5 8h6l4 22h22l4-16H13"/><circle cx="18" cy="38" r="3"/><circle cx="34" cy="38" r="3"/>',
  truck: '<path d="M4 12h24v22H4zM28 20h10l6 7v7H28z"/><circle cx="14" cy="36" r="4"/><circle cx="36" cy="36" r="4"/>',
  box: '<path d="M24 5l17 9v20l-17 9-17-9V14z"/><path d="M7 14l17 9 17-9M24 23v20"/>',
  warehouse: '<path d="M4 20L24 7l20 13v22H4z"/><path d="M14 42V28h20v14M14 35h20"/>',
  pie: '<circle cx="24" cy="24" r="17"/><path d="M24 7v17h17"/>',
  trend: '<path d="M5 37l12-13 8 7 18-20"/><path d="M33 11h10v10"/>',
  key: '<circle cx="16" cy="24" r="8"/><path d="M24 24h20M36 24v8M42 24v6"/>',
  search: '<circle cx="21" cy="21" r="13"/><path d="M31 31l12 12"/>',
  barcode: '<path d="M8 10v28M14 10v28M22 10v28M28 10v28M36 10v28M42 10v28"/>',
  tag: '<path d="M5 26L26 5h14l4 4v14L23 44z"/><circle cx="35" cy="13" r="2.5"/>',
  bank: '<path d="M5 18L24 6l19 12zM9 22v16M19 22v16M29 22v16M39 22v16M5 42h38"/>',
  bell: '<path d="M12 34V22a12 12 0 0 1 24 0v12l4 4H8zM20 42h8"/>',
  sms: '<path d="M6 8h36v26H22l-10 8v-8H6z"/><path d="M14 18h20M14 25h12"/>',
  mobile: '<rect x="14" y="4" width="20" height="40" rx="5"/><path d="M21 38h6"/>',
  globe: '<circle cx="24" cy="24" r="18"/><path d="M6 24h36M24 6c-7 8-7 28 0 36M24 6c7 8 7 28 0 36"/>',
  link: '<path d="M20 28a8 8 0 0 0 11 0l7-7a8 8 0 0 0-11-11l-3 3M28 20a8 8 0 0 0-11 0l-7 7a8 8 0 0 0 11 11l3-3"/>',
  layers: '<path d="M24 6l19 10-19 10L5 16zM5 25l19 10 19-10M5 33l19 10 19-10"/>',
  sliders: '<path d="M8 14h32M8 24h32M8 34h32"/><circle cx="18" cy="14" r="3.5"/><circle cx="32" cy="24" r="3.5"/><circle cx="22" cy="34" r="3.5"/>',
  edit: '<path d="M8 40l4-12L32 8l8 8-20 20zM28 12l8 8"/>',
  download: '<path d="M24 6v26M14 22l10 10 10-10M8 40h32"/>',
  sync: '<path d="M38 24a14 14 0 1 1-4.1-9.9"/><path d="M38 8v8h-8"/>',
  check: '<circle cx="24" cy="24" r="18"/><path d="M15 25l6 6 12-13"/>',
  star: '<path d="M24 5l5.7 12 13.3 1.5-9.8 9 2.7 13L24 33.7 12.1 40.5l2.7-13-9.8-9L18.3 17z"/>',
  gift: '<rect x="6" y="16" width="36" height="10" rx="2"/><path d="M10 26v16h28V26M24 16v26M24 16c-8 0-10-10-4-10s4 10 4 10zm0 0c8 0 10-10 4-10s-4 10-4 10z"/>',
  target: '<circle cx="24" cy="24" r="18"/><circle cx="24" cy="24" r="10"/><circle cx="24" cy="24" r="2.5"/>',
  tools: '<path d="M30 6a10 10 0 0 0-9 14L6 35l7 7 15-15a10 10 0 0 0 14-9l-7 6-6-6z"/>',
  book: '<path d="M6 8h14a4 4 0 0 1 4 4v30a3 3 0 0 0-3-3H6zM42 8H28a4 4 0 0 0-4 4v30a3 3 0 0 1 3-3h15z"/>',
  heart: '<path d="M24 41S6 30 6 18a9 9 0 0 1 18-3 9 9 0 0 1 18 3c0 12-18 23-18 23z"/>',
  table: '<rect x="6" y="8" width="36" height="32" rx="4"/><path d="M6 18h36M6 28h36M20 8v32"/>',
  screen: '<rect x="5" y="8" width="38" height="26" rx="3"/><path d="M17 42h14M24 34v8"/>',
  chef: '<path d="M14 30V40h20V30M12 30a8 8 0 1 1 3-15 9 9 0 0 1 18 0 8 8 0 1 1 3 15z"/>',
  bike: '<circle cx="11" cy="32" r="7"/><circle cx="37" cy="32" r="7"/><path d="M11 32l8-16h10l8 16M19 16l8 16"/>',
  scale: '<path d="M24 6v36M12 42h24M8 14h32"/><path d="M8 14l-4 12a6 6 0 0 0 12 0zM40 14l-4 12a6 6 0 0 0 12 0z"/>',
  factory: '<path d="M4 42V20l12 8V20l12 8V12h12v30z"/><path d="M12 36h4M22 36h4M32 36h4"/>',
  route: '<circle cx="12" cy="36" r="5"/><circle cx="36" cy="12" r="5"/><path d="M17 36h14a6 6 0 0 0 0-12H17a6 6 0 0 1 0-12h14"/>',
  calc: '<rect x="9" y="5" width="30" height="38" rx="4"/><path d="M15 12h18M16 22h3M24 22h3M32 22h1M16 30h3M24 30h3M16 37h3M24 37h3"/>',
  roller: '<rect x="8" y="6" width="28" height="12" rx="3"/><path d="M36 12h4v12H22v8M20 32h4v10h-4z"/>',
  store: '<path d="M6 18l3-10h30l3 10zM8 18v24h32V18M20 42V30h8v12"/>',
  clip: '<rect x="10" y="8" width="28" height="34" rx="4"/><path d="M18 8V5h12v3M17 22l4 4 8-9M17 34h14"/>',
  idcard: '<rect x="5" y="10" width="38" height="28" rx="4"/><circle cx="16" cy="22" r="4"/><path d="M10 32c1-4 5-5 6-5s5 1 6 5M28 20h9M28 27h9"/>',
  partners: '<circle cx="18" cy="24" r="12"/><circle cx="30" cy="24" r="12"/>',
  award: '<circle cx="24" cy="18" r="11"/><path d="M17 28l-5 15 12-6 12 6-5-15"/>',
  network: '<circle cx="24" cy="10" r="5"/><circle cx="10" cy="36" r="5"/><circle cx="38" cy="36" r="5"/><path d="M24 15v8M24 23L12 32M24 23l12 9"/>',
  repeat: '<path d="M8 22v-6a6 6 0 0 1 6-6h24M32 4l6 6-6 6M40 26v6a6 6 0 0 1-6 6H10M16 44l-6-6 6-6"/>',
  card: '<rect x="5" y="11" width="38" height="26" rx="4"/><path d="M5 20h38M12 30h8"/>',
  quote: '<path d="M6 8h36v26H22l-10 8v-8H6z"/>',
  pen: '<path d="M8 40l4-12L32 8l8 8-20 20z"/><path d="M28 12l8 8"/>',
  wrench: '<path d="M30 6a10 10 0 0 0-9 14L6 35l7 7 15-15a10 10 0 0 0 14-9l-7 6-6-6z"/>',
  code: '<path d="M16 14L6 24l10 10M32 14l10 10-10 10M27 8l-6 32"/>',
  cartplus: '<path d="M5 8h6l4 22h22l4-16H13"/><circle cx="18" cy="38" r="3"/><circle cx="34" cy="38" r="3"/><path d="M24 14v10M19 19h10"/>',
  handshake: '<path d="M4 20l8-6 10 3 6-3 8 6M4 20l10 14 6 4 5-4M44 20L34 34l-6 4-5-4"/>',
};
const ico = (id, cls = '') => { if (!ICON[id]) throw new Error('missing icon ' + id); return `<span class="pico${cls ? ' ' + cls : ''}" aria-hidden="true"><svg viewBox="0 0 48 48" focusable="false">${ICON[id]}</svg></span>`; };
const ARROW = '<svg class="arr" viewBox="0 0 20 20" aria-hidden="true" focusable="false"><path d="M4 10h11M11 5l5 5-5 5"/></svg>';
const EXTI = '<svg class="ext" viewBox="0 0 12 12" aria-hidden="true" focusable="false"><path d="M4 2h6v6M10 2L3 9"/></svg>';
const SRNEW = '<span class="sr"> (opens in a new tab)</span>';
const XA = 'target="_blank" rel="noopener"';
const IRDSVG = '<svg viewBox="0 0 20 20" aria-hidden="true" focusable="false"><path d="M10 2l6.5 2.5v5c0 4.2-2.8 7.2-6.5 8.5C6.3 16.7 3.5 13.7 3.5 9.5v-5z"/><path d="M7 10l2.2 2.2L13.2 8"/></svg>';
const IRD = (cls = '') => `<span class="ird${cls ? ' ' + cls : ''}">${IRDSVG}IRD certified</span>`;
const LOGO_DIM = { swastik: [640, 585], myswastikonline: [640, 162], pos: [640, 213], restaurant: [640, 510], pharmasoft: [640, 496], avocare: [640, 247], bizant: [640, 472], payroll: [640, 611], smartsuite: [640, 157], ezee: [640, 464] };
const logo = (id, alt = '', lazy = true) => `<img src="${IMG}logos/${id}.png" alt="${alt}" width="${LOGO_DIM[id][0]}" height="${LOGO_DIM[id][1]}"${lazy ? ' loading="lazy" decoding="async"' : ''}>`;
const lplate = (id, cls = '', alt = '') => `<span class="lplate${cls ? ' ' + cls : ''}">${logo(id, alt)}</span>`;
/* icon + short label chips: 'icon|label|sub' */
const ch1 = s => { const [i, l, sub] = s.split('|'); return `<li class="ic">${ico(i, 's40')}<span class="l">${l}${sub ? `<small>${sub}</small>` : ''}</span></li>`; };
const chips = (arr, cls = '') => `<ul class="ichips${cls ? ' ' + cls : ''}">${arr.map(ch1).join('')}</ul>`;

/* ---------- content ---------- */
const CATS = { acc: 'Accounting and ERP', retail: 'Retail and hospitality', health: 'Healthcare', field: 'Field and mobile' };
/* shared strengths from the marketing material's "Why Us": always the first four chips on every product page */
const SHARED_STR = ['shield|IRD (VAT) certified solution', 'users|Largest client base and widest support network', 'pin|Support offices all over Nepal', 'headset|Online and offline support'];
const PRODUCTS = [
  { id: 'swastik', f: 'acc', name: 'Swastik', cat: 'Business accounting', badge: 'Desktop', tag: 'Not just accounting software, your complete business manager.', home: 'Accounting, inventory and invoicing. IRD certified.',
    desc: 'Automated invoicing, inventory and accounting, IRD certified, for single users or networks.',
    str: ['award|Nepal\'s No 1 software|Accounting, inventory and MIS', 'pin|15+ support offices in Nepal', 'cal|25+ years of experience', 'cloud|Cloud and desktop versions', 'db|SQL database back end', 'key|Unlimited user security rights', 'sync|Free upgrades and updates|Under AMC or warranty', 'layers|More than 30 editions|For different industries'],
    groups: [
      ['Simple to use', ['user|Staff-friendly', 'tag|Codeless short names', 'doc|Single-voucher day book', 'screen|Keyboard and mouse', 'search|Drill-down to voucher', 'layers|Multiple companies and periods']],
      ['Flexible', ['tag|Unlimited document numbering', 'layers|Document classes', 'sliders|User-defined fields', 'edit|Bill designer', 'cal|Nepali and English dates']],
      ['Sales and purchase', ['doc|Orders, challans, invoices', 'repeat|Returns', 'table|Registers by area and agent', 'pie|Customer and product analysis', 'star|Top customer reports', 'trend|Price history']],
      ['Financial accounting', ['card|Cash and bank vouchers', 'doc|Journals and notes', 'book|Cash and bank book', 'check|Bank reconciliation', 'trend|Profit and loss', 'table|Balance sheet', 'smartsuite|Cash flow', 'layers|Merged reporting']],
      ['Inventory and manufacturing', ['box|Bill of material', 'factory|Cost-centre issue', 'tools|Assembly management', 'cal|Batches and expiry', 'bell|Near-expiry report', 'barcode|Automatic serial numbers']],
      ['Security, audit and VAT', ['db|MS SQL database', 'key|User-rights levels', 'lock|Voucher and auditors lock', 'backup|Automatic backup', 'log|Entry log', 'clip|Audit-trail reports', 'vat|VAT registers', 'doc|Statutory VAT reports']],
      ['Trade and reports', ['card|Post-dated cheque management', 'pos|Point of sale and customised billing', 'pie|500+ sales and marketing reports', 'bank|LC management and import costing', 'repeat|Real-time sales and purchase orders', 'download|Export to Word, Excel and HTML']],
      ['Add-ons', ['sliders|Customised reporting', 'sms|SMS notification', 'mobile|Mobile apps for owner, SFA and customer']],
    ], extra: ['layers|Versions 9 to 20'], related: ['myswastikonline', 'pos', 'restaurant'] },
  { id: 'myswastikonline', f: 'acc', name: 'mySwastikonline', cat: 'Cloud accounting', badge: 'Cloud', tag: 'The simplest cloud accounting software.', home: 'The Swastik engine on the web, from any device.',
    desc: 'Web-based invoicing, inventory and accounting, from any location, on any device.',
    str: ['award|Nepal\'s No 1 business solution provider', 'cal|25+ years of experience', 'cloud|Books anywhere, anytime, any device', 'network|Collaborate with branches and teams', 'lock|Fast, reliable and secured', 'user|User friendly and easy to use', 'clock|Control receivables and payables', 'box|Track your inventory', 'edit|Customisable forms and reports', 'headset|Free unlimited support'],
    groups: [
      ['Real time', ['cloud|Online posting', 'book|Cash book and day book', 'trend|Profit and loss', 'table|Balance sheet', 'sync|Real-time sub-ledger']],
      ['Nepal ready', ['cal|Nepali or English dates', 'vat|VAT reports', 'download|Export to Word and Excel']],
      ['Inventory', ['box|FIFO, rated or average', 'warehouse|Multiple godowns', 'factory|Bill of materials']],
      ['Control and security', ['key|User-rights levels', 'shield|Fraud detection', 'backup|Automatic backup', 'clock|Outstanding and ageing']],
      ['Key features', ['cloud|Web-based application', 'cart|Sales and receivables', 'truck|Purchase and payables', 'box|Inventory reports', 'pie|Marketing and sales analysis', 'sms|Email and SMS alerts|Invoices and outstanding', 'mobile|Mobile apps for owner, salesman and customer']],
    ], related: ['swastik', 'pos'] },
  { id: 'pos', f: 'retail', name: 'Swastik POS', cat: 'Retail and POS', badge: 'Desktop', tag: 'Billing and accounting for departmental stores.', home: 'Counter billing with accounting built in.',
    desc: 'Point-of-sale billing that connects to Swastik accounting, for stores, restaurants and corporate counters.',
    str: ['barcode|Integrated with barcode and POS machine', 'check|Fast and easy billing', 'user|User friendly, easy to understand', 'lock|Secured and reliable'],
    groups: [
      ['Easy billing', ['store|Multiple counters', 'percent|Automatic tax', 'barcode|Barcode and scanner', 'users|Membership']],
      ['Reports you can shape', ['sliders|Filterable reports', 'clock|Night audit', 'trend|Sales report']],
      ['Inventory', ['doc|Purchase orders and returns', 'box|Item-wise stock', 'truck|Store transfer', 'box|Inventory issue']],
      ['Control and accounts', ['lock|Admin and user login', 'key|Permission control', 'table|Sales and purchase registers', 'vat|VAT reporting', 'bank|Receivables and payables', 'clock|Ageing reports']],
      ['More features', ['layers|Multiple category and inventory groups', 'percent|Multiple discounts and schemes', 'link|Integrated with IRD API']],
    ], related: ['restaurant', 'swastik'] },
  { id: 'restaurant', f: 'retail', name: 'Swastik Restaurant', cat: 'Restaurants and cafes', badge: 'Touch desktop', tag: 'A complete restaurant POS and inventory solution.', home: 'Tables, kitchen display, takeaway and delivery.',
    desc: 'Touch-enabled desktop restaurant software for orders, billing, operations, accounting and management.',
    str: ['screen|Touch-enabled desktop software', 'screen|Fast and easy from a single screen', 'chef|For every type of restaurant|Fine dining, fast food, cafes, bars', 'sliders|Highly customised, user friendly', 'link|Integrated with mobile app'],
    groups: [
      ['Tables and orders', ['table|Live table status', 'layers|Floors and virtual tables', 'bike|Delivery and takeaway', 'tivora|Four operation modes']],
      ['Menu', ['book|Multi-level menu', 'screen|Menu images', 'chef|Preparation counters', 'sliders|Item modifiers']],
      ['Service', ['screen|Single-screen POS', 'chef|Kitchen display', 'sms|SMS greetings and invoices']],
      ['Back office', ['book|Integrated accounting', 'box|Inventory', 'star|Membership tiers', 'percent|Discount schemes']],
      ['Billing and payments', ['repeat|Split and merge bills', 'repeat|Table transfer', 'check|Void items with a reason', 'card|Fonepay and Nepalpay integration', 'mobile|Waiter order module|Tablet version', 'box|Recipe management']],
    ], related: ['pos', 'swastik'] },
  { id: 'pharmasoft', f: 'health', name: 'Pharmasoft', cat: 'Pharmaceutical', badge: 'Desktop', tag: 'Complete pharmaceutical accounting software.', home: 'Accounting and inventory for the pharmaceutical sector.',
    desc: 'Automated invoicing, inventory and accounting for the pharmaceutical sector, in single-user and network versions.',
    str: ['sync|Highly automated system|Invoicing, inventory, accounting', 'pie|Detailed sales and purchase analysis', 'truck|Dealers, distributors, retailers, CNF agents', 'factory|Medicine industry', 'table|Complete management information system'],
    groups: [
      ['Fast to use', ['tag|Codeless', 'screen|Keyboard and mouse', 'screen|Windows interface']],
      ['Entries', ['card|Cash and bank vouchers', 'doc|Journal vouchers', 'doc|Debit and credit notes']],
      ['Reports', ['book|Cash and bank book', 'smartsuite|Fund position', 'card|Cheque book', 'table|Registers by customer and agent', 'box|Stock ledger and valuation', 'cal|Batch-wise stock']],
      ['More', ['smartsuite|Smart Suite reporting', 'grad|Training and implementation']],
      ['Pharmaceutical features', ['box|Batch and free goods system', 'percent|Product-wise and company-wise discount', 'bell|Breakage and expiry goods management', 'cal|Mfg and expiry date management', 'calc|Custom charge and taxes on free goods', 'doc|FEFO invoicing against sales order']],
    ], related: ['avocare'] },
  { id: 'avocare', f: 'health', name: 'Avocare', cat: 'Hospitals', badge: 'Web', tag: 'Hospital management software.', home: 'Web-based hospital management.',
    desc: 'Web-based, modular hospital management reachable from computers, tablets and phones.',
    str: ['sync|Reduces redundancy', 'doc|Paperless work', 'headset|Dedicated support team with customisation', 'mobile|Mobile app for doctor, patient and management', 'search|Any information in one click', 'clock|Information on demand', 'link|Third-party software integration'],
    groups: [
      ['Running the hospital', ['key|Role-based access', 'network|Multi-branch, one database', 'doc|Paperless records', 'smartsuite|Custom web reports']],
      ['Patients and staff', ['user|Online registration', 'cal|Appointment booking', 'sms|SMS and email', 'mobile|Mobile apps', 'headset|Call centre integration']],
      ['Fit for your setup', ['link|Third-party integration', 'sliders|Customisation on demand', 'grad|Training and implementation']],
      ['Modules', ['user|Front desk', 'doc|OP and IP', 'user|Doctors', 'doc|Lab and radiology billing', 'search|Lab and radiology tests', 'pharmasoft|Pharmacy', 'heart|Blood bank', 'book|Patient records management', 'heart|Nursing station', 'box|General store', 'table|MIS reports', 'truck|Ambulance', 'chef|Canteen and parking']],
    ], related: ['pharmasoft'] },
  { id: 'bizant', f: 'field', name: 'Bizant', cat: 'Field sales', badge: 'Android', tag: 'Drive your business on the go.', home: 'Field sales teams on Android.',
    desc: 'Mobile CRM and sales force automation in four apps for owners, agents, customers and influencers.',
    str: ['award|Nepal\'s No 1 business solution provider', 'cal|25+ years of experience', 'mobile|Android and iOS', 'eye|Complete view for management', 'target|Sales force automation', 'link|Integrated with Swastik, Swastik Restaurant and POS'],
    store: 'https://play.google.com/store/apps/details?id=com.hitech.hitechcrm',
    groups: [['Four apps', ['smartsuite|Owner app|Sales and stock dashboard', 'route|Field agent app|Orders, GPS check-in', 'cart|Customer app|Ordering', 'star|Influencer app|Loyalty and rewards']],
      ['Field agent app (SFA)', ['cart|Order taking', 'card|Collection', 'edit|Feedback', 'users|Primary and secondary customer profiling', 'route|Customer check-in and check-out', 'table|Customer ledger, outstanding and ageing', 'pin|Activity tracking with GPS and time stamp', 'check|Task management', 'cal|Calendar', 'route|Beat management', 'cart|Secondary sales management', 'sms|Ledger sharing over WhatsApp and Viber', 'clip|Activity reports and DSR', 'idcard|Attendance']],
      ['Owner app features', ['check|Voucher authorisation', 'smartsuite|Key activity reports on one screen', 'cal|Day, month, year and custom-date reports', 'table|Sales, collection, payment and purchase', 'box|Stock and order outstanding', 'bank|PDC, cash and bank status', 'table|Customer ledger and ageing reports', 'check|Task management', 'cal|Daily calendar', 'bell|Payment reminders from mobile', 'sms|Ledger sharing over WhatsApp and Viber', 'target|Recovery management', 'route|Beat management', 'cart|Secondary sales management']]],
    related: ['swastik', 'pos'] },
];
const PBY = Object.fromEntries(PRODUCTS.map(p => [p.id, p]));
const phref = p => `product-${p.id}.html`;
const EXTRA = [
  { id: 'payroll', f: 'acc', name: 'HiTech Payroll', cat: 'Payroll', badge: 'Ask us', home: 'Ask us for details.', href: 'contact.html' },
  { id: 'smartsuite', f: 'acc', name: 'HiTech Smartsuite', cat: 'Reporting', badge: 'Ask us', home: 'Ask us for details.', href: 'contact.html' },
];
const TILES = [...PRODUCTS.map(p => ({ id: p.id, f: p.f, name: p.name, cat: p.cat, badge: p.badge, home: p.home, href: phref(p) })), ...EXTRA];
const TIVORA_URL = 'https://www.tivoraerp.com';
const TIVORA_TILE = { id: 'tivora', f: 'acc', name: 'Tivora ERP', cat: 'ERP', home: 'Sales, purchase, stock, production and accounts in one system.', href: TIVORA_URL, ext: true };
const EZEE_TILE = { id: 'ezee', name: 'eZee', cat: 'Authorized dealer', href: 'products.html#ezee' };
const HERO_LOGOS = ['swastik', 'myswastikonline', 'pos', 'restaurant', 'pharmasoft', 'avocare', 'bizant', 'payroll', 'smartsuite', 'ezee'];
const TBY = Object.fromEntries([...TILES, EZEE_TILE].map(t => [t.id, t]));

/* 11 trades: id, name, icon, serving products, key points (chips), links ([label, href, external?]) */
const TRADES = [
  ['jewellery', 'Jewellery', 'gem', ['tivora'], ['store|Showroom billing', 'tag|Tagged stock', 'repeat|Old-metal exchange', 'scale|Karigar fine-metal balance', 'bank|RFID and gold loans'], [['Alanza', TIVORA_URL, 1]]],
  ['paint', 'Paint', 'roller', ['tivora'], ['cart|Sales and receivables', 'truck|Purchase and payables', 'box|Store and inventory', 'factory|Production planning', 'calc|Finance and accounts', 'vat|Tax and IRD'], [['Tivora ERP for Paint', TIVORA_URL, 1]]],
  ['trading', 'Trading and distribution', 'truck', ['swastik', 'myswastikonline', 'tivora'], ['table|Registers by area and agent', 'clock|Outstanding and ageing', 'warehouse|Godown-wise inventory', 'cal|Batches and expiry', 'vat|VAT registers'], [['Swastik', 'product-swastik.html'], ['mySwastikonline', 'product-myswastikonline.html'], ['Tivora ERP', TIVORA_URL, 1]]],
  ['retail', 'Retail and stores', 'store', ['pos', 'swastik'], ['store|Multiple counters', 'barcode|Barcode and membership', 'clock|Night audit', 'truck|Store transfer and returns'], [['Swastik POS', 'product-pos.html'], ['Swastik', 'product-swastik.html']]],
  ['restaurants', 'Restaurants and cafes', 'chef', ['restaurant'], ['table|Live table status', 'bike|Dine-in, delivery, takeaway', 'chef|Kitchen display', 'star|Membership and accounting'], [['Swastik Restaurant', 'product-restaurant.html']]],
  ['pharmaceutical', 'Pharmaceutical sector', 'pharmasoft', ['pharmasoft'], ['tag|Codeless and fast', 'cal|Batch-wise stock', 'table|Registers by customer', 'smartsuite|Smart Suite reporting'], [['Pharmasoft', 'product-pharmasoft.html']]],
  ['hospitals', 'Hospitals', 'heart', ['avocare'], ['user|Online registration', 'cal|Appointment booking', 'network|Multi-branch database', 'mobile|Mobile apps'], [['Avocare', 'product-avocare.html']]],
  ['manufacturing', 'Manufacturing', 'factory', ['swastik', 'tivora'], ['box|Bill of material', 'factory|Cost-centre issue', 'tools|Assembly management', 'calc|Production costing'], [['Swastik', 'product-swastik.html'], ['Tivora ERP', TIVORA_URL, 1]]],
  ['field', 'Field sales teams', 'route', ['bizant'], ['cart|Order capture', 'route|GPS check-in', 'smartsuite|Owner dashboard', 'star|Loyalty rewards'], [['Bizant', 'product-bizant.html']]],
  ['hotels', 'Hotels', 'hospitality', ['hospitality'], ['hospitality|Front desk', 'cal|Booking engine', 'link|Channel manager', 'star|Feedback system'], [['eZee (authorized dealer)', 'products.html#ezee']]],
  ['accountants', 'Chartered accountants', 'calc', ['swastik', 'myswastikonline'], ['layers|Multiple companies', 'layers|Merged reporting', 'lock|Auditors lock', 'clip|Audit trail', 'cal|Nepali and English dates'], [['Swastik', 'product-swastik.html'], ['mySwastikonline', 'product-myswastikonline.html'], ['Partners for CAs', 'partners.html#ca']]],
];
const TRADE_OF = {};
for (const [id, , , prods] of TRADES) for (const p of prods) (TRADE_OF[p] ??= []).push(id);

const CLIENTS = ['CG Group', 'Jagdamba Steel', 'Pashupati Paints', 'Shikhar', 'Triveni Group', 'QFX Cinemas', 'M. C. Group', 'Goenka Group', 'Rajesh Metal Crafts', 'Asian Pharmaceuticals', 'CTL Pharmaceuticals'];
const FB_REEL = 'https://www.facebook.com/reel/956488536764696';
const FB_SRC = 'https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Freel%2F956488536764696%2F&amp;show_text=false&amp;autoplay=true&amp;mute=true';
const QUOTE_DATA = [
  ['The quality and services of Hitech is just awesome...Their services after sales are just incredible.', 'Vikash Singh', 'Manager'],
  ['We\'ve been using Swastik Business Accounting since 8 years and have never been disappointed. Great software and great support.', 'Anil Lamichhane', 'Sales Head'],
  ['Swastik Business Accounting is a great software for accounting and inventory. I recommend it.', 'Ganesh Khadka', 'MD'],
];
const FAQS = [
  ['Which HiTech software is right for my business?', 'It depends on what your business needs to run day to day: accounting, retail billing, restaurant operations, or full enterprise management. Choose "Not sure yet" on the demo form and our team will recommend the right fit.'],
  ['Is HiTech software suitable for small businesses?', 'Yes. Swastik and Swastik POS are built for single-location businesses, and Swastik supports multiple branches and companies.'],
  ['Do you support multi-branch businesses?', 'Yes. Swastik is built with multi-branch and multi-company reporting in mind.'],
  ['Is the software IRD compliant/certified?', 'Yes. All HiTech products are IRD certified.'],
  ['Can HiTech customize the software?', 'Yes. HiTech\'s custom development team can adapt existing products or build new applications around your workflow.'],
  ['Do you provide implementation and training?', 'Yes. Implementation and training are part of onboarding for every HiTech product.'],
  ['Do you provide after-sales support?', 'Yes. HiTech provides ongoing support after go-live.'],
  ['Can I request a product demo?', 'Yes. Use the "Request a demo" button on any page, or fill out the short demo form.'],
];
const SHOT = {
  dash: ['dashboards.jpg', 'Tivora ERP dashboards page listing the executive, sales, purchase, store, production, finance, trade and tax dashboards', 1918, 933],
  exec: ['exec-dash.jpg', 'Tivora ERP executive dashboard showing sales for Aswin 2083, a running total against target and the month selector', 1908, 672],
  jewel: ['home-jewelry.jpg', 'Alanza home screen for jewellery, with modules for sales, karigar workshop, manufacturing, RFID, gold loans and tax', 1887, 918],
  paint: ['home-paint.jpg', 'Tivora ERP home screen with modules for sales, purchase, store and inventory, production planning, finance, trade finance and tax', 1903, 925],
  sales: ['sales-dash.jpg', 'Sales dashboard for the month of Aswin 2083 showing sales, bills, returns and money received', 1905, 921],
};
const shot = (k, { lazy = true, cls = '' } = {}) => { const [f, alt, w, h] = SHOT[k]; return `<img${cls ? ` class="${cls}"` : ''} src="${IMG}${f}" alt="${alt}" width="${w}" height="${h}"${lazy ? ' loading="lazy" decoding="async"' : ''}>`; };
const laptop = (inner, cls = '') => `<div class="laptop${cls ? ' ' + cls : ''}"><div class="lp-lid"><i class="lp-cam" aria-hidden="true"></i><div class="lp-screen">${inner}</div></div><div class="lp-base" aria-hidden="true"></div></div>`;
const video = (id = '') => `<video${id ? ` id="${id}"` : ''} src="assets/video/tivora-launch.mp4" poster="${IMG}tivora-launch-poster.jpg" autoplay muted loop playsinline preload="metadata" width="1280" height="720" aria-label="Tivora ERP video. Sound is off."></video>`;

/* ---------- head, nav, footer ---------- */
const cur = h => (h === PAGE ? ' aria-current="page"' : '');
const ml = (href, label, desc, ic) => `<a class="ml" href="${href}"${cur(href)}>${ic ? ico(ic, 's40') : ''}<span><b>${label}</b>${desc ? `<small>${desc}</small>` : ''}</span></a>`;
const mbtn = (id, label, on) => `<button class="mb${on ? ' cur' : ''}" type="button" aria-expanded="false" aria-controls="${id}">${label}<svg viewBox="0 0 12 12" aria-hidden="true" focusable="false"><path d="M2.5 4.5L6 8l3.5-3.5"/></svg></button>`;
const pfeat = (img, label, line) => `<a class="pfeat" href="${TIVORA_URL}" ${XA}><b>${label}${EXTI}${SRNEW}</b><span>${line}</span><div class="pf-img"><img src="${IMG}${img}" alt="Tivora ERP screen with modules listed on the home page" width="1903" height="925" loading="lazy" decoding="async"></div></a>`;
const nl = (href, label) => `<li><a class="nl${PAGE === href ? ' cur' : ''}" href="${href}"${cur(href)}>${label}</a></li>`;

const navMenus = () => {
  const mp = ids => ids.map(i => { const t = TBY[i]; return ml(t.href, t.name, t.cat, i); }).join('');
  return `<li><a class="nl nl-x" href="${TIVORA_URL}" ${XA}>Tivora ERP${EXTI}${SRNEW}</a></li>
      <li class="has-panel">${mbtn('p-products', 'Products', PAGE === 'products.html' || PAGE.startsWith('product-'))}
        <div class="panel wide" id="p-products"><div class="wrap pn-grid pn-4">
          <div class="pn-col"><p class="mh">Accounting and ERP</p>${mp(['swastik', 'myswastikonline', 'payroll', 'smartsuite'])}</div>
          <div class="pn-col"><p class="mh">Retail and hospitality</p>${mp(['pos', 'restaurant'])}${ml('products.html#ezee', 'eZee (authorized dealer)', 'Hospitality software', 'hospitality')}</div>
          <div class="pn-col"><p class="mh">Healthcare and field</p>${mp(['pharmasoft', 'avocare', 'bizant'])}</div>
          ${pfeat('dashboards.jpg', 'Tivora ERP', 'Sales, purchase, stock, production and accounts.')}
        </div><div class="wrap pn-all"><a href="products.html">All products ${ARROW}</a> <a href="products.html#trades">Find yours by trade ${ARROW}</a></div></div></li>
      ${nl('solutions.html', 'Solutions')}
      ${nl('partners.html', 'Partners')}
      <li class="has-panel relpos">${mbtn('p-company', 'Company', ['about.html', 'contact.html'].includes(PAGE))}
        <div class="panel small" id="p-company">${ml('about.html', 'About HiTech', 'Who we are')}${ml('contact.html', 'Contact', 'Talk to HiTech')}</div></li>
      ${nl('support.html', 'Support')}
      ${nl('careers.html', 'Careers')}`;
};
const mobileMenu = () => {
  const grp = (t, links) => `<details><summary>${t}<svg viewBox="0 0 12 12" aria-hidden="true" focusable="false"><path d="M2.5 4.5L6 8l3.5-3.5"/></svg></summary><div>${links.map(([h, l]) => `<a href="${h}"${cur(h)}>${l}</a>`).join('')}</div></details>`;
  return `<div class="mpanel" id="mpanel">
      <a class="mp-l" href="${TIVORA_URL}" ${XA}>Tivora ERP${EXTI}${SRNEW}</a>
      ${grp('Products', [...PRODUCTS.map(p => [phref(p), p.name]), ['contact.html', 'HiTech Payroll'], ['contact.html', 'HiTech Smartsuite'], ['products.html#ezee', 'eZee (authorized dealer)'], ['products.html#trades', 'Find yours by trade'], ['products.html', 'All products']])}
      <a class="mp-l" href="solutions.html"${cur('solutions.html')}>Solutions</a>
      <a class="mp-l" href="partners.html"${cur('partners.html')}>Partners</a>
      ${grp('Company', [['about.html', 'About HiTech'], ['contact.html', 'Contact']])}
      <a class="mp-l" href="support.html"${cur('support.html')}>Support</a>
      <a class="mp-l" href="careers.html"${cur('careers.html')}>Careers</a>
      <a class="mp-l" href="contact.html"${cur('contact.html')}>Contact</a>
      <a class="btn mp-cta" href="contact.html#demo">Request a demo</a>
    </div>`;
};
const nav = () => `<header class="nav" id="nav">
  <div class="wrap nav-in">
    <a class="brand" href="index.html" aria-label="HiTech Solutions and Services, home"><img class="lg-lt" src="${IMG}logo-light.png" alt="HiTech Solutions and Services" width="119" height="40"><img class="lg-dk" src="${IMG}logo-dark.png" alt="" width="110" height="40"></a>
    <nav class="menu-wrap" aria-label="Main"><ul class="menu">
      ${navMenus()}
    </ul></nav>
    <div class="nav-r">
      <a class="nl nl-c" href="contact.html"${cur('contact.html')}>Contact</a>
      <a class="btn btn-sm" href="contact.html#demo"><span class="d-only">Request a demo</span><span class="m-only">Demo</span></a>
      <button class="burger" id="burger" type="button" aria-expanded="false" aria-controls="mpanel" aria-label="Menu"><i></i><i></i><i></i></button>
    </div>
  </div>
  ${mobileMenu()}
</header>`;

const ADDR = '4th Floor, Divine Complex, Kalimati Chowk, Kalimati, Kathmandu, Nepal';
const foot = () => `<footer class="foot" data-tone="navy">
  <div class="wrap">
    <div class="foot-grid">
      <div class="f-brand">
        <img src="${IMG}logo-dark.png" alt="HiTech Solutions and Services" width="137" height="50" loading="lazy">
        <p>${ADDR}</p>
        <p class="f-ct"><a href="tel:+97715389641">01-5389641</a> <a href="tel:+97715389642">01-5389642</a> <a href="tel:+97715389643">01-5389643</a><br><a href="mailto:info@hitechnepal.com.np">info@hitechnepal.com.np</a><br><a href="mailto:support@hitechnepal.com.np">support@hitechnepal.com.np</a><br>${WA_LINK}</p>
        <p class="f-soc"><a href="https://www.facebook.com/hitechnepal/" target="_blank" rel="noopener noreferrer">Facebook</a><a href="https://www.linkedin.com/company/hitech-solutions-&amp;-services-pvt.-ltd./" target="_blank" rel="noopener noreferrer">LinkedIn</a><a href="https://wa.me/9779810133468" target="_blank" rel="noopener noreferrer">WhatsApp</a></p>
      </div>
      <div class="f-x"><h3><a href="${TIVORA_URL}" ${XA}>Tivora ERP${EXTI}${SRNEW}</a></h3></div>
      <div><h3>Products</h3><ul>${PRODUCTS.map(p => `<li><a href="${phref(p)}">${p.name}</a></li>`).join('')}<li><a href="products.html#ezee">eZee (authorized dealer)</a></li><li><a href="products.html#trades">Find by trade</a></li></ul></div>
      <div><h3>Solutions</h3><ul><li><a href="solutions.html#erp">ERP</a></li><li><a href="solutions.html#application">Application software</a></li><li><a href="solutions.html#custom">Customized software</a></li><li><a href="solutions.html#ecommerce">E-commerce</a></li></ul></div>
      <div><h3>Partners</h3><ul><li><a href="partners.html#ca">For CAs and auditors</a></li><li><a href="partners.html#partner">Partner Connect</a></li><li><a href="partners.html#network">Partner network</a></li></ul></div>
      <div><h3>Company</h3><ul><li><a href="about.html">About</a></li><li><a href="index.html#clients">Clients</a></li><li><a href="careers.html">Careers</a></li><li><a href="support.html">Support</a></li><li><a href="contact.html">Contact</a></li></ul></div>
    </div>
    <div class="foot-bar"><span>&copy; <span id="yr">2026</span> HiTech Solutions and Services Pvt. Ltd. All rights reserved.</span><span>Tivora ERP screens use a demo company. Section photography is generated artwork.</span></div>
  </div>
</footer>`;

const ORG = '<script type="application/ld+json">{"@context":"https://schema.org","@type":"Organization","name":"HiTech Solutions and Services Pvt. Ltd.","url":"https://www.hitechnepal.com.np","email":"info@hitechnepal.com.np","telephone":"+977-1-5389641","foundingDate":"1998","address":{"@type":"PostalAddress","streetAddress":"4th Floor, Divine Complex, Kalimati Chowk, Kalimati","addressLocality":"Kathmandu","addressCountry":"NP"}}</script>';

const PROD = {};
const render = ({ file, title, desc, body, org = false }) => {
  PAGE = file;
  const url = `${SITE_URL}/${file === 'index.html' ? '' : file}`;
  const html = `<!doctype html>
<html lang="en" class="no-js">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${desc}">
<meta name="theme-color" content="#000059">
<link rel="canonical" href="${url}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="HiTech Solutions and Services">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${desc}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${SITE_URL}/${IMG}logo-light.png">
<meta name="twitter:card" content="summary">
<link rel="icon" type="image/png" href="${IMG}icon.png">
<link rel="preload" as="font" type="font/woff2" href="assets/fonts/poppins-600-latin.woff2" crossorigin>
<link rel="stylesheet" href="assets/fonts/fonts.css">
<script>document.documentElement.className='js'</script>
${PRELOAD[file] ? `<link rel="preload" as="image" href="${BGD}${PRELOAD[file].src}.jpg">\n` : ''}<link rel="stylesheet" href="assets/css/site.css">
${org ? ORG + '\n' : ''}</head>
<body${PROD[file] ? ` data-product="${PROD[file]}"` : ''}>
<a class="skip" href="#main">Skip to main content</a>
<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"><defs><linearGradient id="lineGrad" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="48" y2="0"><stop offset="0" stop-color="#009AD4"/><stop offset="1" stop-color="#0B20D6"/></linearGradient></defs></svg>
${nav()}
<main id="main" tabindex="-1">
${body}
</main>
${file === 'contact.html' ? '' : leadStrip(PROD[file] || '')}
${foot()}
${file === 'contact.html' ? '' : leadPopup()}
<script src="assets/js/site.js"></script>
</body>
</html>
`;
  out(file, html);
  return file;
};

ICON.percent = ICON.vat;
ICON.cloud = '<path d="M15 35h19a8 8 0 0 0 1.4-15.9A11 11 0 0 0 14.2 20 7.5 7.5 0 0 0 15 35z"/>';
ICON.book = ICON.book;

/* ---------- shared components ---------- */
const head2 = (eyebrow, h2, lede, cls = '') => `<div class="sec-head${cls ? ' ' + cls : ''}"><div><p class="eyebrow">${eyebrow}</p><h2>${h2}</h2></div>${lede ? `<p class="lede">${lede}</p>` : ''}</div>`;
const btn = (href, label, cls = '') => `<a class="btn${cls ? ' ' + cls : ''}" href="${href}">${label}</a>`;
const xbtn = (href, label, cls = '') => `<a class="btn${cls ? ' ' + cls : ''}" href="${href}" ${XA}>${label}${EXTI}${SRNEW}</a>`;

const WA_BTN = '<button class="btn" type="submit"><svg class="wa-ico" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false"><path fill="currentColor" d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.49-.9-.8-1.5-1.78-1.67-2.08-.17-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35zM12.05 21.8h-.01a9.9 9.9 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.89 9.89-9.89 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.9 6.99c0 5.45-4.44 9.89-9.89 9.89z"/></svg>Send on WhatsApp</button>';
const WA_URL = 'https://wa.me/9779709117067';
const WA_LINK = `<a href="${WA_URL}" ${XA}>WhatsApp +977 9709117067${SRNEW}</a>`;
const WA_NOTE = `Prefer chat? ${WA_LINK}.`;
const FORM = (inq = '') => `<form class="form" data-demo${inq ? ` data-inquiry="${inq}"` : ''}>
        <div class="fld"><label for="f-name">Name</label><input id="f-name" name="name" type="text" autocomplete="name" required></div>
        <div class="fld"><label for="f-biz">Company</label><input id="f-biz" name="company" type="text" autocomplete="organization" required></div>
        <div class="fld"><label for="f-phone">Mobile</label><input id="f-phone" name="mobile" type="tel" autocomplete="tel" required></div>
        <div class="fld"><label for="f-email">Email (optional)</label><input id="f-email" name="email" type="email" autocomplete="email"></div>
        <div class="fld"><label for="f-city">City</label><input id="f-city" name="city" type="text" autocomplete="address-level2" required></div>
        <div class="fld"><label for="f-inq">Inquiry for</label><select id="f-inq" name="inquiry"><option>Request a demo</option><option>Sales support</option><option>Channel partner query</option><option>CA / audit firm</option><option>Request a call</option><option>Training demo</option><option>Career</option></select></div>
        <div class="fld full"><label for="f-int">Interested in</label><select id="f-int" name="interest">${interestOpts('')}</select></div>
        <div class="fld full"><label for="f-msg">Message</label><textarea id="f-msg" name="message" rows="4"></textarea></div>
        ${HPOT}
        <div class="fld full">${WA_BTN}</div>
        <p class="form-note full">${WA_NOTE}</p>
        <p class="form-ok full" role="status" hidden></p>
      </form>`;
const contactCard = (compact) => compact ? `<aside class="ccard">
      <div class="cc-r">${ico('pin', 's40')}<div><b>HiTech Solutions and Services</b><p>${ADDR}</p></div></div>
      <div class="cc-r">${ico('phone', 's40')}<div><p><a href="tel:+97715389641">01-5389641</a>, <a href="tel:+97715389642">01-5389642</a></p></div></div>
      <div class="cc-r">${ico('mail', 's40')}<div><p><a href="mailto:info@hitechnepal.com.np">info@hitechnepal.com.np</a></p></div></div>
      <div class="cc-r">${ico('phone', 's40')}<div><p>${WA_LINK}</p></div></div>
    </aside>` : `<aside class="ccard">
      <div class="cc-r">${ico('pin', 's40')}<div><b>HiTech Solutions and Services</b><p>${ADDR}</p></div></div>
      <div class="cc-r">${ico('phone', 's40')}<div><b>Office</b><p><a href="tel:+97715389641">01-5389641</a>, <a href="tel:+97715389642">01-5389642</a>, <a href="tel:+97715389643">01-5389643</a></p><b class="gap">Sales</b><p><a href="tel:+9779803601598">9803601598</a>, <a href="tel:+9779802031377">9802031377</a></p><b class="gap">Support</b><p><a href="tel:+9779802345048">9802345048</a>, <a href="tel:+9779802345049">9802345049</a></p></div></div>
      <div class="cc-r">${ico('mail', 's40')}<div><b>Email</b><p><a href="mailto:info@hitechnepal.com.np">info@hitechnepal.com.np</a></p><p><a href="mailto:support@hitechnepal.com.np">support@hitechnepal.com.np</a></p></div></div>
      <div class="cc-r">${ico('phone', 's40')}<div><b>WhatsApp</b><p>${WA_LINK}</p></div></div>
    </aside>`;
const demo = ({ e = 'Request a demo', h = 'See it on your own numbers.', l = 'Tell us about your business.', inq = '', id = 'demo', compact = false, white = false, bg = null } = {}) => `<section class="sec${white ? '' : ' sec-paper'}${bg ? ' has-bg' : ''}" id="${id}">${bg ? bgl(bg.src, { mode: 'lw', pos: bg.pos, flip: bg.flip }) : ''}
  <div class="wrap demo-grid">
    <div class="rv">
      <p class="eyebrow">${e}</p>
      <h2>${h}</h2>
      <p class="lede">${l}</p>
      ${FORM(inq)}
    </div>
    <div class="rv">${contactCard(compact)}</div>
  </div>
</section>`;

const faq = (idx) => `<div class="faq stag">${(idx ? idx.map(i => FAQS[i]) : FAQS).map(([q, a]) => `<details class="qa"><summary>${q}<span class="pm" aria-hidden="true"></span></summary><div class="ans"><p>${a}</p></div></details>`).join('')}</div>`;
const faqSection = (e = 'HiTech FAQ', h = 'Straight answers before you call.', idx) => `<section class="sec" id="faq"><div class="wrap faq-grid"><div class="rv"><p class="eyebrow">${e}</p><h2>${h}</h2></div>${faq(idx)}</div></section>`;

const tile = t => {
  const tr = (TRADE_OF[t.id] || []).join(' ');
  if (t.id === 'tivora') return `<a class="tile tile-core" data-cat="${t.f}" data-trades="${tr}" href="${t.href}" ${XA} data-tone="navy">
          <div class="tc-copy">${ico('tivora', 'dk')}<h3>${t.name}${SRNEW}</h3><p>${t.home}</p>${IRD('ird-dk')}<span class="go">Explore Tivora ERP ${EXTI}</span></div>
          <div class="tc-img">${shot('dash')}</div>
        </a>`;
  return `<a class="tile${t.badge === 'Ask us' ? ' tile-ask' : ''}${t.id === 'bizant' ? ' tile-wide' : ''}" data-cat="${t.f}" data-trades="${tr}" href="${t.href}">${lplate(t.id)}<span class="t-cat">${t.cat}</span><h3>${t.name}</h3><p>${t.home}</p><div class="trow">${t.badge ? `<span class="badge">${t.badge}</span>` : ''}${IRD()}</div></a>`;
};
const bento = (pre = 'b', trade = false) => {
  const keys = ['all', ...Object.keys(CATS)];
  const lab = { all: 'All', ...CATS };
  return `<div data-filter>
    <div class="tabs" role="tablist" aria-label="Product categories">${keys.map((k, i) => `<button class="tab" role="tab" type="button" id="${pre}-t-${k}" data-f="${k}" aria-selected="${i === 0}" aria-controls="${pre}-panel" tabindex="${i === 0 ? 0 : -1}">${lab[k]}</button>`).join('')}</div>
    ${trade ? '<p class="trade-status" role="status" hidden><span class="ts-l"></span> <button type="button" class="ts-x">Show all products</button></p>' : ''}
    <div class="bento" id="${pre}-panel" role="tabpanel" aria-labelledby="${pre}-t-all">
        ${tile(TIVORA_TILE)}
        ${TILES.map(tile).join('\n        ')}
    </div>
  </div>`;
};

const PACKS = `<div class="packs stag">
      <a class="pack" href="${TIVORA_URL}" ${XA}><h3>Alanza</h3><p>Jewellery</p><span class="go">See Alanza ${EXTI}${SRNEW}</span></a>
      ${NP}<div class="pack"><h3>Paint</h3><p>Paint businesses</p></div>
      ${NP}<div class="pack"><h3>Trading</h3><p>General trading</p></div>
      <div class="pack later"><h3>FMCG</h3><p>Coming later</p></div>
      <div class="pack later"><h3>Automobile</h3><p>Coming later</p></div>
      <div class="pack later"><h3>Home appliances</h3><p>Coming later</p></div>
      <div class="pack later"><h3>Pharma</h3><p>Coming later</p></div>
    </div>`;

const NEPAL_ITEMS = [
  ['cal', 'Bikram Sambat dates', 'On every document.'],
  ['vat', '13% VAT', 'Books, returns, Annex 9 and 13.'],
  ['tds', 'TDS', 'Where it applies.'],
  ['inv', 'CBMS e-invoicing', 'In IRD\'s published format.'],
];
const nepalStrip = (lede = 'Every document is numbered by fiscal year.', paper = false, bg = false) => `<section class="sec${paper ? ' sec-paper' : ''}${bg ? ' has-bg' : ''}" id="nepal">${bg ? bgl('home-nepal', { mode: 'lw', pos: '50% 50%' }) : ''}
  <div class="wrap">
    ${head2('Built for Nepal', 'Made for the way Nepal does business.', lede)}
    <div class="np-grid">
      <div class="docno rv"><p class="dn-l">Sales invoice number</p><p class="dn-v" data-type="SI-2083/84-00001"><span class="sr">SI-2083/84-00001</span><span aria-hidden="true">SI-2083/84-00001</span></p></div>
      <ul class="np-items stag">${NEPAL_ITEMS.map(([i, t, d]) => `<li>${ico(i, 's48')}<div><h3>${t}</h3><p>${d}</p></div></li>`).join('')}</ul>
    </div>
    <p class="fine">All HiTech products are IRD certified.</p>
  </div>
</section>`;

const quote = (q, n, r, big) => `<figure class="quote${big ? ' q-big' : ''}"><blockquote><p>"${q}"</p></blockquote><figcaption><b>${n}</b>${r}</figcaption></figure>`;

const phero = ({ eyebrow, h1, lede, ctas = '', dark = false, extra = '', bg = null }) => `<header class="phero${dark || bg ? ' phero-dk' : ''}${bg ? ' has-bg' : ''}"${dark || bg ? ' data-tone="navy"' : ''}>${bg ? bgl(bg.src, { mode: 'dl', pos: bg.pos, flip: bg.flip, size: bg.size, hero: true }) : ''}
  <div class="wrap">
    <p class="eyebrow">${eyebrow}</p>
    <h1>${h1}</h1>
    <p class="lede">${lede}</p>${ctas ? `\n    <div class="btns">${ctas}</div>` : ''}
  </div>${extra}
</header>`;
const shotFrame = (k, cap) => `<figure class="snap-i"><div class="frame">${shot(k)}</div><figcaption>${cap}</figcaption></figure>`;

/* ---------- visual explainers ---------- */
const PROC = [['search', 'Understand your needs'], ['target', 'Recommend the right fit'], ['tools', 'Implement and train'], ['headset', 'Support that stays']];
const processDg = () => `<div class="proc dg"><i class="pline" aria-hidden="true"></i><ol>${PROC.map(([i, l], k) => `<li style="--k:${k}"><span class="pn">0${k + 1}</span>${ico(i, 's64')}<b>${l}</b></li>`).join('')}</ol></div>`;
const processSection = (id = 'process') => `<section class="sec" id="${id}"><div class="wrap">${head2('How we work', 'From first call to daily support.')}${processDg()}</div></section>`;

const pinIcon = '<svg viewBox="0 0 24 30" aria-hidden="true" focusable="false"><path d="M12 29S2 19 2 11a10 10 0 0 1 20 0c0 8-10 18-10 18z"/><circle cx="12" cy="11" r="3.5"/></svg>';
/* Nepal map (spec 14 P11 and P21): outline and pin positions come from assets/data/nepal-map.json and are inlined here, so the page has no runtime dependency.
   items: [pinKey, legend title, legend sub]; pins are numbered in legend order; they drop in west to east. */
const MAP = JSON.parse(readFileSync(join(ROOT, 'assets/data/nepal-map.json'), 'utf8'));
let NM = 0;
const pc = v => { let t = v.toFixed(2); if (/50$/.test(t)) t = (v + .01).toFixed(2); return t + '%'; }; /* the literal 50% is a content-gate word */
const nepalMap = (items, cls = '') => {
  const id = ++NM, P = k => { if (!MAP.pins[k]) throw new Error('missing pin ' + k); return MAP.pins[k]; };
  const west = items.map((_, k) => k).sort((a, b) => P(items[a][0]).x - P(items[b][0]).x || a - b), drop = [];
  west.forEach((k, r) => { drop[k] = r; });
  const names = items.map(([k, t]) => t.replace(/&amp;/g, 'and'));
  return `<div class="nmap dg${cls ? ' ' + cls : ''}" data-nmap>
      <div class="nm-fig">
        <svg class="nm-svg" viewBox="${MAP.viewBox}" role="img" aria-label="Map of Nepal with ${items.length} numbered pins: ${names.map((n, k) => `${k + 1} ${n}`).join(', ')}." focusable="false">
          <defs><clipPath id="nmc${id}"><path d="${MAP.outline}"/></clipPath><linearGradient id="nmg${id}" x1="0" x2="1" y1="0" y2="0"><stop class="sh" offset="0" stop-opacity="0"/><stop class="sh" offset=".5" stop-opacity=".3"/><stop class="sh" offset="1" stop-opacity="0"/></linearGradient></defs>
          <path class="nm-fill" d="${MAP.outline}"/>
          <path class="nm-out" pathLength="1" d="${MAP.outline}"/>
          <rect class="nm-shim" clip-path="url(#nmc${id})" x="-220" y="0" width="200" height="${MAP.height}" fill="url(#nmg${id})"/>
        </svg>
        ${items.map(([k], i) => { const p = P(k); return `<span class="nm-pin" data-i="${i}" style="left:${pc(p.x / 10)};top:${pc(p.y / 5.93)};--d:${drop[i]}" aria-hidden="true"><i class="nm-r"></i><b>${i + 1}</b></span>`; }).join('')}
        <span class="nm-tip" aria-hidden="true" hidden></span>
      </div>
      <ol class="nm-leg" style="--rows:${Math.ceil(items.length / 2)}">${items.map(([k, t, s], i) => `<li tabindex="0" data-i="${i}" data-name="${s || t}"><span class="nm-n">${i + 1}</span><span class="nm-t"><b>${t}</b>${s ? `<small>${s}</small>` : ''}</span>${pinIcon}</li>`).join('')}</ol>
    </div>`;
};
/* the 14 branch cities, numbered west to east (Nepalgunj, Surkhet and Dang first) */
const BRANCH14 = ['nepalgunj', 'surkhet', 'dang', 'butwal', 'pokhara', 'chitwan', 'birgunj', 'rautahat', 'janakpur', 'siraha', 'katari', 'udayapur', 'biratnagar', 'birtamode'];
const coverageSection = (paper = true, bg = false) => `<section class="sec${paper ? ' sec-paper' : ''}${bg ? ' has-bg' : ''}" id="coverage">${bg ? bgl('home-himalaya', { mode: 'lw', pos: '50% 45%' }) : ''}<div class="wrap"><div class="sec-head"><div><p class="eyebrow">Our branches</p><h2><span class="bignum">14</span> cities across Nepal.</h2></div></div>${nepalMap(BRANCH14.map(k => [k, MAP.pins[k].name]))}</div></section>`;
const PARTNER_PINS = ['itahari', 'birgunj', 'butwal', 'bhairahawa', 'pokhara', 'nepalgunj', 'janakpur', 'narayanghat', 'siraha', 'jhapa', 'mahendranagar', 'dang'];

/* ---------- HOME ---------- */

/* Tivora ERP highlight (spec 14 P3): compact, not sticky, four real screens cross-fading */
const TV_SHOTS = ['dash', 'paint', 'jewel', 'sales'];
const TV_CHIPS = ['book|Books your auditor accepts', 'box|Stock that adds up', 'cal|Nepal built in', 'tools|Built one trade at a time'];
const coreBand = () => `<section class="sec sec-navy tv-hl" id="core" data-tone="navy" aria-labelledby="core-h">
  <div class="wrap tv-grid">
    <div class="tv-l">
      <p class="eyebrow">Tivora ERP</p>
      <h2 id="core-h">One platform. Every business.</h2>
      <p class="lede">Billing, buying, stock, workshop and books in one system, made in Nepal for Nepal.</p>
      ${chips(TV_CHIPS, 'tv-ch')}
      <ul class="tv-packs" aria-label="Trade packs">
        <li><a href="${TIVORA_URL}" ${XA}>Alanza${SRNEW}</a></li>
        ${NP}<li>Paint</li>
        ${NP}<li>Trading</li>
        <li class="later">FMCG<small>Coming later</small></li><li class="later">Automobile<small>Coming later</small></li><li class="later">Home appliances<small>Coming later</small></li><li class="later">Pharma<small>Coming later</small></li>
      </ul>
      <div class="btns">${xbtn(TIVORA_URL, 'Explore Tivora ERP')}</div>
    </div>
    <div class="tv-r" data-slides>
      ${laptop(TV_SHOTS.map((k, i) => shot(k, { lazy: i > 0, cls: 'sl' + (i === 0 ? ' on' : '') })).join(''), 'tv-lap')}
      <div class="tv-dots" role="group" aria-label="Tivora ERP screens">${TV_SHOTS.map((k, i) => `<button class="tv-dot${i === 0 ? ' on' : ''}" type="button" aria-label="Show screen ${i + 1} of ${TV_SHOTS.length}" aria-pressed="${i === 0}"></button>`).join('')}</div>
    </div>
  </div>
</section>`;

/* "Interested in" options, shared by the demo form, the call-back strip and the inquiry popup */
const INTEREST = ['Not sure yet', 'Tivora ERP: Alanza (jewellery)', `Tivora ERP: Paint${NP}`, `Tivora ERP: Trading${NP}`, 'Swastik', 'mySwastikonline', 'Swastik POS', 'Swastik Restaurant', 'Pharmasoft', 'Avocare', 'Bizant', 'HiTech Payroll', 'HiTech Smartsuite', 'eZee hospitality software', 'Custom software, ERP or e-commerce'];
const interestOpts = sel => INTEREST.map(o => `<option${o.replace(NP, '') === sel ? ' selected' : ''}>${o}</option>`).join('');
const HPOT = '<div class="hpot" aria-hidden="true"><label>Leave this field empty<input type="text" name="website" tabindex="-1" autocomplete="off"></label></div>';

/* call-back strip above the footer on every page except contact.html (spec 14 P23) */
const leadStrip = prod => `<section class="lead-strip" aria-labelledby="ls-h">
  <div class="wrap ls-in">
    <h2 id="ls-h">Get a call back.</h2>
    <form class="ls-form" data-lead data-source="strip">
      <div class="fld"><label for="ls-name">Name</label><input id="ls-name" name="name" type="text" autocomplete="name" required></div>
      <div class="fld"><label for="ls-phone">Mobile</label><input id="ls-phone" name="mobile" type="tel" autocomplete="tel" required></div>
      <div class="fld"><label for="ls-int">Interested in</label><select id="ls-int" name="interest">${interestOpts(prod)}</select></div>
      ${HPOT}
      <div class="fld ls-go">${WA_BTN}</div>
      <p class="form-ok" role="status" hidden></p>
    </form>
  </div>
</section>`;

/* inquiry popup (spec 14 P19): opened and scheduled by site.js; absent from contact.html */
const leadPopup = () => `<div class="lead-pop" id="leadPop" role="dialog" aria-modal="true" aria-labelledby="lp-h" hidden>
  <div class="lp-ov" data-lp-close></div>
  <div class="lp-card" tabindex="-1">
    <button class="lp-x" type="button" aria-label="Close" data-lp-close><svg viewBox="0 0 20 20" aria-hidden="true" focusable="false"><path d="M4 4l12 12M16 4L4 16"/></svg></button>
    <h2 id="lp-h">Talk to HiTech.</h2>
    <p class="lede">Tell us what you run and we will call you.</p>
    <form class="form lp-form" data-lead data-source="popup">
      <div class="fld"><label for="lp-name">Name</label><input id="lp-name" name="name" type="text" autocomplete="name" required></div>
      <div class="fld"><label for="lp-phone">Mobile</label><input id="lp-phone" name="mobile" type="tel" autocomplete="tel" required></div>
      <div class="fld full"><label for="lp-email">Email (optional)</label><input id="lp-email" name="email" type="email" autocomplete="email"></div>
      <div class="fld full"><label for="lp-int">Interested in</label><select id="lp-int" name="interest">${interestOpts('')}</select></div>
      <div class="fld full"><label for="lp-msg">Message (optional)</label><textarea id="lp-msg" name="message" rows="3"></textarea></div>
      ${HPOT}
      <div class="fld full">${WA_BTN}</div>
      <p class="form-note full">${WA_NOTE}</p>
      <p class="form-ok full" role="status" hidden></p>
    </form>
  </div>
</div>`;

const tradeIcs = prods => prods.map(x => ico(x, 's32')).join('');
const tradeHome = () => `<section class="sec sec-paper" id="trades-home" data-sol>
  <div class="wrap sol-grid">
    <div class="sol-l">
      <p class="eyebrow">By trade</p>
      <h2>Find the software for your trade.</h2>
      <p class="lede">Point at a trade to see its products.</p>
      <div class="sol-ics" aria-hidden="true">${['tivora', 'swastik', 'myswastikonline', 'pos', 'restaurant', 'pharmasoft', 'avocare', 'bizant', 'hospitality'].map(i => `<span data-i="${i}">${ico(i, 's48')}</span>`).join('')}</div>
      <p>${btn('products.html#trades', 'Find yours by trade', 'btn-line')}</p>
    </div>
    <ul class="tgrid stag">
      ${TRADES.map(([id, name, ic, prods]) => `<li data-p="${prods.join(' ')}"><a href="products.html#trade-${id}">${ico(ic, 's48')}<b>${name}${id === 'paint' ? NP : ''}</b><span class="ics" aria-hidden="true">${tradeIcs(prods)}</span></a></li>`).join('\n      ')}
    </ul>
  </div>
</section>`;

const WHY5 = [['award', 'No.1', 'Business Solution Provider of Nepal', 0], ['cal', '25+', 'Years of experience', 25], ['store', '10,000+', 'Clients', 10000], ['handshake', '20+', 'Partners', 20], ['users', '100+', 'Dynamic team members', 100]];
const WHY_SUP = [['sms', 'Live chat support'], ['pin', 'Onsite support'], ['factory', 'Industry-specific implementations'], ['grad', 'Software training']];
const whyBand = () => `<section class="sec has-bg" id="why">${bgl('street-morning', { mode: 'lw', pos: '50% 58%' })}
  <div class="wrap">
    ${head2('Why HiTech', 'Accounting software since 1998.', 'We are HiTech Solutions &amp; Services Pvt. Ltd., a premier business software solution provider in Nepal.')}
    <div class="why5 stag">${WHY5.map(([i, v, l, n], k) => `<div class="w5${k === 0 ? ' w5-a' : ''}"${k === 0 ? ' data-tone="navy"' : ''}>${ico(i, 's48' + (k === 0 ? ' dk' : ''))}<b class="w5v"${n ? ` data-count="${n}" data-suffix="+"` : ''}>${v}</b><span>${l}</span></div>`).join('')}</div>
    <p class="why-ird"><span class="ird-i">${IRDSVG}</span>All HiTech products are IRD certified.</p>
    <h3 class="gh">Support service</h3>
    <div class="icards sm stag">${WHY_SUP.map(([i, l]) => `<div class="icard">${ico(i, 's48')}<h3>${l}</h3></div>`).join('')}</div>
    <p class="why-close">At HiTech, we believe in the intrinsic value of human resources. Our team is up and ready to offer professional support and solutions to ease your operation.</p>
  </div>
</section>`;

const svcCards = () => `<div class="svc stag">
      <a class="sv sv-big" href="solutions.html#erp" data-tone="navy">${ico('tivora', 's48 dk')}<h3>ERP implementation</h3><p>One system, on Tivora ERP.</p><span class="go">Learn more ${ARROW}</span></a>
      <a class="sv" href="solutions.html#application">${ico('layers', 's40')}<h3>Application software</h3><p>Accounting, billing, POS and payroll.</p><span class="go">Learn more ${ARROW}</span></a>
      <a class="sv" href="solutions.html#custom">${ico('code', 's40')}<h3>Customized software</h3><p>Contract and collaborative projects.</p><span class="go">Learn more ${ARROW}</span></a>
      <a class="sv" href="solutions.html#ecommerce">${ico('cartplus', 's40')}<h3>E-commerce</h3><p>B2B and B2C online stores.</p><span class="go">Learn more ${ARROW}</span></a>
    </div>`;
const svcSection = () => `<section class="sec" id="solutions-teaser"><div class="wrap">${head2('Solutions', 'Software, built your way.', 'We also build software to your brief.')}${svcCards()}</div></section>`;

const clientsSection = () => `<section class="sec" id="clients">
  <div class="wrap">
    <div class="sec-head"><div><h2>Our clients</h2></div></div>
    <ul class="ctiles stag">${CLIENTS.map(c => `<li>${c}</li>`).join('')}</ul>
    <div class="cvo">
      <div class="fbv rv">
        <iframe class="fbf" title="HiTech client testimonial video" data-src="${FB_SRC}" width="340" height="604" frameborder="0" scrolling="no" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" allowfullscreen loading="lazy"></iframe>
        <p><a class="go" href="${FB_REEL}" ${XA}>Watch on Facebook${EXTI}${SRNEW}</a></p>
      </div>
      <div class="vq stag">
        ${quote(...QUOTE_DATA[1], true)}
        ${quote(...QUOTE_DATA[0])}
        ${quote(...QUOTE_DATA[2])}
      </div>
    </div>
  </div>
</section>`;

const partnersBand = () => `<section class="sec sec-paper" id="partners-band">
  <div class="wrap">
    ${head2('Partners', 'Grow with HiTech.')}
    <div class="pb stag">
      <a class="pbt" href="partners.html#ca">${ico('calc', 's48')}<h3>For CAs and auditors</h3><p>For people who check the books.</p><span class="go">Learn more ${ARROW}</span></a>
      <a class="pbt" href="partners.html#partner">${ico('handshake', 's48')}<h3>Partner Connect</h3><p>Training, support and rewards.</p><span class="go">Learn more ${ARROW}</span></a>
      <a class="pbt" href="partners.html#network">${ico('network', 's48')}<h3>Partner network</h3><p>12 partners across Nepal.</p><span class="go">Learn more ${ARROW}</span></a>
    </div>
  </div>
</section>`;

const hchips = HERO_LOGOS.map(id => { const t = TBY[id]; return `<li><a class="hlogo" href="${t.href}" aria-label="${t.name}, ${t.cat}">${logo(id, '', false)}<span class="tip" aria-hidden="true"><b>${t.name}</b><small>${t.cat}</small></span></a></li>`; }).join('');
const home = () => `<section class="hero has-bg" id="top" data-tone="navy">
  <!-- hero-office.jpg: generated corporate-office photo; the real Tivora ERP video plays on the laptop screen -->
  <div class="hero-photo">
    <div class="hero-stage"><img src="${BGD}hero-office.jpg" alt="" width="1920" height="1074"></div>
    <i class="hero-grad" aria-hidden="true"></i>
    <div class="hero-stage">
      <div class="hero-lapwrap"><div class="lap-shadow" aria-hidden="true"></div>${laptop(`<video id="heroVideo" src="assets/video/tivora-launch.mp4" poster="${IMG}tivora-launch-poster.jpg" autoplay muted loop playsinline preload="metadata" aria-label="Tivora ERP video. Sound is off."></video><button class="vplay" type="button" aria-label="Play the Tivora ERP video" hidden><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M7 4l13 8-13 8z"/></svg></button>`, 'lp-hero')}</div>
      <div class="hero-under"><span class="vcap">Tivora ERP</span><button class="snd" type="button" aria-pressed="false" aria-label="Turn sound on"><svg class="off" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor"/><path d="M17 9l5 6M22 9l-5 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg><svg class="on" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor"/><path d="M16 8.5a5 5 0 010 7M18.5 6a8.5 8.5 0 010 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></button></div>
    </div>
  </div>
  <div class="hero-in">
    <div class="hero-copy stag">
      <p class="eyebrow">Accounting software since 1998</p>
      <h1>The software Nepal's businesses run on.</h1>
      <p class="lede">Accounting, billing, POS, restaurant, pharmaceutical and enterprise software for Nepal's businesses.</p>
      <div class="btns">${btn('contact.html#demo', 'Request a demo')}${btn('products.html', 'Explore products', 'btn-line')}</div>
      <dl class="proof"><div><dt>Clients</dt><dd data-count="10000" data-suffix="+">10,000+</dd></div><div><dt>Years</dt><dd data-count="25" data-suffix="+">25+</dd></div><div><dt>Branches</dt><dd data-count="15" data-suffix="+">15+</dd></div></dl>
      <div class="suite"><p class="suite-l">Also from HiTech</p><ul class="hchips stag">${hchips}</ul></div>
    </div>
  </div>
</section>
${clientsSection()}
<section class="sec has-bg" id="suite">${bgl('bazaar', { mode: 'lwb', band: 520, pos: '50% 62%', flip: true })}
  <div class="wrap">
    ${head2('The HiTech suite', 'One vendor. Every part of the business.', 'Tivora ERP leads a suite for every part of your business.')}
    ${bento('h')}
    <p class="more">${btn('products.html', 'All products', 'btn-line')}</p>
  </div>
</section>
${coreBand()}
${nepalStrip(undefined, false, true)}
${tradeHome()}
${whyBand()}
${coverageSection(true, true)}
${svcSection()}
${partnersBand()}
${faqSection()}
${demo({ compact: true, white: true, bg: { src: 'kathmandu-street', pos: '50% 55%', flip: true } })}`;

/* ---------- TIVORA ---------- */
const MODULES = [
  ['cart', 'Sales', ['doc|Quotations', 'doc|Orders', 'doc|Invoices', 'repeat|Returns', 'lock|Credit limits', 'clock|Outstanding and ageing']],
  ['truck', 'Purchase', ['doc|Requisition', 'sliders|Quotation comparison', 'doc|Purchase orders', 'box|Goods receipt', 'doc|Invoices', 'repeat|Returns']],
  ['box', 'Stock', ['warehouse|Godowns', 'cal|Batches and lots', 'truck|Transfers', 'check|Stock audit', 'bell|Reorder report', 'scale|FIFO, LIFO, board rate']],
  ['calc', 'Accounts', ['book|Double-entry ledger', 'table|Trial balance', 'trend|Profit and loss', 'table|Balance sheet', 'smartsuite|Cash flow', 'check|Bank reconciliation', 'card|Cheque (PDC) register', 'box|Fixed assets', 'target|Budgets', 'layers|Cost centres']],
  ['bank', 'Import and trade finance', ['doc|LCs', 'bank|Import loans', 'truck|Landed cost', 'globe|Foreign-currency payments']],
  ['smartsuite', 'Reports', ['table|Report centre', 'vat|Statutory layouts', 'sliders|Pivot report builder']],
];
const REASONS = [
  ['Books your auditor accepts', 'A voucher that does not balance cannot be saved.'],
  ['Stock that adds up', 'Count your stock against the system whenever you want.'],
  ['Nepal built in', 'Bikram Sambat, VAT, TDS and CBMS e-invoicing are part of the product.'],
];
const cdPos = (a, r) => [400 + r * Math.cos(a * Math.PI / 180), 320 + r * Math.sin(a * Math.PI / 180)];
const coreDiagram = () => {
  const mods = [['Sales', 'cart'], ['Purchase', 'truck'], ['Stock', 'box'], ['Accounts', 'calc'], ['Trade finance', 'bank'], ['Reports', 'smartsuite']].map(([n, i], k) => [n, i, ...cdPos(-90 + 60 * k, 215)]);
  const packs = [['Alanza', 'gem', 0, 1], ['Paint', 'roller', 120, 0], ['Trading', 'truck', 240, 0]].map(([n, i, a, np]) => [n, i, ...cdPos(a, 320), np]);
  const pc = v => (v / 8).toFixed(2) + '%', pv = v => (v / 6.4).toFixed(2) + '%';
  return `<div class="cdg dg" role="img" aria-label="Tivora ERP at the centre, with six modules around it: Sales, Purchase, Stock, Accounts, Trade finance and Reports, and three trade packs: Alanza, Paint and Trading.">
      <svg viewBox="0 0 800 640" aria-hidden="true" focusable="false">
        ${mods.map(([, , x, y], k) => `<line class="ln" pathLength="1" style="--k:${k}" x1="400" y1="320" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}"/>`).join('')}
        ${packs.map(([, , x, y], k) => `<line class="ln ln-p" pathLength="1" style="--k:${k + 8}" x1="400" y1="320" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}"/>`).join('')}
      </svg>
      <span class="nd nd-core" style="left:50.00%;top:50.00%">${ico('tivora', 's48 dk')}<b>Tivora ERP</b></span>
      ${mods.map(([n, i, x, y], k) => `<span class="nd nd-m" style="left:${pc(x)};top:${pv(y)};--k:${k + 2}">${ico(i, 's32')}<b>${n}</b></span>`).join('')}
      ${packs.map(([n, i, x, y, np], k) => `${np ? '' : NP}<span class="nd nd-p" style="left:${pc(x)};top:${pv(y)};--k:${k + 8}">${ico(i, 's32')}<b>${n}</b></span>`).join('')}
    </div>`;
};
const tivoraPage = () => `${phero({ dark: true, eyebrow: 'Tivora ERP', h1: 'One platform. Every business.', lede: 'Billing, buying, stock, workshop and books in one system, made in Nepal for Nepal.', ctas: btn('contact.html#demo', 'See it on your own numbers') + btn('#modules', 'Explore the features', 'btn-line-w'), extra: `\n  <div class="wrap hero-media">${laptop(video(), 'lp-xl')}</div>` })}
<section class="sec" id="what">
  <div class="wrap">
    ${head2('The platform', 'One core, six modules, every trade.', 'Every Tivora product shares one accounting core and one stock engine.')}
    ${coreDiagram()}
    <div class="cards3 stag">${REASONS.map(([h, p], i) => `<div class="card"><span class="num">0${i + 1}</span><h3>${h}</h3><p>${p}</p></div>`).join('')}</div>
  </div>
</section>
<section class="sec sec-paper" id="modules">
  <div class="wrap">
    ${head2('Features', 'Sales, purchase, stock and accounts.', 'A sale at the counter updates the stock and the ledger at once.')}
    <div class="mods stag">${MODULES.map(([i, n, c]) => `<div class="mod">${ico(i, 's48')}<h3>${n}</h3>${chips(c)}</div>`).join('')}</div>
  </div>
</section>
<section class="sec" id="screens">
  <div class="wrap">
    ${head2('The dashboards', 'The whole business, one screen at a time.', 'Real screens from Tivora ERP, using a demo company.')}
  </div>
  <div class="wrap snap-wrap">
    <div class="snap" tabindex="0" role="region" aria-label="Tivora ERP dashboards, scrollable">
      ${shotFrame('dash', 'Eight dashboards, one for each part of the business.')}
      ${shotFrame('exec', 'Executive dashboard: sales against target, in Bikram Sambat.')}
      ${shotFrame('sales', 'Sales for Aswin 2083: bills, returns and money received.')}
    </div>
  </div>
</section>
${nepalStrip('Bikram Sambat dates, fiscal-year numbers, VAT, TDS and CBMS.', true)}
<section class="sec sec-navy has-bg" data-tone="navy" id="trades">${bgl('paint', { mode: 'dk', pos: '50% 50%' })}
  <div class="wrap">
    ${head2('Trade packs', 'One platform, one trade at a time.')}
    ${PACKS}
  </div>
</section>
${demo()}`;

/* ---------- PRODUCTS (directory + by trade) ---------- */
const tradeDetail = ([id, name, ic, prods, pts, links]) => {
  const has = prods.some(p => TBY[p] || p === 'tivora');
  return `<details class="trade" id="trade-${id}"><summary>${ico(ic, 's48')}<b>${name}${id === 'paint' ? NP : ''}</b><span class="ics" aria-hidden="true">${tradeIcs(prods)}</span><span class="pm" aria-hidden="true"></span></summary>
        <div class="tb">${chips(pts)}<div class="btns">${links.map(([n, h, x]) => `<a class="btn btn-sm btn-line" href="${h}"${x ? ` ${XA}` : ''}>${n}${x ? EXTI + SRNEW : ''}</a>`).join('')}${has ? `<button class="btn btn-sm" type="button" data-trade="${id}" data-label="${name}">Show products</button>` : ''}</div></div></details>`;
};
const EZEE_CARDS = [['hospitality', 'FrontDesk', 'Hotel management system'], ['chef', 'BurrP!', 'Restaurant software'], ['globe', 'Absolute', 'Hotel booking software'], ['cal', 'Reservation', 'Booking engine'], ['link', 'Centrix', 'Channel manager'], ['book', 'iMenu', 'Restaurant menu software'], ['star', 'iFeedback', 'Feedback system']];
const ezeeSection = () => `<section class="sec" id="ezee">
  <div class="wrap">
    <div class="ez" data-tone="navy">
      <div class="ez-h">
        <div class="ez-t">
          <p class="eyebrow">Authorized dealer</p>
          <h2>eZee hospitality software.</h2>
          <p class="lede">HiTech is the authorized dealer of eZee in Nepal.</p>
          <div class="btns"><a class="btn" href="contact.html?interest=eZee%20hospitality%20software#demo" data-interest="eZee hospitality software">Ask about eZee</a></div>
        </div>
        <div class="ez-s">${lplate('ezee', 'lplate-lg', 'eZee logo')}<p class="ez-stat"><b>10,000+</b><span>hotels in 160+ countries use eZee worldwide</span></p></div>
      </div>
      <ul class="ez-g stag">${EZEE_CARDS.map(([i, n, d]) => `<li class="ez-c">${ico(i, 's40 dk')}<b>${n}</b><span>${d}</span></li>`).join('')}<li class="ez-c ez-sm">${ico('code', 's32 dk')}<b>Appytect</b><span>Mobile app builder</span></li></ul>
    </div>
  </div>
</section>`;
const productsPage = () => `${phero({ bg: HB.products, eyebrow: 'HiTech products', h1: 'Software for how your business runs.', lede: 'Accounting, retail, restaurants, healthcare and field sales from one Nepali vendor.', ctas: btn('contact.html#demo', 'Request a demo') + btn('#trades', 'Find yours by trade', 'btn-line') })}
<section class="sec" style="padding-top:0" id="directory">
  <div class="wrap">
    ${bento('p', true)}
    <p class="more">${btn('#ezee', 'eZee (authorized dealer)', 'btn-line')}</p>
  </div>
</section>
${ezeeSection()}
<section class="sec sec-paper" id="trades">
  <div class="wrap">
    ${head2('By trade', 'Find yours by trade.', 'Open a trade to see its key features and products.')}
    <div class="tdet stag">${TRADES.map(tradeDetail).join('\n      ')}</div>
  </div>
</section>
${demo({ white: true })}`;

const productPage = p => {
  const rel = p.related.map(id => TBY[id]);
  const plate = `<div class="plate plate-w">${logo(p.id, `${p.name} logo`, false)}</div>`;
  const strengths = [...SHARED_STR, ...p.str];
  return `<header class="phero phero-dk phero-prod has-bg" data-tone="navy">${bgl(HB[p.id].src, { mode: 'dl', pos: HB[p.id].pos, flip: HB[p.id].flip, size: HB[p.id].size, hero: true })}
  <div class="wrap hp-grid">
    <div>
      <p class="eyebrow">${p.cat}</p>
      <h1>${p.name}</h1>
      <p class="tagline">${p.tag}</p>
      <p class="lede">${p.desc}</p>
      <div class="btns">${p.badge ? `<span class="badge badge-dk">${p.badge}</span>` : ''}${IRD('ird-dk')}${btn('contact.html#demo', 'Request a demo')}</div>
    </div>
    ${plate}
  </div>
</header>
<nav class="subnav" aria-label="On this page"><div class="wrap"><ul><li><a href="#strengths">Strengths</a></li><li><a href="#features">Features</a></li><li><a href="#related">Related products</a></li><li><a href="#demo">Request a demo</a></li></ul></div></nav>
<section class="sec sec-paper" id="strengths">
  <div class="wrap">
    <h2 class="pp-h">Strengths of ${p.name}</h2>
    ${chips(strengths, 'pstr')}
  </div>
</section>
<section class="sec" id="features">
  <div class="wrap">
    <h2 class="pp-h">Features of ${p.name}</h2>
    <div class="fgroups stag">${p.groups.map(([t, items], i) => `<div class="fg" id="g-${i}"><h3>${t}</h3>${chips(items)}</div>`).join('')}${p.extra ? `<div class="fg"><h3>Editions</h3>${chips(p.extra)}</div>` : ''}</div>${p.store ? `
    <p class="more"><a class="btn btn-line" href="${p.store}" ${XA}>Get it on Google Play${EXTI}${SRNEW}</a></p>` : ''}
  </div>
</section>
<section class="sec" id="related" style="padding-top:0">
  <div class="wrap">
    ${head2('Related products', 'More from HiTech.')}
    <div class="rel stag">${rel.map(t => `<a class="tile" href="${t.href}">${lplate(t.id)}<span class="t-cat">${t.cat}</span><h3>${t.name}</h3><p>${t.home}</p><div class="trow">${t.badge ? `<span class="badge">${t.badge}</span>` : ''}${IRD()}</div></a>`).join('')}</div>
  </div>
</section>
${demo({ h: `See ${p.name} at work.`, l: `Tell us about your business and we will show you ${p.name}.` })}`;
};

/* ---------- SOLUTIONS (former services) ---------- */
const SOLS = [
  ['erp', 'tivora', 'ERP', 'Main business processes managed together in one system, often in real time.', ['box|Purchase and stock', 'factory|Production', 'cart|Sales and receivables', 'bank|Payables', 'target|Budgeting and planning', 'headset|Customer care', 'network|Multi-branch setups', 'layers|Multi-module setups'], xbtn(TIVORA_URL, 'Explore Tivora ERP', 'btn-line')],
  ['application', 'layers', 'Application software', 'Software for your type of business, reachable in the cloud from any device.', ['calc|Accounting and inventory', 'pos|Billing and POS', 'warehouse|Multi-location management', 'payroll|Payroll'], btn('products.html', 'See our products', 'btn-line')],
  ['custom', 'code', 'Customized software', 'Contract projects and collaborative development for internet and client-server applications.', ['layers|Information systems', 'link|Client-server technologies', 'db|Database design and administration', 'pie|Data modeling and visualization', 'globe|Internet technologies', 'table|Online and offline reporting', 'check|Integration and testing', 'shield|Network security', 'code|ASP', 'code|VB', 'code|Java', 'code|C and C++', 'code|Windows applications', 'award|MCSD', 'award|MCSE', 'award|MCP', 'award|OCP'], ''],
  ['ecommerce', 'cartplus', 'E-commerce', 'B2B and B2C online stores built to your requirements and budget.', ['cart|B2B stores', 'cart|B2C stores', 'sliders|Built to requirements', 'calc|Within your budget'], ''],
];
const solutionsPage = () => `${phero({ bg: HB.solutions, eyebrow: 'Solutions', h1: 'Software, built your way.', lede: 'HiTech builds, customises and integrates software for businesses of every kind.', ctas: btn('contact.html#demo', 'Talk to HiTech') })}
${processSection()}
${SOLS.map(([id, ic, t, l, c, b], i) => `<section class="sec${i % 2 ? '' : ' sec-paper'}" id="${id}">
  <div class="wrap sol-b">
    <div class="rv">${ico(ic, 's64')}<h2>${t}</h2><p class="lede">${l}</p>${b ? `<div class="btns">${b}</div>` : ''}</div>
    <div class="rv">${chips(c)}</div>
  </div>
</section>`).join('\n')}
${demo({ e: 'Talk to HiTech', h: 'Got a new challenge for us?', l: 'Let\'s work together and create the next big thing.' })}`;

const servicesRedirect = () => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Moved to Solutions | HiTech Solutions and Services</title>
<meta name="robots" content="noindex">
<meta http-equiv="refresh" content="0; url=solutions.html">
<link rel="canonical" href="${SITE_URL}/solutions.html">
</head>
<body>
<p>This page has moved to <a href="solutions.html">Solutions</a>.</p>
</body>
</html>
`;

/* ---------- PARTNERS ---------- */
const CA_CHIPS = ['truck|Landed cost by consignment', 'check|Consignment-wise import reconciliation', 'idcard|Customer and PAN-wise VAT report', 'vat|Monthly VAT reconciliation', 'doc|Anusuchi 10 and 13', 'sync|IRD API updates', 'mail|Customer account confirmation (IRD format)', 'tds|TDS report'];
const CA_CHIPS2 = ['layers|Multiple companies', 'layers|Merged reporting', 'lock|Auditors lock', 'log|Entry log and audit trail', 'cal|Nepali and English dates'];
const EDITIONS = [['swastik', 'Swastik'], ['gem', 'Swastik Gold'], ['pin', 'Swastik Nepal'], ['truck', 'Swastik Automobile'], ['layers', 'Swastik Textiles'], ['box', 'Swastik Wovensacks'], ['factory', 'Swastik Manufacturing'], ['box', 'Swastik Dairy'], ['tools', 'Swastik Service'], ['pharmasoft', 'Pharmasoft']];
const BENEFITS = [['target', 'Exclusive opportunity registration'], ['award', 'Partner recognition'], ['grad', 'Technical training'], ['headset', 'Technical support'], ['gift', 'Sales incentives'], ['star', 'Sales rewards'], ['link', 'Technical collaboration']];
const RESP = ['doc|Sign an MOU with HiTech', 'star|Recommend HiTech products', 'grad|Keep your team trained', 'users|Share prospects with HiTech early', 'sync|Share HiTech product updates'];
const VALUES = [['check', 'Simplicity', 'Clear paths to profitability.'], ['layers', 'Choice', 'Extend services across our portfolio.'], ['target', 'Innovation', 'New ways to grow your business.']];
const NETWORK = [['HiTech Solution', 'Itahari / Biratnagar'], ['HiTech Solutions & Services', 'Birgunj'], ['CSE Enterprises', 'Butwal'], ['HiTech Solutions & Services', 'Bhairahawa'], ['Kaas Business Solutions and Services Pvt. Ltd.', 'Pokhara'], ['Swastik Solutions & Service Center', 'Nepalgunj'], ['Amar & Company', 'Janakpur'], ['CSE Trade Link', 'Narayanghat'], ['Family Computer', 'Siraha'], ['Rahul Sahewal', 'Jhapa'], ['Creative Concern', 'Mahendranagar'], ['Global Trading & Suppliers', 'Dang']];
const pnode = (i, l, k) => `<span class="pn2" style="--i:${k}">${ico(i, 's32')}<b>${l}</b></span>`;
const partnersPage = () => `<header class="phero phero-dk has-bg" data-tone="navy">${bgl(HB.partners.src, { mode: 'dl', pos: HB.partners.pos, hero: true })}
  <div class="wrap hp-grid">
    <div>
      <p class="eyebrow">Partners</p>
      <h1>Let's connect and grow together.</h1>
      <p class="lede">For chartered accountants, auditors and resellers who work with Nepali businesses every day.</p>
      <div class="btns">${btn('#ca', 'For CAs and auditors')}${btn('#partner', 'Become a partner', 'btn-line-w')}</div>
    </div>
    <div class="pstage" role="img" aria-label="HiTech at the centre, with CAs, Auditors and Resellers around it">
      <i class="ring" aria-hidden="true"></i>
      <span class="pcore"><img src="${IMG}icon.png" alt="" width="234" height="226"></span>
      <div class="porbit">${pnode('calc', 'CAs', 0)}${pnode('clip', 'Auditors', 1)}${pnode('handshake', 'Resellers', 2)}</div>
    </div>
  </div>
</header>
<section class="sec has-bg" id="ca">${bgl('ca-desk', { mode: 'lwb', band: 480, pos: '50% 50%', flip: true })}
  <div class="wrap">
    ${head2('For CAs and auditors', 'Built for the people who check the books.', 'These are Swastik features, and Swastik is IRD certified.')}
    <h3 class="gh">For auditors and IRD</h3>${chips(CA_CHIPS)}
    <h3 class="gh">Books and audit</h3>${chips(CA_CHIPS2)}
    <h3 class="gh">Editions of Swastik for different industries.</h3>
    <ul class="ichips ed stag">${EDITIONS.map(([i, l]) => `<li class="ic">${ico(i, 's40')}<span class="l">${l}</span></li>`).join('')}</ul>
    <p class="more">${btn('partners.html?inquiry=CA%20%2F%20audit%20firm&interest=Swastik#form', 'Book a CA walkthrough')}</p>
  </div>
</section>
<section class="sec sec-paper has-bg" id="partner">${bgl('handshake', { mode: 'lwp', band: 600, pos: '50% 50%' })}
  <div class="wrap">
    ${head2('Partner program', 'Partner Connect.', 'Resell HiTech software with training, support and rewards behind you.')}
    <div class="tiers dg" aria-label="Customer, then Channel partner, then Priority partner">
      <div class="tier t1" style="--k:0">${ico('users', 's48')}<b>Customer</b></div><i class="tarr" aria-hidden="true">${ARROW}</i>
      <div class="tier t2" style="--k:1">${ico('network', 's48')}<b>Channel partner</b></div><i class="tarr" aria-hidden="true">${ARROW}</i>
      <div class="tier t3" style="--k:2">${ico('award', 's48 dk')}<b>Priority partner</b></div>
    </div>
    <h3 class="gh">Priority partner benefits</h3>
    <div class="icards sm stag">${BENEFITS.map(([i, l]) => `<div class="icard">${ico(i, 's48')}<h3>${l}</h3></div>`).join('')}</div>
    <h3 class="gh">Partner responsibilities</h3>${chips(RESP)}
    <div class="values stag">${VALUES.map(([i, t, l]) => `<div>${ico(i, 's40')}<h3>${t}</h3><p>${l}</p></div>`).join('')}</div>
    <!-- COMMERCIAL TERMS WITHHELD: confirm with management before publishing -->
    <p class="terms">${ico('lock', 's32')}<span>Partner terms are shared after a conversation.</span></p>
    <p class="more">${btn('#form', 'Become a partner')}</p>
  </div>
</section>
<section class="sec" id="network">
  <div class="wrap">
    <div class="sec-head"><div><p class="eyebrow">Channel partners</p><h2>Partners across Nepal.</h2></div><p class="lede"><span class="bignum">12</span> partners</p></div>
    <!-- PARTNER NAMES: confirm each partner agrees to be listed publicly -->
    ${nepalMap(NETWORK.map(([n, c], i) => [PARTNER_PINS[i], n, c]), 'nm-p')}
  </div>
</section>
${demo({ e: 'Partner inquiry', h: 'Start a conversation.', l: 'Tell us who you are and how you work with Nepali businesses.', inq: 'Channel partner query', id: 'form', white: true })}`;

/* ---------- ABOUT ---------- */
const aboutPage = () => `${phero({ bg: HB.about, eyebrow: 'About HiTech', h1: 'Accounting software since 1998.', lede: 'HiTech serves small businesses, chartered accountants, retailers, corporates, stores, restaurants and cafes across Nepal.', ctas: btn('contact.html#demo', 'Request a demo') })}
<section class="sec sec-navy" data-tone="navy" aria-label="HiTech at a glance" style="padding-block:clamp(48px,6vw,80px)">
  <div class="wrap stats stag">
    <div><b data-count="10000" data-suffix="+">10,000+</b><span>Clients</span></div>
    <div><b data-count="25" data-suffix="+">25+</b><span>Years</span></div>
    <div><b data-count="100" data-suffix="+">100+</b><span>Professionals</span></div>
    <div><b data-count="15" data-suffix="+">15+</b><span>Branches</span></div>
  </div>
</section>
<section class="sec" id="who">
  <div class="wrap">
    ${head2('Our aims', 'What we aim for.', 'Qualified software and hardware professionals, working from Kalimati, Kathmandu.')}
    <div class="icards stag">
      <div class="icard">${ico('users', 's48')}<h3>Good for clients and employees</h3></div>
      <div class="icard">${ico('globe', 's48')}<h3>New technology, made clear</h3></div>
      <div class="icard">${ico('calc', 's48')}<h3>Cost-effective solutions</h3></div>
    </div>
  </div>
</section>
<section class="sec sec-paper" id="about-products">
  <div class="wrap">
    ${head2('Our products', 'One vendor, many trades.', 'The full HiTech suite, including Tivora ERP.')}
    <ul class="ichips pl stag"><li class="ic"><a href="${TIVORA_URL}" ${XA}>${ico('tivora', 's40')}<span class="l">Tivora ERP${SRNEW}</span></a></li>${TILES.map(t => `<li class="ic"><a href="${t.href}">${ico(t.id, 's40')}<span class="l">${t.name}</span></a></li>`).join('')}</ul>
  </div>
</section>
<section class="sec sec-navy" data-tone="navy" id="join">
  <div class="wrap band-dk rv"><div><p class="eyebrow">Careers</p><h2>Join the team.</h2></div><div><div class="btns">${btn('careers.html', 'See open roles')}</div></div></div>
</section>
${demo()}`;

/* ---------- SUPPORT ---------- */
const BRANCHES = [['Kathmandu', '01-5389641, 01-5389642, 01-5389643, 01-5389644'], ['Pokhara', '9856020194, 9801164616'], ['Biratnagar', '9852047215'], ['Dang', '9868610761'], ['Surkhet', '9858051773'], ['Narayanghat', '9855059386'], ['Janakpur', '9854020932'], ['Birgunj', '9855021911'], ['Bhairahawa', '9857024092'], ['Butwal', '9867760479'], ['Mahottari', '9814861926'], ['Nepalgunj', '9858048230'], ['Lahan', '9852830977']];
const supportPage = () => `${phero({ bg: HB.support, eyebrow: 'Support', h1: 'Help from a team that works in Nepal.', lede: 'Reach support by phone or email, or ask for a remote session.', ctas: btn('contact.html#demo', 'Request a call') })}
<section class="sec" id="ways">
  <div class="wrap">
    <div class="cards4 stag">
      <div class="card">${ico('headset', 's48')}<h3>Kathmandu support</h3><p><a href="tel:+9779802345048">9802345048</a>, <a href="tel:+9779802345049">9802345049</a> or <a href="mailto:support@hitechnepal.com.np">email</a>.</p></div>
      <div class="card">${ico('phone', 's48')}<h3>Sales</h3><p><a href="tel:+9779803601598">9803601598</a>, <a href="tel:+9779802031377">9802031377</a>, <a href="tel:+9779802031373">9802031373</a>.</p></div>
      <div class="card">${ico('screen', 's48')}<h3>Remote support</h3><p>TeamViewer, AnyAdmin, AnyDesk or UltraViewer.</p></div>
      <div class="card">${ico('grad', 's48')}<h3>Training</h3><p>Choose "Training demo" in the form.</p></div>
    </div>
  </div>
</section>
${coverageSection()}
<section class="sec" id="branches">
  <div class="wrap">
    <details class="trade btab"><summary>${ico('phone', 's48')}<b>Branch phone numbers</b><span class="pm" aria-hidden="true"></span></summary>
      <div class="tb"><div class="btable"><table><thead><tr><th scope="col">Branch</th><th scope="col">Phone</th></tr></thead><tbody>${BRANCHES.map(([b, p]) => `<tr><th scope="row">${b}</th><td>${p}</td></tr>`).join('')}</tbody></table></div></div></details>
  </div>
</section>
${demo({ e: 'Request a call', h: 'Tell us what you need.', l: 'Choose Request a call or Training demo and the right team will reply.' })}`;

/* ---------- CAREERS ---------- */
const ROLES = [
  ['Team Leader, .NET C# project', '2 placements, full time', ['.NET C#', 'Web services', 'SQL Server T-SQL', 'Leads 10+ programmers', 'Bachelor\'s degree', '2+ years as team leader', '.NET Framework 4.0', 'Strong English', 'Banking experience preferred']],
  ['Senior .NET C# Engineer', '4 placements, full time', ['.NET C#', 'Web services', 'SQL Server T-SQL', 'Bachelor\'s degree', '.NET Framework 4.0', 'Strong English']],
  ['System Support Officer', '4 placements, full time', ['Documentation', 'Troubleshooting', 'System upgrades', 'Database maintenance', 'Financial accounting', '+2 qualification', '1+ year of experience']],
  ['Technical Writer', '1 placement, full time', ['User manuals', 'Help files', 'Requirement documents', 'Data flow diagrams', 'Website content', 'Written English', '1+ year of experience']],
];
const careersPage = () => `${phero({ bg: HB.careers, eyebrow: 'Careers', h1: 'Build business software in Nepal.', lede: 'Send your CV to career@hitechnepal.com.np.', ctas: btn('mailto:career@hitechnepal.com.np', 'Apply by email') })}
<section class="sec" id="roles">
  <div class="wrap">
    ${head2('Open positions', 'Roles at HiTech.')}
    <div class="cards2 stag">${ROLES.map(([t, m, tags]) => `<div class="card"><h3>${t}</h3><p class="meta">${m}</p><ul class="tags">${tags.map(x => `<li>${x}</li>`).join('')}</ul></div>`).join('')}</div>
    <p class="more">${btn('mailto:career@hitechnepal.com.np', 'Send your CV')}</p>
  </div>
</section>`;

/* ---------- CONTACT / 404 ---------- */
const contactPage = () => `${phero({ bg: HB.contact, eyebrow: 'Contact', h1: 'Talk to HiTech.', lede: 'Ask for a demo, a quote or a call back.' })}
${demo({ e: 'Contact HiTech', h: 'Tell us about your business.', l: 'Or tell us what you need built.' }).replace('<section class="sec sec-paper" id="demo">', '<section class="sec" id="demo">')}`;
const p404 = () => `${phero({ eyebrow: 'Page not found', h1: 'That page is not here.', lede: 'These pages will get you back on track.', ctas: btn('index.html', 'Go to the home page') + btn('contact.html', 'Contact us', 'btn-line') })}
<section class="sec" style="padding-top:0"><div class="wrap"><ul class="wall">${[[TIVORA_URL, 'Tivora ERP', 1], ['products.html', 'Products'], ['solutions.html', 'Solutions'], ['partners.html', 'Partners'], ['about.html', 'About HiTech'], ['support.html', 'Support']].map(([h, t, x]) => `<li><a href="${h}"${x ? ` ${XA}` : ''}>${t}${x ? SRNEW : ''}</a></li>`).join('')}</ul></div></section>`;

/* ---------- write everything ---------- */
const pages = [];
const add = (file, title, desc, body, org, inMap = true) => { render({ file, title, desc, body, org }); if (inMap) pages.push(file); };
add('index.html', 'HiTech Solutions and Services | Accounting and business software for Nepal', 'HiTech has built accounting and business software in Nepal since 1998. Swastik, Tivora ERP, POS, restaurant, pharmaceutical and mobile software.', home(), true);
add('tivora.html', 'Tivora ERP | One platform for every business | HiTech', 'Tivora ERP brings sales, purchase, stock, production and accounts into one system, built to IRD\'s current formats.', tivoraPage(), false, false);
add('products.html', 'Products | Swastik, POS, Pharmasoft, Avocare and more | HiTech', 'Swastik accounting, mySwastikonline, Swastik POS and Restaurant, Pharmasoft, Avocare and Bizant from HiTech, with a finder by trade.', productsPage());
for (const p of PRODUCTS) PROD[phref(p)] = p.name;
for (const p of PRODUCTS) add(phref(p), `${p.name} | ${p.cat} | HiTech`, `${p.tag} ${p.name} from HiTech, Kathmandu.`, productPage(p));
add('solutions.html', 'Solutions | ERP, custom software and e-commerce | HiTech', 'HiTech builds ERP, application software, customized software and B2B and B2C e-commerce for businesses in Nepal.', solutionsPage());
add('partners.html', 'Partners | CAs, auditors and Partner Connect | HiTech', 'Swastik for chartered accountants and auditors, the Partner Connect reseller program, and HiTech\'s partner network across Nepal.', partnersPage());
add('about.html', 'About HiTech | Accounting software since 1998', 'HiTech has built business software in Nepal for more than 25 years, with 100+ professionals across 15+ branches.', aboutPage(), true);
add('support.html', 'Support | HiTech Solutions and Services', 'Phone, email and remote support from HiTech, with branch numbers across Nepal.', supportPage());
add('careers.html', 'Careers | Work at HiTech Solutions and Services', 'Open roles at HiTech in .NET development, system support and technical writing. Send your CV to career@hitechnepal.com.np.', careersPage());
add('contact.html', 'Contact HiTech | Request a demo, quote or call', 'Contact HiTech in Kalimati, Kathmandu: office, sales and support numbers, email and an inquiry form.', contactPage(), true);
render({ file: '404.html', title: 'Page not found | HiTech Solutions and Services', desc: 'This page could not be found. Go back to the HiTech home page.', body: p404() });
out('services.html', servicesRedirect());

out('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.map(p => `  <url><loc>${SITE_URL}/${p === 'index.html' ? '' : p}</loc></url>`).join('\n')}\n</urlset>\n`);
out('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);
console.log(`built ${pages.length + 2} pages`);
