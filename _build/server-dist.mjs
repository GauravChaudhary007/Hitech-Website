// Run: npm run server-build. Builds server-dist/: exactly the files that belong on HiTech's own PHP server
// (Apache or nginx), and nothing else. The deploy workflow (.github/workflows/deploy-server.yml) uploads this
// folder, so Vercel-only files (vercel.json, api/, package files), tooling, docs and git data never reach
// the server, however the repo grows. The pages are not regenerated: the committed HTML is the site.
import { cpSync, existsSync, mkdirSync, readdirSync, rmSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const out = join(root, 'server-dist');
rmSync(out, { recursive: true, force: true });
mkdirSync(out);

// The allowlist. Add a path here (and to _build/check-server.mjs) only if it must be public on the server.
const files = readdirSync(root).filter(f => f.endsWith('.html') || f === 'robots.txt' || f === 'sitemap.xml');
const extra = ['.htaccess', 'lead-endpoint/lead.php'];
for (const f of ['index.html', '404.html', 'robots.txt', 'sitemap.xml', ...extra]) {
  if (!existsSync(join(root, f))) throw new Error('missing ' + f);
}
for (const f of [...files, ...extra]) cpSync(join(root, f), join(out, f), { recursive: false });
if (!existsSync(join(root, 'assets'))) throw new Error('missing assets/');
cpSync(join(root, 'assets'), join(out, 'assets'), { recursive: true, filter: src => !/(^|\/)(\.DS_Store|Thumbs\.db)$/.test(src) });
console.log(`server-dist/: ${files.length} files + assets/ + .htaccess + lead-endpoint/lead.php`);
