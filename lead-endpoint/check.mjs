// Run: node lead-endpoint/check.mjs. Lints that lead.php accepts every field site.js sends and uses the same labels.
import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';
const dir = new URL('.', import.meta.url);
const php = readFileSync(new URL('lead.php', dir), 'utf8');
const js = readFileSync(new URL('../assets/js/site.js', dir), 'utf8');

const phpFields = [...php.match(/\$FIELDS = \[([^\]]*)\]/)[1].matchAll(/'(\w+)' =>/g)].map(m => m[1]);
const sent = ['name', 'company', 'phone', 'email', 'city', 'partnerType', 'business', 'inquiry', 'interest', 'message', 'page', 'ts'];
for (const f of sent) assert.ok(phpFields.includes(f), `lead.php does not accept "${f}"`);
assert.ok(js.includes('page: page(), ts: new Date()'), 'site.js no longer sends page and ts');
assert.ok(/\$TO = 'info@hitechnepal\.com\.np'/.test(php), 'recipient changed');

const phpLabels = [...php.match(/\$LABELS = \[([^\]]*)\]/)[1].matchAll(/'(\w+)' => '([^']+)'/g)].map(m => m[2]);
for (const l of ['Name', 'Company', 'Phone', 'Email', 'City', 'Partnership type', 'Line of business', 'Inquiry for', 'Interested in', 'Message']) {
  assert.ok(phpLabels.includes(l), `lead.php label missing: ${l}`);
  assert.ok(js.includes(`${l.includes(' ') ? `'${l}'` : l}: data.`), `site.js WhatsApp label missing: ${l}`);
}
assert.ok(php.includes("'Partner application: '"), 'partner subject line missing');
assert.ok(js.includes('data.partnerType') && js.includes('data.business'), 'site.js does not send the partner fields');
const partners = readFileSync(new URL('../partners.html', dir), 'utf8');
for (const t of ['Reseller', 'Distributor', 'Channel Partner']) assert.ok(partners.includes(`name="partnerType" value="${t}"`) && php.includes(`'${t}'`), `partner type ${t} is not in both partners.html and lead.php`);
assert.ok(partners.includes('name="business"') && partners.includes('id="become-a-partner"'), 'partners.html partner form fields missing');
assert.ok(php.includes("!empty($in['website'])"), 'honeypot check missing');

/* round 10: contact page, call-back strip and popup are the same form (fields, labels, order, required, options, honeypot, button, panels) */
const shape = (file, source) => {
  const html = readFileSync(new URL('../' + file, dir), 'utf8');
  const m = html.match(new RegExp('<form[^>]*data-source="' + source + '"[^>]*>[\\s\\S]*?</form>'));
  assert.ok(m, file + ' has no ' + source + ' form');
  return m[0].replace(/<form[^>]*>/, '<form>').replace(/ (id|for)="[^"]*"/g, '').replace(/ selected/g, '').replace(/\s+/g, ' ');
};
const ref = shape('contact.html', 'demo');
for (const n of ['name="name"', 'name="company"', 'name="mobile"', 'name="email"', 'name="city"', 'name="inquiry"', 'name="interest"', 'name="message"', 'name="website"', 'Send on WhatsApp', 'class="form-ok']) assert.ok(ref.includes(n), 'contact form lacks ' + n);
assert.ok(/name="name"[^>]*required/.test(ref) && /name="company"[^>]*required/.test(ref) && /name="mobile"[^>]*required/.test(ref) && /name="city"[^>]*required/.test(ref), 'required rules changed');
for (const [file, src] of [['index.html', 'strip'], ['index.html', 'popup'], ['products.html', 'strip'], ['careers.html', 'strip']]) assert.equal(shape(file, src), ref, file + ' ' + src + ' form differs from the contact form');
const careers = readFileSync(new URL('../careers.html', dir), 'utf8');
assert.ok(!/mailto:/.test(careers.replace(/<nav[\s\S]*?<\/nav>/, '').replace(/<footer[\s\S]*$/, '')), 'careers.html still has a mailto link above the footer');
assert.equal((careers.match(/class="cv-opt" href="https:\/\/recruit\.tradeila\.com[^"]+" target="_blank" rel="noopener"/g) || []).length, (careers.match(/<li><h3>/g) || []).length, 'chooser and position list differ');
const products = readFileSync(new URL('../products.html', dir), 'utf8');
assert.ok(!/dashboards.jpg|exec-dash|sales-dash|home-paint|home-jewelry/.test(products), 'products.html shows a Tivora screenshot');
console.log('lead-endpoint: field list and message format are consistent; contact, strip and popup forms are identical');
