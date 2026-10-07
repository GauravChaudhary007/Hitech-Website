/* HiTech site: vanilla, progressive enhancement. Content is fully visible without this file. */
/* Lead capture, same as the live site: on submit the request opens WhatsApp (wa.me, new tab) AND is POSTed as JSON to LEAD_ENDPOINT
   (lead-endpoint/lead.php on the same PHP host, which emails HiTech). Both always run; either one is enough for the visitor to see success. */
const LEAD_ENDPOINT = 'lead-endpoint/lead.php';
const WHATSAPP_NUMBER = '9779709117067';
(() => {
  const d = document, h = d.documentElement;
  const $ = (s, r = d) => r.querySelector(s);
  const $$ = (s, r = d) => [...r.querySelectorAll(s)];
  const rm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const yr = $('#yr'); if (yr) yr.textContent = new Date().getFullYear();

  /* theme: dark by default, the visitor's choice is kept in localStorage ('hitech-theme'); the inline head script sets data-mode before first paint */
  const tgs = $$('.theme-tg');
  const setMode = (m, save) => {
    h.setAttribute('data-mode', m);
    tgs.forEach(b => {
      b.setAttribute('aria-pressed', m === 'dark'); b.setAttribute('aria-label', m === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
      const l = $('.tg-l', b); if (l) l.textContent = m === 'dark' ? 'Light mode' : 'Dark mode';
    });
    if (save) try { localStorage.setItem('hitech-theme', m); } catch (e) { /* storage blocked: the choice lasts for this page only */ }
  };
  setMode(h.getAttribute('data-mode') === 'light' ? 'light' : 'dark');
  tgs.forEach(b => b.addEventListener('click', () => setMode(h.getAttribute('data-mode') === 'dark' ? 'light' : 'dark', true)));

  /* header: menus, mobile panel, hide on scroll, navy over dark sections */
  const nav = $('#nav'), ann = $('.announce'), darks = $$('[data-theme=dark]');
  const closeMenus = (except) => $$('.mb', nav).forEach(b => {
    if (b === except) return;
    b.setAttribute('aria-expanded', 'false'); $('#' + b.getAttribute('aria-controls')).classList.remove('open');
  });
  const setMenu = (b, on) => {
    closeMenus(on ? b : null);
    b.setAttribute('aria-expanded', on); $('#' + b.getAttribute('aria-controls')).classList.toggle('open', on);
  };
  const canHover = matchMedia('(hover: hover)').matches;
  $$('.has-panel', nav).forEach(li => {
    const b = $('.mb', li);
    b.addEventListener('click', () => setMenu(b, b.getAttribute('aria-expanded') !== 'true'));
    if (canHover) { li.addEventListener('mouseenter', () => setMenu(b, true)); li.addEventListener('mouseleave', () => setMenu(b, false)); }
    li.addEventListener('focusout', e => { if (!li.contains(e.relatedTarget)) setMenu(b, false); });
    li.addEventListener('keydown', e => { if (e.key === 'Escape') { setMenu(b, false); b.focus(); } });
  });
  d.addEventListener('click', e => { if (!nav.contains(e.target)) closeMenus(); });
  const burger = $('#burger');
  const setMobile = on => { nav.classList.toggle('mopen', on); d.body.classList.toggle('mopen', on); burger.setAttribute('aria-expanded', on); };
  burger.addEventListener('click', () => setMobile(!nav.classList.contains('mopen')));
  d.addEventListener('keydown', e => { if (e.key === 'Escape' && nav.classList.contains('mopen')) { setMobile(false); burger.focus(); } });
  $$('#mpanel a').forEach(a => a.addEventListener('click', () => setMobile(false)));
  let ly = 0, tick = false;
  const upd = [];
  const onScroll = () => {
    tick = false; upd.forEach(f => f());
    const y = scrollY, hide = y > ly && y > 240 && !nav.classList.contains('mopen') && !$('.panel.open', nav);
    nav.classList.toggle('hide', hide); h.style.setProperty('--st', hide ? '0px' : '72px'); ly = y;
    const m = (ann ? Math.max(ann.getBoundingClientRect().bottom, 0) : 0) + 36;
    nav.classList.toggle('dark', darks.some(s => { const r = s.getBoundingClientRect(); return r.top <= m && r.bottom >= m; }));
  };
  addEventListener('scroll', () => { if (!tick) { tick = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();
  d.addEventListener('visibilitychange', () => h.classList.toggle('hid', d.hidden));

  /* photo layers: set the image when within 600px of the viewport */
  const lz = $$('.bgl[data-bg]');
  const setBg = el => { $('i', el).style.backgroundImage = 'url(' + el.dataset.bg + ')'; el.removeAttribute('data-bg'); };
  if ('IntersectionObserver' in window) {
    const lio = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { lio.unobserve(e.target); setBg(e.target); } }), { rootMargin: '600px 0px' });
    lz.forEach(el => lio.observe(el));
  } else lz.forEach(setBg);

  /* testimonial video: set the Facebook plugin src when within 600px of the viewport */
  const fbf = $$('.fbf[data-src]');
  const setFb = el => { el.src = el.dataset.src; el.removeAttribute('data-src'); };
  if ('IntersectionObserver' in window) {
    const fio = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { fio.unobserve(e.target); setFb(e.target); } }), { rootMargin: '600px 0px' });
    fbf.forEach(el => fio.observe(el));
  } else fbf.forEach(setFb);

  /* video: respect reduced motion */
  if (rm) $$('video').forEach(v => { v.removeAttribute('autoplay'); v.pause(); });

  /* hero film: play only while the hero is on screen and the tab is visible; sound toggle; play button under reduced motion */
  const hv = $('#heroVideo'), hero = $('.hero');
  if (hv && hero) {
    let seen = true;
    const play = () => { if (!rm && seen && !d.hidden) hv.play().catch(() => {}); };
    new IntersectionObserver(es => es.forEach(e => { seen = e.isIntersecting; if (seen) play(); else hv.pause(); })).observe(hero);
    d.addEventListener('visibilitychange', () => { if (d.hidden) hv.pause(); else play(); });
    const sn = $('.snd', hero);
    if (sn) sn.addEventListener('click', () => { hv.muted = !hv.muted; sn.setAttribute('aria-pressed', !hv.muted); sn.setAttribute('aria-label', hv.muted ? 'Turn sound on' : 'Turn sound off'); });
    const pb = $('.vplay', hero);
    if (pb && rm) { pb.hidden = false; pb.addEventListener('click', () => { hv.play(); pb.hidden = true; }); }
  }

  /* bento filter: category tabs plus a trade filter */
  $$('[data-filter]').forEach(box => {
    const tabs = $$('[role=tab]', box), grid = $('[role=tabpanel]', box), items = $$('[data-cat]', grid), st = $('.trade-status', box);
    let f = 'all', tr = '';
    const apply = () => {
      grid.classList.toggle('filtered', f !== 'all' || !!tr);
      items.forEach(i => {
        const show = (f === 'all' || i.dataset.cat === f) && (!tr || i.dataset.trades.split(' ').includes(tr)); clearTimeout(i._t);
        if (rm) { i.hidden = !show; return; }
        if (show && i.hidden) { i.hidden = false; i.classList.add('out'); requestAnimationFrame(() => requestAnimationFrame(() => i.classList.remove('out'))); }
        else if (!show && !i.hidden) { i.classList.add('out'); i._t = setTimeout(() => { i.hidden = true; i.classList.remove('out'); }, 300); }
        else if (show) i.classList.remove('out');
      });
    };
    const sel = (t, focus) => {
      tabs.forEach(x => { const on = x === t; x.setAttribute('aria-selected', on); x.tabIndex = on ? 0 : -1; });
      grid.setAttribute('aria-labelledby', t.id); if (focus) t.focus();
      f = t.dataset.f; apply();
    };
    tabs.forEach((t, k) => {
      t.addEventListener('click', () => sel(t));
      t.addEventListener('keydown', e => {
        const n = { ArrowRight: k + 1, ArrowLeft: k - 1, Home: 0, End: tabs.length - 1 }[e.key];
        if (n !== undefined) { e.preventDefault(); sel(tabs[(n + tabs.length) % tabs.length], true); }
      });
    });
    if (!st) return;
    const setTrade = (id, label) => {
      tr = id; sel(tabs[0]); st.hidden = !id; $('.ts-l', st).textContent = id ? 'Showing: ' + label : '';
      if (id) st.scrollIntoView({ behavior: rm ? 'auto' : 'smooth', block: 'center' });
    };
    $$('[data-trade]').forEach(b => b.addEventListener('click', () => setTrade(b.dataset.trade, b.dataset.label)));
    $('.ts-x', st).addEventListener('click', () => setTrade(''));
  });
  const openTrade = () => { const t = d.getElementById(location.hash.slice(1)); if (t && t.matches('details.trade')) t.open = true; };
  addEventListener('hashchange', openTrade); openTrade();

  /* Tivora highlight: four real screens cross-fade every 4 seconds; pauses on hover and focus; manual dots; no auto-advance under reduced motion */
  $$('[data-slides]').forEach(box => {
    const im = $$('.sl', box), dots = $$('.tv-dot', box); let i = 0, t = 0, hold = false, seen = false;
    const show = n => {
      i = (n + im.length) % im.length;
      im.forEach((x, k) => x.classList.toggle('on', k === i)); dots.forEach((x, k) => { x.classList.toggle('on', k === i); x.setAttribute('aria-pressed', k === i); });
    };
    const stop = () => { clearInterval(t); t = 0; };
    const start = () => { if (!rm && seen && !hold && !d.hidden && !t) t = setInterval(() => show(i + 1), 4000); };
    dots.forEach((b, k) => b.addEventListener('click', () => { show(k); stop(); start(); }));
    ['mouseenter', 'focusin'].forEach(e => box.addEventListener(e, () => { hold = true; stop(); }));
    ['mouseleave', 'focusout'].forEach(e => box.addEventListener(e, () => { hold = false; start(); }));
    d.addEventListener('visibilitychange', () => { if (d.hidden) stop(); else start(); });
    new IntersectionObserver(es => es.forEach(e => { seen = e.isIntersecting; if (seen) start(); else stop(); })).observe(box);
  });

  /* Nepal map: legend row and pin highlight each other; the pulse runs only while the map is on screen */
  $$('[data-nmap]').forEach(m => {
    const pins = $$('.nm-pin', m), rows = $$('.nm-leg li', m), tip = $('.nm-tip', m);
    const on = i => {
      pins.forEach(p => p.classList.toggle('hl', +p.dataset.i === i)); rows.forEach(r => r.classList.toggle('hl', +r.dataset.i === i));
      if (i === null) { tip.hidden = true; return; }
      tip.textContent = rows[i].dataset.name; tip.style.left = pins[i].style.left; tip.style.top = pins[i].style.top; tip.hidden = false;
    };
    pins.forEach(p => { p.addEventListener('mouseenter', () => on(+p.dataset.i)); p.addEventListener('mouseleave', () => on(null)); });
    rows.forEach(r => ['mouseenter', 'focus'].forEach(e => r.addEventListener(e, () => on(+r.dataset.i))));
    rows.forEach(r => ['mouseleave', 'blur'].forEach(e => r.addEventListener(e, () => on(null))));
    new IntersectionObserver(es => es.forEach(e => m.classList.toggle('live', e.isIntersecting))).observe(m);
  });

  /* solutions: highlight the products that serve a trade */
  $$('[data-sol]').forEach(s => {
    const rows = $$('li[data-p]', s), ics = $$('[data-i]', s);
    const on = li => {
      const ids = li ? li.dataset.p.split(' ') : [];
      ics.forEach(i => i.classList.toggle('on', ids.includes(i.dataset.i))); rows.forEach(r => r.classList.toggle('cur', r === li));
    };
    rows.forEach(r => { r.addEventListener('mouseenter', () => on(r)); r.addEventListener('focusin', () => on(r)); });
    s.addEventListener('mouseleave', () => on()); s.addEventListener('focusout', e => { if (!s.contains(e.relatedTarget)) on(); });
  });

  /* demo form: Interested in and Inquiry for can be preset from the link */
  const qp = new URLSearchParams(location.search);
  const pick = (sel, v) => { if (!v) return; const o = [...sel.options].find(x => x.text === v); if (o) sel.value = o.value; };
  $$('form[data-demo]').forEach(f => { pick(f.elements.inquiry, f.dataset.inquiry); pick(f.elements.inquiry, qp.get('inquiry')); pick(f.elements.interest, qp.get('interest')); });

  /* lead capture: one pipeline for the demo form, the contact form, the call-back strip and the inquiry popup */
  const page = () => location.pathname.split('/').pop() || 'index.html';
  const waUrl = data => 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(
    Object.entries({ Name: data.name, Email: data.email, Phone: data.phone, City: data.city, Company: data.company, 'Inquiry for': data.inquiry, 'Interested in': data.interest, Message: data.message, Page: location.href })
      .filter(x => x[1]).map(x => x[0] + ': ' + x[1]).join('\n'));
  const waLink = (url, label, cls) => {
    const l = d.createElement('a'); l.href = url; l.target = '_blank'; l.rel = 'noopener noreferrer'; l.textContent = label; if (cls) l.className = cls; return l;
  };
  const say = (ok, msg, bad, link) => { ok.textContent = msg; ok.classList.toggle('bad', !!bad); if (link) ok.append(d.createElement('br'), link); ok.hidden = false; };
  let leadDone = () => {};
  $$('form[data-demo], form[data-lead]').forEach(f => f.addEventListener('submit', async e => {
    e.preventDefault();
    const ok = $('.form-ok', f), fd = new FormData(f);
    if (fd.get('website')) { say(ok, 'Thank you. We have received your inquiry.'); return; }
    const raw = {}; for (const [k, v] of fd) if (k !== 'website') raw[k] = String(v).trim();
    if (!raw.name || !raw.mobile) { say(ok, 'Please enter your name and mobile number.', 1); return; }
    const { mobile, ...rest } = raw, data = { ...rest, phone: mobile }, url = waUrl(data);
    /* opened in this same click handler, before any await, so popup blockers allow it; a null result means it was blocked */
    const w = window.open(url, '_blank'); if (w) w.opener = null;
    const b = $('[type=submit]', f), ac = new AbortController(), to = setTimeout(() => ac.abort(), 8000);
    b.disabled = true;
    let posted = false;
    try {
      if (LEAD_ENDPOINT) {
        const r = await fetch(LEAD_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, keepalive: true, signal: ac.signal, body: JSON.stringify({ ...data, page: page(), ts: new Date().toISOString() }) });
        const j = await r.json().catch(() => ({}));
        posted = r.ok && j.ok === true;
      }
    } catch (err) { /* the WhatsApp tab may still have opened */ }
    clearTimeout(to); b.disabled = false;
    if (posted || w) {
      say(ok, posted ? 'Thank you. We have received your inquiry and HiTech will call you back.' : 'Thank you. Your message is ready in WhatsApp: press send there and HiTech will call you back.', 0, waLink(url, 'Open WhatsApp again', 'btn'));
      f.reset(); leadDone();
    } else say(ok, 'We could not send your message. Please call 01-5389641 or message us on WhatsApp +977 9709117067.', 1, waLink(url, 'Open WhatsApp', 'btn'));
  }));

  /* inquiry popup: 10 s after landing, then 15 s after each of the first three dismissals, then every 3 minutes until a request is sent.
     State lives in sessionStorage so the sequence continues across pages. Tests may shorten the timings through window.__leadPopupTest. */
  const pop = $('#leadPop');
  if (pop) {
    const T = window.__leadPopupTest || {}, FIRST = T.first ?? 10000, AGAIN = T.again ?? 15000, LONG = T.long ?? 180000, DEFER = T.defer ?? 5000, K = 'hitech-lead';
    const read = () => { try { return JSON.parse(sessionStorage.getItem(K)) || {}; } catch (e) { return {}; } };
    const st = read(); if (!st.t0) { st.t0 = Date.now(); st.shown = 0; st.last = 0; }
    const save = () => { try { sessionStorage.setItem(K, JSON.stringify(st)); } catch (e) { /* no storage: the schedule restarts on each page */ } };
    save();
    const due = () => st.shown === 0 ? st.t0 + FIRST : st.last + (st.shown <= 3 ? AGAIN : LONG);
    const card = $('.lp-card', pop), sel = $('[name=interest]', pop), nameF = $('[name=name]', pop), okMsg = $('.form-ok', pop);
    let timer = 0, isOpen = false, prev = null;
    const blocked = () => { const a = d.activeElement; return d.hidden || (a && /^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName)) || !!$('.panel.open', nav) || nav.classList.contains('mopen'); };
    const arm = (min = 0) => { clearTimeout(timer); if (st.done || isOpen || d.hidden) return; timer = setTimeout(tryShow, Math.max(min, due() - Date.now())); };
    const tryShow = () => { if (blocked()) { timer = setTimeout(tryShow, DEFER); return; } openPop(); };
    const openPop = interest => {
      if (isOpen) return;
      clearTimeout(timer); isOpen = true; prev = d.activeElement; st.shown++; st.last = Date.now(); save();
      if (T.log) T.log.push({ n: st.shown, t: Date.now(), auto: interest === undefined });
      okMsg.hidden = true;
      const want = interest || d.body.dataset.product || '', o = [...sel.options].find(x => x.text === want);
      sel.value = o ? o.value : sel.options[0].value;
      pop.hidden = false; d.body.classList.add('lp-open'); nameF.focus();
    };
    const closePop = () => {
      if (!isOpen) return;
      isOpen = false; pop.hidden = true; d.body.classList.remove('lp-open'); st.last = Date.now(); save();
      if (prev && prev.focus && d.contains(prev)) prev.focus();
      arm();
    };
    $$('[data-lp-close]', pop).forEach(b => b.addEventListener('click', closePop));
    d.addEventListener('keydown', e => {
      if (!isOpen) return;
      if (e.key === 'Escape') { e.preventDefault(); closePop(); return; }
      if (e.key !== 'Tab') return;
      const f = $$('button, input:not([tabindex="-1"]), select, textarea, a[href]', card).filter(x => !x.disabled && x.getClientRects().length);
      if (!f.length) return;
      const a = d.activeElement, first = f[0], last = f[f.length - 1];
      if (e.shiftKey && (a === first || !card.contains(a))) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && (a === last || !card.contains(a))) { e.preventDefault(); first.focus(); }
    });
    leadDone = () => { if (st.done) return; st.done = true; save(); clearTimeout(timer); };
    $$('a[href="contact.html#demo"], a[data-interest]').forEach(a => a.addEventListener('click', e => { e.preventDefault(); openPop(a.dataset.interest || ''); }));
    d.addEventListener('visibilitychange', () => { if (d.hidden) clearTimeout(timer); else arm(1500); });
    arm();
  }

  if (rm) return;

  /* motion: reveals, word-by-word headings, count-ups, typing */
  h.classList.add('anim');
  const layers = $$('.bgl i');
  const hp = $('.hero-photo'), hs = $('.hero-stage');
  if (hp) upd.push(() => {
    if (innerWidth < 1100) { hp.style.removeProperty('--py'); return; }
    const hr = hero.getBoundingClientRect(); if (hr.bottom < 0 || hr.top > innerHeight) return;
    const over = Math.max(0, (hs.offsetHeight - hp.offsetHeight) / 2), p = Math.max(-1, Math.min(1, -hr.top / hr.height));
    hp.style.setProperty('--py', (p * Math.min(over, hp.offsetHeight * .06)).toFixed(1) + 'px');
  });
  upd.push(() => layers.forEach(i => {
    const s = i.parentNode.getBoundingClientRect(); if (s.bottom < -80 || s.top > innerHeight + 80) return;
    const p = Math.max(-1, Math.min(1, (s.top + s.height / 2 - innerHeight / 2) / (innerHeight / 2 + s.height / 2)));
    i.style.translate = '0 ' + (-p * 6).toFixed(2) + '%';
  }));
  const split = el => {
    let i = 0;
    const walk = n => [...n.childNodes].forEach(c => {
      if (c.nodeType === 3) {
        const f = d.createDocumentFragment();
        c.textContent.split(/(\s+)/).forEach(t => {
          if (!t) return;
          if (/^\s+$/.test(t)) { f.append(t); return; }
          const w = d.createElement('span'), s = d.createElement('span');
          w.className = 'w'; s.style.setProperty('--i', i++); s.textContent = t; w.append(s); f.append(w);
        });
        c.replaceWith(f);
      } else if (c.nodeType === 1) walk(c);
    });
    walk(el); el.classList.add('hw');
  };
  $$('h1, h2').forEach(split);
  $$('.stag').forEach(p => [...p.children].forEach((c, i) => { c.classList.add('rv'); c.style.setProperty('--d', i * 60 + 'ms'); }));
  const count = el => {
    const n = +el.dataset.count, s = el.dataset.suffix || '', t0 = performance.now();
    const f = t => { const p = Math.min((t - t0) / 1400, 1); el.textContent = Math.round(n * (1 - (1 - p) ** 3)).toLocaleString('en-US') + s; if (p < 1) requestAnimationFrame(f); };
    el.textContent = '0' + s; requestAnimationFrame(f);
  };
  const type = el => {
    const t = el.dataset.type, sp = el.lastElementChild; let i = 0; sp.textContent = ''; el.classList.add('typing');
    const k = setInterval(() => { sp.textContent = t.slice(0, ++i); if (i >= t.length) { clearInterval(k); el.classList.remove('typing'); } }, 80);
  };
  $$('[data-type]').forEach(el => { el.lastElementChild.textContent = ''; });
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    const t = e.target; io.unobserve(t); t.classList.add('in');
    if (t.dataset.type) type(t);
  }), { rootMargin: '0px 0px -8% 0px' });
  $$('.rv, .hw, .dg, .bgl, .hero-photo, [data-type]').forEach(el => io.observe(el));
  upd.forEach(f => f());
  const cio = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { cio.unobserve(e.target); count(e.target); } }), { threshold: 0 });
  $$('[data-count]').forEach(el => cio.observe(el));
})();
