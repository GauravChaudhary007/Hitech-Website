# HiTech website: Revision 6 change log

Source: SPEC.md section 14 (management feedback, 23 points). The CEO's instruction: change only what the 23 points ask.

Status: **Phase A is done and accepted** (points 1, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15, 17, 18, 20, 21, 22). **Phase B is done** (points 2, 3, 11, 19, 23 and the Partners map from 21; point 16, the dark theme, was built and then removed at CEO request), plus two Phase A corrections.

All changes were made in `_build/build.mjs`, `assets/css/site.css`, `assets/js/site.js` and the new `lead-endpoint/` folder, then regenerated with `node _build/build.mjs`. No generated HTML was edited by hand.

## Round 9 (CEO feedback on the home page, 9 Oct 2026)

Edits are in `_build/build.mjs`, `assets/css/site.css`, `assets/js/site.js` and `_build/check.mjs`; all pages regenerated with `npm run build`. Layout was reviewed with the design-taste guidance: fewer boxes, typographic hierarchy, thin rules, real photography from `assets/img/bg`, no icon-in-square cards, no decorative washes.

### Per point

1. **Order.** hero, Our strengths, Our clients, product suite, Tivora ERP, By trade, Support services, 22 branches, Solutions and Partners, FAQ, demo form. The old "Why HiTech" is split: "Our strengths" (`#strengths`: No.1 anchor, 28+, 10,000+, 20+, 100+, the IRD certified statement, one street photo) and "Support services" (`#support-services`: the four services and the closing line, support-desk photo). "Built for Nepal" is folded into the strengths section as a ruled row (heading, fiscal-year numbering line, the typed invoice number, Bikram Sambat, 13% VAT, TDS, CBMS e-invoicing). Design call: Solutions and Partners share one section (two columns), because two short link lists in a row were the same layout twice; the anchors `#solutions-teaser` and `#partners-band` still exist.
2. **One compact section per screen (desktop, 900px and up).** Every home section is at most one viewport tall; sections are content-sized with a 520px floor and centred (see the judgment call below). `html.home` gets `scroll-snap-type: y proximity`, `scroll-padding-top: 72px` and `scroll-snap-align: start` on each section after the hero (and the call-back strip; the footer snaps to its end). The header no longer hides on scroll on the home page at 900px and up, so a snapped section always sits right under it, and the header turns navy from the section below it. Snap is off under `prefers-reduced-motion` and below 900px; mobile only got lighter padding. Restructured, not shrunk: suite is a ruled 5-column grid, trades are a 4-column index (11th item spans two), clients is video plus logo wall plus carousel, FAQ is two columns with all eight questions, branches is map beside legend, demo form is three columns.
3. **Clients on one screen with logos.** `assets/img/clients/manifest.json` is read at build time; a slug with a `file` renders as a colour logo (contained, never stretched, alt text is the display name), a null file renders the name as a text tile. Right now 7 of 11 are logos; Pashupati Paints, M. C. Group, Asian Pharmaceuticals and CTL Pharmaceuticals are text tiles. The 9:16 Facebook video keeps the same plugin src and lazy load; its frame height follows the viewport (380 to 520px). The three quotes are one carousel: one at a time, 7 s auto-rotation, dots and previous/next buttons, pause on hover and focus, no auto-rotation under reduced motion; without JavaScript all three are stacked and readable and the controls are hidden.
4. **Less template look.** Removed: the rounded-square icon on every card, the bento of equal cards, stat tiles with icons, decorative photo washes behind most sections. Added: big type for "No.1" and the numbers, hairline rules instead of boxes, photo panels, asymmetric two-column compositions, text-only industry list.
5. **Suite grid.** One 5-column grid, three rows, no dead cells: the Tivora plate (logo on `#2a2117`, text, IRD chip, link; no screenshot) spans two columns and three rows, the nine other products fill the other three columns exactly. Product tiles show the logo, the badge, category, name and the existing line. The per-tile "IRD certified" chip was dropped on the home page (the strengths section says all products are IRD certified); the products page is unchanged and keeps it.
6. **Slogan.** "The ERP that tells you what comes next" in the home highlight H2, the suite tile (also used on the Products page tile), `tivora.html` H1, the mega-menu card, the Tivora meta description. No other copy changed.
7. **No "14 modules".** Removed from the home highlight and tile, the Solutions teaser line (now "Tivora ERP: one database for the whole business."), the menu card, `tivora.html` (hero line, pillars, the module-chip heading is now "One database for every module."), and the meta description. `_build/check.mjs` now fails the check on `/fourteen modules|14 modules|works like your best manager/i` anywhere in a page (visible text, meta, JSON-LD), and also fails if the home highlight or the suite tile shows a Tivora screenshot, if the YouTube embed is missing, or if one of the four strengths is missing on the home page or `tivora.html`.
8. **Four Tivora strengths, everywhere.** Intelligent, Plans your business in advance, Focused, Makes no mistakes. Support lines from the brochure: "Forecast, MRP and project budgets drive purchase, production and spending." and "Warns before a wrong action: credit limit, low margin, near expiry, budget overrun." (full sentence form on `tivora.html`). Places: `TV_CHIPS` (home highlight), `PILLARS` (`tivora.html`, now four cards in a four-column grid). The tile and the menu card carry no strength list. "IRD connected" is still one of the eight feature cards on `tivora.html`.
9. **Home Tivora video.** The cross-fading screenshots are replaced by the YouTube video `n_rTzRJFkqw` in a 16:9 frame (`youtube-nocookie.com/embed/...?rel=0&modestbranding=1&playsinline=1`, `loading="lazy"`, title "Tivora ERP video", `allowfullscreen`, strict-origin referrer policy) with a visible "Watch on YouTube" link to the watch URL. Other pages keep their screenshots. The hero laptop keeps its own launch video.

### Other changes

