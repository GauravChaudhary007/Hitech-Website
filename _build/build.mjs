// HiTech website v2 generator (Revision 2, visual-first). Zero dependencies, Node 22+.  Run: node _build/build.mjs
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SITE_URL = (process.env.SITE_URL || 'https://www.hitechnepal.com.np').replace(/\/+$/, '');
const out = (f, s) => writeFileSync(join(ROOT, f), s);
const NP = '<!-- NAME PENDING -->';
const IMG = 'assets/img/';
const BRANCH_KEYS = ['biratnagar', 'birgunj', 'butwal', 'pokhara', 'nepalgunj', 'janakpur', 'chitwan', 'lahan', 'dang', 'surkhet', 'katari', 'udayapur', 'rautahat', 'birtamode', 'bhairahawa', 'simara', 'hetauda', 'narayanghat', 'dharan', 'itahari', 'nuwakot', 'damak'];
const NBR = BRANCH_KEYS.length;
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
const LOGO_DIM = { swastik: [640, 585], myswastikonline: [640, 162], pos: [640, 213], restaurant: [640, 510], pharmasoft: [640, 496], avocare: [640, 247], bizant: [640, 472], payroll: [640, 611], smartsuite: [640, 157], ezee: [640, 464], tivora: [640, 134] };
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
    str: ['award|Nepal\'s No 1 software|Accounting, inventory and MIS', `pin|${NBR} branches across Nepal`, 'cal|28+ years of experience', 'cloud|Cloud and desktop versions', 'db|SQL database back end', 'key|Unlimited user security rights', 'sync|Free upgrades and updates|Under AMC or warranty', 'layers|More than 30 editions|For different industries'],
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
    str: ['award|Nepal\'s No 1 business solution provider', 'cal|28+ years of experience', 'cloud|Books anywhere, anytime, any device', 'network|Collaborate with branches and teams', 'lock|Fast, reliable and secured', 'user|User friendly and easy to use', 'clock|Control receivables and payables', 'box|Track your inventory', 'edit|Customisable forms and reports', 'headset|Free unlimited support'],
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
    str: ['award|Nepal\'s No 1 business solution provider', 'cal|28+ years of experience', 'mobile|Android and iOS', 'eye|Complete view for management', 'target|Sales force automation', 'link|Integrated with Swastik, Swastik Restaurant and POS'],
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
const TIVORA_TILE = { id: 'tivora', f: 'acc', name: 'Tivora ERP', cat: 'ERP', home: 'The ERP that tells you what comes next. One database for the whole business.', href: TIVORA_URL, ext: true };
const EZEE_TILE = { id: 'ezee', name: 'eZee', cat: 'Authorized dealer', href: 'products.html#ezee' };
const HERO_LOGOS = ['tivora', 'swastik', 'myswastikonline', 'pos', 'restaurant', 'pharmasoft', 'avocare', 'bizant', 'payroll', 'smartsuite', 'ezee'];
const TBY = Object.fromEntries([TIVORA_TILE, ...TILES, EZEE_TILE].map(t => [t.id, t]));

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
const pfeat = (img, label, line) => `<a class="pfeat" href="${TIVORA_URL}" ${XA}><b>${label}${EXTI}${SRNEW}</b><span>${line}</span>${img ? `<div class="pf-img"><img src="${IMG}${img}" alt="Tivora ERP screen with modules listed on the home page" width="1903" height="925" loading="lazy" decoding="async"></div>` : `<span class="pf-logo">${logo('tivora', '', false)}</span>`}</a>`;
const nl = (href, label) => `<li><a class="nl${PAGE === href ? ' cur' : ''}" href="${href}"${cur(href)}>${label}</a></li>`;

