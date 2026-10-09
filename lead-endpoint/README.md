# HiTech lead endpoint (inquiries by email and WhatsApp)

Every inquiry form on the site (popup, call-back strip, contact page, demo form, and the "Become a partner" form on `partners.html`) does what the live site does. On submit it (1) opens WhatsApp (wa.me/9779709117067) in a new tab with the inquiry as the prefilled text, and (2) posts the same data as JSON to `lead-endpoint/lead.php`, which validates it and emails it to HiTech with PHP `mail()`. Both always run. The visitor stays on the page and sees a thank-you panel with an "Open WhatsApp again" button in case the tab was blocked.

WhatsApp cannot receive messages automatically without the WhatsApp Business Platform, so **email is the automatic channel; WhatsApp opens on the visitor's device and the visitor taps send.**

## Setup

1. Upload the `lead-endpoint/` folder to the same PHP host as the site, so the file is reachable at `https://<your-site>/lead-endpoint/lead.php`. `site.js` posts to the relative path `lead-endpoint/lead.php` (the `LEAD_ENDPOINT` constant at the top of `assets/js/site.js`; change it only if the file lives elsewhere).
2. Open `lead.php` and check the settings at the top: `$TO` is the recipient email (set to `info@hitechnepal.com.np`, the address on the contact page; change it to the sales mailbox if you prefer), `$ALLOWED_ORIGIN` stays empty when the site and the file share a host, `$RATE_MAX` and `$RATE_WINDOW` limit each IP to 5 inquiries per 10 minutes.
3. Make sure the host can send mail with `mail()` (most shared hosts can). If mail is sent from an address on another domain, ask the host to allow `noreply@<your-domain>`.
4. Test with curl:

```
curl -i -X POST https://<your-site>/lead-endpoint/lead.php \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","phone":"9800000000","interest":"Swastik","message":"Test inquiry","page":"curl"}'
```

   Expected: `{"ok":true}` and an email at the recipient. A missing name or phone answers `400`, a filled `website` field (the honeypot) answers `400`, and a sixth request inside 10 minutes answers `429`.
5. Send one inquiry from the site and check the email and the "Open WhatsApp again" button.

Until the file is uploaded (and when the page is opened from disk), only the WhatsApp tab runs: if it opened, the panel asks the visitor to press send there; if it was blocked too, the forms show "We could not send your message" with the office phone and an "Open WhatsApp" button, and keep what the visitor typed.

The partner form also sends `partnerType` (Reseller, Distributor or Channel Partner) and `business` (line of business); `lead.php` then uses the subject "Partner application: <type> from <name>".

`node lead-endpoint/check.mjs` checks that `lead.php` accepts every field `site.js` sends and that the labels match.

## Future upgrade

The WhatsApp Business Platform (Cloud API) would let the server deliver each inquiry straight into WhatsApp. It needs a Meta Business account, a verified sender number, an access token and approved message templates, so only HiTech can set it up. HiTech currently uses the WhatsApp Business app, which has no API for servers.
