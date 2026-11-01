# HiTech website

Corporate website of HiTech Solutions and Services Pvt. Ltd. (Kathmandu, Nepal).
Plain HTML, CSS and vanilla JavaScript. No framework, no CDN scripts, no database.
One small PHP file (`lead-endpoint/lead.php`) emails website inquiries on a PHP host; on Vercel the Node function `api/lead.mjs` does the same job.

Two ways to host it: HiTech's own PHP/Apache/nginx server ("Deploy to HiTech's server" below) or Vercel ("Deploy on Vercel").
The two never mix: each one gets its own allowlisted bundle, so Vercel files never reach the server and `lead.php` never reaches Vercel.

**The committed HTML is the finished site. No build step is needed to deploy.**

## What goes on the server

| Folder / file | Deploy? | Purpose |
| --- | --- | --- |
| `*.html`, `sitemap.xml`, `robots.txt` | Yes | The finished pages (18 HTML files, flat at the web root; the file names are the URLs) |
| `assets/` | Yes | CSS, JS, fonts, images, video, map data |
| `lead-endpoint/lead.php` | Yes (needs PHP) | Emails website inquiries |
| `.htaccess` or `nginx.conf.example` | Yes (one of them) | Server config, blocks the folders below |
| `_build/`, `docs/`, `api/`, `.github/`, `package.json`, `package-lock.json`, `vercel.json`, `README.md`, `lead-endpoint/README.md`, `lead-endpoint/check.mjs`, `.git`, `.env` | No (PHP host) | Developer tooling, Vercel files, notes and git data; never in `server-dist/`, and blocked by the server config if uploaded anyway |

`npm run server-build` puts exactly the "Yes" rows into `server-dist/` (Apache's `.htaccess` included). Upload that folder, not the repo.

Git: branch `main`; `.gitattributes` keeps line endings as LF so Windows and Linux checkouts match.

## Deploy to HiTech's server

The safe, repeatable way is the GitHub Actions workflow below. By hand:

1. Run `npm run check:server` (builds `server-dist/` and checks it), then copy the contents of `server-dist/` to the web root
   (for example `public_html/`). Do not copy the whole repo: it holds Vercel files, tooling and `.git`.
   The server config blocks those if they get there anyway, but they should not be there.
2. Web server: Apache uses the included `.htaccess` (needs `AllowOverride All`). Nginx: see `nginx.conf.example`.
3. PHP (7.4 or newer) must be available for `lead-endpoint/lead.php`. Setup and test steps: `lead-endpoint/README.md`.
   Before go-live, open `lead-endpoint/lead.php` and confirm `$TO` (recipient email, currently `info@hitechnepal.com.np`).
4. Install the SSL certificate, then enable the HTTPS redirect in `.htaccess` (commented block).
5. Check after deploy:
   - `/` loads, header menu works, no broken images.
   - `/products.html`, `/partners.html`, `/support.html`, `/contact.html`, `/careers.html` load.
   - `/404.html` shows for an unknown URL (for example `/nope`).
   - `/_build/build.mjs`, `/docs/SPEC.md`, `/vercel.json`, `/api/lead.mjs` and `/.git/HEAD` return 403 or 404.
   - Send one inquiry from the popup: WhatsApp opens in a new tab and an email arrives.
   - `/robots.txt` and `/sitemap.xml` show the live domain.

### Deploy to HiTech's server with GitHub Actions

Workflow `.github/workflows/deploy-server.yml` ("Website server deploy"). On every pull request and push to `main` it only runs the
checks (`check`, `check:site`, `check:vercel`, `check:server`, which also runs `lead.php` with PHP). It touches the server only when
someone runs it by hand:

1. GitHub → Actions → **Website server deploy** → **Run workflow**. Leave **mode** on `dry-run` first. The log shows any difference
   between the server's `.htaccess` / `lead.php` and the repo, the files that would change, and files that only exist on the server.
   Nothing is written.
2. Run it again with **mode** `deploy` and type `DEPLOY` in **confirm**.

What a deploy does, and the safety locks:
- Only commits that are merged into `main` can be deployed (a pull-request branch is refused). **ref** `main` deploys the latest;
  an older commit SHA of `main` rolls back to it. One deploy runs at a time.
- The target folder must already contain `index.html`, so a wrong `DEPLOY_PATH` cannot write into another folder.
- If the server's `.htaccess` or `lead.php` were edited on the server (for example the HTTPS redirect was switched on, or `$TO`
  changed), the deploy stops and shows the diff. Put the change into the repo, or tick **allow config changes** if the repo version is right.
