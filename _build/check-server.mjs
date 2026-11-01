// Run: npm run check:server. Checks what a deploy to HiTech's own PHP server would upload, without deploying:
// 1. server-dist/ holds the public site, .htaccess and lead.php, and none of the Vercel files, tooling or docs;
// 2. every local link and asset in the pages exists in server-dist/;
// 3. .htaccess and nginx.conf.example still block tooling, Vercel files and git data;
// 4. lead.php parses and answers like it should (only when PHP is installed; skipped otherwise).
import { execFileSync, spawn } from 'node:child_process';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import assert from 'node:assert/strict';

const root = new URL('..', import.meta.url).pathname;
const out = join(root, 'server-dist');

/* 1. the bundle: exactly the allowlist */
execFileSync(process.execPath, [join(root, '_build/server-dist.mjs')], { stdio: 'inherit' });
const pages = readdirSync(root).filter(f => f.endsWith('.html'));
const allowedTop = new Set([...pages, 'robots.txt', 'sitemap.xml', 'assets', '.htaccess', 'lead-endpoint']);
for (const f of readdirSync(out)) assert.ok(allowedTop.has(f), 'server-dist must not contain ' + f);
for (const f of allowedTop) assert.ok(existsSync(join(out, f)), 'server-dist is missing ' + f);
assert.deepEqual(readdirSync(join(out, 'lead-endpoint')), ['lead.php'], 'lead-endpoint/ on the server holds only lead.php');
for (const f of ['vercel.json', 'api', 'package.json', 'package-lock.json', '_build', 'docs', 'README.md', 'node_modules', 'dist', '.git', '.env', '.vercel', 'nginx.conf.example', '.github'])
  assert.ok(!existsSync(join(out, f)), 'server-dist must not contain ' + f);
const walk = d => readdirSync(d).flatMap(f => statSync(join(d, f)).isDirectory() ? walk(join(d, f)) : [join(d, f)]);
const all = walk(out).map(f => f.slice(out.length + 1));
for (const f of all) {
  assert.ok(!/\.(mjs|cjs|md|map|env|log|bak|sql|sh)$/i.test(f), 'server-dist must not contain tooling file ' + f);
  assert.ok(!/(^|\/)\.(?!htaccess$)/.test(f), 'server-dist must not contain hidden file ' + f);
}
for (const f of all) {
  const a = readFileSync(join(out, f)), b = readFileSync(join(root, f));
  assert.ok(a.equals(b), 'server-dist/' + f + ' differs from the committed file');
}

/* 2. every local href/src/srcset/poster/url() in the pages resolves inside server-dist */
const missing = new Set();
for (const p of pages) {
  const html = readFileSync(join(out, p), 'utf8');
  const refs = [...html.matchAll(/\b(?:href|src|poster|data-src|data-bg)\s*=\s*"([^"]+)"/g)].map(m => m[1])
    .concat([...html.matchAll(/\bsrcset\s*=\s*"([^"]+)"/g)].flatMap(m => m[1].split(',').map(s => s.trim().split(/\s+/)[0])))
    .concat([...html.matchAll(/url\((['"]?)([^'")]+)\1\)/g)].map(m => m[2]));
  for (let r of refs) {
    if (/^(?:[a-z][a-z0-9+.-]*:|\/\/|#|\$\{)/i.test(r) || r === '') continue;
    r = r.split('#')[0].split('?')[0].replace(/^\.?\//, '');
    if (r === '' || r.endsWith('/')) continue;
    if (!existsSync(join(out, decodeURIComponent(r)))) missing.add(p + ' -> ' + r);
  }
}
assert.deepEqual([...missing], [], 'pages link to files that would not be on the server');

/* 3. server configs still block what must never be served */
const ht = readFileSync(join(root, '.htaccess'), 'utf8');
for (const rule of [
  'RewriteRule ^\\.well-known/ - [L]',
  'RewriteRule (^|/)\\. - [F,L]',
  'RewriteRule ^(_build|docs|api|node_modules|dist|server-dist|lead-endpoint/node_modules)(/|$) - [F,L]',
  'RewriteRule ^(package\\.json|package-lock\\.json|vercel\\.json|nginx\\.conf\\.example)$ - [F,L]',
  'ErrorDocument 404 /404.html',
  'RewriteRule ^lead-endpoint/ - [L]',
]) assert.ok(ht.includes(rule), '.htaccess lost the rule: ' + rule);
assert.ok(ht.indexOf('RewriteRule ^lead-endpoint/ - [L]') < ht.indexOf('RewriteRule \\.php$ / [NC,R=301,L]'), '.htaccess: lead.php must be exempt before the old-.php redirects');
const ngx = readFileSync(join(root, 'nginx.conf.example'), 'utf8');
for (const rule of ['location ~ /\\. { return 404; }', 'location = /lead-endpoint/lead.php', 'vercel\\.json'])
  assert.ok(ngx.includes(rule), 'nginx.conf.example lost: ' + rule);
const site = readFileSync(join(root, 'assets/js/site.js'), 'utf8');
assert.ok(site.includes("const LEAD_ENDPOINT = 'lead-endpoint/lead.php'"), 'site.js must keep posting to lead-endpoint/lead.php');
assert.match(readFileSync(join(out, 'lead-endpoint/lead.php'), 'utf8'), /\$TO = '[^']+@[^']+';/, 'lead.php must have a recipient in $TO');

/* 4. lead.php with the real PHP, if installed */
let php = null;
try { execFileSync('php', ['-v'], { stdio: 'ignore' }); php = 'php'; } catch { /* no PHP here */ }
if (!php) {
  console.log('PHP not installed: skipped the lead.php run (the deploy workflow runs it).');
} else {
  execFileSync(php, ['-l', join(out, 'lead-endpoint/lead.php')], { stdio: 'pipe' });
  const port = 18000 + Math.floor(Math.random() * 1000);
  const srv = spawn(php, ['-S', '127.0.0.1:' + port, '-t', out], { stdio: 'ignore' });
  try {
    const url = `http://127.0.0.1:${port}/lead-endpoint/lead.php`;
    let res;
    for (let i = 0; i < 50; i++) { try { res = await fetch(url); break; } catch { await new Promise(r => setTimeout(r, 100)); } }
    assert.ok(res, 'php -S did not start');
    assert.equal(res.status, 405, 'GET lead.php should answer 405');
    await res.text();
    const bad = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: 'Test' }) });
    assert.equal(bad.status, 400, 'POST without phone should answer 400');
    assert.equal((await bad.json()).ok, false);
    const trap = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: 'T', phone: '9800000000', website: 'x' }) });
    assert.equal(trap.status, 400, 'honeypot should be rejected');
    await trap.text();
    const home = await fetch(`http://127.0.0.1:${port}/`);
    assert.equal(home.status, 200, 'index.html should load from server-dist');
    await home.text();
  } finally { srv.kill(); }
  console.log('lead.php: php -l clean; GET 405, missing phone 400, honeypot 400.');
}

console.log(`check:server OK: ${all.length} files would be uploaded; no Vercel files, tooling, docs or git data.`);