- Home hero is exactly one viewport tall at 900px and up (`min-height: 100svh`), tighter spacing at heights of 800px or less so it fits 1280x720.
- `.lp-xl` (Tivora page hero laptop) is capped at 92% of its container: at 1024px its base overhung the page by 14px (found during this round's overflow sweep, not caused by it).
- The old cross-fade script block and the trade-hover script block stay in `site.js` but now match nothing on the home page. Unused home-only CSS from earlier rounds (`.why5`, `.svc`, `.ctiles`, `.tgrid`, `.cvo` and friends) is still in `site.css`; it can be pruned in a later cleanup.
- README: client logo folder and the YouTube embed are listed as the third-party/asset notes.

### Round 9 QA (headless Chrome)

- `npm run build`, `npm run check:site` (18 pages) and `npm run check` pass.
- All 18 HTML files at 1440, 1024, 390 and 360: 0 console errors, 0 exceptions, 0 failed requests logged, 0 horizontal overflow, one H1 each, 0 broken images.
- Section heights (px) and total, 1440x900: hero 900, strengths 611, clients 637, suite 669, core 659, trades-home 520, support-services 520, coverage 580, solutions-teaser 520, faq 520, demo 537; page total 7,363 (target 7,650, was 11,237). At 1280x720: 720, 561, 579, 639, 625, 520, 520, 550, 520, 520, 520; total 6,964. At 1440x1000: total 7,526. Every section is at most one viewport tall at 1440x900, 1280x720, 1440x1000 and 1280x700; the tallest content sections (suite 639 to 678, core 625 to 668, clients 579 to 646) also fit under the header.
- Snap: `proximity`, scroll padding 72px; none under reduced motion, at 800px and at 390px. Anchors (`#strengths` through `#demo`, `#partners-band`) land with the section directly under the header. The bottom of the page and the footer are reachable. Keyboard (arrows, Page Down), 300px wheel steps and touch drags move on. Chrome's proximity range is one third of the viewport, so a single small precise-pixel wheel step (100px) that ends near a section start is pulled back to it; the hero is deliberately not a snap point so the first screen scrolls freely.
- Carousel: rotates every 7 s, does not rotate while hovered, previous/next/dots work, three lines at most per quote, no rotation under reduced motion (buttons still work). No JavaScript: all three quotes visible, controls hidden, everything else visible. Reduced motion: no hidden or animated states on the new sections, snap off, counters show final numbers.
- YouTube embed plays from http (checked on localhost). From `file://` YouTube answers with "Video player configuration error 153"; the "Watch on YouTube" link under the frame is the fallback.
- Screenshots: `hitech-review/v2/r9-home-1.jpg` to `r9-home-11.jpg` (one per section, 1440x900), `r9-hero-390.jpg`, `r9-clients-390.jpg`.

### Judgment calls (Round 9)

1. Contradiction in the brief: sections that each fill 100svh minus the header would make the page about 10,300px tall including the footer (11.5 viewport heights), not the 8.5 target. Sections are therefore content-sized with a 520px floor (`.home main > .sec { min-height: min(100svh - 72px, 520px) }`); change that one value to `calc(100svh - 72px)` to get full-screen sections at the cost of about 2,900px of extra page height.
2. Solutions and Partners were merged into one section (see point 1).
3. The product tiles on the home page lost their IRD chip (see point 5); the Tivora plate keeps it.
4. The three quotes keep their original wording; typographic quotation marks replace the straight ones.
5. Industry names stay links to tivoraerp.com in a new tab.

### Open questions for HiTech (Round 9)

- The YouTube video's own opening frame still reads "The ERP that works like your best manager". The video file needs a new title card if the old slogan must disappear completely.
- Client logos: Shikhar (Shikhar Insurance chosen, not verified), QFX Cinemas (brand mark only), Goenka Group, Rajesh Metal Crafts (low-resolution sources) are medium confidence in the manifest. Pashupati Paints, M. C. Group, Asian Pharmaceuticals and CTL Pharmaceuticals have no logo yet. Please confirm each before launch.
- Is the 100px-wheel pull-back of `proximity` snap acceptable, or should snap be switched off (remove the one `html.home` rule) or made `mandatory`?
- "Industry-specific implementations" and "Software training" in Support services have no description text anywhere; none was written.

---

## Round 8 (CEO request: partners page in the style of a reference partner page, 9 Oct 2026)

Only the layout patterns of the reference page were used (hero with type toggle and flow diagram, stat band, icon cards, numbered steps, form beside a pitch, closing band). No wording, images or branding were copied. Edits are in `_build/build.mjs`, `assets/css/site.css`, `assets/js/site.js`; `partners.html` was regenerated with `npm run build`.

### New `partners.html` order

1. **Hero** (same photo, H1, lede and both CTAs): an accessible tablist with three tabs, Reseller, Distributor, Contractor (arrow keys, Home, End, sliding underline). Each panel has one neutral sentence and an "Apply as a ..." button that sets the form type and scrolls to the form. Under it an animated flow, You, HiTech products, Customers across Nepal, with the 12 partner city names as chips. The tab only changes the label under "You". Without JavaScript the tablist is hidden and all three panels show stacked.
2. **Why partner with HiTech**: four icon cards using the existing Priority partner benefits wording (Exclusive opportunity registration, Technical training, Technical support, Sales incentives) and the existing Partner Connect line.
3. **Stat band** with count-up: 28+ Years, 10,000+ Clients, 22 Branches, 100+ Team members, 12 Partner cities (all existing site numbers).
4. **What you bring**: the five existing partner responsibilities (only five exist).
5. **Products you will offer** (`#ca`): logo plates of the seven product pages, each linking to its page, then the existing IRD chips "Built for the people who check the books" (Swastik is IRD certified).
6. **Partners across 12 cities** map: unchanged.
7. **How to apply**: three numbered steps (Fill the application, HiTech contacts you, Discussion on WhatsApp or phone). No timelines.
8. **Apply now**: the same partner form, same fields, same pipeline, same WhatsApp button, beside a navy pitch panel ("Partner terms are shared after a conversation.").
9. **Closing band**: "Talk to HiTech on WhatsApp." with the existing wa.me link (white button on navy).

`partners.html#become-a-partner?type=reseller` (or distributor, contractor) selects the tab and the form type in JavaScript. Hero tab changes also pre-select the form type; nothing is pre-selected on load.

### Removed from the page to keep the length

The Customer, Channel partner, Priority partner arrow diagram, the orbit diagram in the hero, the three values (Simplicity, Choice, Innovation), the three benefits not shown (Partner recognition, Sales rewards, Technical collaboration), the Swastik editions chips, the second IRD chip group, the "Book a CA walkthrough" button, the side contact card next to the form (contact details remain in the footer and on Contact), and the second "Become a partner" button. Anchors `#ca`, `#partner`, `#network`, `#become-a-partner` still exist.

### Left out on purpose

**Tiers and earnings sections of the reference page (growth tiers, "Most popular" badge, "How you earn"), the "going it alone versus with us" comparison, onboarding fees and any new statistic were left out until HiTech supplies the terms.** No definitions, commissions, margins, fees or timelines were written for Reseller, Distributor or Contractor.

### Round 8 QA (headless Chrome)

- `npm run build`, `npm run check:site` (18 pages) and `npm run check` pass.
- 0 console errors and 0 exceptions at 1440, 1024, 390 and 360. No horizontal overflow, one H1 at all four widths.
- Page height at 1440: 5,225 px before, about 5,530 px now (+5.8 percent, limit 15). At 390: 9,696 px before, about 9,680 px now.
- Tablist: Right, Left (with wrap), Home and End move focus and selection, roving tabindex, one panel visible, diagram label follows, form type follows.
- Form against a mock endpoint with `window.open` stubbed: empty submit and missing type are blocked; success, server error with the tab open, server error with the tab blocked, success with the tab blocked and the honeypot all behave as in Round 7.
- No JavaScript: all three panels, the stats, the flow, the steps and the form are visible. `prefers-reduced-motion: reduce`: no animation or hidden states, stats show final numbers.
- Screenshots: `hitech-review/v2/r8-partners-1440*.png` and `r8-partners-390*.png`.

### Open questions for HiTech

- Definitions and terms for Reseller, Distributor and Contractor (the page deliberately has one neutral sentence each).
- Whether the Priority partner benefits apply to all three types.
- Whether to keep the Swastik editions list and the other IRD chip group, removed here for length.

## Round 7 (CEO changes, 8 Oct 2026)

Nine tasks. All changes are in `_build/build.mjs`, `assets/css/site.css`, `assets/js/site.js`, `lead-endpoint/` and the map data scripts, then regenerated with `npm run build`. No generated HTML was edited by hand. New helper files: `_build/check.mjs` (`npm run check:site`), `_build/make-map.mjs` and `_build/npl10.json` (map regeneration).

### Per task

**1. Tivora dashboards never cropped.** Every dashboard image now uses its real aspect ratio and `object-fit: contain`: the mega-menu card (`.pf-img`, aspect 1918:933), the home bento tile (`.tc-img`, moved fully inside the tile instead of bleeding off two edges), the home highlight laptop (`.tv-lap .lp-screen`, aspect 1918:933, four cross-fading screens), the Tivora page dashboard strip (natural height, always was). The hero laptop and the Tivora page hero laptop keep the 16:9 video (`cover`, unchanged). Measured: rendered image box against natural aspect is within 0.9 percent for every dashboard image at 1440, 390 and 360 (limit 2 percent).

**2. Tivora content from the brochure.** Home highlight, Tivora tile, mega-menu card, Solutions teaser card, meta descriptions and `tivora.html` were rewritten from `TiVora_ERP_Brochure (1).pdf`: "The ERP that works like your best manager", Intelligent / Integrated / Focused, fourteen modules on one database, My Work Desk, Executive Dashboard, role KPIs, single entry flows, approval and rule engine, MRP workbench, planned vs actual costing, IRD connected, and the seven industry solutions (Jewellery, Paint, FMCG, Pharmaceutical, Automobile, Trading, Manufacturing). `tivora.html` now has: hero, three pillars plus the 14 module chips, eight feature cards, the three real dashboard screens, the Nepal strip, the seven industry cards, demo form. The old six-module diagram and the "Coming later" pills (including Home appliances, which the brochure does not list) are gone. Not used, as instructed: "26+ years", "20+ support offices", "5+ countries", the brochure's sample screens, and its "launching soon" modules (CRM, Exports, Quality Control, HRM). Every Tivora link still goes to https://www.tivoraerp.com in a new tab.

**3. SEO.** Unique title (max 60) and description (max 155) on every page, enforced by the build (it throws on a violation) and by `npm run check:site`. One H1 per page; product page H1s now carry the keyword ("Swastik accounting software", "Avocare hospital management software" and so on). Added to every page: `og:locale en_NP`, `geo.region NP`, twitter title and description, og:image alt; the 404 page is `noindex`; `services.html` (the redirect) has title, description and an H1. JSON-LD: Organization (address, three contact points, sameAs) on home, About and Contact; WebSite and FAQPage (generated from the same list as the visible FAQ, checked for exact match) on the home page; SoftwareApplication on the seven product pages and `tivora.html`, no offers. `sitemap.xml` has `lastmod`. `robots.txt` unchanged. No meta keywords tag, no hidden text.

**4. Years.** Every "25+" became "28+": hero stat, Why HiTech tile, About stat, product strengths (Swastik, mySwastikonline, Bizant), About description. 15+ branches, 10,000+ clients and 100+ team unchanged.

**5. Phrase.** "Accounting software since 1998" became "Managing business in Nepal since 1998" in the hero eyebrow, the Why HiTech H2 (with its full stop), the About H1 and the About title tag.

**6. Branches.** 22 cities, numbered west to east: the home map, heading ("22", counted from the list), legend and `support.html` (map and phone table). Lahan replaces Siraha. Pin data was regenerated with `_build/make-map.mjs` (all pins are inside the border). `support.html` table: Mahottari removed (not in the 22), Chitwan, Katari, Udayapur, Rautahat, Birtamode, Simara, Hetauda, Dharan, Itahari, Nuwakot and Damak added without a phone number (the cell is empty for sighted users and reads "No number listed" to screen readers). Phone numbers of the cities that remain are unchanged. Pins stay on their true location; where two numbered badges would overlap, the badge is nudged away and a thin leader joins it to a small dot on the true location (nudging is computed in the build, scales with the map through `cqw`). Mobile pin badges are 18px and the pulse ring is off below 640px. Measured: no overlapping badges at 1440, 1024, 900, 820, 700, 390 and 360.

**7. Images and animation.** Photo banners (reused `kathmandu-street`, `devspace`, `cafe-tablet`; all already on the site, no new image files) on About, Careers and Solutions, with the existing parallax. `jewelry.jpg`, the one unused photo, is now the background of the Tivora industry section. New: hover lift on cards (`.card`, `.icard`, `.mod`, `.w5`, `.app`, `.fg`), slow float on the Tivora laptops and the phone mockup, stroke-draw on the Why HiTech icons (shapes get `pathLength="1"` in the build, animated only under `.anim`), reveal stagger capped at 8 steps. Hero-photo parallax already existed for every page hero (`.bgl i`); kept. All of it is CSS plus the existing reveal system and is off under `prefers-reduced-motion` (animation and transition are already zeroed there; the new hover, float and draw rules are also listed).

**8. Mobile apps (Solutions).** New `#mobile-apps` section on `solutions.html`: CSS phone mockup (no screenshot, no invented numbers) beside four cards: Bizant Owner app, Bizant Sales app, Bizant Customer app, Tivora ERP Work Desk. Sources: `Marketing Content\Mobile App\Bizant.pdf` and `Mobile app.txt` (owner and sales features, Google Play link), `ERP Proposal.docx` (customer app: order, reports, outstanding), the Tivora brochure (approve from the Work Desk wherever you are), `mySwastikonline.com_ (1).pdf` (books on any device). Buttons: "Get Bizant on Google Play" (new tab) and "Request a demo" (`data-interest="Mobile apps"`, opens the popup preset to a new "Mobile apps" option, which was added to every "Interested in" list). Added "Mobile apps" to the Solutions column of the footer and a sub-navigation on the Solutions page (ERP, Application software, Customized software, E-commerce, Mobile apps). There is no Solutions mega-menu on the site (Solutions is a plain link), so none was changed; see open questions.

**9. Partner form.** `partners.html#become-a-partner`: full name, business or company name, phone, email (optional), city, type of partnership (radio: Reseller, Distributor, Contractor, required), current line of business, message (optional), honeypot, "Send on WhatsApp" with the WhatsApp glyph. It uses the shared pipeline in `site.js` (same `window.open` to wa.me with the labelled fields, same JSON POST, same success and error panels). `lead.php` accepts `partnerType` (only the three values) and `business`, labels "Partnership type" and "Line of business", subject "Partner application: <type> from <name>". `check.mjs` extended; `npm run check` passes. Both existing "Become a partner" buttons (partners hero, end of Partner Connect) go to `partners.html#become-a-partner`; the nav and footer have no such button. The generic popup, call-back strip, contact form and the older "Partner inquiry" form further down `partners.html` are untouched.

### Round 7 QA (headless Chrome, light theme only)

- Console errors: 0 on all 18 HTML files (17 pages plus the services redirect) at 1440, 390 and 360, both with motion and with `prefers-reduced-motion: reduce`. Horizontal overflow: 0 at 1440, 390 and 360. Fonts: Poppins only. Broken images: 0. Images without alt attribute: 0. H1 count: 1 on every page.
- Dashboards: rendered image box against natural aspect, worst case 0.82 percent (limit 2) for `dashboards.jpg`, `exec-dash.jpg`, `sales-dash.jpg`, `home-paint.jpg`, `home-jewelry.jpg` in the mega-menu card, the home tile, the home laptop and `tivora.html`, at 1440, 390 and 360. All use `object-fit: contain`; the home and Tivora hero laptops that play the 16:9 video are unchanged.
- Map pins: no overlapping numbered badges on the home map, the Support map and the Partners map at 1440, 1024, 900, 820, 700, 390, 360 and 330.
- Home page height at 1440: 11,037 px after Round 6, 11,237 px now (+1.8 percent, limit 5). Home visible words 881 (limit 900).
- `npm run build`, `npm run check` (lead endpoint) and `npm run check:site` pass. `check:site`: 18 pages, titles at most 60 and unique, descriptions at most 155 and unique, every JSON-LD block parses with `JSON.parse`, the FAQPage matches the eight visible FAQ items exactly, no dead links or anchors, no duplicate ids, no em or en dash, no "Accounting software since 1998", no "25+", no "head office", no "Launching soon", "Siraha" and "Mahendranagar" only on `partners.html`, "Pharmacy" only as the Avocare module label.
- Partner form against a mock HTTP endpoint with `window.open` stubbed: native validation blocks an empty submit and a missing partnership type; success posts JSON with `name, company, phone, email, city, partnerType, business, message, inquiry, page, ts` and opens `wa.me/9779709117067` with labelled lines (Name, Email, Phone, City, Company, Partnership type, Line of business, Inquiry for, Message, Page); server error with the tab open shows the "ready in WhatsApp" panel, server error with the tab blocked shows the red error panel and keeps the input, success with the tab blocked shows the thank-you panel; a filled honeypot opens nothing and posts nothing. `lead.php` was not executed (no PHP on this machine).
- "Request a demo" in the Mobile apps section opens the popup with "Mobile apps" selected. Google Play link opens in a new tab.
- Reduced motion: no `.anim` class, 0 running animations, no hidden text on home, Solutions, Partners, Tivora and About; Why HiTech icons are drawn complete. No JavaScript: no hidden text on nine pages checked (home, Solutions, Partners, Tivora, About, Careers, Support, Products, Bizant), all new sections visible.
- Screenshots (1440 and 390) are in `hitech-review/v2/` as `r7-*.png`: home, Solutions, Partners, Support, Swastik product page, Tivora page. The 390px home screenshot is cut at 16,000 px (browser limit).

### Judgment calls (Round 7)

1. Siraha: the Family Computer partner is listed in Siraha on the Partners network list and map, which is a partner location and not a branch, so `partners.html` keeps "Siraha" (like "Mahendranagar") and the map data keeps a partner-only `siraha` pin. The branch Siraha is gone everywhere.
2. SEO wording: used "IRD certified" only, never "verified" or "approved", because "certified" is the confirmed wording. "KOT" is in no source file, so Swastik Restaurant says "kitchen display" (a confirmed feature) and not "KOT".
3. Fourteen modules: the brochure says "fourteen modules" on page 2 but lists sixteen working areas on page 11 (plus four "launching soon"). The site lists the first fourteen (Work Desk to Tax and IRD) and leaves out Reports Centre and Control Panel.
4. Industry list: the brochure's seven industries replace the old packs. "Home appliances" and every "Coming later" label were dropped because the brochure does not mention them. The "Alanza" name no longer appears on the home page or `tivora.html` (the brochure says Jewellery); it stays in the "Interested in" option and the Jewellery trade link.
5. All seven industry pills and cards link to https://www.tivoraerp.com in a new tab (before only Alanza did).
6. The hero eyebrow "Managing business in Nepal since 1998" has six words, over the four-word eyebrow budget; it is the CEO's exact phrase.
7. Tivora pillar and feature texts were shortened to the card and chip word budgets.
8. Partner form: email is optional (like the other forms), everything else except message is required.
9. Photo banners are decorative (no text, `aria-hidden`), because About, Careers and Solutions already have hero photos and their text is already in the page.
10. `sitemap.xml` `lastmod` is the build date; set `LASTMOD=2026-10-01 npm run build` to override.
11. Pin badge nudging uses 66 map units as the minimum distance, so leaders are a little longer on desktop than strictly needed; this keeps every size clear.
12. Hover lift, float and icon draw were added only where listed; hero-photo parallax already existed.

### Open questions (Round 7)

1. Branches: the stats still say "15+ branches" (unchanged, as instructed) while the map now says "22 cities". Should the stat change?
2. The Partners network still lists "Family Computer, Siraha". Keep it, or show the town as Lahan?
3. There is no Solutions mega-menu (Solutions is a plain link), so "Mobile apps" went into the footer and a new Solutions sub-navigation instead. Should Solutions become a dropdown?
4. Is "KOT" (kitchen order ticket) a real Swastik Restaurant feature? If yes, it can go into the Restaurant page and its title.
5. The older "Partner inquiry" form at the bottom of `partners.html` still exists next to the new "Become a partner" form. Remove it?
6. Mahottari was removed from the Support phone table (not one of the 22); its number 9814861926 is gone with it. Phone numbers are missing for 11 branches (Chitwan, Katari, Udayapur, Rautahat, Birtamode, Simara, Hetauda, Dharan, Itahari, Nuwakot, Damak).
7. What does "Contractor" mean as a partner type (no description on the page, none invented)?
8. The brochure says "26+ years" and the CEO says 28+; the site uses 28+. The brochure also gives "10K+ clients" and "100+ team", which match.

### Observations, not changed (Round 7)

- At a 1100px viewport the header buttons overflow the page by about 50px (`.nav-r`); not part of this round.
- `tivora.html` is still unlinked and not in the sitemap (README).
- `lead.php` could not be run here; check it on the PHP host with the curl line in `lead-endpoint/README.md` and one partner form submission.

---

### Round 7 follow-ups (CEO decisions, 9 Oct 2026)

These supersede the matching judgment calls and open questions above (Siraha, 15+ branches, Solutions menu, older partner form, branch phone numbers).

1. **Branch stat.** "15+ Branches" is now "22 Branches" (hero proof row, About stats, About meta description, Swastik strength chip "22 branches across Nepal"). All of them read the length of the branch list in `build.mjs` (`NBR`), so they always equal the map count. The count-up no longer adds a "+".
2. **Lahan for the partner.** The Family Computer partner shows "Lahan" in the Partners list and map. The partner-only Siraha pin is removed from the map data (`make-map.mjs` re-run). The site has 0 hits for the old name; `check.mjs` fails the build check if it returns.
3. **No branch contact details.** The Support "Branch phone numbers" table (and its CSS) is deleted; the 22 branch names remain in the map legend. No other page had branch numbers, map tooltips show names only, and JSON-LD only has the company contact points. Company Contact Us details (phone, email, WhatsApp, address) are unchanged on Contact, Support cards, footer and contact cards.
4. **One partner form.** The old "Partner inquiry" form is deleted from `partners.html`; the "Become a partner" form sits in its place at the bottom (`#become-a-partner`). Both "Become a partner" buttons still point to it. The "Book a CA walkthrough" button used the old form's `#form` anchor; it now opens the call-back popup preset to Swastik (without JavaScript it goes to `contact.html#demo` with the CA option selected). No form JS or CSS was unique to the old form (the shared demo form is still used on other pages), so nothing else was removed.
5. **Contractor.** The partner type "Contractor" stays as a bare option with no description. The CEO will send specifics later; add them to the form note or a short line under the radio group then.
6. **Solutions dropdown.** Desktop: the "Solutions" label is a link to `solutions.html`; a chevron button beside it opens the panel (same panel, hover, click, Escape and focus-out handling as Products and Company). Entries: How we work, ERP, Application software, Customized software, E-commerce, Mobile apps, each with a one-line description taken from existing text and linking to `solutions.html#...`. Mobile menu: a "Solutions" group with "All solutions" first, then the same entries. The Solutions page sub-navigation uses the same list. Footer unchanged (it already lists the sections and Mobile apps).
7. **Header overflow.** At 1100 to 1239px the Contact link in the header is hidden (it stays in the Company menu and the footer) and item padding is tighter. No overflow at 1440, 1240, 1100, 1024, 390 and 360 on home, Support, Partners, Solutions and About.

QA: `npm run build`, `npm run check:site` and `npm run check` pass; headless Chrome, 0 console errors and 0 horizontal overflow on those five pages at the six widths above; home height unchanged at 1440 (11,237 px). Screenshots in `hitech-review/v2/`: `r7-index-solutions-menu-1440.png`, `r7-index-menu-390.png`, refreshed `r7-support-*` and `r7-partners-*`.

---

## QA run (Phase A, light theme only)

- Console errors: 0 on all 17 pages at 1440 and 390 and 360. Horizontal overflow: 0 at 1440, 390, 360. Fonts: Poppins 400, 600, 700 only. Reduced motion: no running animations and nothing hidden on all pages.
- Contrast (text on flat backgrounds): 0 failures on all pages. Text over photos: 31 of 32 page and width scans have 0 failures; the one flag (index at 1440, the word "software" in the Why HiTech heading) is a measurement artefact, because the heading's word-reveal mask box overlaps the top edge of the navy "No.1" tile by a few pixels. The text itself is dark navy on the pale photo wash.
- Copy gate clean. Index visible words: 869 (limit 900). Links, anchors and ids: no dead links, no duplicate ids. Sitemap lists 15 existing pages and not `tivora.html`.
- Keyboard: skip link first, every control has a visible focus indicator, mega menus open with Enter and close with Escape. No JavaScript: all new content (tiles, Why HiTech, eZee, "Watch on Facebook" link) is visible.
- Screenshots (1440 and 390, every page) are in `hitech-review/v2/`, plus `index-hero-1440/1024/390.png`.

## QA run (Phase B, final, light theme only)

- Console errors: 0 on all 17 pages at 1440, 390 and 360. Horizontal overflow: 0 at 1440, 390 and 360 (the earlier 1px overflow of the map at 360 is gone). Fonts: Poppins 400, 600 and 700 only on every page. Reduced motion (emulated): no running animation and nothing hidden on all 17 pages.
- Contrast: 0 failures on flat backgrounds on all pages; the only flag is the off-screen honeypot label (aria-hidden, never seen). Text over photos: 0 failures at 1440 and at 390 except the numbers inside map pins 9 to 11 and 13 on the 390px home map, where neighbouring pins overlap (see Judgment calls 22); the legend lists every city.
- Copy gate clean (no dashes, no banned words); grep gates: 0 hits for every listed term, with the one intended `Pharmacy` (Avocare module label, P8 correction), 0 hits for `data-theme`, `data-mode`, `hitech-theme`, `prefers-color-scheme`, "Switch to", "Light mode", "Dark mode", "Request a call back", "head office". `Mahendranagar` only on `partners.html`. All Tivora ERP links go to `https://www.tivoraerp.com` (80 links, new tab). Sitemap lists the 15 existing pages. No dead links or anchors, no duplicate ids.
- Popup (accelerated timers, 10 times faster): appearances at 8.6 to 9.8 s, then 15.0 s, 15.3 s, 15.2 s after each dismissal, then 180.7 s. Not while typing in a field (deferred), not on `contact.html`, Escape and overlay click close, focus is trapped (Tab and Shift+Tab stay inside) and returns to the opener, body scroll lock, `role="dialog"` with `aria-modal`. Demo buttons preset "Interested in" (Swastik, eZee).
- Lead forms (mock servers, `window.open` stubbed open or blocked): working endpoint, failing endpoint (500) and no server (file://) each give the right panel in both the tab-opened and tab-blocked case; input is cleared on success and kept on error; the honeypot is not posted. `node lead-endpoint/check.mjs` passes. `lead.php` itself was not executed (no PHP here).
- Home page height at 1440: 15,206px before Phase B, **11,037px after (72.6 percent, target at most 75)**. Tivora highlight section 544px (limit 560).
- Screenshots (1440 and 390, light) of all 17 pages, the home and Partners maps (mid-draw, mid-pins, finished, at 1440 and 390), and the popup and strip, are in `hitech-review/v2/`. The dark-theme screenshots were deleted with the theme.

## Per-point entries

### P1. Remove Gurukul (done)
- Deleted `product-gurukul.html` (generator entry, product data, background photo mapping, preload).
- Removed Gurukul from: both nav menus and the mobile menu, footer Products column, home product grid, products page directory, hero logo strip, "Interested in" option on every form, sitemap, related-product tiles (Pharmasoft and Avocare each now show one related product), trade finder, "By trade" icon list on home.
- Removed the trade "Schools and colleges" (the trade list is now 11 trades). Products page hero lede no longer lists "schools". Category tab "Healthcare and education" became "Healthcare" (see Judgment calls).
- The `gurukul` line icon was renamed `grad` (graduation cap) because it is still used for HiTech's own "Training and implementation" chips (Pharmasoft, Avocare), the Support "Training" card, and Partner Connect "Technical training". These are unrelated to the Gurukul product.

### P4. Tivora ERP is no longer "launching soon" (done)
- Removed the announcement bar from every page (markup and its JS dependency made null-safe).
- Removed every "Launching soon" pill and phrase: Tivora bento tile, trade packs, Tivora mega-menu feature card, hero caption, Tivora page eyebrow, core band eyebrow, products-page trade buttons, meta descriptions.
- Hero video caption chip is now "Tivora ERP". Video `aria-label` is "Tivora ERP video. Sound is off." on the home hero and the Tivora page. The play button label is "Play the Tivora ERP video".
- Alanza, Paint and Trading trade packs carry no pills. "Coming later" packs (FMCG, Automobile, Home appliances, Pharma) are unchanged.
- No page says "launched" or "new" about Tivora ERP. The Tivora bento tile keeps its large navy 2x2 size; its category label is now "ERP" (was "The new platform").

### P5. All HiTech products are IRD certified (done)
- New "IRD certified" badge (shield-check icon + text) on every product tile (home grid, products page), every product-page hero (next to the delivery badge), the related-product tiles on product pages, and the Tivora ERP tile.
- "Built for Nepal" fine print is now "All HiTech products are IRD certified." (home and `tivora.html`). The caveat sentences ("not been completed", "ask us for its current status") no longer exist anywhere.
- Statement added to the new Why HiTech section and to FAQ 4 on the home page.
- Feature statements such as "CBMS e-invoicing" are unchanged.

### P6. Home is not all about Tivora (done, except items waiting for Phase B)
- Hero: eyebrow "Accounting software since 1998". H1 unchanged. Lede: "Accounting, billing, POS, restaurant, pharmaceutical and enterprise software for Nepal's businesses." Buttons: "Request a demo" (opens the inquiry popup, P19; links to `contact.html#demo` without JavaScript) and "Explore products" (`products.html`). Laptop, video, photo and proof row untouched. "Also from HiTech" is now the 5 x 2 logo grid (P18).
- Section order: hero, Our clients, HiTech suite, Tivora ERP highlight (compact, P3), Built for Nepal, By trade, Why HiTech, Our branches (map, P11), Software built your way (existing teaser, kept), Partners band, FAQ, demo form.
- Removed from home: "How we work", "The difference", the old marquee, "Trusted by 10,000+ businesses", the customer-voices section (moved into Our clients), the plans band.
- `index.html` title: "HiTech Solutions and Services | Accounting and business software for Nepal". Meta description exactly as specified.
- About page: "Our products" lede no longer says "Launching Tivora ERP, our new platform". It now reads "The full HiTech suite, including Tivora ERP."

### P7. Jewellery spelling (done)
- Trade name, trade id (`trade-jewellery`), form option "Tivora ERP: Alanza (jewellery)", Alanza trade-pack subtitle. `grep -i jewel` over the generated HTML finds only "jewellery"/"Jewellery" in text, plus the image path `assets/img/home-jewelry.jpg` (file name, allowed).

### P8. Pharmaceutical (done)
- Trade "Pharmacies" is now "Pharmaceutical sector" (id `pharmaceutical`). Category label "Pharmacy" is now "Pharmaceutical".
- Pharmasoft tile: "Accounting and inventory for the pharmaceutical sector." Pharmasoft hero lede: "...for the pharmaceutical sector, in single-user and network versions."
- Correction in Phase B: the Avocare module that the source calls "Pharmacy" is shown as "Pharmacy" again. P8 covers the sector wording, not a module name. This is the one remaining hit of `Pharmacy` in the grep gates (`product-avocare.html`, Modules group).

### P9. Home removals and the 1998 line (done)
- "How we work" and "The difference" removed from the home page. "How we work" stays on `solutions.html`.
- "Business software, built in Kathmandu since 1998." is now "Accounting software since 1998." on the Why HiTech heading and the About H1. Hero eyebrow is "Accounting software since 1998" (no trailing period, eyebrow style).
- `about.html` title tag changed to match: "About HiTech | Accounting software since 1998".

### P10. Why HiTech (done)
- New section replaces the old tiles: kicker "Why HiTech", H2 "Accounting software since 1998.", the specified lede, five stat tiles with icons and count-ups (navy anchor tile "No.1 Business Solution Provider of Nepal", 25+ Years of experience, 10,000+ Clients, 20+ Partners, 100+ Dynamic team members), the IRD statement, four "Support service" icon cards (Live chat support, Onsite support, Industry-specific implementations, Software training) and the two-sentence closing line verbatim.
- The "Built in Nepal, for Nepal / One vendor, every trade / Support that stays" tiles and the 14-city chips inside them are gone (the branches band is its own section, now the map).

### P12. Testimonial video (done)
- In `#clients`: Facebook video plugin iframe for `https://www.facebook.com/reel/956488536764696` with the exact query string, attributes, title and `loading="lazy"` from the spec, `src` set by JS when the section is within 600px of the viewport (`site.js`). Width up to 340px (full width up to 360px on mobile), 9:16.
- "Watch on Facebook" link under it opens the reel in a new tab. The three existing quotes (verbatim, same order and styling as before) are stacked beside the video.
- Note: Facebook controls autoplay and looping inside its own player. The site requests autoplay muted through the URL. Browsers may still block autoplay until the visitor taps play.

### P13. Plans removed (done)
- Deleted `plans.html`. Removed the plans nav entries, mega menu, footer link, sitemap entry, home plans band, "See the plans" buttons, the "Which plan do I need?" FAQ, and the Alanza plans band (the Alanza page itself is gone, see P17). No "Standard / Business / Enterprise" plan wording remains (the partner name "CSE Enterprises" is unrelated).

### P14. HiTech FAQ (done)
- Home FAQ is now the 8 verbatim items, eyebrow "HiTech FAQ", heading unchanged ("Straight answers before you call."). The Tivora FAQ is removed from every page including `tivora.html`.

### P15. Full address (done)
- "4th Floor, Divine Complex, Kalimati Chowk, Kalimati, Kathmandu, Nepal" in the footer (every page), both contact-card variants (home demo card, all other pages), and the contact page. JSON-LD `streetAddress` is "4th Floor, Divine Complex, Kalimati Chowk, Kalimati", locality Kathmandu. There is no `<noscript>` address and no other address in meta tags. Phone and email unchanged.
- The Contact page meta description says "in Kalimati, Kathmandu" (a description, not an address block); left as it was.

### P17. Tivora ERP links go to www.tivoraerp.com (done)
- Header "Tivora ERP" is a plain external link with a small arrow and a hidden "(opens in a new tab)". Same in the mobile menu and footer. The footer Tivora column is now one link, styled as the column heading.
- Every other Tivora link (tile, "Explore Tivora ERP" buttons, Solutions ERP button, Alanza pack, trade-finder buttons, mega-menu feature card, About page chip, 404 page list) points to `https://www.tivoraerp.com` with `target="_blank" rel="noopener"`.
- Deleted `alanza.html`, `plans.html`, `security.html`, `clients.html`. `tivora.html` is kept: nothing links to it, it is not in `sitemap.xml`, and P4, P5, P7, P13, P14 fixes are applied to it. The `services.html` redirect stays.

### P18. Product logos (done)
- White rounded logo plates (always white) replace line icons on: home and products tiles, product-page hero plate (large, `object-fit: contain`), related-product tiles. Logos are never recoloured or distorted. Mega-menu rows keep line icons. Tivora ERP keeps its icon.
- Bizant uses `assets/img/logos/bizant.png`. The old `assets/img/bizant.png` is no longer referenced (the file is still on disk, retired).
- Hero "Also from HiTech": 5 x 2 grid of 88 x 56px white tiles, each a link with a name and category tooltip on hover and focus: Swastik, mySwastikonline, Swastik POS, Swastik Restaurant, Pharmasoft, Avocare, Bizant, HiTech Payroll, HiTech Smartsuite, eZee (links to `products.html#ezee`).

### P20. Strengths and features on every product page (done)
- Each of the 7 product pages has "Strengths of <Product>" (icon chips; first four are always the shared strengths) and "Features of <Product>" (existing groups kept, new groups added from the sources). Sub-nav now reads Strengths, Features, Related products, Request a demo.
- Sources used are listed in the hand-off report. Nothing was added that is not in a source. The 25+ years figure is used where the source said "20+" or "15+".
- Bizant has a "Get it on Google Play" button (`https://play.google.com/store/apps/details?id=com.hitech.hitechcrm`, new tab).
- HiTech Payroll and HiTech Smartsuite have no product page in the site (they are tiles that link to the contact page), so no page was added for them (see Observations).

### P21. eZee (done; the Partners map is in the Phase B section below)
- Removed the "Technology partners" section from `partners.html`, its anchor and every link to `#tech`.
- New `#ezee` section on `products.html` between the directory and the by-trade finder: kicker "Authorized dealer", H2 "eZee hospitality software.", the specified lede, eZee logo on a white plate, navy panel with a cyan top rule, the stat "10,000+ hotels in 160+ countries use eZee worldwide", seven product cards plus the small "Appytect: mobile app builder" card (no relationship claim), and the "Ask about eZee" button (`contact.html?interest=eZee%20hospitality%20software#demo`, with `data-interest` ready for the Phase B popup).
- Mega menu, footer and trade finder entries now read "eZee (authorized dealer)" and link to `products.html#ezee`. The "Interested in" option "eZee hospitality software" is on every form. No page calls eZee a partner.

### P22. Company, Careers, Clients (done)
- Deleted `clients.html`. New home section `#clients` titled "Our clients" with the 11 client names as typographic tiles in the specified spelling. Footer "Clients" link goes to `index.html#clients`.
- Careers is a top-level nav item (desktop and mobile). The Company dropdown contains About HiTech and Contact. Removed the Benefits block from `careers.html`; the "Send your CV" button that lived in that block was kept under the open roles.
- Footer Products column gained "eZee (authorized dealer)" (P21). Sitemap lists 15 existing pages.

## Phase B entries

### Phase A corrections (done)
1. Avocare module label is "Pharmacy" again (see P8).
2. The empty cell in the 11-trade grids is fixed: when the last item would sit alone in a row it spans the free columns (3 columns on desktop, 2 on tablet, none on phones). Home "By trade" grid and the products-page trade list.

### P2. Compact layout (done)
- Section padding `clamp(40px, 5vw, 72px)` (was 64 to 120). H2 `clamp(28px, 3.4vw, 44px)` (was 32 to 56). Home hero minimum height `max(560px, 80vh)` (was 640 / 88vh). Inner-page hero padding `clamp(40px, 5vw, 72px)` top and `clamp(36px, 4.5vw, 56px)` bottom.
- Heading-to-grid margins reduced (56 to 40, 48 to 32, 40 to 28), wide column gaps 64 to 40 and 48 to 40, card, tile, quote and contact-card padding 28 and 32 to 24. Grid gaps were already 12 to 16. The 8px and 4px grid and the type scale are unchanged.
- Home page height at 1440: **15,206px before Phase B (11,047 to 11,069px after, 73 percent)**. Before the whole of Revision 6 the Tivora scroll band alone added several screens.

### P3. Tivora ERP highlight (done)
- Replaces the tall sticky 4-step band. Navy, non-sticky, two columns (7/12 and 5/12): kicker "Tivora ERP", H2 "One platform. Every business.", the existing one-sentence lede, four icon chips, trade-pack chips (Alanza links to tivoraerp.com; Paint and Trading; FMCG, Automobile, Home appliances and Pharma marked "Coming later"), button "Explore Tivora ERP" (external). Right: one laptop frame cross-fading through the four real screens (dashboards, home-paint, Alanza jewellery home, sales dashboard) every 4 seconds, with 4 dots. It pauses on hover and focus, dots switch screens, it runs only while on screen, and under reduced motion the first screen stays.
- Section height 544px at 1440 (limit 560), 72px top and bottom padding, thin top and bottom rule. The unused scroll-story script was removed from `site.js`. The "Alanza" image alt now says "jewellery".

### P11. Branches map (done)
- Home `#branches`-style section (`#coverage`): kicker "Our branches", H2 "14 cities across Nepal.", the 14 cities exactly as listed (numbered west to east: 1 Nepalgunj, 2 Surkhet, 3 Dang, 4 Butwal, 5 Pokhara, 6 Chitwan, 7 Birgunj, 8 Rautahat, 9 Janakpur, 10 Siraha, 11 Katari, 12 Udayapur, 13 Biratnagar, 14 Birtamode). No Kathmandu pin, no "head office" wording anywhere, Mahendranagar is not a branch.
- Map data comes from `assets/data/nepal-map.json` and is inlined into the HTML at build time (no runtime dependency, works over file://). Outline stroke is indigo, 6 percent tint fill. The map is `role="img"` with a text alternative listing the cities.
- Animation, once on reveal: outline draws (2.2s), fill fades in, pins drop in west to east 150ms apart with a bounce, each pin has a soft pulsing ripple (2.4s loop, paused off-screen), and a faint shimmer sweeps across every 6s. Under reduced motion everything is static.
- Numbered pins plus a two-column legend (map 7/12, legend 5/12; stacked on tablet and phone, map first). Hovering or focusing a legend row highlights its pin and shows the city name; hovering a pin highlights its row. Legend rows are keyboard focusable.
- `support.html` coverage band uses the same component. Branch table: "(head office)" label dropped (the row is "Kathmandu"), Mahendranagar row removed, "Head office support" card is now "Kathmandu support". No phone numbers were added for new cities.

### P21 (Partners map) (done)
- `partners.html` `#network`: the card grid is replaced by the same map component with the 12 partner locations, numbered 1 to 12 in the original list order, legend "partner name" and city. "12 partners" numeral and both HTML comments kept. Mahendranagar appears here only as a partner location.

### P16. Dark and light mode (removed at CEO request)
- The dark theme was built and then cancelled by the CEO. The site is light only, as it looked after Phase A. Removed: the header and mobile-menu toggle, the `hitech-theme` localStorage handling, the inline head script, the whole generated dark CSS block, `_build/gendark.py` and `_build/dark-manual.css`. `:root` now has `color-scheme: light`. No replacement was added and no light colours were changed.
- Side effect: the old `data-theme="dark"` attribute that marks the navy sections (it existed before this revision and is not a theme) was renamed `data-tone="navy"` in the build, CSS and JS, so the site has no `data-theme` at all. Looks are unchanged.
### P19. Inquiry popup (done)
- Modal on every page except `contact.html` (the markup is not even included there). Fields: Name (required), Mobile (required, tel), Email, Interested in (same options as the main form), Message (3 rows), hidden honeypot, source recorded as the page file name. Button "Send on WhatsApp" (see P23), heading "Talk to HiTech.", line "Tell us what you run and we will call you."
- Close button, overlay click and Esc close it; focus is trapped inside and returned to the opener; `role="dialog"`, `aria-modal="true"`, labelled by the heading; body scroll is locked; no animation under reduced motion.
- Schedule (kept in `sessionStorage` so it continues across pages): 10 seconds after landing, then 15 seconds after each of the next three dismissals (4 appearances), then every 3 minutes until a request is sent. After a send there are no more automatic popups. It waits 5 seconds and retries while the visitor is typing in any field or a menu is open, and it does not run while the page is hidden. "Interested in" is preset from the button's `data-interest` or the page's product.
- Test hook: `window.__leadPopupTest` (`first`, `again`, `long`, `defer` in milliseconds, and a `log` array). It is read if present and never set by the site.

### P23. Lead capture (done; behaviour mirrors the live hitechnepal.com.np)
- The live site's demo form posts to its server and also opens WhatsApp with the inquiry; the new forms do the same. One shared pipeline in `site.js` serves the demo form, the contact page form, the call-back strip and the inquiry popup. On submit it checks the required fields (name, mobile) and the honeypot (`website`; a filled value is dropped, nothing is sent), then:
  1. in the same click handler, before any `await` (so popup blockers allow it), opens `https://wa.me/9779709117067?text=<encoded message>` in a new tab (`window.open`, opener cleared, link rel is `noopener noreferrer`). The message is one field per line: Name, Email, Phone, City (where the form has it), Company, Inquiry for, Interested in, Message, Page (URL), blank fields left out;
  2. POSTs the same data as JSON `{name, company, phone, email, city, inquiry, interest, message, page, ts}` to `LEAD_ENDPOINT` (default `lead-endpoint/lead.php`, relative, 8 second timeout).
  Both always run, even if one fails.
- Result panel (in the page, no redirect): if the POST succeeded, "Thank you. We have received your inquiry and HiTech will call you back."; if only the WhatsApp tab opened, "Thank you. Your message is ready in WhatsApp: press send there and HiTech will call you back." (a judgment call: the inquiry is not received until the visitor presses send there, so the text says so). Both have an "Open WhatsApp again" button in case the tab was blocked. If neither worked (tab blocked and POST failed, including a page opened from disk) the panel is an inline error with the office phone 01-5389641, the WhatsApp number and an "Open WhatsApp" button, and the visitor's input is kept.
- **Submit buttons** on every inquiry form (popup, strip, contact page, demo form) now read "Send on WhatsApp" with a small white inline WhatsApp glyph (`aria-hidden`), in the brand gradient style and size. "Request a call back" and "Send request" no longer appear on the site (0 hits in generated HTML). The "Request a demo" nav and hero buttons are unchanged and still open the popup.
- `lead-endpoint/lead.php`: zero dependencies; accepts JSON or form posts, validates and length-limits fields, rejects honeypot hits, strips control characters and line breaks from header values (header injection), file-based rate limit per IP (5 per 10 minutes), `mail()` to `info@hitechnepal.com.np` (the sales and general address shown on the contact page; the site shows no separate sales mailbox), JSON `{ok:true|false}`; CORS only if `$ALLOWED_ORIGIN` is set. `lead-endpoint/README.md` has the upload, recipient and `curl` test steps and a short future-upgrade note (WhatsApp Business Platform for automatic delivery). `node lead-endpoint/check.mjs` checks that `lead.php` accepts every field `site.js` sends and that the labels match. **`lead.php` could not be run here (no PHP on this machine); it was written carefully and is untested, please test it on the host with the `curl` command in the README.**
- WhatsApp number as a plain link ("WhatsApp +977 9709117067") on the contact page and in the footer, next to the existing phones and emails; no other contact detail changed. Without JavaScript the forms do nothing special and the plain WhatsApp link is on the page.
- Tested with mock servers (working and failing endpoint) and with `window.open` stubbed to open or to be blocked: all six combinations show the expected panel; input is cleared on success and kept on error.
- Every link to `contact.html#demo` ("Request a demo", "Talk to HiTech", "Request a call", "See it on your own numbers") and the "Ask about eZee" button open the popup when JavaScript is on; without JavaScript they link to `contact.html`. Slim "Get a call back." strip (Name, Mobile, Interested in, button) above the footer on every page except `contact.html`, "Interested in" preset to the page's product.

## Observations, not changed

1. **Support branch table** still lists Mahottari and Lahan (not among the 14 listed cities) and Narayanghat and Bhairahawa (the map says Chitwan and Butwal). The six new map cities (Chitwan, Siraha, Katari, Udayapur, Rautahat, Birtamode) have no phone numbers in the table because none were supplied. Please confirm the table.
2. **HiTech Payroll and HiTech Smartsuite** have no product pages, so P20 could not be applied to them. The hero strip links them to `contact.html`, as their tiles already did. Payroll has a source deck (login, masters, attendance, salary sheet, pay slip) but it is a screen walkthrough with no marketing statements; Smartsuite has no source folder. Please confirm whether pages should exist.
3. **Bizant app count.** The page says "four apps for owners, agents, customers and influencers" (from the live site). The marketing source describes apps for the owner, the salesman and the customer only. Not changed.
4. **Source typos and spellings**: the source says "20+ years" (home Why HiTech uses the site's 25+). It also says "exclusive distributor" for eZee; the page says "authorized dealer" as instructed.
5. **Appytect** appears as a small card in the eZee section because the live site lists it with eZee. Please confirm HiTech's actual relationship with Appytect.
6. **Facebook video** may be blocked by tracking blockers or offline; the "Watch on Facebook" link is the fallback. Without JavaScript the frame stays empty.
7. (Resolved in Phase B: the empty cell in the 11-trade grids is fixed, see Phase A corrections.)
8. **Meta tags** `og:title` and `og:description` follow the page title and description, so they changed with them.
9. The home "By trade" teaser keeps the "Software, built your way" Solutions teaser (not mentioned in the 14.1 order). It sits between the branches band and the Partners band.
10. `tivora.html` still has its own hero video, trade packs and features; only the listed fixes were applied. It is unreachable from the site.
11. The unused CSS for the announcement bar, marquee, old Why HiTech tiles, customer-voices grid and the old Bizant plate remains in `site.css`. It is harmless and can be cleaned later.
12. The word "new" still appears in unrelated existing copy ("New technology, made clear" on About, "New ways to grow your business" on Partners, "Got a new challenge for us?" on Solutions, "build new applications" in the verbatim FAQ 5) and in the hidden "(opens in a new tab)" link text the spec asks for. None of it is about Tivora ERP.
13. The hero logo tooltips are hover and focus only; they are hidden below 1100px (the link still carries the name and category as its accessible name).
14. **WhatsApp cannot receive inquiries automatically.** HiTech uses the WhatsApp Business app, which has no server API, so the site mirrors the live site: it opens WhatsApp on the visitor's device (the visitor presses send) and also emails the inquiry through `lead-endpoint/lead.php`. Email is the only automatic channel. `lead.php` has to be uploaded to the PHP host and tested by HiTech. Automatic delivery into WhatsApp would need the WhatsApp Business Platform (Cloud API), which only HiTech can set up (see the README there).
15. **Two WhatsApp numbers in the footer.** The existing footer "WhatsApp" social link points to wa.me/9779810133468; the inquiry number +977 9709117067 was added next to the phones and emails. Both are kept; please confirm which should stay as the public chat link.

## Judgment calls

1. **Category tab label**: "Healthcare and education" became "Healthcare". With Gurukul removed, "education" is no longer true, and the point asks to drop text that lists schools because of Gurukul. The mega-menu column "Health, education, field" became "Healthcare and field" for the same reason.
2. **Tivora tile category label**: "The new platform" had to go (no "new"). It is now "ERP".
3. **FAQ eyebrow**: "HiTech FAQ".
4. **Alanza trade pack** used to link to `alanza.html`. That page is deleted, so the pack links to `https://www.tivoraerp.com`. Paint and Trading packs were not links before and are still not links.
5. **Related products**: removing Gurukul leaves one related tile on Pharmasoft and Avocare. No replacement was added (the point says to remove only).
6. **Bento grid hole**: removing Gurukul left an empty cell beside the Tivora tile. The Bizant tile spans two columns when the grid is unfiltered (same rule as the "Ask us" tiles) so rows stay complete.
7. (Superseded in Phase B: the Avocare module is "Pharmacy" again.)
8. **Duplicates skipped**: the Swastik source repeats "dedicated online and offline support", which is already one of the four shared chips, so it is not shown twice.
9. **Company dropdown "Contact" description** ("Talk to HiTech") is new micro-copy for the mega-menu row, taken from the contact page H1.
10. **Mobile menu**: Contact stays as a top-level link and is also inside Company, mirroring the desktop header (Contact on the right and in the dropdown).
11. **Plate sizes**: tile plates are full-width, 80px tall; the hero tiles are 88 x 56px as specified; product-page plate is the old square plate made white.
12. **Careers**: the "Send your CV" mailto button was kept (it was inside the removed Benefits section).
13. **Footer Tivora column** has no separate heading: the single link "Tivora ERP" is styled as the column heading so the columns stay aligned.
14. **Email/WhatsApp-sourced Avocare features**: only the module list from the Avocare email template and the strengths from the Avocare presentation ("Why Avocare HMS") were used.
15. **"IRD certified" on tiles for Payroll and Smartsuite**: added, because the point says all HiTech products.
16. (Removed with the dark theme, P16.)
17. **Partner pin numbers** follow the original list order (1 to 12) so the legend reads in sequence; the pins still drop in west to east. The 14 branch pins are numbered west to east.
18. (Removed with the dark theme, P16.)
19. **Hero "Request a demo"** and all other demo buttons open the popup, but the plain "Request a demo" band forms on pages stay (the spec says existing form bands stay).
20. **"Coming later" packs** are small dashed chips in the highlight (one chip each, with the words "Coming later") instead of cards.
21. **`.announce`, marquee, scroll-story, why-tiles, voices and old coverage CSS** is still in `site.css` unused.
22. **Pin overlap on phones**: at 390px and below the south-east pins (9 to 13) overlap a little because they are 12 to 15px apart on the map. The numbered legend lists every city; pin size is 16px on phones.
