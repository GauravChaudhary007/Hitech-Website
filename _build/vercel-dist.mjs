// Run: node _build/vercel-dist.mjs (Vercel runs it as the build step, see vercel.json).
// Copies only the public site into dist/: the root *.html pages, robots.txt, sitemap.xml and assets/.
// Tooling, docs, lead.php, server configs and package files never reach the deployment, so nothing
// has to be blocked at request time. The pages themselves are not regenerated: the committed HTML is the site.
import { cpSync, existsSync, mkdirSync, readdirSync, rmSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const out = join(root, 'dist');
rmSync(out, { recursive: true, force: true });
mkdirSync(out);

const files = readdirSync(root).filter(f => f.endsWith('.html') || f === 'robots.txt' || f === 'sitemap.xml');
for (const f of ['index.html', '404.html', 'robots.txt', 'sitemap.xml']) if (!files.includes(f)) throw new Error('missing ' + f);
for (const f of files) cpSync(join(root, f), join(out, f));
if (!existsSync(join(root, 'assets'))) throw new Error('missing assets/');
cpSync(join(root, 'assets'), join(out, 'assets'), { recursive: true });
console.log(`dist/: ${files.length} files + assets/`);
