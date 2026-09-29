#!/usr/bin/env python3
"""Check every quotation in content.js against notes-from-the-underground.pdf.

1. Each { text, src } excerpt must appear verbatim (" ... " marks an omission;
   each piece must appear, in order) and in the part/chapter its tag names.
2. Every “curly-quoted” fragment inside other game text must also appear in the
   novel, unless it is listed in AUTHORED (hypothetical speech the game invents).

Usage:  python3 tools/verify_quotes.py        (needs node and pypdf)
"""
import json, logging, os, re, subprocess, sys

logging.disable(logging.CRITICAL)
from pypdf import PdfReader

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI']
RUNNING = re.compile(r'(\w?)\d*(?:Free eBooks at Planet eBook\.com|Notes from the Underground)\d*\s*')

# Game-authored hypothetical speech, deliberately not from the novel.
AUTHORED = {
    'If you understood your own interest, you’d see a doctor.',
    'So spite is just irrationality.',
    'Someone who harms himself simply hasn’t understood his interests yet.',
    'Dostoevsky wrote this, so these are Dostoevsky’s opinions.',
    'If he admits he lies, nothing he says counts.',
    'Think less, and you’ll be well.',
    'Now that he understands his inertia, he can overcome it.',
}


def norm(t):
    t = t.replace('‘', "'").replace('’', "'").replace('“', '"').replace('”', '"')
    return re.sub(r'\s+', ' ', t).strip()


def clean(line):
    # running heads/footers: glue a word they split, otherwise leave a space
    line = RUNNING.sub(lambda m: m.group(1) if m.group(1) else ' ', line)
    # stray page-number glyphs (control characters): glue a word they split
    line = re.sub(r'(\w?)[\x00-\x1f\d]*[\x00-\x1f][\x00-\x1f\d]*\s*',
                  lambda m: m.group(1) if m.group(1) else ' ', line)
    line = re.sub(r'(\w)- (\w)', r'\1\2', line)          # "pur- posely"
    return re.sub(r'\s+', ' ', line).strip()


def novel():
    reader = PdfReader(os.path.join(ROOT, 'notes-from-the-underground.pdf'))
    lines = '\n'.join(p.extract_text() or '' for p in reader.pages).split('\n')
    part, chap, expect = 'I', 'NOTE', 0
    text, spans = '', []                                 # spans: (start, 'PART I · IV')
    for raw in lines:
        s = raw.strip()
        if s == 'Part II':
            part, chap, expect = 'II', 'EPIGRAPH', 0
        if expect < len(ROMAN) and s == ROMAN[expect]:
            chap, expect = s, expect + 1
            spans.append((len(text), f'PART {part} · {chap}'))
            continue
        if not spans or spans[-1][1] != f'PART {part} · {chap}':
            spans.append((len(text), f'PART {part} · {chap}'))
        c = clean(raw)
        if not c:
            continue
        if text.endswith(' -') or (text.endswith('-') and not text.endswith('—')):
            text = text.rstrip(' -') + c                   # "unattract -" + "ive"
        else:
            text += (' ' if text else '') + c
    return norm(text), spans


def where(pos, spans):
    tag = spans[0][1]
    for start, t in spans:
        if start > pos:
            break
        tag = t
    return tag


def content():
    # load content.js and every chamber file, in the order index.html lists them
    html = open(os.path.join(ROOT, 'index.html'), encoding='utf-8').read()
    files = [f for f in re.findall(r'<script src="([^"]+)"', html) if f != 'app.js']
    js = ("global.window={};" + "".join("require('./%s');global.UNDERGROUND=window.UNDERGROUND;" % f for f in files)
          + "process.stdout.write(JSON.stringify(window.UNDERGROUND.content))")
    return json.loads(subprocess.check_output(['node', '-e', js], cwd=ROOT))


def walk(node, path, excerpts, strings):
    if isinstance(node, dict):
        if set(node) >= {'text', 'src'}:
            excerpts.append((path, node))
            return
        for k, v in node.items():
            walk(v, f'{path}.{k}', excerpts, strings)
    elif isinstance(node, list):
        for i, v in enumerate(node):
            walk(v, f'{path}[{i}]', excerpts, strings)
    elif isinstance(node, str):
        strings.append((path, node))


def main():
    text, spans = novel()
    data = content()
    excerpts, strings = [], []
    walk(data, 'content', excerpts, strings)
    fails = 0

    for path, q in excerpts:
        pieces = [norm(p) for p in re.split(r'\s*\.\.\.\s*(?=\S|$)', q['text']) if norm(p)]
        pos, first, ok = 0, None, True
        for piece in pieces:
            i = text.find(piece, pos)
            if i < 0:
                ok = False
                break
            first = i if first is None else first
            pos = i + len(piece)
        if not ok:
            print(f'FAIL  not verbatim   {path}\n      {q["text"]}')
            fails += 1
            continue
        found = where(first, spans)
        if found != q['src']:
            print(f'FAIL  wrong chapter  {path}: tagged {q["src"]}, found in {found}')
            fails += 1
        else:
            print(f'ok    {q["src"]:<14} {q["text"][:70]}')

    for path, s in strings:
        for frag in re.findall(r'“([^”]+)”', s):
            if frag in AUTHORED:
                continue
            f = norm(frag).rstrip('.,!?')
            # tiles and headlines are set in capitals; compare those case-insensitively
            found = f.lower() in text.lower() if f.isupper() else f in text
            if not found:
                print(f'FAIL  inline quote not in novel  {path}: “{frag}”')
                fails += 1
            else:
                print(f'ok    inline         “{frag[:60]}”')

    print(f'\n{len(excerpts)} excerpts checked; {"ALL VERIFIED" if not fails else str(fails) + " FAILURES"}')
    sys.exit(1 if fails else 0)


if __name__ == '__main__':
    main()
