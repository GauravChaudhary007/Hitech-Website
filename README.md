# HiTech website

Corporate website of HiTech Solutions and Services Pvt. Ltd. (Kathmandu, Nepal).
Plain HTML, CSS and vanilla JavaScript. No framework, no CDN scripts, no database.
One small PHP file (`lead-endpoint/lead.php`) emails website inquiries.

**The committed HTML is the finished site. No build step is needed to deploy.**

## Deploy (for IT)

1. Copy the contents of this folder to the web root of the server (for example `public_html/`).
   Do not copy `.git`, `docs/` or `_build/` if you prefer a clean server; the server config blocks them anyway.
2. Web server: Apache uses the included `.htaccess` (needs `AllowOverride All`). Nginx: see `nginx.conf.example`.
3. PHP (7.4 or newer) must be available for `lead-endpoint/lead.php`. Setup and test steps: `lead-endpoint/README.md`.
   Before go-live, open `lead-endpoint/lead.php` and confirm `$TO` (recipient email, currently `info@hitechnepal.com.np`).
4. Install the SSL certificate, then enable the HTTPS redirect in `.htaccess` (commented block).
5. Check after deploy:
   - `/` loads, header menu works, no broken images.
   - `/products.html`, `/partners.html`, `/support.html`, `/contact.html`, `/careers.html` load.
   - `/404.html` shows for an unknown URL (for example `/nope`).
   - `/_build/build.mjs` and `/docs/SPEC.md` return 403 or 404.
   - Send one inquiry from the popup: WhatsApp opens in a new tab and an email arrives.
   - `/robots.txt` and `/sitemap.xml` show the live domain.

## Run locally

```bash
npm start            # serves this folder at http://localhost:3000 (needs Node 20+)
```

or `python -m http.server 3000`. PHP is not needed locally; the inquiry email only works on a PHP host (the WhatsApp tab still opens).

## Folder layout

```
index.html, products.html, ...   all pages (generated, do not edit by hand)
assets/css/site.css              all styles
assets/js/site.js                all scripts (menu, map, popup, inquiry forms, animations)
assets/img/                      photos, logos (assets/img/logos), Tivora screenshots
assets/video/                    Tivora ERP video
assets/fonts/                    Poppins (self-hosted, SIL Open Font License), fonts.css
assets/data/                     Nepal map data used by the branch and partner maps
lead-endpoint/                   lead.php (email) plus its README and check script
_build/build.mjs                 page generator (Node, zero dependencies)
docs/                            SPEC.md (design and content rules), CHANGELOG.md
.htaccess, nginx.conf.example    server config
```

## Changing content

All page content lives in `_build/build.mjs`. Edit it, then regenerate:

```bash
npm run build
```

Do not edit the `.html` files directly; the next build overwrites them.

Live domain used in canonical links, `sitemap.xml` and `robots.txt`: `https://www.hitechnepal.com.np`.
To build for another domain (for example staging):

```bash
SITE_URL=https://staging.example.com npm run build        # macOS, Linux
$env:SITE_URL="https://staging.example.com"; npm run build  # Windows PowerShell
```

## Settings worth knowing

| Setting | Where |
| --- | --- |
| Inquiry recipient email | `lead-endpoint/lead.php`, `$TO` |
| WhatsApp number for inquiries | `assets/js/site.js`, `WHATSAPP_NUMBER`, and `WA_URL` in `_build/build.mjs` (then rebuild) |
| Popup timing (10 s, then 15 s three times, then every 3 min) | `assets/js/site.js` |
| Brand colours, font | `assets/css/site.css` (Navy #000059, Cyan #009AD4, Indigo #0B20D6, Poppins) |

## Notes

- The site is self-contained: fonts, images, video, scripts and map data are all in this folder. The only third-party content is the Facebook testimonial video (embedded from facebook.com) and outbound links.
- The page and file names are part of the URLs and the sitemap. Keep them if the old site's links must still work.
- `tivora.html` exists but is not linked or listed in the sitemap. The header "Tivora ERP" item opens https://www.tivoraerp.com.
- Open questions and decisions are listed in `docs/CHANGELOG.md`.
