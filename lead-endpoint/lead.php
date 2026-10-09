<?php
/*
 * HiTech lead endpoint: one file, no dependencies. Upload it to the same PHP host as the site
 * (keep the folder name lead-endpoint/, the site posts to lead-endpoint/lead.php).
 * It receives an inquiry from the website forms (JSON or form post) and emails it to HiTech.
 * Nothing is stored except a tiny rate-limit file in the system temp folder.
 */

$TO = 'info@hitechnepal.com.np';   // recipient (the address shown on the contact page)
$ALLOWED_ORIGIN = '';              // CORS: leave empty when the site and this file share a host; otherwise e.g. https://www.hitechnepal.com.np
$RATE_MAX = 5;                     // inquiries per IP ...
$RATE_WINDOW = 600;                // ... per this many seconds

$FIELDS = ['name' => 100, 'company' => 120, 'phone' => 30, 'email' => 120, 'city' => 80, 'partnerType' => 20, 'business' => 160, 'inquiry' => 80, 'interest' => 100, 'message' => 1000, 'page' => 120, 'ts' => 40];
$LABELS = ['name' => 'Name', 'company' => 'Company', 'phone' => 'Phone', 'email' => 'Email', 'city' => 'City', 'partnerType' => 'Partnership type', 'business' => 'Line of business', 'inquiry' => 'Inquiry for', 'interest' => 'Interested in', 'message' => 'Message', 'page' => 'Page'];

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

function reply($code, $ok, $error = '') {
    http_response_code($code);
    echo json_encode($ok ? ['ok' => true] : ['ok' => false, 'error' => $error]);
    exit;
}

if ($ALLOWED_ORIGIN !== '') {
    $origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';
    if ($origin === $ALLOWED_ORIGIN) {
        header('Access-Control-Allow-Origin: ' . $ALLOWED_ORIGIN);
        header('Vary: Origin');
    }
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') reply(405, false, 'Method not allowed');

$raw = file_get_contents('php://input', false, null, 0, 8193);
if (strlen($raw) > 8192) reply(413, false, 'Request too large');
$in = json_decode($raw, true);
if (!is_array($in)) $in = $_POST;
if (!empty($in['website'])) reply(400, false, 'Rejected');   // honeypot

$d = [];
foreach ($FIELDS as $k => $max) {
    if (!isset($in[$k]) || $in[$k] === '') continue;
    if (!is_string($in[$k])) reply(400, false, 'Invalid ' . $k);
    $v = trim(preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F]/', '', $in[$k]));
    if (mb_strlen($v) > $max) reply(400, false, $k . ' is too long');
    if ($v !== '') $d[$k] = $v;
}
if (empty($d['name'])) reply(400, false, 'Name is required');
if (empty($d['phone']) || !preg_match('/^\+?[0-9][0-9 ()-]{5,}$/', $d['phone'])) reply(400, false, 'A valid phone number is required');
if (!empty($d['email']) && !filter_var($d['email'], FILTER_VALIDATE_EMAIL)) reply(400, false, 'Invalid email');
if (!empty($d['partnerType']) && !in_array($d['partnerType'], ['Reseller', 'Distributor', 'Channel Partner'], true)) reply(400, false, 'Invalid partnership type');

// rate limit per IP, file based
$ip = isset($_SERVER['REMOTE_ADDR']) ? $_SERVER['REMOTE_ADDR'] : 'unknown';
$rf = sys_get_temp_dir() . '/hitech-lead-' . md5($ip) . '.json';
$now = time();
$hits = [];
if (is_readable($rf)) { $j = json_decode((string) file_get_contents($rf), true); if (is_array($j)) $hits = $j; }
$hits = array_values(array_filter($hits, function ($t) use ($now, $RATE_WINDOW) { return is_int($t) && $now - $t < $RATE_WINDOW; }));
if (count($hits) >= $RATE_MAX) reply(429, false, 'Too many requests');
$hits[] = $now;
@file_put_contents($rf, json_encode($hits), LOCK_EX);

// build the email; header values never contain line breaks (header injection)
$oneLine = function ($s) { return trim(preg_replace('/[\r\n]+/', ' ', $s)); };
$lines = [];
foreach ($LABELS as $k => $label) if (!empty($d[$k])) $lines[] = $label . ': ' . $d[$k];
$isPartner = !empty($d['partnerType']);
$body = ($isPartner ? "New partner application from the HiTech website" : "New inquiry from the HiTech website") . "\r\n\r\n" . implode("\r\n", $lines) . "\r\n";

$host = preg_replace('/[^a-z0-9.-]/i', '', isset($_SERVER['HTTP_HOST']) ? $_SERVER['HTTP_HOST'] : 'hitechnepal.com.np');
$subject = '=?UTF-8?B?' . base64_encode(($isPartner ? 'Partner application: ' . $oneLine($d['partnerType']) : 'Website inquiry: ' . $oneLine(isset($d['interest']) ? $d['interest'] : (isset($d['inquiry']) ? $d['inquiry'] : 'Call back'))) . ' from ' . $oneLine($d['name'])) . '?=';
$headers = ['From: HiTech website <noreply@' . $host . '>', 'MIME-Version: 1.0', 'Content-Type: text/plain; charset=UTF-8'];
if (!empty($d['email'])) $headers[] = 'Reply-To: ' . $oneLine($d['email']);

if (!@mail($TO, $subject, $body, implode("\r\n", $headers))) reply(502, false, 'Could not send');
reply(200, true);
