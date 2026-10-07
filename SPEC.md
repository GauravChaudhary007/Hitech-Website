# HiTech website v2 — design and build specification

Owner: CEO, HiTech Solutions and Services Pvt. Ltd. Design and plan: Opus. Build: Sonnet.
Status: approved for build. This is a new site built from scratch in `hitech-site/`. Do **not** modify `hitech-cinematic/` (the previous design); read it only as a content source.

---

## 1. The brief in one paragraph

A visitor should understand within one screen that **HiTech is an ERP company that also sells a family of business software**. **Tivora ERP** (new, launching soon) is the flagship and gets the spotlight, but the rest of the suite (Swastik, mySwastikonline, Swastik POS, Swastik Restaurant, Pharmasoft, Avocare, Gurukul, Bizant, HiTech Payroll, HiTech Smartsuite) must be visible on the first screen and never feel like an afterthought. Reference pattern: Zoho (flagship spotlight + suite grid), Odoo (apps as one icon family), Tally (local trust, compliance front and centre). The quality bar is a $10,000 agency site: precise, calm, fast, motion that has a purpose.

**Design concept: "One core, every trade."** Tivora ERP is drawn as the core; the suite orbits it. This idea repeats visually: an orbit in the hero, a bento with Tivora as the anchor tile, and a navy "core" band where Tivora's real screens play.

---

## 2. Hard rules (non-negotiable)

1. **Only Tivora ERP's UI may appear.** Use screenshots from `hitech-cinematic/assets/tivora/` and the launch video only. Every other product is represented by its **line icon** (section 6.4), name, category and text. No placeholder "fake UI" screens. No old Swastik/POS screenshots.
2. **Brand guideline v1.0** (`HiTech_Marketing_Assets_2026-09-23 2/Brand_Kit/Hitech_Brand_Guidelines.pdf`):
   - Colours: Navy `#000059`, Grey `#7B7B7B`, Signal Cyan `#009AD4`, Deep Indigo `#0B20D6`, White. Website base is navy + white. Cyan→Indigo gradient only on the logo, primary CTA buttons and small accents (icon strokes, 2–3px bars). Never behind large text. No glow blurs, no purple.
   - Type: **Poppins only**, weights 400 / 600 / 700. Tabular figures for numbers.
   - Logo from master files only (`hitech-cinematic/assets/brand/`): `logo-light.png` on light, `logo-dark.png` on dark, `icon.png` for favicon/small. Never recolour, rotate, shadow.
   - Captions/fine print use `#6E6E6E` (Hitech Grey one step deeper, passes AA). Body copy on light is navy.
   - Spell the company **HiTech** in text.
3. **Claims** (from `assests/Tivora ERP Website Brief.html`):
   - Tivora ERP: say "built to IRD's current formats" / "CBMS-ready". **Never** "IRD certified" or "government approved" for Tivora. No prices, discounts or free trial. No mobile app claim for Tivora. Every Tivora product is "Launching soon". No launch date.
   - Swastik's "IRD certified" comes from HiTech's live site and may stay on Swastik only.
   - Company figures (only these): **10,000+ clients, 25+ years, 100+ professionals, 15+ branches**, since **1998**.
   - Don't invent features, customers, metrics or quotes. All copy must trace to the content source (section 9).
