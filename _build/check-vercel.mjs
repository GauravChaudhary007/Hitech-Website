// Run: npm run check:vercel. Checks the Vercel setup without deploying:
// the dist/ allowlist, the old-URL redirects in vercel.json (same table as .htaccess), and api/lead.mjs.
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import assert from 'node:assert/strict';

const root = new URL('..', import.meta.url);
const cfg = JSON.parse(readFileSync(new URL('vercel.json', root), 'utf8'));

/* 1. dist/ holds the site and nothing else */
execFileSync(process.execPath, [new URL('_build/vercel-dist.mjs', root).pathname], { stdio: 'inherit' });
const dist = new URL('dist/', root);
const pages = readdirSync(root).filter(f => f.endsWith('.html'));
for (const f of [...pages, 'robots.txt', 'sitemap.xml', 'assets/css/site.css', 'assets/js/site.js']) assert.ok(existsSync(new URL(f, dist)), 'dist is missing ' + f);
for (const f of ['_build', 'docs', 'lead-endpoint', 'api', 'package.json', 'README.md', '.htaccess', 'nginx.conf.example', 'vercel.json', 'node_modules'])
  assert.ok(!existsSync(new URL(f, dist)), 'dist must not contain ' + f);

/* 2. redirects: first match wins, like Vercel. Sources are "/:p(regex)" or a literal path. */
const toRe = s => new RegExp('^' + (s.startsWith('/:p(') ? '/(' + s.slice(4, -1) + ')' : s.replace(/[.]/g, '\\.')) + '$', 'i');
const rules = cfg.redirects.map(r => ({ re: toRe(r.source), to: r.destination, code: r.statusCode }));
const route = path => { const r = rules.find(x => x.re.test(path)); return r ? r.to : null; };
const cases = {
  '/chat/': '/live-support.html', '/chat/index.php': '/live-support.html',
  '/swastik-accounting-software': '/product-swastik.html', '/swastik-accounting-software/x': '/product-swastik.html',
  '/files/swastik-brochure.pdf': '/product-swastik.html', '/files/other.pdf': '/products.html',
  '/helpdesk.php': '/live-support.html', '/myswastik.php': '/product-myswastikonline.html', '/swastik-pos.php': '/product-pos.html',
  '/restaurant-software.php': '/product-restaurant.html', '/pharmasoft.php': '/product-pharmasoft.html', '/hotel.php': '/products.html#ezee',
  '/avocare.php': '/product-avocare.html', '/bizant.php': '/product-bizant.html', '/swastik.php': '/product-swastik.html',
  '/tivora-erp.php': '/tivora.html', '/dealer.php': '/partners.html', '/our-clients.php': '/index.html#clients',
  '/about-us.php': '/about.html', '/career.php': '/careers.html', '/contact-us.php': '/contact.html', '/download.php': '/support.html',
  '/web-development.php': '/solutions.html', '/products.php': '/products.html', '/index.php': '/', '/old/index.php': '/', '/random.php': '/',
  '/lead-endpoint/lead.php': null, '/index.html': null, '/assets/js/site.js': null, '/products.html': null,
};
for (const [p, to] of Object.entries(cases)) assert.equal(route(p), to, 'redirect for ' + p);
assert.ok(rules.every(r => r.code === 301), 'old URLs should be 301 like .htaccess');
const htRules = readFileSync(new URL('.htaccess', root), 'utf8').split('\n').filter(l => !l.trim().startsWith('#') && l.includes('R=301')).length;
assert.equal(cfg.redirects.length, htRules, 'vercel.json and .htaccess should have the same number of old-URL redirects');
assert.deepEqual(cfg.rewrites, [{ source: '/lead-endpoint/lead.php', destination: '/api/lead' }]);
assert.ok(readFileSync(new URL('assets/js/site.js', root), 'utf8').includes("const LEAD_ENDPOINT = 'lead-endpoint/lead.php'"), 'site.js must keep posting to lead-endpoint/lead.php (rewritten on Vercel)');

