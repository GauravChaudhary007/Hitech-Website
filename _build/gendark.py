# Regenerates the dark-mode block at the end of assets/css/site.css from the light rules above it.
# Run after changing light CSS:  python _build/gendark.py   (then node _build/build.mjs is not needed, the CSS is a static file)
import re, os
HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, '..', 'assets', 'css', 'site.css')
MANUAL = os.path.join(HERE, 'dark-manual.css')
raw = open(SRC, encoding='utf8').read()
raw = re.sub(r'\n*/\* DARK:BEGIN.*?DARK:END \*/\n*', '\n', raw, flags=re.S).rstrip('\n') + '\n'
css = re.sub(r'/\*.*?\*/', '', raw, flags=re.S)
P = 'html[data-mode=dark] '
# parts that stay light in both themes (logo plates, laptop screens, tooltips) or are styled by hand in dark-manual.css
SKIP = ['.lplate', '.hlogo', '.plate-w', '.lp-screen', '.lp-lid', '.lp-base', '.lp-cam', '.tc-img', '.tip', '.nm-tip', '.frame', '.pf-img', '.hw', '.nm-', '.skip', '.sr', '.hpot', '.bgl i', '.lp-ov', '.lp-card', '.lp-x', '.theme-tg', '.mp-theme']
SOLID = re.compile(r'(^|[ ,])(body|\.nav\b|\.panel|\.mpanel|\.subnav|\.ptable|\.lead-strip)')
SECTION = re.compile(r'^(\.sec-paper|\.phero)(?![\w-])')


def split_rules(text):
    i = 0; n = len(text); res = []
    while i < n:
        j = text.find('{', i)
        if j < 0: break
        head = text[i:j].strip(); depth = 1; k = j + 1
        while k < n and depth:
            if text[k] == '{': depth += 1
            elif text[k] == '}': depth -= 1
            k += 1
        res.append((head, text[j + 1:k - 1])); i = k
    return res


def mapval(prop, val, sel):
    v = val
    if 'url(' in v: return None
    isbgl = '.bgl' in sel
    if prop in ('background', 'background-color'):
        v = v.replace('var(--paper)', '#00003A' if (SECTION.match(sel.strip()) or isbgl or sel.strip().startswith('.mpanel')) else 'rgba(255, 255, 255, .06)')
        v = v.replace('var(--tint-2)', 'rgba(255, 255, 255, .14)').replace('var(--tint)', 'rgba(255, 255, 255, .08)')
        if '.fld' in sel: rep = 'rgba(255, 255, 255, .08)'
        elif isbgl or SOLID.search(sel): rep = '#000059'
        else: rep = 'rgba(255, 255, 255, .06)'
        v = re.sub(r'#fff\b|#FFF\b|var\(--white\)', rep, v)
        v = re.sub(r'rgba\(255, 255, 255, (\.\d+)\)' if isbgl else r'rgba\(255, 255, 255, (\.[89]\d*)\)', r'rgba(0, 0, 89, \1)', v)
        v = re.sub(r'rgba\(245, 245, 245, (\.[89]\d*)\)', r'rgba(0, 0, 58, \1)', v)
    elif prop == 'color':
        v = v.replace('var(--navy)', '#fff').replace('var(--indigo)', 'var(--cyan)')
        v = re.sub(r'var\(--caption\)|var\(--grey\)|#6E6E6E', '#B8C0E0', v)
    elif prop.startswith('border') or prop.startswith('outline') or prop == 'text-decoration-color':
        v = v.replace('var(--line-2)', 'rgba(255, 255, 255, .24)').replace('var(--line)', 'rgba(255, 255, 255, .14)').replace('var(--navy)', 'rgba(255, 255, 255, .6)').replace('var(--indigo)', 'var(--cyan)')
    elif prop == 'stroke':
        v = v.replace('var(--indigo)', 'var(--cyan)').replace('var(--navy)', '#fff')
    else:
        return None
    return v if v != val else None


def conv(head, body):
    keep = [s.strip() for s in head.split(',') if not any(k in s for k in SKIP)]
    if not keep: return None
    outd = []
    for d in [d.strip() for d in re.split(r';(?![^()]*\))', body) if d.strip()]:
        if ':' not in d: continue
        prop, val = d.split(':', 1)
        m = mapval(prop.strip(), val.strip(), keep[0])
        if m is not None: outd.append(prop.strip() + ': ' + m)
    if not outd: return None
    return ', '.join(P + s for s in keep) + ' { ' + '; '.join(outd) + '; }'


lines = []
for head, body in split_rules(css):
    if head.startswith('@media'):
        sub = ['  ' + c for c in (conv(h, b) for h, b in split_rules(body)) if c]
        if sub: lines.append(head + ' {\n' + '\n'.join(sub) + '\n}')
    elif head.startswith('@'):
        continue
    else:
        c = conv(head, body)
        if c: lines.append(c)
block = '\n/* DARK:BEGIN dark mode overrides, generated from the light rules above by _build/gendark.py, then _build/dark-manual.css. Do not edit by hand. */\n' + '\n'.join(lines) + '\n' + open(MANUAL, encoding='utf8').read() + '/* DARK:END */\n'
open(SRC, 'w', encoding='utf8').write(raw + block)
print(len(lines), 'generated rules')