- The current web root is saved to `~/hitech-site-backups/site-<date>.tar.gz` on the server first (newest 10 kept, `.git` left out).
- Only `server-dist/` is uploaded (rsync over SSH, new files switched in together at the end). Nothing on the server is deleted;
  file permissions and owners on the server are left as they are.
- Afterwards it checks the live site: pages, CSS/JS, `robots.txt`, `sitemap.xml`, the 404 page, an old `.php` redirect, `lead.php`
  answering 405 to GET (PHP works), and that `vercel.json`, `api/`, `package.json`, `_build/`, `docs/`, `README.md`, `.git` and `.env`
  are not readable. If any check fails, the backup is put back automatically and the run fails.

Setup, once (repo Settings → Environments → New environment `website-server`; adding yourself under "Required reviewers" there
makes every deploy wait for your click):

| Secret (in the `website-server` environment) | Example | Notes |
| --- | --- | --- |
| `DEPLOY_HOST` | `203.0.113.10` or `server.hitechnepal.com.np` | The server's address |
| `DEPLOY_USER` | `deploy` | SSH user that can write to the web root (rsync must be installed on the server) |
| `DEPLOY_PATH` | `/var/www/hitech-website` or `/home/hitech/public_html` | Absolute path of the web root |
| `DEPLOY_SSH_KEY` | (private key) | A key made only for this, whose public half is in that user's `~/.ssh/authorized_keys` |
| `DEPLOY_KNOWN_HOSTS` | output of `ssh-keyscan -p 22 <host>` | Pins the server's identity; the deploy refuses an unknown server |

Optional variables (same environment): `DEPLOY_PORT` (default 22), `SMOKE_URL` (default `https://www.hitechnepal.com.np`),
`SKIP_SMOKE` (`true` only if GitHub cannot reach the site; then check it by hand).

The same script runs from any Linux/macOS shell: `npm run server-build`, then
`DEPLOY_HOST=… DEPLOY_USER=… DEPLOY_PATH=… MODE=dry-run bash _build/deploy-server.sh` (see the top of `_build/deploy-server.sh`).

## Deploy on Vercel

Everything Vercel needs is in the repo: `vercel.json`, the `vercel-build` script and the function in `api/`.

1. In Vercel: Add New → Project → import `GauravChaudhary007/Hitech-Website`. Leave Framework Preset on "Other"; `vercel.json` sets the rest
   (build command `npm run vercel-build`, output directory `dist`). Root directory is the repo root.
2. Environment variables (Project → Settings → Environment Variables, for Production and Preview). Only needed for the inquiry email;
   the site itself works without them.

   | Name | Example | Notes |
   | --- | --- | --- |
   | `SMTP_HOST` | `mail.hitechnepal.com.np` | Outgoing mail server of the mailbox that sends the inquiries |
   | `SMTP_PORT` | `465` | 465 (TLS) or 587 (STARTTLS); default 465 |
   | `SMTP_SECURE` | `true` | Optional. `true` for 465, `false` for 587; guessed from the port when unset |
   | `SMTP_USER` | `noreply@hitechnepal.com.np` | Mailbox login |
   | `SMTP_PASS` | (secret) | Mailbox password or app password. Mark it Sensitive; never commit it |
   | `LEAD_TO` | `info@hitechnepal.com.np` | Optional. Recipient; default `info@hitechnepal.com.np` |
   | `LEAD_FROM` | `noreply@hitechnepal.com.np` | Optional. Sender; default `SMTP_USER` (most servers only accept their own login) |
   | `ALLOWED_ORIGIN` | | Optional. Only if the pages are served from a different host than the function |

   Without the SMTP variables the form still opens WhatsApp; the email part answers 503 and the visitor sees the WhatsApp message.
   After adding or changing a variable, redeploy so the function picks it up.
