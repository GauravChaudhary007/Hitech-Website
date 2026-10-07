// Run: node lead-endpoint/check.mjs. Lints that lead.php accepts every field site.js sends and uses the same labels.
import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';
const dir = new URL('.', import.meta.url);
const php = readFileSync(new URL('lead.php', dir), 'utf8');
const js = readFileSync(new URL('../assets/js/site.js', dir), 'utf8');

const phpFields = [...php.match(/\$FIELDS = \[([^\]]*)\]/)[1].matchAll(/'(\w+)' =>/g)].map(m => m[1]);
const sent = ['name', 'company', 'phone', 'email', 'city', 'inquiry', 'interest', 'message', 'page', 'ts'];
for (const f of sent) assert.ok(phpFields.includes(f), `lead.php does not accept "${f}"`);
assert.ok(js.includes('page: page(), ts: new Date()'), 'site.js no longer sends page and ts');
assert.ok(/\$TO = 'info@hitechnepal\.com\.np'/.test(php), 'recipient changed');

const phpLabels = [...php.match(/\$LABELS = \[([^\]]*)\]/)[1].matchAll(/'(\w+)' => '([^']+)'/g)].map(m => m[2]);
for (const l of ['Name', 'Company', 'Phone', 'Email', 'City', 'Inquiry for', 'Interested in', 'Message']) {
  assert.ok(phpLabels.includes(l), `lead.php label missing: ${l}`);
  assert.ok(js.includes(`${l.includes(' ') ? `'${l}'` : l}: data.`), `site.js WhatsApp label missing: ${l}`);
}
assert.ok(php.includes("!empty($in['website'])"), 'honeypot check missing');
console.log('lead-endpoint: field list and message format are consistent');