4. **HiTech ERP (IMS) is discontinued on the site.** Do not mention it anywhere.
5. Product naming: **Tivora ERP** = the platform. **Alanza** = jewelry product on Tivora. **Paint** and **Trading** are working names; mark each place with `<!-- NAME PENDING -->`.
6. Must work **double-clicked from disk (file://)** and on a static host. No build step needed to view; no CDN JS; no frameworks. Fonts from Google Fonts (Poppins) are the only external request.
7. Copy style: plain, grounded, no hype. Zero em dashes and zero en dashes in visible copy. Avoid: leverage, seamless, empower, unlock, robust, actionable, data-driven, testament, landscape, delve, elevate, guarantee, revolutionary, world-class, cutting-edge.

---

## 3. Technical architecture

```
hitech-site/
  SPEC.md                 (this file)
  _build/build.mjs        zero-dependency Node script; all content + templates; writes the pages below
  index.html, tivora.html, alanza.html, plans.html, security.html,
  products.html, product-*.html (8), solutions.html, services.html,
  clients.html, about.html, support.html, careers.html, contact.html, 404.html
  sitemap.xml, robots.txt
  assets/
    css/site.css          one stylesheet, tokens at the top
    js/site.js            one script, vanilla, progressive enhancement
    img/                  copied: Tivora screens, poster, brand logos
    video/tivora-launch.mp4
```

- `node _build/build.mjs` regenerates all HTML. Generated HTML is committed output (readable, indented).
- Copy the needed assets from `hitech-cinematic/assets/` into `hitech-site/assets/`. Nothing else.
- Every page: `<title>`, meta description, Open Graph tags with `DEPLOY_URL` placeholder, canonical, one `h1`, Organization JSON-LD on home/about/contact, `lang="en"`.
- `<html class="no-js">` swapped to `js` by an inline head script. Hidden-until-revealed states only apply under `.js`. Reduced motion: everything is visible and static.
- Performance: images `loading="lazy"` below the fold with width/height set; video `preload="metadata"`, muted, autoplay, loop, playsinline, poster; total JS under 15 KB unminified.
- Accessibility: skip link, visible focus ring (3px cyan), menus keyboard operable (`<button aria-expanded>`), tab interfaces with proper roles, contrast AA everywhere, alt text on every Tivora screenshot, icons `aria-hidden`.

---

## 4. Information architecture

**Top bar (announcement):** "Tivora ERP, our new platform, is launching soon." → link "See Tivora ERP".

**Main nav (sticky, white, 72px; turns navy over dark sections):**
Logo · **Tivora ERP** (mega: Overview, Alanza for jewelry, Plans, Security and hosting) · **Products** (mega: 3 columns by category with icons, plus a featured Tivora card on the right) · **Solutions** · **Services** · **Company** (About, Clients, Careers) · **Support** · right: "Contact" text link + **Request a demo** (gradient button).
Mobile: logo + "Demo" button + menu button opening a full-height panel with accordions.

**Footer (navy):** logo + address + social · columns: Tivora ERP · Products · Solutions · Company · Contact (phones, emails) · bottom bar: © year, "Tivora ERP screens use a demo company."

---

## 5. Page designs

### 5.1 Home (`index.html`)

1. **Hero** (white, ~100vh on desktop)
   - Left column (5/12): eyebrow "ERP and business software · Kathmandu, since 1998"; **h1: "The software Nepal's businesses run on."**; lede: "Tivora ERP, our new platform, brings sales, purchase, stock, production and accounts into one system. Around it, the HiTech suite runs accounting, retail, restaurants, pharmacies, hospitals, schools and field sales."; buttons **Request a demo** (gradient) + **Explore Tivora ERP** (outline); proof row: 10,000+ clients · 25+ years · 15+ branches (tabular, count up).
   - Right column (7/12): **the orbit.** A laptop frame (pure CSS) playing the Tivora launch video sits at the centre. Around it, an elliptical orbit ring (1px line) carries the 10 suite icon chips, slowly rotating (60s per turn; chips counter-rotate to stay upright). Hovering a chip pauses the orbit and shows a tooltip card (name + category). A "Tivora ERP · Launching soon" label pinned to the laptop. On mobile the orbit becomes a 5×2 icon grid under the laptop.
2. **Client marquee**: "Trusted by 10,000+ businesses across Nepal" + an infinitely scrolling row of client names as wordmarks (text chips, from the clients list). Pauses on hover.
3. **The HiTech suite** (bento directory). Heading left "One vendor. Every part of the business." / lede right. Category tabs (All · Accounting and ERP · Retail and hospitality · Healthcare and education · Field and mobile).
   Bento grid: **Tivora ERP tile spans 2×2** (navy, real dashboard screenshot cropped in the tile, "Launching soon" pill, link to tivora.html). Remaining tiles: icon, name, category, one-liner, delivery badge where known (Swastik: Desktop · mySwastikonline: Cloud · Swastik POS: Desktop · Swastik Restaurant: Touch desktop · Pharmasoft: Desktop · Avocare: Web · Bizant: Android). Payroll and Smartsuite tiles say "Ask us". Filtering animates tiles (FLIP or fade/scale).
4. **Tivora ERP core** (navy band, the main motion moment). Sticky scrollytelling, desktop: left column scrolls 4 steps, right column a sticky laptop whose screen crossfades to the matching Tivora screenshot as each step becomes active, with a progress rail of 4 ticks.
   Steps: (1) "Books your auditor accepts" (dashboards.jpg) (2) "Stock that adds up" (home-paint.jpg) (3) "Built one trade at a time": Alanza, Paint, Trading pills (home-jewelry.jpg) (4) "Nepal built in" (sales-dash.jpg). Mobile: each step stacks with its own image.
   Below: trade packs row: Alanza (live link), Paint, Trading (Launching soon), then FMCG, Automobile, Home appliances, Pharma (Coming later, muted).
5. **Built for Nepal** strip (white): 4 items with icons: Bikram Sambat dates · 13% VAT and Annex 9/13 · TDS · CBMS e-invoicing. Show a document number `SI-2083/84-00001` that "types" on reveal. Fine print: "Tivora ERP is built to IRD's current formats and is CBMS-ready. IRD's certification process has not been completed yet; ask us for its current status."
6. **Solutions by trade**: two-column. Left sticky heading. Right numbered list (01–12) of trades; hovering/focusing a row highlights the icons of the products that serve it (icon row on each list item).
7. **Why HiTech**: asymmetric bento: big navy stat tile (10,000+ clients, with 25+ / 100+ / 15+ underneath), "Built in Nepal, for Nepal", "One vendor, every trade", "Support that stays" (14 city chips).
8. **Services**: 4 cards in a 1 large + 3 layout: ERP implementation (anchor, links to Tivora), Application software, Customized software, E-commerce.
9. **Customer voices**: one large quote with two smaller ones (verbatim, section 9).
10. **Plans teaser**: split band: "A price that fits your business." + "We quote after a short conversation…" + buttons See the plans / Ask for a quote.
11. **FAQ** accordion (Tivora FAQ from the brief, 6 items).
12. **Demo form** + contact card (section 7).

### 5.2 Tivora ERP (`tivora.html`)
Navy hero with the launch video in the laptop frame (full width under the heading); "What is Tivora ERP?" (the two paragraphs); feature modules grid (Sales, Purchase, Stock, Accounts, Import and trade finance, Reports); the three dashboards as a horizontal snap-scroll gallery of real screenshots; Built for Nepal section (merge the old nepal page); trade packs; FAQ; demo form.

### 5.3 Alanza (`alanza.html`)
Hero "Your gold is accounted for, every gram of it." with jewelry home screen in laptop frame; three columns: In the showroom / In the workshop / When you grow; plans link; demo form.

### 5.4 Plans (`plans.html`) and Security (`security.html`)
Plans: the Alanza Standard/Business/Enterprise table verbatim from the brief, sticky table header, "Ask for a quote" in each column, add-ons list. Security: copy from the brief as a 5-point list with icons.

### 5.5 Products directory (`products.html`) and 8 product pages
Directory: filterable grid (same tiles as home bento) plus a "Hospitality partner software" section (eZee suite and Appytect, clearly labelled as partner products).
Product page template (`product-swastik.html`, `product-myswastikonline.html`, `product-pos.html`, `product-restaurant.html`, `product-pharmasoft.html`, `product-avocare.html`, `product-gurukul.html`, `product-bizant.html`):
navy hero with the large product icon (or the Bizant logo) on a square plate, category, name, tagline, description, delivery badge, CTA; sticky in-page sub-nav of feature groups; feature groups as 2-column cards; "Related products" (2–3 tiles in the same category). Do not claim integrations between products unless the content source states them (Swastik POS and Swastik Restaurant connect to Swastik accounting; nothing else). Close with the demo form.

### 5.6 Solutions, Services, Clients, About, Support, Careers, Contact, 404
Reuse existing content (section 9) in the new components. Clients: all 34 names in a typographic wall + quotes. Support: branch phone table. Careers: 4 roles + benefits. Contact: form + all numbers. 404: short message + links.

---

## 6. Design system

### 6.1 Tokens
```
--navy #000059   --navy-900 #00003A   --grey #7B7B7B   --caption #6E6E6E
--cyan #009AD4   --indigo #0B20D6     --white #FFF
--paper #F5F5F5 (grey 7%)   --tint #EBF7FC (cyan 8%)   --tint-2 #D1EDF7
--line #E5E5E5   --line-2 #CACACA   --on-navy rgba(255,255,255,.8)   --navy-line rgba(255,255,255,.14)
--grad linear-gradient(90deg,#009AD4 -40%,#0B20D6 72%)
--radius 16px (cards) / 24px (bands, tiles) / 999px (pills)
--ease cubic-bezier(.2,.8,.2,1)
```

### 6.2 Type scale (Poppins, 8px baseline)
Display (h1): clamp(40px,6vw,80px)/1.05, 700, tracking −0.035em · H2: clamp(32px,4.2vw,56px)/1.1, 600, −0.025em · H3: 24/32 600 · H4: 20/28 600 · Lede: 18/28 400 · Body 16/24 · Small 14/20 · Eyebrow 12/16 600 uppercase +0.16em (cyan on navy, indigo on white).

### 6.3 Layout
12-column grid, max 1200px, 24px gutter (16px on phones). Section padding clamp(64px,9vw,120px). All spacing values multiples of 4 (≤16) or 8 (>16). Section heads asymmetric: heading 7 cols left, lede 5 cols right aligned to the heading's baseline.

### 6.4 Product icons
Reuse the line-icon set already designed in `scratchpad/build-site.mjs` (constant `ICON`, keys: tivora, swastik, myswastikonline, pos, restaurant, pharmasoft, avocare, gurukul, bizant, payroll, smartsuite, hospitality). 48×48 viewBox, stroke 2.4, stroke = gradient `url(#lineGrad)` on light, cyan on navy, inside a rounded-square plate (tint on light, white 8% on navy). Sizes 40 / 48 / 96.

### 6.5 Components
Buttons (primary gradient, outline navy, outline white; 48px tall, 12px radius) · pill/badge · icon plate · product tile · bento tile (light/navy) · laptop frame (CSS: lid with bezel + camera dot, base wedge; screen slot) · tab bar · accordion · numbered list row · stat · quote · form fields (labels above, 48px inputs, focus ring) · mega menu · marquee.

### 6.6 Motion (vanilla JS, all disabled under prefers-reduced-motion)
- Section reveals: IntersectionObserver, fade + 24px rise, children staggered 60ms.
- Headings (h1/h2): word-by-word rise (mask), once.
- Hero orbit: CSS keyframe rotation; pause on hover/focus and when tab hidden.
- Count-ups on stats, 1.4s ease-out, once.
- Tivora core: sticky scrollytelling, image crossfade + slight scale (1.02→1), progress rail fill.
- Bento filter: tiles animate in/out (opacity + scale, 300ms).
- Marquee: CSS translate loop.
- Header: hides on scroll down, shows on scroll up; navy theme when over a `[data-theme=dark]` section.
- Buttons: 2px lift on hover. No glow, no parallax on text.

---

## 7. Forms
One demo/inquiry form component. Fields: Name, Company, Mobile, Email (optional), City, Inquiry for (Request a demo / Sales support / Channel partner query / Request a call / Training demo / Career), Interested in (Tivora ERP: Alanza / Paint / Trading, Swastik, mySwastikonline, Swastik POS, Swastik Restaurant, Pharmasoft, Avocare, Gurukul, Bizant, HiTech Payroll, HiTech Smartsuite, Custom software / ERP / e-commerce, Not sure yet), Message. Native validation. Submit composes a `mailto:info@hitechnepal.com.np` with subject "<Inquiry for> from <Company>" and all fields in the body, shows a status note. Note under the button: "This opens your email app with the request ready to send. Nothing is stored on this page."

---

## 8. Quality checklist (the build is done only when all pass)
- Every page loads with zero console errors at 1440×900 and 390×844, over file:// and http.
- No horizontal scroll at 360px.
- Automated contrast scan: zero AA failures. Only Poppins rendered. Only brand colours in text.
- No image or screen of any product other than Tivora ERP. grep: no `shot-` files, no placeholder UI.
- Copy gate: no em/en dashes, none of the banned words, no "HiTech ERP", no "IRD certified" near Tivora.
- Reduced motion: all content visible, no animation.
- Keyboard: every menu, tab, accordion and form reachable and operable.
- Screenshots of every page saved to `hitech-review/v2/` for review.

## 9. Content sources (single source of truth)
- **`C:\Users\GAURAV~1\AppData\Local\Temp\claude\C--Users-Gaurav-Chaudhary-Documents-Hitech-Website\f792dfe5-1ed3-4f60-bf72-e423b0405f0f\scratchpad\build-site.mjs`**: all approved copy. Constants: `PRODUCTS` (descriptions, taglines, feature groups for 8 products), `SOLUTIONS` and `SOL` (12 trades), `SERVICES`, `QUOTE_DATA` (verbatim quotes), `ALL_CLIENTS` (34 names), `CITIES`, `WHAT1`/`WHAT2` (Tivora intro), the plans table, FAQ, support branch phone table, careers roles, contact details, `HOSPITALITY`, `ICON`. Ignore its layout/markup; take only words and data.
- `C:\Users\Gaurav Chaudhary\Documents\Hitech Website\assests\Tivora ERP Website Brief.html`: Tivora copy and claim rules.
- Tivora assets: `hitech-cinematic/assets/tivora/` (dashboards.jpg, exec-dash.jpg, home-jewelry.jpg, home-paint.jpg, sales-dash.jpg, menu-classic.jpg, menu-jewelry.jpg, tivora-launch.mp4, tivora-launch-poster.jpg). Brand: `hitech-cinematic/assets/brand/`.


---

## 10. Revision 2 (CEO feedback, 4 Oct 2026). Overrides earlier sections where they conflict.

CEO feedback: (a) the website is "a big blob of text"; make it visual so the visitor does not have to read much; (b) the page titled Services should be **Solutions**, and the page currently titled Solutions should be **Products**; (c) add a page for **CA information, partnership information and everything** related.

### 10.1 Visual-first rewrite: word budgets (hard limits, every page)
| Element | Limit |
|---|---|
| Eyebrow | 4 words |
| H1 / H2 | 8 words |
| Lede under a heading | 1 sentence, max 20 words |
| Card / tile text | 1 line, max 12 words |
| Feature item | 2 to 5 words, always with an icon |
| Paragraphs | none longer than 2 sentences anywhere; prefer none |

Rules:
- **Turn every list into an icon grid.** Every feature group, benefit, Nepal item, security point and partner benefit becomes a grid of icon + short label chips/cards. No bulleted text lists on any page (exceptions: the plans table and careers requirements, kept compact).
- **Product pages:** cut the description to one sentence. Show features as grouped icon chips (group heading + 3 to 6 chips). Condense long source features to the shortest true label (e.g. "Drill down from almost any report to the source voucher" becomes "Drill-down to voucher"). Never add a feature that is not in the source.
- **Numbers over words:** large numerals wherever a fact is a number (10,000+, 25+, 100+, 15+, 14 cities, 13% VAT, 3 plans).
- **Visual explainers instead of text** (pure HTML/CSS/SVG, brand colours, animated on reveal, static under reduced motion):
  1. **"How we work" 4-step process** on Home and Solutions: Understand, Recommend, Implement, Support (big step number, icon, 3 to 5 word label each), joined by a line that draws as you scroll.
  2. **"Without / With HiTech" comparison** on Home: two columns of 5 icon chips. Without: Manual work, Scattered information, Repeated data entry, Slow reporting, Limited visibility. With: One set of books, Automated workflows, Real-time numbers, Faster reporting, Better control. "Without" chips greyed and struck through; "with" chips light up in sequence.
  3. **Tivora "one core" diagram** on tivora.html: central Tivora ERP node, 6 module nodes around it (Sales, Purchase, Stock, Accounts, Trade finance, Reports), lines draw in on reveal, then 3 outer trade-pack nodes attach (Alanza, Paint, Trading).
  4. **Coverage band**: 14 city pins on a stylised horizontal band (NOT a geographic map, no country outline), roughly west to east: Mahendranagar, Dang, Nepalgunj, Surkhet, Butwal, Bhairahawa, Pokhara, Narayanghat, Kathmandu, Birgunj, Mahottari, Janakpur, Lahan, Biratnagar. Kathmandu marked "Head office". Pins pop in left to right.
- **Imagery:** Tivora ERP screenshots and video remain the only product UI. Elsewhere use icons, numerals, diagrams and small gradient accents. No stock or generated photos.
- Target: total visible words on index.html **under 900** (excluding nav, footer and form labels). Report the count.

### 10.2 Renames and IA changes
- **`solutions.html` now holds what services.html held** (ERP implementation, Application software, Customized software, E-commerce) plus the 4-step process. Nav label "Solutions". Replace `services.html` with a tiny meta-refresh redirect page to `solutions.html`.
- **`products.html` = product directory + "by trade" finder merged.** Top: the filterable product bento (Tivora featured). Below: "Find yours by trade": the 12 trades as a visual grid of icon tiles (trade icon, trade name, icons of the products that serve it); clicking a tile filters/scrolls to the matching products. Fold the old trade-detail content in as compact expandable tiles.
- Main nav: **Tivora ERP · Products · Solutions · Partners · Company · Support** + Contact + Request a demo. Update mega menus, footer columns, sitemap and every internal link. Zero broken links.

### 10.3 New page: `partners.html`
Source: `HiTech_Marketing_Assets_2026-09-23 2/Reports_Analytics/HiTech Presentation Auditors 2026.pdf` (HiTech's AUDAN Day 2026 presentation to the Auditors' Association of Nepal). Same word budgets.

1. **Hero (navy):** eyebrow "Partners"; H1 "Let's connect and grow together."; lede "For chartered accountants, auditors and resellers who work with Nepali businesses every day."; buttons "For CAs and auditors" / "Become a partner" (anchors). Visual: HiTech icon at centre with three orbiting nodes labelled CAs, Auditors, Resellers (smaller version of the hero orbit style).
2. **For chartered accountants and auditors** (id `ca`): heading "Built for the people who check the books." Icon-chip grid of Swastik features for auditors and IRD (condensed from the deck): Landed cost by consignment · Consignment-wise import reconciliation · Customer and PAN-wise VAT report · Monthly VAT reconciliation · Anusuchi 10 and 13 · IRD API updates · Customer account confirmation (IRD format) · TDS report; plus from the content source: Multiple companies · Merged reporting · Auditors lock · Entry log and audit trail · Nepali and English dates. State the scope honestly: these are **Swastik** features; small line "Swastik is IRD certified." Then a Swastik editions strip (names only, icon chips): Swastik, Swastik Gold, Swastik Nepal, Swastik Automobile, Swastik Textiles, Swastik Wovensacks, Swastik Manufacturing, Swastik Dairy, Swastik Service, Pharmasoft, captioned "Editions of Swastik for different industries." Never mention HiTech ERP even though the deck does. CTA "Book a CA walkthrough" (form with Interested in = Swastik).
3. **Partner Connect** (id `partner`): heading "Partner Connect."; lede "Resell HiTech software with training, support and rewards behind you." Visual: ascending 3-tier diagram Customer → Channel partner → Priority partner. Priority partner benefits as 7 icon cards: Exclusive opportunity registration · Partner recognition · Technical training · Technical support · Sales incentives · Sales rewards · Technical collaboration. Partner responsibilities as 5 icon chips: Sign an MOU with HiTech · Recommend HiTech products · Keep your team trained · Share prospects with HiTech early · Share HiTech product updates. Program values strip: Simplicity · Choice · Innovation (one short line each, condensed from the deck).
   - **Do NOT publish** the deck's commercial terms (50% price, 10% commission, 5% incentive, sales target, Thailand/Bali tour packages) or the named points of contact. Insert `<!-- COMMERCIAL TERMS WITHHELD: confirm with management before publishing -->` and show "Partner terms are shared after a conversation."
4. **Channel partner network** (id `network`): heading "Partners across Nepal." Partner cards (name, city, pin icon): HiTech Solution (Itahari / Biratnagar), HiTech Solutions & Services (Birgunj), CSE Enterprises (Butwal), HiTech Solutions & Services (Bhairahawa), Kaas Business Solutions and Services Pvt. Ltd. (Pokhara), Swastik Solutions & Service Center (Nepalgunj), Amar & Company (Janakpur), CSE Trade Link (Narayanghat), Family Computer (Siraha), Rahul Sahewal (Jhapa), Creative Concern (Mahendranagar), Global Trading & Suppliers (Dang). Big numeral "12 partners" (count of this list; do not use the deck's "15+" partner figure). Wrap in `<!-- PARTNER NAMES: confirm each partner agrees to be listed publicly -->`.
5. **Technology partners** (id `tech`): eZee hospitality suite and Appytect as icon tiles: "Partner products developed by eZee and Appytect; HiTech is the local contact." Move this here from the products page (products keeps one small link).
6. **Partner inquiry form**: standard form with "Inquiry for" preselected to "Channel partner query" (support a URL param `?inquiry=` for preselection). Add "CA / audit firm" to the Inquiry for options.
- Home: add a slim "Partners" band before the demo form: 3 icon tiles (For CAs and auditors · Partner Connect · Partner network) linking to the anchors.
- Do not publish the deck's "4+ countries (Nepal, India, UAE, China)" claim.

### 10.4 Unchanged
Sections 2 (hard rules), 3 (tech), 6 (design system) and 8 (QA) still apply. Keep all products; ignore the separate website-strategy document's suggestion to remove Avocare, Pharmasoft and Gurukul (not approved by the CEO).

### 10.5 QA additions
- Word-count report per page (visible text excluding nav, footer, forms); index under 900.
- grep must find none of: links to services.html (except the redirect itself), "50%", "Commission", "Thailand", "Bali", "Singhania", "4+ Countries", "HiTech ERP".
- All new diagrams fully visible without JS and under prefers-reduced-motion.


---

## 11. Revision 3 (CEO feedback, 4 Oct 2026): page-matched background photography

CEO feedback: "the website is too plain; add background images that suit each page, not generic ones." Overrides section 10.1's "no generated photos" line.

### 11.1 Assets
21 photographs (generated, Nepal settings, cool navy grading, no text, no product UI) are in `assets/img/bg/` as 1920px JPGs (~215 KB each). Do not use any image for anything other than its listed purpose. Never place a Tivora screenshot or any other product UI over a photo in a way that implies it is a real deployment.

### 11.2 Placement map
| Image | Where |
|---|---|
| `home-nepal.jpg` | Home "Built for Nepal" section background |
| `home-himalaya.jpg` | Home coverage band ("14 cities") background |
| `street-morning.jpg` | Home "Why HiTech" section background, and About hero |
| `bazaar.jpg` | Products page hero (and Home suite section header band, subtle) |
| `devspace.jpg` | Solutions page hero |
| `ca-desk.jpg` | Partners hero, and the "For CAs and auditors" section header |
| `handshake.jpg` | Partners "Partner Connect" section |
| `factory.jpg` | Clients page hero |
| `support-desk.jpg` | Support page hero |
| `team.jpg` | Careers page hero |
| `kathmandu-street.jpg` | Contact page hero, and the home demo/contact section |
| `jewelry.jpg` | Alanza page hero |
| `paint.jpg` | Tivora page trade packs section (Paint context), subtle |
| `ledger.jpg` | product-swastik hero |
| `cafe-tablet.jpg` | product-myswastikonline hero |
| `checkout.jpg` | product-pos hero |
| `kitchen.jpg` | product-restaurant hero |
| `pharmacy.jpg` | product-pharmasoft hero |
| `hospital.jpg` | product-avocare hero |
| `classroom.jpg` | product-gurukul hero |
| `motorbike.jpg` | product-bizant hero |

The home hero (orbit) stays white; the Tivora core band stays solid navy so the real Tivora screens remain the hero there.

### 11.3 Treatment (consistent everywhere)
- Photo as `background-image` on a full-bleed layer behind the section, `object-position`/`background-position` chosen per image so the subject sits away from the text column.
- **Navy overlay** for legibility: dark sections use `linear-gradient(90deg, rgba(0,0,89,.92) 0%, rgba(0,0,89,.78) 45%, rgba(0,0,89,.35) 100%)` (text on the left), flipped when text is on the right. Light sections use a white wash instead (`rgba(255,255,255,.88)` → `.6`) so navy text still passes AA. Every text element over a photo must pass the contrast scan.
- Product page heroes: photo behind, the product icon plate stays on the right on a frosted navy card (`backdrop-filter: blur(8px)` with a solid navy fallback).
- Subtle motion: slow scale-in (1.08 → 1.0 over 1.6s) when the section enters, and a gentle parallax (max 6% translate) on scroll. Both off under prefers-reduced-motion.
- Performance: `loading` via IntersectionObserver (set the background when within 600px of the viewport), hero images preloaded with `<link rel="preload" as="image">` only on the page where they are the hero. Add `width`/`height` where `<img>` is used. Below 600px wide, serve the same file (no separate sizes needed) but keep the overlay stronger (.9 across).
- Mobile: photos stay but overlays go to near-solid so text never sits on a busy area.
- Footer line already says "Section photography is generated artwork." Keep it on every page.

### 11.4 QA additions
- Contrast scan must include text over photos (sample the darkest/lightest pixel behind each text box from a screenshot, the way earlier audits did). Zero failures.
- Screenshot every page again at 1440 and 390; check no photo makes a heading or button hard to read, and no subject (face, plate, gold) sits behind text.
- Page weight report: total image bytes per page on first load.


---

## 12. Revision 4 (CEO feedback, 4 Oct 2026): attention-grabbing home hero

CEO asked for a hero image that grabs attention. Research summary (design lead): the strongest B2B SaaS hero visual is the real product; human faces add attention because visitors follow a person's gaze; generic stock is filtered out. So the hero becomes **the real Tivora ERP screen in a real Nepali business**: `assets/img/bg/hero-home.jpg` (1920×1074, 180 KB) shows a Nepali paint-shop owner in a dhaka topi behind his counter, looking toward the left, with the **real Tivora ERP Paint home screen** (from `home-paint.jpg`) composited onto his laptop. Paint is a Tivora trade, so the scene is truthful to the product. This replaces the orbit as the hero visual.

### 12.1 Layout
- Full-bleed hero, min-height `max(640px, 88vh)`, photo as background, `background-position: 70% center` (the owner and laptop stay in the right half at all desktop widths).
- **Dark hero**: navy overlay `linear-gradient(90deg, rgba(0,0,89,.94) 0%, rgba(0,0,89,.82) 38%, rgba(0,0,89,.25) 62%, rgba(0,0,89,0) 78%)`, white text, cyan eyebrow. Text column stays in the left 6/12; the owner's gaze points at it.
- Keep the copy, both buttons (primary gradient, secondary outline white) and the proof row (10,000+ / 25+ / 15+, white numerals, count-up).
- **Suite stays on the first screen**: directly under the proof row, a row "Also from HiTech" with the 10 suite icon chips (white 8% plates, cyan strokes, tooltips with name and category on hover/focus, linking to their product pages; Payroll/Smartsuite to contact). This replaces the orbit's job of showing the suite.
- A small caption chip pinned near the laptop (desktop only, positioned over the photo's laptop area at roughly 64% left / 88% top, adjust to the image): "Real Tivora ERP screen · Launching soon". It must not cover the laptop screen.
- The header over the hero switches to its navy/dark mode (existing `[data-theme=dark]` behaviour).
- Remove the orbit and the hero laptop video from the home page (the launch video stays on tivora.html). Delete now-unused orbit CSS/JS only if nothing else uses it (partners hero uses an orbit style; keep what it needs).

### 12.2 Motion
- On load: photo scale 1.06 → 1.0 over 1.8s; text and suite chips stagger in. Gentle parallax on scroll (max 6%). All off under reduced motion.

### 12.3 Mobile (< 900px)
- Photo stays as the hero background, positioned `78% center` so the owner and laptop show on the right; overlay goes to near-solid navy (.9) at the top behind the text and lighter at the bottom so the laptop scene is visible below the copy: `linear-gradient(180deg, rgba(0,0,89,.94) 0%, rgba(0,0,89,.9) 55%, rgba(0,0,89,.35) 100%)`. Suite chips wrap to 2 rows of 5.

### 12.4 QA
- Preload `hero-home.jpg` on index only. Contrast over the photo (photo scan) at 1440, 1280, 1024, 390, 360: zero failures. No text may sit over the owner's face or the laptop screen at any width. Screenshot at 1440, 1280, 1024, 390.
- Footer line already covers generated photography; add `<!-- hero-home.jpg: generated photo with the real Tivora ERP Paint screen composited on the laptop -->` near the hero markup.


---

## 13. Revision 5 (CEO feedback, 4 Oct 2026): corporate office hero with the Tivora ERP video

CEO: "keep the Tivora ERP video; the background is good but instead of a Nepali paint store make it a corporate office." Overrides section 12's image and the "remove the hero video" line.

### 13.1 Asset
`assets/img/bg/hero-office.jpg` (1920×1074; source 1344×752, aspect 1.7872): two Nepali executives in a Kathmandu corporate office at night, standing on the right; the man gestures toward the left (toward the headline). An open laptop on the table faces the camera with a **solid black screen**, which is where the Tivora ERP launch video plays. Kathmandu city lights and hills through the glass behind them. `hero-home.jpg` (paint store) is retired from the home page; leave the file in place but unreferenced.

**Laptop screen rectangle, as % of the image:** left **59.30%**, top **62.77%**, width **16.82%**, height **18.48%** (pixel box 797,472 → 1022,610 in the 1344×752 source).

### 13.2 Build
- Hero keeps everything from section 12 (dark navy gradient on the left, white copy, buttons, proof row, "Also from HiTech" suite chips, header in dark mode) except the visual layer.
- Visual layer = a **stage** that behaves like `background-size: cover` but lets the video be placed exactly on the screen:
  - `.hero` is `position: relative; overflow: hidden; container-type: size;`
  - `.hero-stage` is absolutely positioned, anchored right and vertically centred, `aspect-ratio: 1344 / 752`, `width: max(100cqw, calc(100cqh * 1.7872))`. The `<img src="hero-office.jpg">` fills it (`width:100%; height:100%; display:block`).
  - Inside the stage, a `<video>` absolutely positioned at `left:59.30%; top:62.77%; width:16.82%; height:18.48%`, `object-fit: cover`, `border-radius: 0.4%`, the same attributes as before (`autoplay muted loop playsinline preload="metadata"`, poster = `tivora-launch-poster.jpg`, aria-label "Tivora ERP launch film, 15 seconds. Sound is off."). Add a very subtle screen treatment so it sits in the scene: `filter: brightness(.92) saturate(.95)` and an inset `box-shadow: inset 0 0 0 1px rgba(0,0,0,.35)`.
  - A small sound toggle button (the one from the earlier build) sits just below the laptop on desktop; it must be keyboard reachable and labelled.
  - The caption chip "Tivora ERP launch film · Launching soon" sits just below the laptop (never over the screen).
  - The navy gradient overlay sits **above the image but below the video** in stacking order, so the video stays crisp, and the gradient must be fully transparent over the laptop area (the existing stops already reach 0 by 78%; verify the screen at ~59–76% is not dimmed; if it is, shift the gradient so it is ≤ .1 opacity over the screen).
  - The video pauses when the hero leaves the viewport and when the tab is hidden; resumes on return. Under prefers-reduced-motion it does not autoplay: show the poster with a visible play button.
- Motion: stage scale 1.06 → 1.0 on load (scale the whole stage so the video stays aligned), gentle parallax on the stage (max 6%). Off under reduced motion.
- **Mobile (< 900px)**: as in 12.3, the copy and suite chips come first on solid navy, then the photo zone below; the stage uses the same cover maths inside that zone (container query on the zone), anchored so the two executives and the laptop are visible; video stays aligned.
- Check alignment at 1920, 1600, 1440, 1280, 1024, 768, 390, 360: the video must sit exactly on the screen with no black edge visible around it and no overhang. If the sub-pixel fit shows a black rim, expand the video box by 0.15% on each side (it is fine for the video to overlap the bezel by a hair, never the reverse).

### 13.3 QA
- Section 8 checklist, the photo contrast scan over the hero at the widths above, alignment screenshots at 1440, 1024, 390 saved to `hitech-review/v2/index-hero-*.png` plus one zoomed crop of the laptop at 1440 (`index-hero-laptop-zoom.png`).
- Preload `hero-office.jpg` on index only.


---

## 14. Revision 6: management feedback (5 Oct 2026). 23 numbered points. Overrides earlier sections where they conflict.

### 14.0 Ground rules (read first)
1. **Change only what the 23 points ask.** Do not rewrite, rephrase, add or drop any other content. Where a word or phrase must change (e.g. "Jewelry" → "Jewellery"), change only that. If you believe something else is wrong, do NOT fix it; write it under "Observations, not changed" in CHANGELOG.md.
2. **No invented content.** All new text comes from the sources below or from the user's own wording in this section. Sources for new content:
   - `C:\Users\Gaurav Chaudhary\Documents\Hitech Website\Marketing Content\` (per-product `.txt`, PDFs, logos, videos),
   - `C:\Users\Gaurav Chaudhary\Documents\Hitech Website\Hitech Marketing Content 2023\` (product folders with `.docx` feature lists and email/WhatsApp content, `Hitech Brochure\HITECH COMPANY PROFILE (1).pdf`, `Hitech Product Logos\`),
   - the live site notes in this file, and earlier sections of this spec.
   Extract `.docx` text with `zipfile` + regex on `word/document.xml` (see how earlier work did it). PDFs: use the Read tool.
3. **Write `hitech-site/CHANGELOG.md`**: one entry per point 1 to 23 listing exactly which pages/sections changed, plus "Observations, not changed" and "Judgment calls". The design lead will review it.
4. Keep every earlier hard rule (brand guideline, only Tivora ERP UI shown, file:// works, copy gate, accessibility). Where this section contradicts an earlier rule, this section wins. Specifically: **section 2 rule about IRD wording for Tivora is superseded by point 5**; "Launching soon" rules are superseded by point 4.
5. Generator stays `_build/build.mjs`; run it; never hand-edit generated HTML.
6. Do the work in two phases and verify each (checklist in 14.4). Phase A first, then Phase B.

### 14.1 PHASE A: content and structure (points 1, 4 to 10, 12 to 15, 17, 18, 20 to 22)

**P1. Remove Gurukul.** Delete `product-gurukul.html`; remove Gurukul everywhere: nav and mega menus, footer, home product grid, products directory, hero/suite chips, forms ("Interested in" option), sitemap, JSON-LD, related-product tiles, trade finder. The trade "Schools and colleges" only existed for Gurukul: remove that trade too, and any text that lists "schools" as something HiTech serves **because of Gurukul** (e.g. product-hero ledes). grep -i `gurukul|school` after; remaining hits must be unrelated (e.g. the company's own "Software training"). Update counts that mention the number of products/trades if any.

**P4. Tivora ERP is no longer "launching soon".** Remove every "Launching soon" pill and phrase, the announcement bar ("Tivora ERP, our new platform, is launching soon"), "launch film" wording (caption chip becomes just "Tivora ERP"; the video aria-label becomes "Tivora ERP video. Sound is off."), "Pre-launch", "coming soon" wording about Tivora/Alanza/Paint/Trading. Remove the announcement bar entirely. Do **not** write "launched" or "new" anywhere. Tivora ERP appears like any other product (same tile type, same naming) but highlighted: it keeps the large navy featured tile (2×2) in the suite bento and one compact highlight section on the home page (see P6/P3). The trade packs (Alanza, Paint, Trading) no longer carry pills; "Coming later" pills for FMCG, Automobile, Home appliances, Pharma remain unchanged (not asked).

**P5. All HiTech products are IRD certified.** Add a small "IRD certified" badge (shield-check icon + text) to: every product tile (home grid and products page), every product page hero (badge row next to the delivery badge), and Tivora ERP's tile. Replace every "IRD certification has not been completed / ask us for its status / built to IRD's current formats and is CBMS-ready" sentence with "All HiTech products are IRD certified." (Keep feature statements like "CBMS e-invoicing" as features; only the certification-status caveat goes.) Add the statement to the new Why HiTech section and the HiTech FAQ (P14).

**P6. The site must not be all about Tivora.** Rebalance home:
- Hero: eyebrow → "Accounting software since 1998" (see P9). H1 unchanged ("The software Nepal's businesses run on."). Lede (1 sentence, ≤20 words) → "Accounting, billing, POS, restaurant, pharmaceutical and enterprise software for Nepal's businesses." Buttons: "Request a demo" (opens the lead popup, P23) and "Explore products" (→ `products.html`). Keep the large foreground laptop with the Tivora video and the corporate office photo exactly as they are (only the caption chip text changes, P4). Keep the proof row. "Also from HiTech" row becomes product logo tiles (P18).
- Section order after the hero: **Our clients (P22) → Products (suite bento, Tivora highlighted) → Tivora ERP highlight (compact, P3) → Built for Nepal (keep content, fix fine print per P5) → Solutions by trade teaser (keep, minus Gurukul/schools, wording per P7/P8) → Why HiTech (P10) → Our branches map (P11) → Partners band (keep) → FAQ (P14) → demo form.** Remove "How we work" and "The difference" (P9) and the plans band (P13). The testimonial video + quotes live inside "Our clients" (P12, P22).
- Wherever copy says "Tivora ERP, our new platform…" in a hero/lede/meta description, make it HiTech-wide. Meta descriptions: "HiTech has built accounting and business software in Nepal since 1998. Swastik, Tivora ERP, POS, restaurant, pharmaceutical and mobile software." (title and description on index only).
- Tivora ERP may be mentioned as one product among others, never as the page's subject, except in its own highlight section and the product tile.

**P7. Jewellery spelling.** Replace every visible "Jewelry/jewelry" with "Jewellery/jewellery" (text, alt, aria, titles, meta, form options, trade names, comments irrelevant). File names may stay. grep -i `jewel` must show only "jewellery"/"jeweller".

**P8. Pharmaceutical.** "Pharmacies" (trade) → "Pharmaceutical sector"; category label "Pharmacy" → "Pharmaceutical"; other uses of "pharmacy/pharmacies" in visible text → "pharmaceutical"/"pharmaceutical sector" with minimal grammar fixes (e.g. "Accounting and inventory for the pharmaceutical sector, in single and network versions."). Product name "Pharmasoft" unchanged. Update the hero/section ledes that list "pharmacy".

**P9. Home removals and the 1998 line.** Remove the home sections "How we work" and "The difference" (keep "How we work" on solutions.html, which was not mentioned). The text "Business software, built in Kathmandu since 1998." (Why HiTech heading, About hero H1) and the hero eyebrow "Kathmandu · since 1998" all become **"Accounting software since 1998"** (H2/H1 with a trailing period where headings use one).

**P10. Why HiTech, referenced from the live site.** Live site section (https://www.hitechnepal.com.np/): heading "We are HiTech Solutions & Services Pvt. Ltd.", subheading "Providing Service for more than 2 decades", description "Premier business software solution provider in Nepal with corporate office [in] Kalimati, Kathmandu (Nepal)", stats "No.1 Business Solution Provider of Nepal / 20+ Years of Experience / 8000+ Clients / 20+ Partners / 100+ Dynamic Team Members", and a Support Service area: "Live Chat Support, Onsite Support, Industry-specific Implementations, Software Training" with the line "At HiTech, we believe in the intrinsic value of human resources. Our team is up and ready to offer professional support and solutions to ease your operation."
New home section (kicker "Why HiTech"; H2 "Accounting software since 1998."; lede "We are HiTech Solutions & Services Pvt. Ltd., a premier business software solution provider in Nepal."):
- Five stat tiles with icons and count-ups (navy anchor tile for the first): **No.1** "Business Solution Provider of Nepal" · **25+** "Years of experience" · **10,000+** "Clients" · **20+** "Partners" · **100+** "Dynamic team members". (Management decision: live-site items with the current site figures, except Partners which is the live 20+.)
- "Support service" row of four icon cards: Live chat support · Onsite support · Industry-specific implementations · Software training.
- One closing line (2 sentences max): the "intrinsic value of human resources" sentence pair, verbatim.
- Remove the previous Why HiTech tiles (Built in Nepal for Nepal / One vendor every trade / Support that stays and the 14-city chips inside it).

**P12. Testimonial video.** In "Our clients" (P22) show the live Facebook reel as the testimonial video: embed `https://www.facebook.com/reel/956488536764696` via Facebook's video plugin iframe: `https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Freel%2F956488536764696%2F&show_text=false&autoplay=true&mute=true` (portrait ~ 9:16, width ≤ 340px on desktop, 100% width up to 360px on mobile), attributes `allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" allowfullscreen loading="lazy" title="HiTech client testimonial video"`, `frameborder="0"`. Set `src` when the section is within 600px of the viewport. Under it a link "Watch on Facebook" to the reel URL (opens in a new tab) so there is always a fallback. Place the three existing quotes (verbatim) stacked beside the video. Note in CHANGELOG: Facebook controls autoplay/looping in its own player; the site requests autoplay muted.

**P13. Remove the three plans from the entire website.** Delete `plans.html`. Remove from nav, mega menus, footer, sitemap, home plans band ("A price that fits your business"), hero buttons ("See the plans"), Tivora/Alanza pages, FAQ answers ("Which plan do I need?"), forms, JSON-LD. No "Standard / Business / Enterprise" plan wording may remain anywhere. (Careful: "production plans", "planning" in module names are unrelated and stay.)

**P14. HiTech FAQ instead of Tivora's.** Home FAQ becomes (verbatim from the website strategy document, section K.1 and E, with the HiTech ERP references removed and IRD per P5), 8 accordion items:
1. Which HiTech software is right for my business? — It depends on what your business needs to run day to day: accounting, retail billing, restaurant operations, or full enterprise management. Choose "Not sure yet" on the demo form and our team will recommend the right fit.
2. Is HiTech software suitable for small businesses? — Yes. Swastik and Swastik POS are built for single-location businesses, and Swastik supports multiple branches and companies.
3. Do you support multi-branch businesses? — Yes. Swastik is built with multi-branch and multi-company reporting in mind.
4. Is the software IRD compliant/certified? — Yes. All HiTech products are IRD certified.
5. Can HiTech customize the software? — Yes. HiTech's custom development team can adapt existing products or build new applications around your workflow.
6. Do you provide implementation and training? — Yes. Implementation and training are part of onboarding for every HiTech product.
7. Do you provide after-sales support? — Yes. HiTech provides ongoing support after go-live.
8. Can I request a product demo? — Yes. Use the "Request a demo" button on any page, or fill out the short demo form.
The Tivora FAQ is removed from every page (including `tivora.html`).

**P15. Full address everywhere an address appears:** `4th Floor, Divine Complex, Kalimati Chowk, Kalimati, Kathmandu, Nepal` (source: HiTech company profile). Footer, contact card on every page, contact page, home demo contact card, JSON-LD (`streetAddress`: "4th Floor, Divine Complex, Kalimati Chowk, Kalimati"; locality Kathmandu), `<noscript>`/meta where present. Phone, email unchanged.

**P17. Tivora ERP links go to www.tivoraerp.com.** Header "Tivora ERP" becomes a plain link (no dropdown, no mega menu) to `https://www.tivoraerp.com` (`target="_blank" rel="noopener"`, small external-link arrow, visually hidden "(opens in a new tab)"). The same destination for the mobile menu, footer, the Tivora tile/CTA buttons ("Explore Tivora ERP", "Take the tour", "See what is coming", etc.) and every other link that used to point to Tivora overview/tour (`tivora.html`, `index.html#tour-products`). Delete `alanza.html`, `plans.html`, `security.html` (and any other Tivora sub-pages) and every link to them. **Keep only `tivora.html` (the overview) as a file**, but nothing links to it and it is left out of `sitemap.xml`; apply the P4/P5/P7/P13/P14 text fixes to it (no launching soon, no plans, no FAQ, IRD per P5, jewellery spelling). Footer "Tivora ERP" column collapses to one link "Tivora ERP" (external).

**P18. Product logos.** Logos are prepared in `assets/img/logos/` (trimmed, 640px wide PNGs): `swastik, myswastikonline, pos, restaurant, pharmasoft, avocare, bizant, payroll, smartsuite, ezee`. Replace the line-icon plates with the logo on a **white rounded plate** (always white, in both themes, because the logos have dark text) in: home product tiles, products-page tiles, product-page hero plate (large plate, logo `object-fit: contain`, generous padding), related-products tiles, and the hero "Also from HiTech" strip (see below). Surfaces under 48px tall keep the line icons: mega-menu rows and the small pointers in the trade finder. Tivora ERP keeps its icon (no logo file yet). Delete `ICON` entries only if unused. Bizant: use `logos/bizant.png` (the older `assets/img/bizant.png` is retired). Never recolour or distort logos.
Hero "Also from HiTech": a 5 × 2 grid of white logo tiles (about 88 × 56px, `object-fit: contain`, 8px padding), each linking to its product page; tooltip with name and category on hover/focus. Products in order: Swastik, mySwastikonline, Swastik POS, Swastik Restaurant, Pharmasoft, Avocare, Bizant, HiTech Payroll, HiTech Smartsuite, then eZee (links to the eZee section on the products page). (That is 10 tiles after removing Gurukul and adding eZee.)

**P20. Strengths and features on every product page.** Each `product-*.html` gets two clearly separated sections, both as icon-chip/card grids (visual-first rules still apply: no long paragraphs):
- **"Strengths of <Product>"**: the product's competitive/positioning points, sourced from the folders (e.g. for Swastik from `Products/SWASTIK/SWASTIK- FEATURE.docx` and `Marketing Content/Swastik/Swastik.txt`: Nepal's No 1 accounting, inventory and MIS software; largest client base and widest support network; IRD (VAT) certified; 15+ support offices in Nepal; dedicated online and offline support; both cloud-based and desktop-based available; SQL database back end; user-definable unlimited security rights; free upgrade and update under AMC/warranty period; more than 30 editions for different industries (from the AUDAN deck)). Use the 25+ years figure from the site, not the source's "20+".
- **"Features of <Product>"**: the functional features (keep the existing feature groups and add the ones from the sources that are missing; for Swastik: PDC management, point of sale and customised billing, accounting in Nepali/English date with VAT reports, 500+ sales and marketing analysis reports, LC management and import costing, manufacturing inventory and store management, real-time sales and purchase order system, report export to Word/Excel/HTML; add-ons: customised reporting, SMS notification, mobile apps for owner, SFA and customer).
- Do the same, from their own sources, for: mySwastikonline (`Marketing Content/My swastik online/My swastik online.txt`: "Why myswastikonline.com" = strengths; "Key Features" = features), Swastik POS, Swastik Restaurant, Pharmasoft (`Pharmasoft.txt`: batch and free goods, product/company-wise discount, breakage and expiry, Mfg and expiry date, custom charge and taxes on free goods, FEFO invoicing), Bizant (`Mobile app.txt`: owner app and SFA salesman app features; integrated with Swastik, Swastik Restaurant, POS; Android/iOS; Play Store link `https://play.google.com/store/apps/details?id=com.hitech.hitechcrm`), Avocare, HiTech Payroll, HiTech Smartsuite (read the `.docx` in their `Hitech Marketing Content 2023\Products\<name>\` folders). If a source has little content (Payroll, Smartsuite), use only what it says and nothing else; keep existing page content.
- Shared strengths line for every product (from the marketing material's "Why Us"): IRD (VAT) certified solution; largest client base and widest support network; support offices all over Nepal; online and offline support. Show them as the first four strength chips on every product page.
- Condense long bullets to 2 to 7 word chips; never add a claim that isn't in the source.

**P21. eZee.** Remove the "Technology partners" section (eZee and Appytect) from `partners.html` entirely (and its anchor, its nav/section-link references, its form option wording). Create a **unique section on `products.html`** with id `ezee`, placed after the product directory and before the by-trade finder:
- Kicker "Authorized dealer"; H2 "eZee hospitality software."; lede "HiTech is the authorized dealer of eZee in Nepal." The eZee logo (`logos/ezee.png`) on a white plate; a distinct visual style (navy panel with a cyan top rule) so it reads as different from HiTech's own products; a stat "10,000+ hotels in 160+ countries use eZee worldwide" (source: `Products/EZEE/eZee WHATS APP CONTENT.docx`).
- Seven icon cards (live-site names): FrontDesk: hotel management system · BurrP!: restaurant software · Absolute: hotel booking software · Reservation: booking engine · Centrix: channel manager · iMenu: restaurant menu software · iFeedback: feedback system. Plus one small card "Appytect: mobile app builder" with no relationship claim (it is listed with these on the live site; flag it in CHANGELOG).
- CTA "Ask about eZee" opens the lead form with Interested in = "eZee hospitality software" (add that option to every form).
- Mega menu and footer entries that said "Hospitality suite"/"hospitality partner" become "eZee (authorized dealer)" linking to `products.html#ezee`. No page may say eZee is a HiTech partner.

**P22. Company, Careers, Clients.**
- Delete `clients.html`. Clients become the home section `#clients` (title "Our clients", subtitle none): the **11 client names as typographic tiles**, using HiTech's documented spellings: CG Group (Chaudhary Group), Jagdamba Steel, Pashupati Paints, Shikhar, Triveni Group, QFX Cinemas, M. C. Group, Goenka Group, Rajesh Metal Crafts, Asian Pharmaceuticals, CTL Pharmaceuticals. (Display "CG Group" only; no parenthetical.) Remove the old home marquee strip and the "Trusted by..." strip (the section replaces it). The testimonial video and quotes sit inside this same section below the tiles (P12). Footer/nav links to clients → `index.html#clients`.
- Careers: top-level nav item "Careers" (not under Company). Keep `careers.html`; **remove the Benefits block** (salary/leave, training, provident fund, insurance) from it. Everything else on careers stays. Remove the Careers link from the Company dropdown.
- Company dropdown now contains: About HiTech, Contact. (Nav: Tivora ERP ↗ · Products · Solutions · Partners · Company ▾ · Support · Careers; right side: Contact, theme toggle, Request a demo.)
- Footer columns updated to the new structure; sitemap updated; no links to `clients.html`/`plans.html`/`alanza.html`/`security.html`/`product-gurukul.html`/`services.html` (except the existing services redirect file, which stays).

### 14.2 PHASE B: features and polish (points 2, 3, 11, 16, 19, 23, and the Partners map from 21)

**P2. Compact website.** Reduce vertical space across all pages: section padding `clamp(40px, 5vw, 72px)` (was ~64–120px); H2 `clamp(28px, 3.4vw, 44px)`; hero min-height `max(560px, 80vh)`; card/tile gaps 12 to 16px; remove oversize margins between header and grid; tighten bento/tiles paddings (24px). Keep the 8px/4px grid and the type scale rules. The page must not feel cramped: 16px minimum gaps, text line-heights unchanged. Target: home page total height at 1440 ≤ 75% of its current height (report before/after).

**P3. Tivora ERP highlight section (home) spacing.** Replace the tall sticky 4-step scroll band with a **compact, non-sticky two-column highlight**: left column (6/12): kicker "Tivora ERP", H2 "One platform. Every business." (existing tagline), one-sentence lede (≤20 words, existing wording), four icon chips (Books your auditor accepts · Stock that adds up · Nepal built in · Built one trade at a time), the trade-pack chips (Alanza, Paint, Trading; "Coming later" for the others stay), button "Explore Tivora ERP" (external, P17). Right column (6/12): one laptop frame cross-fading through the four real Tivora screenshots (dashboards, home-paint, home-jewellery, sales-dash) every 4 seconds with 4 tick dots (pauses on hover, manual click, off under reduced motion where the first image shows). Section height ≤ 560px at 1440, equal top/bottom padding (P2 value), no empty gaps, navy background with a thin top/bottom rule. Image alt text keeps "jewellery" spelling.

**P11. Branches map.** Home section `#branches` (kicker "Our branches"; H2 "14 cities across Nepal."; no "head office" label anywhere, no Kathmandu pin). The 14 cities, exactly: **Biratnagar, Birgunj, Butwal, Pokhara, Nepalgunj, Janakpur, Chitwan, Siraha, Dang, Surkhet, Katari, Udayapur, Rautahat, Birtamode**. **Mahendranagar is removed** from every list of branches/cities (home, support page city chips, support branch table). Do not add a Kathmandu city pin.
Build a real map of Nepal: pre-computed data in `assets/data/nepal-map.json` (`outline` SVG path in viewBox `0 0 1000 593`, and `pins` with x/y for each city, already projected from real coordinates and validated inside the border). **Inline the outline path and pins into the HTML at build time** (no runtime dependency). Design:
- Outline: stroke cyan (dark mode) / indigo (light mode) 2px, fill = 6% tint; entire map `role="img"` with a text alternative listing the cities.
- **Animation** (once, on reveal; static under reduced motion): outline draws (stroke-dashoffset, 2.2s), the fill fades in, then pins drop in one by one (150ms apart, west to east) with a bounce, each with a soft pulsing ripple ring (CSS, staggered, 2.4s loop, paused off-screen); a subtle slow shimmer line sweeps across the map every 6s.
- Pins are numbered 1 to 14 west to east (Nepalgunj, Surkhet and Dang first); because the southern cities are crowded (Birgunj, Rautahat, Janakpur, Siraha, Katari, Udayapur, Birtamode, Biratnagar), do not label pins on the map; use numbered pins plus a **legend list** (two columns on desktop, beside or under the map) with the number, city name and a small pin icon. Hover/focus on a legend row highlights the pin (scale + ring) and vice versa; keyboard focusable; tooltip shows the city name.
- Layout: map 7/12, legend 5/12 on desktop; stacked on mobile (map full width first). Keep the existing count-up numeral "14 cities" in the heading.
- The `support.html` coverage band is replaced by the same component (all other support content unchanged except removing Mahendranagar and "head office").

**P21 (Partners map).** In `partners.html`, replace the partner-name card grid with the same map component, pins at the 12 partner locations (use `pins`: itahari, birgunj, butwal, bhairahawa, pokhara, nepalgunj, janakpur, narayanghat, siraha, jhapa, mahendranagar, dang), numbered, with the legend listing **partner name · city** in the same order as the original list (HiTech Solution · Itahari / Biratnagar; HiTech Solutions & Services · Birgunj; CSE Enterprises · Butwal; HiTech Solutions & Services · Bhairahawa; Kaas Business Solutions and Services Pvt. Ltd. · Pokhara; Swastik Solutions & Service Center · Nepalgunj; Amar & Company · Janakpur; CSE Trade Link · Narayanghat; Family Computer · Siraha; Rahul Sahewal · Jhapa; Creative Concern · Mahendranagar; Global Trading & Suppliers · Dang). Keep the "12 partners" numeral and both HTML comments about confirming names. Mahendranagar stays here because it is a partner location, not a HiTech branch.

**P16. Dark mode / light mode toggle.** Add a theme toggle button in the header (sun/moon icon, `aria-label="Switch to light mode"/"Switch to dark mode"`, `aria-pressed`), on desktop and in the mobile menu. Default theme: **dark** (management said the site is too white) unless the visitor has chosen before (`localStorage 'hitech-theme'`, wrapped in try/catch); set `data-theme` on `<html>` in an inline head script before first paint to avoid a flash. No flash on file://. Implementation: CSS custom properties for surfaces/text/borders (light = current look; dark = navy base).
- Dark palette (brand colours only): page `#000059`; alternate section `#00003A`; card/tile `rgba(255,255,255,.06)` with `1px solid rgba(255,255,255,.14)`; text `#FFFFFF`; secondary text `rgba(255,255,255,.8)`; captions `#B8C0E0` (check AA); links/eyebrows `#009AD4` (never indigo text on navy); primary buttons keep the gradient; outline buttons white; inputs `rgba(255,255,255,.08)` with white text; focus ring cyan; header `rgba(0,0,89,.94)` with the dark-background logo; footer `#00003A`.
- Light mode = the present look. Logo plates stay white in both themes. Photo overlays switch to navy in dark mode (the "white wash" overlays on light sections become `rgba(0,0,89,.9→.75)`). The Tivora highlight, hero and other already-navy sections look the same in both themes (they stay navy).
- Respect `prefers-color-scheme` only when no stored choice exists? **No**: default is dark regardless (management preference); the stored choice wins.
- The automated contrast scan must pass in BOTH themes on every page; screenshots in both.

**P19. Inquiry popup.** A modal lead form:
- Fields: Name (required), Mobile (required, `tel`), Email (optional), Interested in (select with the same options as the main form), Message (optional, 3 rows), hidden honeypot, hidden `source` (page path). Submit button "Request a call back". Heading "Talk to HiTech." with one line: "Tell us what you run and we will call you." Close button, overlay click and Esc close; focus trap, return focus on close; `aria-modal="true"`, `role="dialog"`, labelled; body scroll lock; respects reduced motion.
- **Timing (state kept in `sessionStorage` so it persists across pages in a visit):** first appearance **10 seconds** after the visitor lands; if dismissed without submitting, it reappears **15 seconds after each dismissal, 3 more times** (4 appearances in this burst); after that it reappears **every 3 minutes** until the visitor submits. After a successful submit, no more popups for the rest of the session. Never show it on `contact.html`, never while the visitor is typing in any form field or while a menu or another dialog is open (defer by 5s and retry), never when the page is hidden (pause the timers on `visibilitychange`). If the visitor navigates, the next due time is computed from the stored counters and last-dismissed timestamp so the sequence continues; the first-ever appearance on a later page still waits until 10s after the first landing time has elapsed.
- A test hook is allowed only through `window.__leadPopupTest` set in tests via `Page.addScriptToEvaluateOnNewDocument` (never shipped): you must verify the schedule (10s, +15s, +15s, +15s, then 180s) with accelerated timers, and report the observed schedule.

**P23. Capture leads everywhere.**
- One shared lead pipeline in `site.js`: `LEAD_ENDPOINT` constant at the top (empty string by default). If set, POST the form as JSON (`fetch`, keepalive, 8s timeout) with fields + `source` + referrer + timestamp, show success; on failure or when empty, fall back to the existing `mailto:info@hitechnepal.com.np` flow. Honeypot discards bots. Note in CHANGELOG that, until an endpoint is configured, requests are email drafts.
- **Every** "Request a demo" / "Book a demo" / "Ask about…" / "Talk to HiTech" / "Ask for a quote" / "Request a call" style button opens the popup form (JS on) with the "Interested in" preset from the button's `data-interest` or the page's product; without JS the button links to `contact.html` as today.
- **Slim lead strip above the footer on every page except `contact.html`**: heading "Get a call back." + Name + Mobile + "Interested in" (preset to the page's product) + button; same pipeline.
- Home hero quick box is not required (the hero buttons open the popup). Existing page form bands stay.
- The success state shows "Thank you. We will call you soon." (replaces the old email-app wording only when the endpoint is configured; with mailto fallback, keep the existing wording).

### 14.3 Decisions already made by management (do not re-ask)
- IRD: all products incl. Tivora are IRD certified (P5).
- Branches: exactly these 14, heading says 14 (P11).
- Why HiTech: live-site items with current figures (P10).
- Facebook reel: embed from Facebook (P12).

### 14.4 QA (both phases; report numbers)
- Section 8 checklist (console errors 0, overflow 0 at 360/390/1440, contrast, fonts, reduced motion, keyboard, copy gate, no non-Tivora UI), now **in both themes** after Phase B.
- grep gates on generated HTML (report zero hits): `Gurukul`, `gurukul`, `Launching soon`, `launching soon`, `Launching Soon`, `launch film`, `Pre-launch`, `Jewelry`, `jewelry` (outside file/asset names), `Pharmacies`, `pharmacies`, `Pharmacy`, `head office`, `Head office`, `Built in Kathmandu`, `built in Kathmandu`, `How we work` and `The difference` on index.html, `plans.html`, `alanza.html`, `security.html`, `clients.html`, `Standard`/`Business`/`Enterprise` as plan names, `IRD certification process`, `ask us for its current status`, `not been completed`, `HiTech ERP`, `Singhania`, `Commission`, `Thailand`, `Bali`, `50%`.
- `Mahendranagar` appears only on partners.html. The address string appears in full wherever an address is shown. Every Tivora ERP link resolves to `https://www.tivoraerp.com` (list them). `sitemap.xml` lists only existing pages. No dead links/anchors/ids.
- Logos: all 10 logo images render (no broken), white plates in both themes.
- Maps: screenshot the home map and partners map mid-animation and finished, desktop and 390px; pins inside the outline; legend and pins in sync.
- Popup: schedule test as in P19, focus trap, Esc, no popup on contact.html, no popup while typing.
- Screenshots (1440 and 390) of every changed page in light and dark, saved to `hitech-review/v2/`. Before/after height of the home page.
- Report the CHANGELOG path and anything you could not do.