3. Deploy. Check on the `*.vercel.app` address before any domain change:
   - `/`, `/products.html`, `/contact.html` load; `/nope` shows the 404 page.
   - `/_build/build.mjs`, `/docs/SPEC.md`, `/package.json`, `/lead-endpoint/lead.php` (GET) do not show source files (404 or 405).
   - `/about-us.php` redirects (301) to `/about.html`; the other old PHP links follow the same table as `.htaccess`.
   - Send one inquiry from the popup: WhatsApp opens and the email arrives. Or with curl:
     `curl -i -X POST https://<project>.vercel.app/lead-endpoint/lead.php -H "Content-Type: application/json" -d '{"name":"Test","phone":"9800000000","message":"Vercel test"}'`
4. Moving www.hitechnepal.com.np to Vercel is a separate, deliberate step (Project → Settings → Domains, then the DNS records Vercel shows).
   Nothing in this repo changes the domain or DNS.

How it works:
- `npm run vercel-build` (`_build/vercel-dist.mjs`) copies only the public site (root `*.html`, `robots.txt`, `sitemap.xml`, `assets/`) into `dist/`.
  It does not regenerate pages: the committed HTML is the site. Tooling, docs, `lead.php` and server configs are never uploaded as static files.
- `vercel.json` carries the `.htaccess` rules: the same security headers, cache times and old-site (PHP) 301 redirects, and a rewrite of
  `/lead-endpoint/lead.php` to `api/lead.mjs`, so `assets/js/site.js` posts to the same URL on Vercel and on a PHP host.
- `api/lead.mjs` (with `api/_lead.mjs`) has the same fields, limits, honeypot, subjects and email text as `lead.php`, and sends with SMTP
  (nodemailer). Its 5-per-10-minutes limit per IP is kept in memory, so on Vercel it is best effort.
- Preview deployments (`*.vercel.app` for branches) are not indexed by search engines; Vercel adds `X-Robots-Tag: noindex` to them.
- `npm run check:vercel` checks the `dist/` allowlist, every redirect case and the function without deploying.

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
assets/img/                      photos, logos (assets/img/logos), client logos (assets/img/clients, listed in manifest.json), Tivora screenshots
assets/video/                    Tivora ERP video
assets/video/                   HiTech explainer video (1 min 52 s, with music): hitech-explainer-hero.mp4 (720p, plays in the home hero) and hitech-explainer-1080p.mp4 (full size)
assets/fonts/                    Poppins (self-hosted, SIL Open Font License), fonts.css
assets/data/                     Nepal map data used by the branch and partner maps (generated by _build/make-map.mjs)
lead-endpoint/                   lead.php (email) plus its README and check script
api/lead.mjs, api/_lead.mjs      the same lead endpoint as a Vercel function (SMTP)
vercel.json                      Vercel build, headers, old-URL redirects, lead.php rewrite
_build/vercel-dist.mjs           copies the public site into dist/ for Vercel; _build/check-vercel.mjs tests the Vercel setup
_build/server-dist.mjs           copies the server files into server-dist/; _build/check-server.mjs tests them (npm run check:server)
_build/deploy-server.sh          backup, upload and live check for HiTech's server (run by .github/workflows/deploy-server.yml)
_build/build.mjs                 page generator (Node, zero dependencies)
_build/check.mjs                 checks the generated pages (SEO, JSON-LD, copy gate, links): npm run check:site
_build/make-map.mjs, npl10.json  regenerate the Nepal map data in assets/data (city pins): node _build/make-map.mjs, then npm run build
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

- The site is self-contained: fonts, images, video, scripts and map data are all in this folder. The only third-party content is the Facebook testimonial video (embedded from facebook.com), the Tivora ERP YouTube video on the home page (embedded from youtube-nocookie.com; YouTube may refuse it when the page is opened from file://, the Watch on YouTube link is the fallback) and outbound links.
- The page and file names are part of the URLs and the sitemap. Keep them if the old site's links must still work.
- `tivora.html` exists but is not linked or listed in the sitemap. The header "Tivora ERP" item opens https://www.tivoraerp.com.
- Open questions and decisions are listed in `docs/CHANGELOG.md`.