/* 3. api/lead.mjs: same fields as lead.php, and the handler answers like lead.php */
const core = await import(new URL('api/_lead.mjs', root));
const php = readFileSync(new URL('lead-endpoint/lead.php', root), 'utf8');
const phpFields = Object.fromEntries([...php.match(/\$FIELDS = \[([^\]]*)\]/)[1].matchAll(/'(\w+)' => (\d+)/g)].map(m => [m[1], +m[2]]));
assert.deepEqual(core.FIELDS, phpFields, 'api/_lead.mjs FIELDS differ from lead.php');
const phpLabels = Object.fromEntries([...php.match(/\$LABELS = \[([^\]]*)\]/)[1].matchAll(/'(\w+)' => '([^']+)'/g)].map(m => [m[1], m[2]]));
assert.deepEqual(core.LABELS, phpLabels, 'api/_lead.mjs LABELS differ from lead.php');

const { POST, GET } = await import(new URL('api/lead.mjs', root));
let n = 0;
const req = (body, ip = '10.0.0.' + (++n), type = 'application/json') => new Request('https://x.test/lead-endpoint/lead.php', {
  method: 'POST', headers: { 'content-type': type, 'x-forwarded-for': ip }, body: typeof body === 'string' ? body : JSON.stringify(body) });
const outbox = [];
const send = async m => { outbox.push(m); return { messageId: 'test' }; };
const call = async (body, opts = { send }, ip) => { const r = await POST(req(body, ip), opts); return [r.status, await r.json()]; };

assert.deepEqual(await call({ name: 'Test', phone: '9800000000', interest: 'Swastik', message: 'Hi', email: 'a@b.np', page: 'index.html' }), [200, { ok: true }]);
assert.equal(outbox[0].subject, 'Website inquiry: Swastik from Test');
assert.equal(outbox[0].replyTo, 'a@b.np');
assert.equal(outbox[0].to, 'info@hitechnepal.com.np');
assert.ok(outbox[0].text.startsWith('New inquiry from the HiTech website\r\n\r\nName: Test\r\nPhone: 9800000000\r\nEmail: a@b.np'));
await call({ name: 'P', phone: '9800000000', partnerType: 'Distributor', business: 'IT' });
assert.equal(outbox[1].subject, 'Partner application: Distributor from P');
await call({ name: 'Call\r\nBcc: x@y.z', phone: '9800000000' });
assert.ok(!/[\r\n]/.test(outbox[2].subject), 'subject must be one line');
assert.equal((await call({ phone: '9800000000' }))[0], 400);
assert.equal((await call({ name: 'T', phone: 'abc' }))[0], 400);
assert.equal((await call({ name: 'T', phone: '9800000000', email: 'nope' }))[0], 400);
assert.equal((await call({ name: 'T', phone: '9800000000', partnerType: 'Other' }))[0], 400);
assert.equal((await call({ name: 'T', phone: '9800000000', website: 'bot' }))[0], 400);
assert.equal((await call({ name: 'x'.repeat(101), phone: '9800000000' }))[0], 400);
assert.equal((await call('x'.repeat(9000)))[0], 413);
assert.equal((await call('not json'))[0], 400);
const form = await POST(req('name=F&phone=9800000000', undefined, 'application/x-www-form-urlencoded'), { send });
assert.equal(form.status, 200, 'form posts work too');
for (let i = 0; i < 5; i++) assert.equal((await call({ name: 'R', phone: '9800000000' }, { send }, '1.2.3.4'))[0], 200);
assert.equal((await call({ name: 'R', phone: '9800000000' }, { send }, '1.2.3.4'))[0], 429, 'sixth request in 10 minutes');
assert.equal((await call({ name: 'T', phone: '9800000000' }, { send: async () => { throw new Error('smtp down'); } }))[0], 502);
for (const k of ['SMTP_HOST', 'SMTP_USER', 'SMTP_PASS']) delete process.env[k];
assert.deepEqual(await call({ name: 'T', phone: '9800000000' }, {}), [503, { ok: false, error: 'Email is not configured' }]);
assert.equal(GET().status, 405);

console.log('vercel check: OK (dist allowlist, ' + Object.keys(cases).length + ' redirect cases, lead function)');
