#!/usr/bin/env python3
"""Answer-key tools for a chamber file.

  python3 tools/answer_keys.py chambers/<id>.js            audit only
  python3 tools/answer_keys.py chambers/<id>.js --shuffle  redistribute key positions, then audit

--shuffle moves each correct option to a new position (option text unchanged) so
that positions are balanced (counts differ by at most one), no letter appears three
times running, and no three-letter run repeats. Scored questions and review
variants are balanced separately.

The audit reports: position counts and sequence, questions whose key is uniquely
the longest option, and keys containing a cue word no distractor shares.
"""
import json, random, re, subprocess, sys, os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PAT = re.compile(r"(options: \[\n)((?:\s*'[^\n]*',?\n)+?)(\s*\],\n\s*answer: )(\d+)(,)")
CUES = re.compile(r"\b(always|never|simply|only|all|none|every)\b", re.I)


def good(seq):
    if any(seq[i] == seq[i + 1] == seq[i + 2] for i in range(len(seq) - 2)):
        return False
    grams = [seq[i:i + 3] for i in range(len(seq) - 2)]
    if len(set(grams)) != len(grams):
        return False
    counts = [seq.count(x) for x in 'ABCD']
    return max(counts) - min(counts) <= 1


def pick(n, seed):
    rnd = random.Random(seed)
    for _ in range(200000):
        seq = ''.join(rnd.choice('ABCD') for _ in range(n))
        if good(seq):
            return seq
    raise SystemExit('no balanced sequence found')


def shuffle(path):
    s = open(path, encoding='utf-8').read()
    split = s.index('  review: [')
    blocks = list(PAT.finditer(s))
    main = [b for b in blocks if b.start() < split]
    rev = [b for b in blocks if b.start() > split]
    seed = sum(map(ord, os.path.basename(path)))
    target = pick(len(main), seed) + pick(len(rev), seed + 1)
    out, last = [], 0
    for m, t in zip(main + rev, target):
        lines = [l for l in m.group(2).split('\n') if l.strip()]
        items = [l.strip().rstrip(',') for l in lines]
        indent = re.match(r'\s*', lines[0]).group(0)
        key = items.pop(int(m.group(4)))
        ni = 'ABCD'.index(t)
        items.insert(ni, key)
        body = '\n'.join(indent + x + (',' if i < len(items) - 1 else '') for i, x in enumerate(items)) + '\n'
        out.append(s[last:m.start()] + m.group(1) + body + m.group(3) + str(ni) + m.group(5))
        last = m.end()
    out.append(s[last:])
    open(path, 'w', encoding='utf-8').write(''.join(out))


def audit(path):
    cid = re.search(r"register\('([^']+)'", open(path, encoding='utf-8').read()).group(1)
    js = ("global.window={};require('./content.js');global.UNDERGROUND=window.UNDERGROUND;"
          "require('./%s');process.stdout.write(JSON.stringify(window.UNDERGROUND.content['%s']))" % (path, cid))
    c = json.loads(subprocess.check_output(['node', '-e', js], cwd=ROOT))
    scored = [q for q in c['steps'] if q['type'] == 'question' and q.get('scored')]
    choice = [q for q in scored if q['kind'] == 'choice']
    review = [dict(v, id='%s#%d' % (g['id'], i)) for g in c['review'] for i, v in enumerate(g['variants'])]
    problems = 0
    for name, qs in (('scored', choice), ('review', review)):
        seq = ''.join('ABCD'[q['answer']] for q in qs)
        counts = {x: seq.count(x) for x in 'ABCD'}
        longest = []
        for q in qs:
            L = [len(o) for o in q['options']]
            k = L[q['answer']]
            if k == max(L) and L.count(k) == 1:
                longest.append('%s (%s)' % (q['id'], '/'.join(map(str, L))))
            if CUES.search(q['options'][q['answer']]) and not any(
                    CUES.search(o) for i, o in enumerate(q['options']) if i != q['answer']):
                print('  cue word only in key: %s — %s' % (q['id'], q['options'][q['answer']]))
                problems += 1
        pattern_ok = good(seq) if len(seq) > 2 else True
        print('%-6s %2d | positions %s | %s | pattern %s | key uniquely longest: %s' % (
            name, len(qs), counts, seq, 'ok' if pattern_ok else 'REPEATS', ', '.join(longest) or 'none'))
        problems += len(longest) + (0 if pattern_ok else 1)
    print('scored interactions: %d  (%d choice, %d other)' % (len(scored), len(choice), len(scored) - len(choice)))
    return problems


if __name__ == '__main__':
    path = sys.argv[1]
    if '--shuffle' in sys.argv:
        shuffle(os.path.join(ROOT, path))
    sys.exit(1 if audit(path) else 0)
