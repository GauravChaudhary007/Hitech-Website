# HiTech website: Revision 6 change log

Source: SPEC.md section 14 (management feedback, 23 points). The CEO's instruction: change only what the 23 points ask.

Status: **Phase A is done and accepted** (points 1, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15, 17, 18, 20, 21, 22). **Phase B is done** (points 2, 3, 11, 19, 23 and the Partners map from 21; point 16, the dark theme, was built and then removed at CEO request), plus two Phase A corrections.

All changes were made in `_build/build.mjs`, `assets/css/site.css`, `assets/js/site.js` and the new `lead-endpoint/` folder, then regenerated with `node _build/build.mjs`. No generated HTML was edited by hand.

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