const SOL_MENU = [['process', 'How we work', 'From first call to daily support.', 'search'], ['erp', 'ERP', 'Main business processes in one system.', 'tivora'], ['application', 'Application software', 'Accounting, billing, POS and payroll.', 'layers'], ['custom', 'Customized software', 'Contract and collaborative projects.', 'code'], ['ecommerce', 'E-commerce', 'B2B and B2C online stores.', 'cartplus'], ['mobile-apps', 'Mobile apps', 'Owner, sales and customer apps.', 'mobile']];
const navMenus = () => {
  const mlg = (id, href, name, cat, ext) => `<a class="ml" href="${href}"${ext ? ' target="_blank" rel="noopener"' : ''}${cur(href)}><span class="mlg${id === 'tivora' ? ' mlg-tv' : ''}">${logo(id, '', false)}</span><span><b>${name}</b><small>${cat}</small></span></a>`;
  const mp = ids => ids.map(i => { const t = TBY[i]; return mlg(i, t.href, t.name, t.cat, t.ext); }).join('');
  return `<li><a class="nl nl-x" href="${TIVORA_URL}" ${XA}>Tivora ERP${EXTI}${SRNEW}</a></li>
      <li class="has-panel">${mbtn('p-products', 'Products', PAGE === 'products.html' || PAGE.startsWith('product-'))}
        <div class="panel wide" id="p-products"><div class="wrap pn-grid pn-4">
          <div class="pn-col"><p class="mh">Accounting and ERP</p>${mp(['tivora', 'swastik', 'myswastikonline', 'payroll', 'smartsuite'])}</div>
          <div class="pn-col"><p class="mh">Retail and hospitality</p>${mp(['pos', 'restaurant'])}${mlg('ezee', 'products.html#ezee', 'eZee (authorized dealer)', 'Hospitality software')}</div>
          <div class="pn-col"><p class="mh">Healthcare and field</p>${mp(['pharmasoft', 'avocare', 'bizant'])}</div>
          ${PAGE === 'products.html' ? pfeat(null, 'Tivora ERP', 'The ERP that tells you what comes next.') : pfeat('dashboards.jpg', 'Tivora ERP', 'The ERP that tells you what comes next.')}
        </div><div class="wrap pn-all"><a href="products.html">All products ${ARROW}</a> <a href="products.html#trades">Find yours by trade ${ARROW}</a></div></div></li>
      <li class="has-panel relpos"><span class="msplit"><a class="nl${PAGE === 'solutions.html' ? ' cur' : ''}" href="solutions.html"${cur('solutions.html')}>Solutions</a><button class="mb mb-ch" type="button" aria-expanded="false" aria-controls="p-solutions" aria-label="Solutions menu"><svg viewBox="0 0 12 12" aria-hidden="true" focusable="false"><path d="M2.5 4.5L6 8l3.5-3.5"/></svg></button></span>
        <div class="panel small" id="p-solutions">${SOL_MENU.map(([id, l, d, ic]) => ml('solutions.html#' + id, l, d, ic)).join('')}</div></li>
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
      ${grp('Solutions', [['solutions.html', 'All solutions'], ...SOL_MENU.map(([id, l]) => ['solutions.html#' + id, l])])}
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
      <div><h3>Solutions</h3><ul><li><a href="solutions.html#erp">ERP</a></li><li><a href="solutions.html#application">Application software</a></li><li><a href="solutions.html#custom">Customized software</a></li><li><a href="solutions.html#ecommerce">E-commerce</a></li><li><a href="solutions.html#mobile-apps">Mobile apps</a></li></ul></div>
      <div><h3>Partners</h3><ul><li><a href="partners.html#ca">For CAs and auditors</a></li><li><a href="partners.html#partner">Partner Connect</a></li><li><a href="partners.html#network">Partner network</a></li></ul></div>
      <div><h3>Company</h3><ul><li><a href="about.html">About</a></li><li><a href="index.html#clients">Clients</a></li><li><a href="careers.html">Careers</a></li><li><a href="support.html">Support</a></li><li><a href="contact.html">Contact</a></li></ul></div>
    </div>
    <div class="foot-bar"><span>&copy; <span id="yr">2026</span> HiTech Solutions and Services Pvt. Ltd. All rights reserved.</span><span>Tivora ERP screens use a demo company. Section photography is generated artwork.</span></div>
  </div>
</footer>`;

const ld = o => `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', ...o }).replace(/</g, '\\u003c')}</script>`;
const ORG_NAME = 'HiTech Solutions and Services Pvt. Ltd.';
const ORG = {
  '@type': 'Organization', '@id': `${SITE_URL}/#organization`, name: ORG_NAME, url: SITE_URL, logo: `${SITE_URL}/${IMG}logo-light.png`,
  email: 'info@hitechnepal.com.np', telephone: '+977-1-5389641', foundingDate: '1998',
  address: { '@type': 'PostalAddress', streetAddress: '4th Floor, Divine Complex, Kalimati Chowk, Kalimati', addressLocality: 'Kathmandu', addressCountry: 'NP' },
  contactPoint: [
    { '@type': 'ContactPoint', contactType: 'customer service', telephone: '+977-1-5389641', email: 'info@hitechnepal.com.np', areaServed: 'NP' },
    { '@type': 'ContactPoint', contactType: 'sales', telephone: '+977-9803601598', areaServed: 'NP' },
    { '@type': 'ContactPoint', contactType: 'technical support', telephone: '+977-9802345048', email: 'support@hitechnepal.com.np', areaServed: 'NP' },
  ],
  sameAs: ['https://www.facebook.com/hitechnepal/', 'https://www.linkedin.com/company/hitech-solutions-&-services-pvt.-ltd./'],
};
const WEBSITE = { '@type': 'WebSite', '@id': `${SITE_URL}/#website`, name: 'HiTech Solutions and Services', url: SITE_URL, inLanguage: 'en', publisher: { '@id': `${SITE_URL}/#organization` } };
const LDX = {};

const PROD = {};
const render = ({ file, title, desc, body, org = false, noindex = false }) => {
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
${noindex ? '<meta name="robots" content="noindex">\n' : ''}<meta name="geo.region" content="NP">
<meta property="og:type" content="website">
<meta property="og:locale" content="en_NP">
<meta property="og:site_name" content="HiTech Solutions and Services">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${desc}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${SITE_URL}/${IMG}logo-light.png">
<meta property="og:image:alt" content="HiTech Solutions and Services logo">
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="${title}">
<meta name="twitter:description" content="${desc}">
<link rel="icon" type="image/png" href="${IMG}icon.png">
<link rel="preload" as="font" type="font/woff2" href="assets/fonts/poppins-600-latin.woff2" crossorigin>
<link rel="stylesheet" href="assets/fonts/fonts.css">
<script>document.documentElement.className='js${file === 'index.html' ? ' home onescr' : file === 'products.html' ? ' onescr' : ''}'</script>
${PRELOAD[file] ? `<link rel="preload" as="image" href="${BGD}${PRELOAD[file].src}.jpg">\n` : ''}<link rel="stylesheet" href="assets/css/site.css">
${[...(org ? [ORG] : []), ...(LDX[file] || [])].map(o => ld(o) + '\n').join('')}</head>
<body${file === 'index.html' ? ' class="home onescr"' : file === 'products.html' ? ' class="onescr"' : ''}${PROD[file] ? ` data-product="${PROD[file]}"` : ''}>
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
/* the one lead form: contact page and demo bands (p 'f'), the call-back strip (p 'ls') and the popup (p 'lp') all render this */
const leadForm = ({ p = 'f', source = 'demo', inq = '', interest = '', cls = 'form' } = {}) => `<form class="${cls}" data-lead data-source="${source}"${inq ? ` data-inquiry="${inq}"` : ''}>
        <div class="fld"><label for="${p}-name">Name</label><input id="${p}-name" name="name" type="text" autocomplete="name" required></div>
        <div class="fld"><label for="${p}-biz">Company</label><input id="${p}-biz" name="company" type="text" autocomplete="organization" required></div>
        <div class="fld"><label for="${p}-phone">Mobile</label><input id="${p}-phone" name="mobile" type="tel" autocomplete="tel" required></div>
        <div class="fld"><label for="${p}-email">Email (optional)</label><input id="${p}-email" name="email" type="email" autocomplete="email"></div>
        <div class="fld"><label for="${p}-city">City</label><input id="${p}-city" name="city" type="text" autocomplete="address-level2" required></div>
        <div class="fld"><label for="${p}-inq">Inquiry for</label><select id="${p}-inq" name="inquiry"><option>Request a demo</option><option>Sales support</option><option>Channel partner query</option><option>CA / audit firm</option><option>Request a call</option><option>Training demo</option><option>Career</option></select></div>
        <div class="fld full"><label for="${p}-int">Interested in</label><select id="${p}-int" name="interest">${interestOpts(interest)}</select></div>
        <div class="fld full"><label for="${p}-msg">Message</label><textarea id="${p}-msg" name="message" rows="4"></textarea></div>
        ${HPOT}
        <div class="fld full">${WA_BTN}</div>
        <p class="form-note full">${WA_NOTE}</p>
        <p class="form-ok full" role="status" hidden></p>
      </form>`;
const FORM = (inq = '') => leadForm({ inq });
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
          <span class="tc-logo">${logo('tivora')}</span>
          <div class="tc-copy"><h3>${t.name}${SRNEW}</h3><p>${t.home}</p></div>
          <div class="tc-act">${IRD('ird-dk')}<span class="go">Explore Tivora ERP ${EXTI}</span></div>
        </a>`;
  return `<a class="tile${t.badge === 'Ask us' ? ' tile-ask' : ''}${t.id === 'bizant' ? ' tile-wide' : ''}" data-cat="${t.f}" data-trades="${tr}" href="${t.href}"><span class="t-top">${lplate(t.id)}${t.badge ? `<span class="badge">${t.badge}</span>` : ''}</span><span class="t-cat">${t.cat}</span><h3>${t.name}</h3><p>${t.home}</p><div class="trow">${IRD()}</div></a>`;
};
const bento = (pre = 'b', trade = false, extra = '') => {
  const keys = ['all', ...Object.keys(CATS)];
  const lab = { all: 'All', ...CATS };
  return `<div data-filter>
    <div class="tabrow"><div class="tabs" role="tablist" aria-label="Product categories">${keys.map((k, i) => `<button class="tab" role="tab" type="button" id="${pre}-t-${k}" data-f="${k}" aria-selected="${i === 0}" aria-controls="${pre}-panel" tabindex="${i === 0 ? 0 : -1}">${lab[k]}</button>`).join('')}</div>${extra}</div>
    ${trade ? '<p class="trade-status" role="status" hidden><span class="ts-l"></span> <button type="button" class="ts-x">Show all products</button></p>' : ''}
    <div class="bento${trade ? ' bento-c' : ''}" id="${pre}-panel" role="tabpanel" aria-labelledby="${pre}-t-all">
        ${tile(TIVORA_TILE)}
        ${TILES.map(tile).join('\n        ')}
    </div>
  </div>`;
};

const PACKS = () => `<div class="packs stag">
      ${INDUSTRIES.map(([n, d], i) => `<a class="pack${i < 3 ? '' : ' pk4'}" href="${TIVORA_URL}" ${XA}><h3>${n}</h3><p>${d}</p><span class="go">Explore Tivora ERP ${EXTI}${SRNEW}</span></a>`).join('\n      ')}
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
/* Numbered badges that would overlap are pushed apart; the pin stays on its true spot (a small dot) and a thin leader joins it to the badge.
   Works in map units (1000 wide); 66 units covers the 22px badge on the narrowest two-column map (about 410px wide) and the 16px mobile badge on a 342px map, so it also holds at every wider size. */
const nudge = pts => {
  const D = 66, b = pts.map(([x, y], i) => [x + (i % 2 ? 0.01 : -0.01), y + (i % 3 ? 0.01 : -0.01)]);
  for (let n = 0; n < 400; n++) {
    let moved = false;
    for (let i = 0; i < b.length; i++) for (let j = i + 1; j < b.length; j++) {
      const dx = b[j][0] - b[i][0], dy = b[j][1] - b[i][1], d = Math.hypot(dx, dy);
      if (d >= D) continue;
      const k = (D - d) / 2 / (d || 1); moved = true;
      b[i][0] -= dx * k; b[i][1] -= dy * k; b[j][0] += dx * k; b[j][1] += dy * k;
    }
    if (!moved) break;
  }
  return b.map(([x, y], i) => { const ox = Math.round(x - pts[i][0]), oy = Math.round(y - pts[i][1]); return Math.hypot(ox, oy) < 6 ? [0, 0] : [ox, oy]; });
};
const nepalMap = (items, cls = '') => {
  const id = ++NM, P = k => { if (!MAP.pins[k]) throw new Error('missing pin ' + k); return MAP.pins[k]; };
  const west = items.map((_, k) => k).sort((a, b) => P(items[a][0]).x - P(items[b][0]).x || a - b), drop = [];
  west.forEach((k, r) => { drop[k] = r; });
  const names = items.map(([k, t]) => t.replace(/&amp;/g, 'and'));
  const off = nudge(items.map(([k]) => [P(k).x, P(k).y]));
  return `<div class="nmap dg${cls ? ' ' + cls : ''}" data-nmap>
      <div class="nm-fig">
        <svg class="nm-svg" viewBox="${MAP.viewBox}" role="img" aria-label="Map of Nepal with ${items.length} numbered pins: ${names.map((n, k) => `${k + 1} ${n}`).join(', ')}." focusable="false">
          <defs><clipPath id="nmc${id}"><path d="${MAP.outline}"/></clipPath><linearGradient id="nmg${id}" x1="0" x2="1" y1="0" y2="0"><stop class="sh" offset="0" stop-opacity="0"/><stop class="sh" offset=".5" stop-opacity=".3"/><stop class="sh" offset="1" stop-opacity="0"/></linearGradient></defs>
          <path class="nm-fill" d="${MAP.outline}"/>
          <path class="nm-out" pathLength="1" d="${MAP.outline}"/>
          <rect class="nm-shim" clip-path="url(#nmc${id})" x="-220" y="0" width="200" height="${MAP.height}" fill="url(#nmg${id})"/>
        </svg>
        ${items.map(([k], i) => { const p = P(k), [ox, oy] = off[i], o = ox || oy; return `<span class="nm-pin${o ? ' off' : ''}" data-i="${i}" style="left:${pc(p.x / 10)};top:${pc(p.y / 5.93)};--d:${drop[i]}${o ? `;--ox:${ox};--oy:${oy};--len:${Math.hypot(ox, oy).toFixed(1)};--ang:${(Math.atan2(-oy, -ox) * 180 / Math.PI).toFixed(1)}deg` : ''}" aria-hidden="true"><i class="nm-r"></i><b>${i + 1}</b></span>`; }).join('')}
        <span class="nm-tip" aria-hidden="true" hidden></span>
      </div>
      <ol class="nm-leg" style="--rows:${Math.ceil(items.length / 2)}">${items.map(([k, t, s], i) => `<li tabindex="0" data-i="${i}" data-name="${s || t}"><span class="nm-n">${i + 1}</span><span class="nm-t"><b>${t}</b>${s ? `<small>${s}</small>` : ''}</span>${pinIcon}</li>`).join('')}</ol>
    </div>`;
};
/* the 22 branch cities, numbered west to east */
const BRANCH_ORDER = [...BRANCH_KEYS].sort((a, b) => MAP.pins[a].x - MAP.pins[b].x);
const coverageSection = (paper = true, bg = false) => `<section class="sec${paper ? ' sec-paper' : ''}${bg ? ' has-bg' : ''}" id="coverage">${bg ? bgl('home-himalaya', { mode: 'lw', pos: '50% 45%' }) : ''}<div class="wrap"><div class="sec-head"><div><p class="eyebrow">Our branches</p><h2><span class="bignum">${BRANCH_KEYS.length}</span> cities across Nepal.</h2></div></div>${nepalMap(BRANCH_ORDER.map(k => [k, MAP.pins[k].name]))}</div></section>`;
const PARTNER_PINS = ['itahari', 'birgunj', 'butwal', 'bhairahawa', 'pokhara', 'nepalgunj', 'janakpur', 'narayanghat', 'lahan', 'jhapa', 'mahendranagar', 'dang'];

/* ---------- HOME ---------- */

/* Tivora ERP highlight (spec 14 P3): compact, not sticky, four real screens cross-fading */
const TV_SHOTS = ['dash', 'paint', 'jewel', 'sales'];
const TV_CHIPS = ['target|Intelligent|Tells you what is next', 'trend|Plans your business in advance|Forecast, MRP and project budgets drive purchase, production and spending', 'user|Focused|Each role sees its own work', 'shield|Makes no mistakes|Warns before a wrong action: credit limit, low margin, near expiry, budget overrun'];
const INDUSTRIES = [
  ['Jewellery', 'Purity, making charges, old gold and karigar management.'],
  ['Paint', 'Shades and tinting, dealer schemes, volume pricing, batch control.'],
  ['FMCG', 'Distributor and retailer chain, schemes, route and beat.'],
  ['Pharmaceutical', 'Batch and expiry, first expiry first out, near-expiry returns.'],
  ['Automobile', 'Chassis and engine tracking, job cards, warranty and service.'],
  ['Trading', 'Imports, landed cost, LC and trust receipts, credit control.'],
  ['Manufacturing', 'BOM, production orders, yield, variance, machine efficiency.'],
];
const TV_YT = 'n_rTzRJFkqw';
const TV_YT_WATCH = `https://www.youtube.com/watch?v=${TV_YT}`;
const TV_YT_EMBED = `https://www.youtube-nocookie.com/embed/${TV_YT}?rel=0&amp;modestbranding=1&amp;playsinline=1`;
const coreBand = () => `<section class="sec sec-navy tv-hl" id="core" data-tone="navy" aria-labelledby="core-h">
  <div class="wrap tv-grid">
    <div class="tv-l">
      <p class="eyebrow">Tivora ERP</p>
      <h2 id="core-h">The ERP that tells you what comes next.</h2>
      <p class="lede">One database for the whole business, with My Work Desk and an Executive Dashboard.</p>
      <ul class="tv-str">${TV_CHIPS.map(c => { const [, l, s] = c.split('|'); return `<li><b>${l}</b><span>${s}</span></li>`; }).join('')}</ul>
      <p class="tv-pl">Industry-specific for</p>
      <ul class="tv-packs" aria-label="Industry solutions">
        ${INDUSTRIES.map(([n]) => `<li><a href="${TIVORA_URL}" ${XA}>${n}${SRNEW}</a></li>`).join('\n        ')}
      </ul>
      <div class="btns">${xbtn(TIVORA_URL, 'Explore Tivora ERP')}</div>
    </div>
    <div class="tv-r">
      <div class="yt"><iframe src="${TV_YT_EMBED}" title="Tivora ERP video" width="560" height="315" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen" allowfullscreen></iframe></div>
      <p class="yt-l"><a class="go" href="${TV_YT_WATCH}" ${XA}>Watch on YouTube${EXTI}${SRNEW}</a></p>
    </div>
  </div>
</section>`;

/* "Interested in" options, shared by the demo form, the call-back strip and the inquiry popup */
const INTEREST = ['Not sure yet', 'Tivora ERP: Alanza (jewellery)', `Tivora ERP: Paint${NP}`, `Tivora ERP: Trading${NP}`, 'Swastik', 'mySwastikonline', 'Swastik POS', 'Swastik Restaurant', 'Pharmasoft', 'Avocare', 'Bizant', 'Mobile apps', 'HiTech Payroll', 'HiTech Smartsuite', 'eZee hospitality software', 'Custom software, ERP or e-commerce'];
const interestOpts = sel => INTEREST.map(o => `<option${o.replace(NP, '') === sel ? ' selected' : ''}>${o}</option>`).join('');
const HPOT = '<div class="hpot" aria-hidden="true"><label>Leave this field empty<input type="text" name="website" tabindex="-1" autocomplete="off"></label></div>';

/* call-back strip above the footer on every page except contact.html (spec 14 P23): the shared lead form in a compact grid */
const leadStrip = prod => `<section class="lead-strip" aria-labelledby="ls-h">
  <div class="wrap ls-in">
    <h2 id="ls-h">Get a call back.</h2>
    ${leadForm({ p: 'ls', source: 'strip', interest: prod, cls: 'form ls-form' })}
  </div>
</section>`;

/* inquiry popup (spec 14 P19): opened and scheduled by site.js; absent from contact.html */
const leadPopup = () => `<div class="lead-pop" id="leadPop" role="dialog" aria-modal="true" aria-labelledby="lp-h" hidden>
  <div class="lp-ov" data-lp-close></div>
  <div class="lp-card" tabindex="-1">
    <button class="lp-x" type="button" aria-label="Close" data-lp-close><svg viewBox="0 0 20 20" aria-hidden="true" focusable="false"><path d="M4 4l12 12M16 4L4 16"/></svg></button>
    <h2 id="lp-h">Talk to HiTech.</h2>
    <p class="lede">Tell us what you run and we will call you.</p>
    ${leadForm({ p: 'lp', source: 'popup', cls: 'form lp-form' })}
  </div>
</div>`;

const tradeIcs = prods => prods.map(x => ico(x, 's32')).join('');
const TRADE_PRODUCTS = prods => prods.map(p => (p === 'hospitality' ? 'eZee' : TBY[p].name)).join(', ');
const tradeHome = () => `<section class="sec sec-paper" id="trades-home">
  <div class="wrap">
    <div class="th-head">
      <div><h2>Find the software for your trade.</h2><p class="lede">Pick your trade to see the products that serve it.</p></div>
      ${btn('products.html#trades', 'Find yours by trade', 'btn-line')}
    </div>
    <ul class="th-list stag">
      ${TRADES.map(([id, name, , prods]) => `<li><a href="products.html#trade-${id}"><b>${name}${id === 'paint' ? NP : ''}</b><span>${TRADE_PRODUCTS(prods)}</span>${ARROW}</a></li>`).join('\n      ')}
    </ul>
  </div>
</section>`;

const WHY5 = [['28+', 'Years of experience', 28], ['10,000+', 'Clients', 10000], ['20+', 'Partners', 20], ['100+', 'Dynamic team members', 100]];
const WHY_SUP = [['sms', 'Live chat support'], ['pin', 'Onsite support'], ['factory', 'Industry-specific implementations'], ['grad', 'Software training']];
const draw = h => h.replace(/<(path|circle|rect|line|ellipse|polyline|polygon)/g, '<$1 pathLength="1"');
const strengths = () => `<section class="sec" id="strengths">
  <div class="wrap st-grid">
    <div class="st-main">
      <p class="eyebrow">Our strengths</p>
      <h2>Managing business in Nepal since 1998.</h2>
      <p class="lede">We are HiTech Solutions &amp; Services Pvt. Ltd., a premier business software solution provider in Nepal.</p>
      <div class="st-no1 rv"><b>No.1</b><span>Business Solution Provider of Nepal</span><p class="st-ird"><span class="ird-i">${IRDSVG}</span>All HiTech products are IRD certified.</p></div>
      <dl class="st-nums stag">${WHY5.map(([v, l, n]) => `<div><dd data-count="${n}" data-suffix="+">${v}</dd><dt>${l}</dt></div>`).join('')}</dl>
    </div>
    <div class="st-photo" aria-hidden="true"><img src="${BGD}street-morning.jpg" alt="" loading="lazy" decoding="async"></div>
  </div>
  <div class="wrap st-np">
    <div class="np-i"><h3>Made for the way Nepal does business.</h3><p>Every document is numbered by fiscal year.</p><p class="np-dn"><span class="dn-l">Sales invoice number</span><span class="dn-v" data-type="SI-2083/84-00001"><span class="sr">SI-2083/84-00001</span><span aria-hidden="true">SI-2083/84-00001</span></span></p></div>
    <ul class="np-f stag">${NEPAL_ITEMS.map(([, t, d]) => `<li><b>${t}</b><span>${d}</span></li>`).join('')}</ul>
  </div>
</section>`;

const supportSection = () => `<section class="sec" id="support-services">
  <div class="wrap sp-grid">
    <div class="sp-photo" aria-hidden="true"><img src="${BGD}support-desk.jpg" alt="" loading="lazy" decoding="async"></div>
    <div class="sp-copy">
      <h2>Support services</h2>
      <ul class="sp-list stag">${WHY_SUP.map(([i, l]) => `<li>${draw(ico(i, 's32 bare'))}<h3>${l}</h3></li>`).join('')}</ul>
      <p class="sp-close">At HiTech, we believe in the intrinsic value of human resources. Our team is up and ready to offer professional support and solutions to ease your operation.</p>
    </div>
  </div>
</section>`;

const homeCoverage = () => `<section class="sec sec-paper" id="coverage">
  <div class="wrap">
    <h2 class="cv-h"><span class="bignum">${BRANCH_KEYS.length}</span> cities across Nepal.</h2>
    ${nepalMap(BRANCH_ORDER.map(k => [k, MAP.pins[k].name]))}
  </div>
</section>`;

const solRow = (href, t, p) => `<li><a href="${href}"><span><b>${t}</b><small>${p}</small></span>${ARROW}</a></li>`;
const solPartners = () => `<section class="sec" id="solutions-teaser">
  <div class="wrap sx-grid">
    <div class="sx-sol">
      <h2>Software, built your way.</h2>
      <p class="lede">We also build software to your brief.</p>
      <ul class="sx-list stag">
        ${solRow('solutions.html#erp', 'ERP implementation', 'Tivora ERP: one database for the whole business.')}
        ${solRow('solutions.html#application', 'Application software', 'Accounting, billing, POS and payroll.')}
        ${solRow('solutions.html#custom', 'Customized software', 'Contract and collaborative projects.')}
        ${solRow('solutions.html#ecommerce', 'E-commerce', 'B2B and B2C online stores.')}
      </ul>
    </div>
    <div class="sx-par" id="partners-band">
      <h2>Grow with HiTech.</h2>
      <ul class="sx-list stag">
        ${solRow('partners.html#ca', 'For CAs and auditors', 'For people who check the books.')}
        ${solRow('partners.html#partner', 'Partner Connect', 'Training, support and rewards.')}
        ${solRow('partners.html#network', 'Partner network', 'Partners across 12 cities.')}
      </ul>
      <div class="sx-photo" aria-hidden="true"><img src="${BGD}handshake.jpg" alt="" loading="lazy" decoding="async"></div>
    </div>
  </div>
</section>`;

const CLIENT_LIST = [['cg-group', 'CG Group'], ['jagdamba-steel', 'Jagdamba Steel'], ['pashupati-paints', 'Pashupati Paints'], ['shikhar', 'Shikhar'], ['triveni-group', 'Triveni Group'], ['qfx-cinemas', 'QFX Cinemas'], ['mc-group', 'M. C. Group'], ['goenka-group', 'Goenka Group'], ['rajesh-metal-crafts', 'Rajesh Metal Crafts'], ['asian-pharmaceuticals', 'Asian Pharmaceuticals'], ['ctl-pharmaceuticals', 'CTL Pharmaceuticals']];
let CMAN = {};
try { CMAN = JSON.parse(readFileSync(join(ROOT, 'assets/img/clients/manifest.json'), 'utf8')); } catch { /* no logos saved yet: text tiles */ }
const clientTile = ([slug, name]) => {
  const f = CMAN[slug] && CMAN[slug].file;
  return f && existsSync(join(ROOT, 'assets/img/clients', f)) ? `<li><img src="assets/img/clients/${f}" alt="${name}" loading="lazy" decoding="async"></li>` : `<li class="ct-t"><span>${name}</span></li>`;
};
const qcar = () => {
  const qs = [QUOTE_DATA[1], QUOTE_DATA[0], QUOTE_DATA[2]];
  return `<div class="qcar" data-qcar role="group" aria-roledescription="carousel" aria-label="Client testimonials">
        <div class="qc-track">${qs.map((q, i) => `<figure class="quote${i === 0 ? ' on' : ''}"><blockquote><p>&ldquo;${q[0]}&rdquo;</p></blockquote><figcaption><b>${q[1]}</b>${q[2]}</figcaption></figure>`).join('')}</div>
        <div class="qc-ctl"><button class="qc-b" type="button" data-dir="-1" aria-label="Previous testimonial"><svg viewBox="0 0 20 20" aria-hidden="true" focusable="false"><path d="M16 10H5M9 5l-5 5 5 5"/></svg></button><div class="qc-dots" role="group" aria-label="Choose a testimonial">${qs.map((q, i) => `<button class="qc-dot${i === 0 ? ' on' : ''}" type="button" aria-label="Show testimonial ${i + 1} of ${qs.length}" aria-pressed="${i === 0}"></button>`).join('')}</div><button class="qc-b" type="button" data-dir="1" aria-label="Next testimonial"><svg viewBox="0 0 20 20" aria-hidden="true" focusable="false"><path d="M4 10h11M11 5l5 5-5 5"/></svg></button></div>
      </div>`;
};
const clientsSection = () => `<section class="sec sec-paper" id="clients">
  <div class="wrap cl-grid">
    <div class="fbv rv">
      <div class="fb-frame"><iframe class="fbf" title="HiTech client testimonial video" data-src="${FB_SRC}" width="340" height="604" frameborder="0" scrolling="no" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" allowfullscreen loading="lazy"></iframe></div>
      <p><a class="go" href="${FB_REEL}" ${XA}>Watch on Facebook${EXTI}${SRNEW}</a></p>
    </div>
    <div class="cl-main">
      <h2>Our clients</h2>
      <ul class="cwall stag">${CLIENT_LIST.map(clientTile).join('')}</ul>
      ${qcar()}
    </div>
  </div>
</section>`;

const suiteTile = t => {
  const tr = (TRADE_OF[t.id] || []).join(' ');
  if (t.id === 'tivora') return `<a class="sg-tv" data-trades="${tr}" href="${t.href}" ${XA} data-tone="navy">
        <span class="sg-tvl">${logo('tivora')}</span>
        <span class="sg-tvc"><h3>${t.name}${SRNEW}</h3><p>${t.home}</p>${IRD('ird-dk')}<span class="go">Explore Tivora ERP ${EXTI}</span></span>
      </a>`;
  return `<a class="sg-t" data-trades="${tr}" href="${t.href}"><span class="sg-top">${logo(t.id)}${t.badge ? `<small class="sg-b">${t.badge}</small>` : ''}</span><span class="sg-cat">${t.cat}</span><h3>${t.name}</h3><p>${t.home}</p></a>`;
};
const suiteSection = () => `<section class="sec" id="suite">
  <div class="wrap">
    <div class="su-head">
      <div><h2>One vendor. Every part of the business.</h2><p class="lede">Tivora ERP leads a suite for every part of your business.</p></div>
      ${btn('products.html', 'All products', 'btn-line')}
    </div>
    <div class="sg stag">
      ${suiteTile(TIVORA_TILE)}
      ${TILES.map(suiteTile).join('\n      ')}
    </div>
  </div>
</section>`;

const faqCols = () => `<div class="faq-2">${faq([0, 1, 2, 3])}${faq([4, 5, 6, 7])}</div>`;
const faqHome = () => `<section class="sec sec-paper" id="faq"><div class="wrap"><h2>Straight answers before you call.</h2>${faqCols()}</div></section>`;

const hchips = HERO_LOGOS.map(id => { const t = TBY[id]; return `<li><a class="hlogo${id === 'tivora' ? ' hlogo-tv' : ''}" href="${t.href}"${t.ext ? ' target="_blank" rel="noopener"' : ''} aria-label="${t.name}, ${t.cat}">${logo(id, '', false)}<span class="tip" aria-hidden="true"><b>${t.name}</b><small>${t.cat}</small></span></a></li>`; }).join('');
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
      <p class="eyebrow">Managing business in Nepal since 1998</p>
      <h1>The software Nepal's businesses run on.</h1>
      <p class="lede">Accounting, billing, POS, restaurant, pharmaceutical and enterprise software for Nepal's businesses.</p>
      <div class="btns">${btn('contact.html#demo', 'Request a demo')}${btn('products.html', 'Explore products', 'btn-line')}</div>
      <dl class="proof"><div><dt>Clients</dt><dd data-count="10000" data-suffix="+">10,000+</dd></div><div><dt>Years</dt><dd data-count="28" data-suffix="+">28+</dd></div><div><dt>Branches</dt><dd data-count="${NBR}">${NBR}</dd></div></dl>
      <div class="suite"><p class="suite-l">HiTech products</p><ul class="hchips stag">${hchips}</ul></div>
    </div>
  </div>
</section>
${strengths()}
${clientsSection()}
${suiteSection()}
${coreBand()}
${tradeHome()}
${supportSection()}
${homeCoverage()}
${solPartners()}
${faqHome()}
${demo({ compact: true, white: true, bg: { src: 'kathmandu-street', pos: '50% 55%', flip: true } })}`;

/* ---------- TIVORA ---------- */
const PILLARS = [
  ['Intelligent', 'Knows every open item and tells you what to do next.'],
  ['Plans your business in advance', 'Forecast, MRP and project budgets drive purchase, production and spending.'],
  ['Focused', 'Each person sees only what matters to their role.'],
  ['Makes no mistakes', 'Guardrails warn before a wrong action: credit limit, low margin, near expiry, budget overrun.'],
];
const MODS14 = ['check|Work Desk', 'pie|Dashboards', 'cart|Sales and Receivable', 'truck|Purchase and Payable', 'box|Store and Inventory', 'target|Material Planning', 'factory|Production', 'tools|Maintenance', 'route|Transport and Delivery', 'headset|Customer Services', 'calc|Finance and Accounts', 'warehouse|Fixed Assets', 'bank|Trade and Finance', 'vat|Tax and IRD'];
const TV_FEATURES = [
  ['check', 'My Work Desk', ['check|Tasks built from live transactions', 'bell|Reminders and escalation', 'lock|Warnings before a wrong action']],
  ['pie', 'Executive Dashboard', ['eye|Live view of all branches', 'search|Every number drills to its voucher', 'target|Exceptions first']],
  ['users', 'Role KPIs', ['user|A KPI for every person', 'table|A KPI library by department', 'trend|Scored from real transactions']],
  ['doc', 'Single entry flows', ['doc|Quotation to receipt, nothing retyped', 'sync|Stock and ledgers update at save', 'mail|Invoice sent by email and WhatsApp']],
  ['lock', 'Approval and rule engine', ['layers|Multi-level approvals', 'bell|Reminders and auto-escalation', 'shield|Approval PIN and multi-factor login']],
  ['factory', 'MRP workbench', ['trend|Forecast and confirmed orders', 'box|Net of stock and open orders', 'doc|Purchase requests and work orders']],
  ['calc', 'Planned vs actual costing', ['factory|Batch costing against standard', 'truck|Landed cost on imports', 'trend|Variance and yield, the same day']],
  ['vat', 'IRD connected', ['vat|VAT on every line and document', 'doc|Annex 9 and 13 reports', 'cal|Bikram Sambat and AD dates', 'lock|Issued bills locked']],
];
const tivoraPage = () => `${phero({ dark: true, eyebrow: 'Tivora ERP', h1: 'The ERP that tells you what comes next.', lede: 'Intelligent and focused, on one database. It plans ahead and makes no mistakes.', ctas: btn('contact.html#demo', 'See it on your own numbers') + btn('#modules', 'Explore the features', 'btn-line-w'), extra: `\n  <div class="wrap hero-media">${laptop(video(), 'lp-xl')}</div>` })}
<section class="sec" id="what">
  <div class="wrap">
    ${head2('The platform', 'What sets Tivora apart.', 'One system that knows your business, guides your people and measures the result.')}
    <div class="cards4 stag">${PILLARS.map(([h, p], i) => `<div class="card"><span class="num">0${i + 1}</span><h3>${h}</h3><p>${p}</p></div>`).join('')}</div>
    <h3 class="gh">One database for every module.</h3>
    ${chips(MODS14, 'tv14')}
  </div>
</section>
<section class="sec sec-paper" id="modules">
  <div class="wrap">
    ${head2('Features', 'Built to run the day.', 'Every entry updates stock, ledgers, dashboards and KPIs the moment it is saved.')}
    <div class="mods stag">${TV_FEATURES.map(([i, n, c]) => `<div class="mod">${ico(i, 's48')}<h3>${n}</h3>${chips(c)}</div>`).join('')}</div>
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
<section class="sec sec-navy has-bg" data-tone="navy" id="trades">${bgl('jewelry', { mode: 'dk', pos: '50% 50%' })}
  <div class="wrap">
    ${head2('Industry solutions', 'Customised for your industry.', 'Start from a complete platform, add your industry solution, then customise it.')}
    ${PACKS()}
  </div>
</section>
${demo()}`;

/* ---------- PRODUCTS (directory + by trade) ---------- */
const tradeDetail = ([id, name, ic, prods, pts, links]) => {
  const has = prods.some(p => TBY[p] || p === 'tivora');
  return `<details class="trade" name="trades" id="trade-${id}"><summary>${ico(ic, 's48')}<b>${name}${id === 'paint' ? NP : ''}</b><span class="ics" aria-hidden="true">${tradeIcs(prods)}</span><span class="pm" aria-hidden="true"></span></summary>
        <div class="tb">${chips(pts)}<div class="btns">${links.map(([n, h, x]) => `<a class="btn btn-sm btn-line" href="${h}"${x ? ` ${XA}` : ''}>${n}${x ? EXTI + SRNEW : ''}</a>`).join('')}${has ? `<button class="btn btn-sm" type="button" data-trade="${id}" data-label="${name}">Show products</button>` : ''}</div></div></details>`;
};
const EZEE_CARDS = [['hospitality', 'FrontDesk', 'Hotel management system'], ['chef', 'BurrP!', 'Restaurant software'], ['globe', 'Absolute', 'Hotel booking software'], ['cal', 'Reservation', 'Booking engine'], ['link', 'Centrix', 'Channel manager'], ['book', 'iMenu', 'Restaurant menu software'], ['star', 'iFeedback', 'Feedback system']];
const ezeeSection = () => `<section class="sec" id="ezee">
  <div class="wrap">
    <div class="ez" data-tone="navy">
      <div class="ez-h">
        <div class="ez-t">
          <p class="eyebrow">Authorized dealer</p>
          <h2>eZee hotel management software.</h2>
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
<section class="sec" id="directory">
  <div class="wrap">
    ${bento('p', true, btn('#ezee', 'eZee (authorized dealer)', 'btn-line btn-sm'))}
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

const P_H1 = { swastik: 'Swastik accounting software', myswastikonline: 'mySwastikonline cloud accounting', pos: 'Swastik POS software', restaurant: 'Swastik Restaurant POS', pharmasoft: 'Pharmasoft pharmaceutical software', avocare: 'Avocare hospital management software', bizant: 'Bizant field sales app' };
const productPage = p => {
  const rel = p.related.map(id => TBY[id]);
  const plate = `<div class="plate plate-w">${logo(p.id, `${p.name} logo`, false)}</div>`;
  const strengths = [...SHARED_STR, ...p.str];
  return `<header class="phero phero-dk phero-prod has-bg" data-tone="navy">${bgl(HB[p.id].src, { mode: 'dl', pos: HB[p.id].pos, flip: HB[p.id].flip, size: HB[p.id].size, hero: true })}
  <div class="wrap hp-grid">
    <div>
      <p class="eyebrow">${p.cat}</p>
      <h1>${P_H1[p.id]}</h1>
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
const banner = (src, pos = '50% 50%') => `<div class="pband" aria-hidden="true">${bgl(src, { mode: 'pb', pos })}</div>`;
const PHONE_TILES = [['cart', 'Sales'], ['card', 'Collection'], ['clock', 'Outstanding'], ['box', 'Stock']];
const phone = () => `<div class="phone" aria-hidden="true"><i class="ph-notch"></i><div class="ph-screen"><div class="ph-top">${logo('bizant')}</div><div class="ph-grid">${PHONE_TILES.map(([i, l]) => `<span>${ico(i, 's32')}<b>${l}</b></span>`).join('')}</div><div class="ph-bar"><i></i><i></i><i></i></div></div></div>`;
const APPS = [
  ['eye', 'Owner app', 'Bizant', 'Key reports on one screen. Authorise vouchers from your phone.'],
  ['route', 'Sales app', 'Bizant', 'Take orders, record collections and check in with GPS.'],
  ['cart', 'Customer app', 'Bizant', 'Order from your phone and see your outstanding.'],
  ['tivora', 'Work Desk', 'Tivora ERP', 'Approve and finish tasks wherever you are.'],
];
const mobileApps = () => `<section class="sec sec-paper" id="mobile-apps">
  <div class="wrap">
    ${head2('Mobile apps', 'Run your business from your phone.', 'Owner, sales and customer apps from Bizant, and the Tivora ERP Work Desk.')}
    <div class="apps">
      <div class="phone-wrap rv">${phone()}</div>
      <div class="app-cards stag">${APPS.map(([i, t, by, d]) => `<div class="app">${ico(i, 's48')}<p class="t-cat">${by}</p><h3>${t}</h3><p>${d}</p></div>`).join('')}</div>
    </div>
    <div class="btns">${xbtn(PBY.bizant.store, 'Get Bizant on Google Play')}<a class="btn btn-line" href="contact.html?interest=Mobile%20apps#demo" data-interest="Mobile apps">Request a demo</a></div>
    <p class="fine">mySwastikonline runs in the browser, on any device.</p>
  </div>
</section>`;
const SOL_NAV = SOL_MENU.map(([id, l]) => [id, l]);
const solutionsPage = () => `${phero({ bg: HB.solutions, eyebrow: 'Solutions', h1: 'Software, built your way.', lede: 'HiTech builds, customises and integrates software for businesses of every kind.', ctas: btn('contact.html#demo', 'Talk to HiTech') })}
<nav class="subnav" aria-label="On this page"><div class="wrap"><ul>${SOL_NAV.map(([id, l]) => `<li><a href="#${id}">${l}</a></li>`).join('')}</ul></div></nav>
${processSection()}
${banner('cafe-tablet', '50% 50%')}
${SOLS.map(([id, ic, t, l, c, b], i) => `<section class="sec${i % 2 ? '' : ' sec-paper'}" id="${id}">
  <div class="wrap sol-b">
    <div class="rv">${ico(ic, 's64')}<h2>${t}</h2><p class="lede">${l}</p>${b ? `<div class="btns">${b}</div>` : ''}</div>
    <div class="rv">${chips(c)}</div>
  </div>
</section>`).join('\n')}
${mobileApps()}
${demo({ e: 'Talk to HiTech', h: 'Got a new challenge for us?', l: 'Let\'s work together and create the next big thing.' })}`;

const servicesRedirect = () => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${SEO['services.html'][0]}</title>
<meta name="description" content="${SEO['services.html'][1]}">
<meta name="robots" content="noindex">
<meta name="geo.region" content="NP">
<meta property="og:locale" content="en_NP">
<meta property="og:title" content="${SEO['services.html'][0]}">
<meta property="og:description" content="${SEO['services.html'][1]}">
<meta http-equiv="refresh" content="0; url=solutions.html">
<link rel="canonical" href="${SITE_URL}/solutions.html">
</head>
<body>
<h1>This page has moved to <a href="solutions.html">Solutions</a>.</h1>
</body>
</html>
`;

/* ---------- PARTNERS ---------- */
const CA_CHIPS = ['truck|Landed cost by consignment', 'check|Consignment-wise import reconciliation', 'idcard|Customer and PAN-wise VAT report', 'vat|Monthly VAT reconciliation', 'doc|Anusuchi 10 and 13', 'sync|IRD API updates', 'mail|Customer account confirmation (IRD format)', 'tds|TDS report'];
const CA_CHIPS2 = ['layers|Multiple companies', 'layers|Merged reporting', 'lock|Auditors lock', 'log|Entry log and audit trail', 'cal|Nepali and English dates'];
const EDITIONS = [['swastik', 'Swastik'], ['gem', 'Swastik Gold'], ['pin', 'Swastik Nepal'], ['truck', 'Swastik Automobile'], ['layers', 'Swastik Textiles'], ['box', 'Swastik Wovensacks'], ['factory', 'Swastik Manufacturing'], ['box', 'Swastik Dairy'], ['tools', 'Swastik Service'], ['pharmasoft', 'Pharmasoft']];
const BENEFITS = [['target', 'Exclusive opportunity registration'], ['award', 'Partner recognition'], ['grad', 'Technical training'], ['headset', 'Technical support'], ['gift', 'Sales incentives'], ['star', 'Sales rewards'], ['link', 'Technical collaboration']];
const RESP = ['doc|Sign an MOU with HiTech', 'star|Recommend HiTech products', 'grad|Keep your team trained', 'users|Share prospects with HiTech early', 'sync|Share HiTech product updates'];
const PARTNER_HREF = 'partners.html#become-a-partner';
const PTYPES = ['Reseller', 'Distributor', 'Contractor'];
const partnerForm = () => `<section class="sec sec-paper" id="become-a-partner">
  <div class="wrap demo-grid">
    <div class="rv">
      <p class="eyebrow">Partner application</p>
      <h2>Become a partner.</h2>
      <p class="lede">Tell us about your business and the partnership you want.</p>
      <form class="form" data-lead data-source="partner">
        <div class="fld"><label for="pa-name">Full name</label><input id="pa-name" name="name" type="text" autocomplete="name" required></div>
        <div class="fld"><label for="pa-co">Business or company name</label><input id="pa-co" name="company" type="text" autocomplete="organization" required></div>
        <div class="fld"><label for="pa-phone">Phone</label><input id="pa-phone" name="mobile" type="tel" autocomplete="tel" required></div>
        <div class="fld"><label for="pa-email">Email (optional)</label><input id="pa-email" name="email" type="email" autocomplete="email"></div>
        <div class="fld"><label for="pa-city">City</label><input id="pa-city" name="city" type="text" autocomplete="address-level2" required></div>
        <fieldset class="fld rads"><legend>Type of partnership</legend><div>${PTYPES.map((t, i) => `<label class="rad"><input type="radio" name="partnerType" value="${t}"${i === 0 ? ' required' : ''}><span>${t}</span></label>`).join('')}</div></fieldset>
        <div class="fld full"><label for="pa-biz">Your current line of business</label><input id="pa-biz" name="business" type="text" required></div>
        <div class="fld full"><label for="pa-msg">Message (optional)</label><textarea id="pa-msg" name="message" rows="3"></textarea></div>
        <input type="hidden" name="inquiry" value="Partner application">
        ${HPOT}
        <div class="fld full">${WA_BTN}</div>
        <p class="form-note full">${WA_NOTE}</p>
        <p class="form-ok full" role="status" hidden></p>
      </form>
    </div>
    <aside class="rv ppitch" data-tone="navy">${ico("lock", "s48")}<h3>Partner terms are shared after a conversation.</h3><p>HiTech contacts you after you apply, and we talk on WhatsApp or phone.</p></aside>
  </div>
</section>`;
const PT = [['Reseller', 'Apply as a reseller of HiTech products.', 'Apply as a reseller'], ['Distributor', 'Apply as a distributor of HiTech products.', 'Apply as a distributor'], ['Contractor', 'Apply as a contractor with HiTech.', 'Apply as a contractor']];
const PBEN = ['Exclusive opportunity registration', 'Technical training', 'Technical support', 'Sales incentives'];
const PSTATS = [[28, '+', 'Years'], [10000, '+', 'Clients'], [NBR, '', 'Branches'], [100, '+', 'Team members'], [PARTNER_PINS.length, '', 'Partner cities']];
const PSTEPS = [['doc', 'Fill the application', 'Type, business and contact.'], ['headset', 'HiTech contacts you', ''], ['phone', 'Discussion on WhatsApp or phone', '']];
const ptabs = () => `<div class="ptabs" data-ptabs>
        <div class="pt-list" role="tablist" aria-label="Type of partnership">${PT.map(([t], i) => `<button type="button" role="tab" id="pt-t${i}" aria-controls="pt-p${i}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}">${t}</button>`).join('')}<i class="pt-ind" aria-hidden="true"></i></div>
        ${PT.map(([t, s, b], i) => `<div class="pt-panel" role="tabpanel" id="pt-p${i}" aria-labelledby="pt-t${i}"><p class="pt-h">${t}</p><p class="pt-s">${s}</p><a class="btn" href="${PARTNER_HREF}" data-ptype="${t}">${b}</a></div>`).join('')}
      </div>`;
const pflow = () => `<div class="pflow dg wrap">
    <div class="pf-row">
      <div class="pf-n pf-you" style="--k:0">${ico('users', 's48')}<span><b>You</b><small data-pf-label>Reseller, Distributor or Contractor</small></span></div><i class="pf-l" aria-hidden="true"></i>
      <div class="pf-n" style="--k:1"><span class="pf-lg"><img src="${IMG}icon.png" alt="" width="234" height="226"></span><span><b>HiTech products</b></span></div><i class="pf-l" aria-hidden="true"></i>
      <div class="pf-n" style="--k:2">${ico('store', 's48')}<span><b>Customers across Nepal</b></span></div>
    </div>
    <ul class="pf-cities" aria-label="Partner cities">${PARTNER_PINS.map((k, i) => `<li style="--k:${i + 3}">${MAP.pins[k].name}</li>`).join('')}</ul>
  </div>`;
const partnersPage = () => `<header class="phero phero-dk has-bg" data-tone="navy">${bgl(HB.partners.src, { mode: 'dl', pos: HB.partners.pos, hero: true })}
  <div class="wrap hp-grid">
    <div>
      <p class="eyebrow">Partners</p>
      <h1>Let's connect and grow together.</h1>
      <p class="lede">For chartered accountants, auditors, resellers and distributors who work with Nepali businesses every day.</p>
      <div class="btns">${btn('#ca', 'For CAs and auditors')}${btn(PARTNER_HREF, 'Become a partner', 'btn-line-w')}</div>
    </div>
    ${ptabs()}
  </div>
  ${pflow()}
</header>
<section class="sec" id="partner">
  <div class="wrap">
    ${head2('Partner Connect', 'Why partner with HiTech.', 'Resell HiTech software with training, support and rewards behind you.')}
    <h3 class="gh">Priority partner benefits</h3>
    <div class="icards sm stag">${PBEN.map(l => { const [i] = BENEFITS.find(b => b[1] === l); return `<div class="icard">${ico(i, 's48')}<h3>${l}</h3></div>`; }).join('')}</div>
  </div>
</section>
<section class="sec sec-navy pst-band" data-tone="navy" aria-label="HiTech at a glance">
  <div class="wrap"><dl class="pst stag">${PSTATS.map(([n, s, l]) => `<div><dd data-count="${n}"${s ? ` data-suffix="${s}"` : ''}>${n.toLocaleString('en-US')}${s}</dd><dt>${l}</dt></div>`).join('')}</dl></div>
</section>
<section class="sec sec-paper">
  <div class="wrap">
    ${head2('Partner responsibilities', 'What you bring.')}
    ${chips(RESP, 'stag')}
  </div>
</section>
<section class="sec" id="ca">
  <div class="wrap">
    ${head2('For CAs and auditors', 'Products you will offer.')}
    <ul class="plogos stag">${PRODUCTS.map(p => `<li><a href="${phref(p)}">${logo(p.id)}<b>${p.name}</b></a></li>`).join('')}</ul>
    <h3 class="gh">Built for the people who check the books.</h3>
    <p class="gl">These are Swastik features, and Swastik is IRD certified.</p>
    ${chips(CA_CHIPS, 'stag')}
  </div>
</section>
<section class="sec sec-paper" id="network">
  <div class="wrap">
    <div class="sec-head"><div><p class="eyebrow">Channel partners</p><h2>Partners across 12 cities.</h2></div><p class="lede"><span class="bignum">12</span> cities</p></div>
    ${nepalMap(PARTNER_PINS.map(k => [k, MAP.pins[k].name]), 'nm-p')}
  </div>
</section>
<section class="sec" id="how-to-apply">
  <div class="wrap">
    ${head2('How to apply', 'Three simple steps.')}
    <ol class="psteps dg">${PSTEPS.map(([i, t, s], k) => `<li class="ps" style="--k:${k}">${ico(i, 's48')}<small>Step ${k + 1}</small><h3>${t}</h3>${s ? `<p>${s}</p>` : ''}</li>`).join('')}</ol>
  </div>
</section>
${partnerForm()}
<section class="sec">
  <div class="wrap"><div class="pcta" data-tone="navy"><h2>Talk to HiTech on WhatsApp.</h2><a class="btn btn-wh" href="${WA_URL}" ${XA}>Chat on WhatsApp${SRNEW}</a></div></div>
</section>`;

/* ---------- ABOUT ---------- */
const aboutPage = () => `${phero({ bg: HB.about, eyebrow: 'About HiTech', h1: 'Managing business in Nepal since 1998.', lede: 'HiTech serves small businesses, chartered accountants, retailers, corporates, stores, restaurants and cafes across Nepal.', ctas: btn('contact.html#demo', 'Request a demo') })}
<section class="sec sec-navy" data-tone="navy" aria-label="HiTech at a glance" style="padding-block:clamp(48px,6vw,80px)">
  <div class="wrap stats stag">
    <div><b data-count="10000" data-suffix="+">10,000+</b><span>Clients</span></div>
    <div><b data-count="28" data-suffix="+">28+</b><span>Years</span></div>
    <div><b data-count="100" data-suffix="+">100+</b><span>Professionals</span></div>
    <div><b data-count="${NBR}">${NBR}</b><span>Branches</span></div>
  </div>
</section>
${banner('kathmandu-street', '50% 58%')}
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
${demo({ e: 'Request a call', h: 'Tell us what you need.', l: 'Choose Request a call or Training demo and the right team will reply.' })}`;

/* ---------- CAREERS ---------- */
/* one entry per open position: add a line here and the list and the chooser both pick it up */
const POSITIONS = [
  ['Technical Product Engineer', 'https://recruit.tradeila.com/jobs/Careers/204337000001066014/Technical-Product-Engineer?source=CareerSite'],
  ['Full Stack Developer', 'https://recruit.tradeila.com/jobs/Careers/204337000001017280/Full-Stack-Developer?source=CareerSite'],
];
const cvChooser = () => `<div class="lead-pop cv-pop" id="cvPop" role="dialog" aria-modal="true" aria-labelledby="cv-h" hidden>
  <div class="lp-ov" data-cv-close></div>
  <div class="lp-card cv-card" tabindex="-1">
    <button class="lp-x" type="button" aria-label="Close" data-cv-close><svg viewBox="0 0 20 20" aria-hidden="true" focusable="false"><path d="M4 4l12 12M16 4L4 16"/></svg></button>
    <h2 id="cv-h">Which position are you applying for?</h2>
    <ul class="cv-list">${POSITIONS.map(([t, u]) => `<li><a class="cv-opt" href="${u}" ${XA}><b>${t}</b><span>Open the application form${EXTI}${SRNEW}</span></a></li>`).join('')}</ul>
  </div>
</div>`;
const careersPage = () => `${phero({ bg: HB.careers, eyebrow: 'Careers', h1: 'Build business software in Nepal.', lede: 'See our open positions and apply online.', ctas: btn('#positions', 'Send your CV').replace('<a ', '<a data-cv ') })}
${banner('devspace', '50% 45%')}
<section class="sec" id="positions">
  <div class="wrap">
    ${head2('Open positions', 'Roles at HiTech.')}
    <ul class="pos-list stag">${POSITIONS.map(([t, u]) => `<li><h3>${t}</h3>${xbtn(u, 'Apply', 'btn-sm')}</li>`).join('')}</ul>
    <p class="more">${btn('#positions', 'Send your CV').replace('<a ', '<a data-cv ')}</p>
  </div>
</section>
${cvChooser()}`;

/* ---------- CONTACT / 404 ---------- */
const contactPage = () => `${phero({ bg: HB.contact, eyebrow: 'Contact', h1: 'Talk to HiTech.', lede: 'Ask for a demo, a quote or a call back.' })}
${demo({ e: 'Contact HiTech', h: 'Tell us about your business.', l: 'Or tell us what you need built.' }).replace('<section class="sec sec-paper" id="demo">', '<section class="sec" id="demo">')}`;
const p404 = () => `${phero({ eyebrow: 'Page not found', h1: 'That page is not here.', lede: 'These pages will get you back on track.', ctas: btn('index.html', 'Go to the home page') + btn('contact.html', 'Contact us', 'btn-line') })}
<section class="sec" style="padding-top:0"><div class="wrap"><ul class="wall">${[[TIVORA_URL, 'Tivora ERP', 1], ['products.html', 'Products'], ['solutions.html', 'Solutions'], ['partners.html', 'Partners'], ['about.html', 'About HiTech'], ['support.html', 'Support']].map(([h, t, x]) => `<li><a href="${h}"${x ? ` ${XA}` : ''}>${t}${x ? SRNEW : ''}</a></li>`).join('')}</ul></div></section>`;

/* ---------- SEO: one title (max 60) and description (max 155) per page, checked below ---------- */
const SEO = {
  'index.html': ['Accounting Software Nepal | IRD Certified Billing | HiTech', 'Business software company in Kathmandu with 28+ years of experience: IRD certified accounting, VAT billing and ERP software for Nepal.'],
  'tivora.html': ['Tivora ERP | ERP Software Nepal | HiTech', 'Tivora ERP tells you what comes next: one database, My Work Desk, Executive Dashboard and IRD connected billing.'],
  'products.html': ['Business Software Nepal | Accounting, POS, ERP | HiTech', 'Accounting, inventory management, POS, restaurant, pharmaceutical and hospital software from HiTech, plus eZee hotel management software.'],
  'product-swastik.html': ['Swastik Accounting Software Nepal | IRD Certified | HiTech', 'Swastik accounting software for Nepal: IRD certified VAT billing, inventory, Bikram Sambat (BS) dates and 500+ reports. By HiTech, Kathmandu.'],
  'product-myswastikonline.html': ['Cloud Accounting Software Nepal | mySwastikonline | HiTech', 'mySwastikonline is IRD certified cloud accounting software for Nepal: invoicing, inventory and VAT reports from any device. By HiTech, Kathmandu.'],
  'product-pos.html': ['POS Software Nepal | Swastik POS Billing | HiTech', 'Swastik POS is IRD certified POS software for Nepal: fast counter billing, barcode, VAT reports and accounting for departmental stores.'],
  'product-restaurant.html': ['Restaurant POS Software Nepal | Swastik Restaurant | HiTech', 'Swastik Restaurant is touch-screen restaurant POS software for Nepal: live table status, kitchen display, takeaway and delivery, with accounting.'],
  'product-pharmasoft.html': ['Pharmaceutical Software Nepal | Pharmasoft | HiTech', 'Pharmasoft is pharmaceutical management software for Nepal: batch and expiry, invoicing, inventory and accounting, in single-user and network versions.'],
  'product-avocare.html': ['Hospital Management Software Nepal | Avocare | HiTech', 'Avocare is web-based hospital management software for Nepal: online registration, appointments, OP and IP, lab, blood bank and mobile apps.'],
  'product-bizant.html': ['Bizant Field Sales App | Sales and Distribution | HiTech', 'Bizant is a mobile sales force automation app for Nepal: orders, collection and GPS check-in for field agents, plus owner and customer apps.'],
  'solutions.html': ['Custom Software and Mobile Apps Nepal | HiTech Solutions', 'HiTech builds ERP, custom software, mobile apps and B2B and B2C e-commerce for businesses in Nepal, as contract or collaborative projects.'],
  'partners.html': ['Reseller and Distributor Partner Program Nepal | HiTech', 'Become a HiTech reseller, distributor or contractor partner in Nepal, or use Swastik as a chartered accountant. Apply online.'],
  'about.html': ['About HiTech | Managing Business in Nepal Since 1998', `HiTech, a business software company in Kathmandu, has served Nepal since 1998: 28+ years of experience, 100+ professionals and ${NBR} branches.`],
  'support.html': ['Software Support Nepal | Phone, Remote, Branches | HiTech', 'Phone, email and remote support for HiTech software, with branch cities across Nepal. Call Kathmandu support or request a call back.'],
  'careers.html': ['Software Jobs in Kathmandu | Careers at HiTech', 'Software jobs in Kathmandu: Technical Product Engineer and Full Stack Developer openings at HiTech. Choose a position and apply online.'],
  'contact.html': ['Contact HiTech | Business Software Company in Kathmandu', 'Contact HiTech in Kalimati, Kathmandu for a demo, quote or call back. Office, sales and support numbers, email and WhatsApp.'],
  '404.html': ['Page Not Found | HiTech Solutions and Services', 'This page could not be found. Go back to the HiTech home page or browse products, solutions, partners and support.'],
  'services.html': ['Moved to Solutions | HiTech Solutions and Services', 'This page has moved to Solutions: ERP, custom software, mobile apps and e-commerce from HiTech.'],
};
{
  const seen = new Set();
  for (const [f, [t, d]] of Object.entries(SEO)) {
    if (t.length > 60) throw new Error(`title too long (${t.length}) ${f}`);
    if (d.length > 155) throw new Error(`description too long (${d.length}) ${f}`);
    if (seen.has(t) || seen.has(d)) throw new Error('duplicate title or description ' + f);
    seen.add(t); seen.add(d);
  }
}
const OS = { swastik: 'Windows', myswastikonline: 'Web browser', pos: 'Windows', restaurant: 'Windows', pharmasoft: 'Windows', avocare: 'Web browser', bizant: 'Android' };
const softApp = (p, file) => ({ '@type': 'SoftwareApplication', name: p.name, description: p.desc, url: `${SITE_URL}/${file}`, image: `${SITE_URL}/${IMG}logos/${p.id}.png`, applicationCategory: 'BusinessApplication', operatingSystem: OS[p.id], ...(p.store ? { installUrl: p.store } : {}), publisher: { '@id': `${SITE_URL}/#organization` } });

/* ---------- write everything ---------- */
const pages = [];
const add = (file, body, org, inMap = true) => { render({ file, title: SEO[file][0], desc: SEO[file][1], body, org }); if (inMap) pages.push(file); };
LDX['index.html'] = [WEBSITE, { '@type': 'FAQPage', mainEntity: FAQS.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) }];
LDX['tivora.html'] = [{ '@type': 'SoftwareApplication', name: 'Tivora ERP', description: SEO['tivora.html'][1], url: TIVORA_URL, applicationCategory: 'BusinessApplication', operatingSystem: 'Web browser', publisher: { '@id': `${SITE_URL}/#organization` } }];
for (const p of PRODUCTS) LDX[phref(p)] = [softApp(p, phref(p))];
add('index.html', home(), true);
add('tivora.html', tivoraPage(), false, false);
add('products.html', productsPage());
for (const p of PRODUCTS) PROD[phref(p)] = p.name;
for (const p of PRODUCTS) add(phref(p), productPage(p));
add('solutions.html', solutionsPage());
add('partners.html', partnersPage());
add('about.html', aboutPage(), true);
add('support.html', supportPage());
add('careers.html', careersPage());
add('contact.html', contactPage(), true);
render({ file: '404.html', title: SEO['404.html'][0], desc: SEO['404.html'][1], body: p404(), noindex: true });
out('services.html', servicesRedirect());

const LASTMOD = process.env.LASTMOD || new Date().toISOString().slice(0, 10);
out('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.map(p => `  <url><loc>${SITE_URL}/${p === 'index.html' ? '' : p}</loc><lastmod>${LASTMOD}</lastmod></url>`).join('\n')}\n</urlset>\n`);
out('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);
console.log(`built ${pages.length + 2} pages`);
