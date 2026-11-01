// HiTech lead endpoint on Vercel. vercel.json rewrites /lead-endpoint/lead.php here, so assets/js/site.js
// posts to the same URL on Vercel and on a PHP host. Emails each inquiry over SMTP (env vars below).
//
// Env vars (Vercel project settings, Production and Preview):
//   SMTP_HOST, SMTP_PORT (default 465), SMTP_USER, SMTP_PASS   required to send email
//   SMTP_SECURE   "true" for TLS on connect (default when port is 465), "false" for STARTTLS (port 587)
//   LEAD_TO       recipient, default info@hitechnepal.com.np
//   LEAD_FROM     sender address, default SMTP_USER (most mail servers only accept their own login here)
//   ALLOWED_ORIGIN  only when the site is served from another host than this function, e.g. https://www.hitechnepal.com.np
// Without SMTP settings it answers 503, and the visitor's WhatsApp tab still carries the inquiry.
import nodemailer from 'nodemailer';
import { MAX_BODY, composeEmail, rateLimited, validate } from './_lead.mjs';

const json = (status, body, extra = {}) => new Response(JSON.stringify(body), {
  status,
  headers: { 'Content-Type': 'application/json; charset=utf-8', 'X-Content-Type-Options': 'nosniff', 'Cache-Control': 'no-store', ...extra },
});
const fail = (status, error, extra) => json(status, { ok: false, error }, extra);

function cors(request) {
  const allowed = process.env.ALLOWED_ORIGIN || '';
  if (!allowed) return {};
  const h = { 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type', Vary: 'Origin' };
  if (request.headers.get('origin') === allowed) h['Access-Control-Allow-Origin'] = allowed;
  return h;
}

let transport;
function mailer() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_SECURE } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return null;
  const port = Number(SMTP_PORT) || 465;
  transport ??= nodemailer.createTransport({
    host: SMTP_HOST, port,
    secure: SMTP_SECURE ? SMTP_SECURE === 'true' : port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
    connectionTimeout: 8000, greetingTimeout: 8000, socketTimeout: 10000,
  });
  return transport;
}

export async function readBody(request) {
  const raw = await request.text();
  if (raw.length > MAX_BODY) return { tooLarge: true };
  const type = request.headers.get('content-type') || '';
  if (type.includes('application/x-www-form-urlencoded')) return { data: Object.fromEntries(new URLSearchParams(raw)) };
  try { return { data: JSON.parse(raw) }; } catch { return { data: null }; }
}

export async function POST(request, { send } = {}) {
  const extra = cors(request);
  const { tooLarge, data } = await readBody(request);
  if (tooLarge) return fail(413, 'Request too large', extra);
  const { status, error, lead } = validate(data);
  if (error) return fail(status, error, extra);

  const ip = (request.headers.get('x-real-ip') || request.headers.get('x-forwarded-for') || 'unknown').split(',')[0].trim();
  if (rateLimited(ip)) return fail(429, 'Too many requests', extra);

  const mail = composeEmail(lead);
  const deliver = send || (m => { const t = mailer(); if (!t) return null; return t.sendMail(m); });
  const to = process.env.LEAD_TO || 'info@hitechnepal.com.np';
  const from = `"HiTech website" <${process.env.LEAD_FROM || process.env.SMTP_USER}>`;
  try {
    const sent = await deliver({ to, from, subject: mail.subject, text: mail.text, replyTo: mail.replyTo });
    if (sent === null) { console.error('lead: SMTP env vars are not set'); return fail(503, 'Email is not configured', extra); }
  } catch (e) {
    console.error('lead: send failed', e && e.message);
    return fail(502, 'Could not send', extra);
  }
  return json(200, { ok: true }, extra);
}

export function OPTIONS(request) {
  return new Response(null, { status: process.env.ALLOWED_ORIGIN ? 204 : 405, headers: cors(request) });
}

export function GET() { return fail(405, 'Method not allowed', { Allow: 'POST' }); }
