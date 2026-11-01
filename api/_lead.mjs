// Inquiry validation and email text for the Vercel function (api/lead.mjs).
// Same rules, fields, labels and subjects as lead-endpoint/lead.php, which stays for PHP hosts.
// Files in api/ starting with "_" are not deployed as their own endpoint.

export const FIELDS = { name: 100, company: 120, phone: 30, email: 120, city: 80, partnerType: 20, business: 160, inquiry: 80, interest: 100, message: 1000, page: 120, ts: 40 };
export const LABELS = { name: 'Name', company: 'Company', phone: 'Phone', email: 'Email', city: 'City', partnerType: 'Partnership type', business: 'Line of business', inquiry: 'Inquiry for', interest: 'Interested in', message: 'Message', page: 'Page' };
export const PARTNER_TYPES = ['Reseller', 'Distributor', 'Channel Partner'];
export const MAX_BODY = 8192;

const CONTROL = /[\x00-\x08\x0B\x0C\x0E-\x1F]/g;
const oneLine = s => s.replace(/[\r\n]+/g, ' ').trim();

/* Returns { error } with an HTTP status, or { lead } with the cleaned fields. */
export function validate(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return { status: 400, error: 'Invalid request' };
  if (input.website) return { status: 400, error: 'Rejected' }; // honeypot
  const d = {};
  for (const [k, max] of Object.entries(FIELDS)) {
    const raw = input[k];
    if (raw === undefined || raw === null || raw === '') continue;
    if (typeof raw !== 'string') return { status: 400, error: 'Invalid ' + k };
    const v = raw.replace(CONTROL, '').trim();
    if ([...v].length > max) return { status: 400, error: k + ' is too long' };
    if (v) d[k] = v;
  }
  if (!d.name) return { status: 400, error: 'Name is required' };
  if (!d.phone || !/^\+?[0-9][0-9 ()-]{5,}$/.test(d.phone)) return { status: 400, error: 'A valid phone number is required' };
  if (d.email && !/^[^\s@<>()",;]+@[^\s@<>()",;]+\.[^\s@<>()",;]+$/.test(d.email)) return { status: 400, error: 'Invalid email' };
  if (d.partnerType && !PARTNER_TYPES.includes(d.partnerType)) return { status: 400, error: 'Invalid partnership type' };
  return { lead: d };
}

/* Subject, body and reply-to for a validated lead. Header values never contain line breaks. */
export function composeEmail(d) {
  const isPartner = !!d.partnerType;
  const lines = Object.entries(LABELS).filter(([k]) => d[k]).map(([k, label]) => label + ': ' + d[k]);
  const text = (isPartner ? 'New partner application from the HiTech website' : 'New inquiry from the HiTech website') + '\r\n\r\n' + lines.join('\r\n') + '\r\n';
  const subject = (isPartner ? 'Partner application: ' + oneLine(d.partnerType) : 'Website inquiry: ' + oneLine(d.interest || d.inquiry || 'Call back')) + ' from ' + oneLine(d.name);
  return { subject, text, replyTo: d.email ? oneLine(d.email) : undefined };
}

/* Best-effort rate limit: 5 per IP per 10 minutes, kept in the function instance's memory.
   Vercel may run several instances, so this slows abuse down rather than guaranteeing the limit. */
const hits = new Map();
export function rateLimited(ip, now = Date.now(), max = 5, windowMs = 600000) {
  const recent = (hits.get(ip) || []).filter(t => now - t < windowMs);
  if (recent.length >= max) { hits.set(ip, recent); return true; }
  recent.push(now); hits.set(ip, recent);
  if (hits.size > 5000) for (const k of hits.keys()) { hits.delete(k); if (hits.size <= 2500) break; }
  return false;
}
