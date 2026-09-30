/* UNDERGROUND — engine. Vanilla JS, no network, state in localStorage.
   Chamber content is registered by chambers/<id>.js; see content.js for the schema. */
(function () {
  'use strict';

  const U = window.UNDERGROUND;
  const KEY = 'underground.v1';
  const POINTS = 10;
  const DEEPEST = U.chambers[0].startDepth;          // −91m
  const SURFACE = U.chambers[U.chambers.length - 1].endDepth;   // 0m

  /* ── chamber index ─────────────────────────────────────────── */
  function index(meta) {
    const data = U.content[meta.id];
    let act = 1;
    const steps = data.steps.map((s, i) => {
      if (s.type === 'act') act = s.act;
      return Object.assign({ i, act }, s);
    });
    const questions = steps.filter(s => s.type === 'question');
    const scored = questions.filter(q => q.scored);
    scored.forEach((q, i) => { q.n = i + 1; });
    return {
      id: meta.id, meta, data, steps, scored,
      Q: Object.fromEntries(questions.map(q => [q.id, q])),
      review: data.review || [],
      total: scored.length,
      max: scored.length * POINTS
    };
  }
  const CHAMBERS = {};
  U.chambers.forEach(m => { if (U.content[m.id]) CHAMBERS[m.id] = index(m); });
  const playable = id => !!CHAMBERS[id];
  let C = null;                                       // the chamber currently on screen

  /* ── state ─────────────────────────────────────────────────── */
  function freshChamber(id) {
    return {
      contentVersion: CHAMBERS[id].data.contentVersion,
      completed: false, completedAt: null, runs: 0,
      record: null,     // first completed descent: { answers: { qid: { pick, correct } } }
      recovered: {},    // qid -> true when regained through review
      review: {},       // groupId -> { v, exhausted, answered }
      interrupts: {},
      run: null,        // in-progress descent
      lastRun: null     // summary of the most recent completed descent
    };
  }
  function fresh() {
    return { version: 2, depth: DEEPEST, view: 'map', chambers: {} };
  }
  function migrate(s) {
    // v1 held SPITE alone; keep its progress if it was made on the current SPITE content
    const out = fresh();
    if (s.contentVersion === 2 && s.spite && CHAMBERS.spite) {
      out.chambers.spite = Object.assign(freshChamber('spite'), s.spite, { run: s.run || null, lastRun: s.lastRun || null });
      if (s.run) out.chambers.spite.run.chamber = 'spite';
      out.depth = Math.max(DEEPEST, s.depth || DEEPEST);
      const v = s.view || 'map';
      out.view = v === 'play' ? 'play:spite' : v === 'results' ? 'results:spite' : v === 'review' ? 'review:spite'
        : v.startsWith('reviewq:') ? 'reviewq:spite:' + v.slice(8) : 'map';
    }
    return out;
  }
  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        let s = JSON.parse(raw);
        if (s && s.version === 1) s = migrate(s);
        if (s && s.version === 2 && s.chambers) {
          // a chamber whose questions changed starts clean; the others keep their progress
          for (const id of Object.keys(s.chambers)) {
            if (!CHAMBERS[id] || s.chambers[id].contentVersion !== CHAMBERS[id].data.contentVersion) delete s.chambers[id];
          }
          return s;
        }
      }
    } catch (e) { /* storage unavailable or corrupt: start clean */ }
    return fresh();
  }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* private mode: play on */ }
  }
  let S = load();
  const cs = id => (S.chambers[id || C.id] = S.chambers[id || C.id] || freshChamber(id || C.id));
  const peek = id => S.chambers[id] || freshChamber(id);        // read-only: never creates stored state
  const R = () => cs().run;

  /* ── helpers ───────────────────────────────────────────────── */
  const reduced = () => window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $app = document.getElementById('app');
  const $modal = document.getElementById('modal');
  const root = document.documentElement;

  function h(tag, attrs, ...kids) {
    const el = document.createElement(tag);
    if (attrs) for (const k in attrs) {
      const v = attrs[k];
      if (v == null || v === false) continue;
      if (k === 'class') el.className = v;
      else if (k.startsWith('on')) el.addEventListener(k.slice(2), v);
      else if (k === 'html') el.innerHTML = v;
      else el.setAttribute(k, v === true ? '' : v);
    }
    for (const kid of kids.flat(Infinity)) {
      if (kid == null || kid === false) continue;
      el.append(kid.nodeType ? kid : document.createTextNode(String(kid)));
    }
    return el;
  }
  const arr = x => (Array.isArray(x) ? x : x == null ? [] : [x]);
  const fmt = d => (d < 0 ? '−' + Math.abs(d) : String(d)) + 'm';
  const pad = n => String(n).padStart(2, '0');
  const letter = i => 'ABCDEFGH'[i];
  const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'];

  // A verified excerpt from the novel: quotation marks plus a small part/chapter tag.
  function excerpt(q, cls, attrs) {
    return h('blockquote', Object.assign({ class: 'quote' + (cls ? ' ' + cls : '') }, attrs || {}),
      h('span', { class: 'q-text' }, '“' + q.text + '”'),
      h('cite', { class: 'src' }, q.src));
  }

  function mount(node, opts) {
    opts = opts || {};
    $app.replaceChildren(node);
    $app.classList.remove('enter');
    void $app.offsetWidth;
    $app.classList.add('enter');
    if (!opts.keepScroll) window.scrollTo(0, 0);
    const f = node.querySelector('[data-autofocus]') || node.querySelector('h1, h2, .focus');
    if (f) { f.setAttribute('tabindex', '-1'); f.focus({ preventScroll: true }); }
  }

  // Light above grows with the whole ascent: 0 at the deepest chamber, 1 at the surface.
  const lift = d => (d - DEEPEST) / (SURFACE - DEEPEST);
  function setMood(mood, l) {
    document.body.dataset.mood = mood || '';
    root.style.setProperty('--lift', Math.max(0, Math.min(1, l)).toFixed(3));
  }
  const gaugeY = d => Math.min(1, Math.abs(d) / (Math.abs(DEEPEST) + 4));

  function countTo(el, from, to, ms, done) {
    if (reduced() || from === to) { el.textContent = fmt(to); done && done(); return; }
    const t0 = performance.now();
    const tick = now => {
      const p = Math.min(1, (now - t0) / ms);
      const e = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(Math.round(from + (to - from) * e));
      if (p < 1) requestAnimationFrame(tick); else done && done();
    };
    requestAnimationFrame(tick);
  }

  /* ── scoring ───────────────────────────────────────────────── */
  function isCorrect(q, pick) {
    if (q.kind === 'multi' || q.kind === 'sequence') {
      if (!Array.isArray(pick)) return false;
      const a = q.kind === 'multi' ? [...pick].sort() : pick;
      const b = q.kind === 'multi' ? [...q.answer].sort() : q.answer;
      return a.length === b.length && a.every((x, i) => x === b[i]);
    }
    return pick === q.answer;
  }
  const runInsight = (ch, run) => ch.scored.reduce((n, q) => n + (run.answers[q.id] && run.answers[q.id].correct ? POINTS : 0), 0);
  const runCorrect = (ch, run) => ch.scored.filter(q => run.answers[q.id] && run.answers[q.id].correct).length;

  function mastery(ch) {
    const st = peek(ch.id), rec = st.record;
    if (!rec) return null;
    const known = q => !!(rec.answers[q.id] && rec.answers[q.id].correct);
    const regained = q => !known(q) && !!st.recovered[q.id];
    const concepts = ch.data.concepts.map(c => {
      const qs = ch.scored.filter(q => q.concepts.includes(c));
      const k = qs.filter(known).length, r = qs.filter(regained).length;
      return { name: c, total: qs.length, known: k, regained: r,
               pct: Math.round(k / qs.length * 100), pctWith: Math.round((k + r) / qs.length * 100) };
    });
    const correct = ch.scored.filter(known).length;
    return { concepts, correct, insight: correct * POINTS, regained: ch.scored.filter(regained).length };
  }

  function reviewGroups(ch) {
    const st = peek(ch.id), rec = st.record;
    if (!rec) return [];
    return ch.review.map(g => {
      const missed = g.sources.filter(id => !(rec.answers[id] && rec.answers[id].correct));
      const open = missed.filter(id => !st.recovered[id]);
      const rs = st.review[g.id] || { v: 0, exhausted: false, answered: null };
      const status = !missed.length ? 'none' : !open.length ? 'recovered' : rs.exhausted ? 'unresolved' : 'open';
      return { g, missed, open, st: rs, status };
    }).filter(x => x.status !== 'none');
  }
  const openReviews = ch => reviewGroups(ch).filter(x => x.status === 'open').length;

  /* ── navigation ────────────────────────────────────────────── */
  // views: map · play:<id> · results:<id> · review:<id> · reviewq:<id>:<group>
  function go(view, opts) {
    S.view = view;
    save();
    closeModal();
    const [kind, id, gid] = view.split(':');
    if (kind === 'map' || !playable(id)) { C = null; return renderMap(opts); }
    C = CHAMBERS[id];
    if (kind === 'play') renderPlay();
    else if (kind === 'results') renderResults();
    else if (kind === 'review') renderReview();
    else if (kind === 'reviewq') renderReviewQ(gid);
    else renderMap();
  }

  function startRun(id) {
    C = CHAMBERS[id];
    cs().run = { chamber: id, step: 0, answers: {}, interrupts: {}, startedAt: Date.now(), replay: !!cs().record };
    skipActs();
    go('play:' + id);
  }
  function skipActs() {
    const run = R();
    while (run.step < C.steps.length && C.steps[run.step].type === 'act') run.step++;
  }
  function advance() {
    R().step++;
    skipActs();
    save();
    renderPlay();
  }

  const depthAt = idx => {
    let d = C.meta.startDepth;
    for (let i = 0; i < idx; i++) if (C.steps[i].type === 'rise') d = C.steps[i].to;
    return d;
  };

  /* ── MAP ───────────────────────────────────────────────────── */
  function renderMap(opts) {
    opts = opts || {};
    setMood('map', lift(S.depth));
    const cleared = U.chambers.filter(m => playable(m.id) && peek(m.id).completed);
    const highest = cleared.length ? cleared[cleared.length - 1].id : null;
    const from = opts.ascent ? U.chambers.findIndex(m => m.id === opts.ascent) : -1;
    const next = from >= 0 ? U.chambers[from + 1] : null;

    const rows = [];
    [...U.chambers].reverse().forEach(m => {
      if (m.id === highest) rows.push(h('li', { class: 'you' }, h('span', { class: 'you-line' }), h('span', null, 'YOU ARE HERE · ' + fmt(S.depth))));
      if (playable(m.id)) { rows.push(chamberRow(m, next && next.id === m.id)); return; }
      rows.push(h('li', { class: 'ch locked' + (m.id === 'surface' ? ' surface' : '') + (next && next.id === m.id ? ' pulse' : ''), 'aria-disabled': 'true' },
        h('span', { class: 'ch-n' }, m.n),
        h('span', { class: 'ch-name' }, m.name),
        h('span', { class: 'ch-lock' }, 'SEALED')));
    });

    let note = null;
    if (from === U.chambers.length - 1) note = 'You have reached the surface. The questions come up with you.';
    else if (next) note = playable(next.id)
      ? next.name + ' lies above.'
      : next.name + ' is still sealed. The next chamber has not been opened yet.';

    const view = h('section', { class: 'map' },
      h('header', { class: 'map-head' },
        h('p', { class: 'eyebrow' }, 'After Dostoevsky · ', h('em', null, 'Notes from Underground')),
        h('h1', { class: 'title', 'data-autofocus': true }, 'UNDERGROUND'),
        h('p', { class: 'now' }, h('span', { class: 'now-k' }, 'CURRENT DEPTH'), h('span', { class: 'num' }, fmt(S.depth)))),
      h('ol', { class: 'chambers', 'aria-label': 'Chambers, surface at top' }, rows),
      note ? h('p', { class: 'map-note' }, note) : null,
      h('footer', { class: 'map-foot' },
        h('button', { class: 'link', onclick: openSettings }, 'SETTINGS')));
    mount(view);
  }

  function chamberRow(m, isNext) {
    const st = peek(m.id), done = st.completed, inRun = !!st.run;
    const kick = h('p', { class: 'card-k' }, h('span', null, 'DEPTH ' + m.n), done ? h('span', { class: 'cleared' }, 'CLEARED') : null);
    const body = [
      kick,
      h('h2', { class: 'card-title' }, m.name),
      h('p', { class: 'card-q' }, m.question)
    ];
    if (!done) {
      body.push(h('button', { class: 'btn', onclick: () => (inRun ? go('play:' + m.id) : startRun(m.id)) }, inRun ? 'RESUME' : 'ENTER'));
      return h('li', { class: 'ch open' + (isNext ? ' next' : ''), 'data-ch': m.id }, h('div', { class: 'card' }, body));
    }
    body.push(h('div', { class: 'card-actions' },
      h('button', { class: 'btn ghost', onclick: () => openFound(m.id) }, 'TOUCH THE SEAM'),
      inRun ? h('button', { class: 'btn ghost', onclick: () => go('play:' + m.id) }, 'RESUME DESCENT') : null));
    return h('li', { class: 'ch open done', 'data-ch': m.id },
      h('button', { class: 'fissure', 'aria-label': 'The seam of light in ' + m.name, onclick: () => openFound(m.id) }, h('span')),
      h('div', { class: 'card' }, body));
  }

  function openFound(id) {
    const ch = CHAMBERS[id];
    const n = openReviews(ch);
    modal(h('div', { class: 'sheet found' },
      h('p', { class: 'kicker' }, 'YOU FOUND'),
      h('blockquote', { class: 'found-q', 'data-autofocus': true }, ch.data.found.lines.map(l => h('span', null, l))),
      h('div', { class: 'stack' },
        h('button', { class: 'btn', onclick: () => { closeModal(); startRun(id); } }, 'REENTER ' + ch.meta.name),
        h('button', { class: 'btn ghost', onclick: () => go('review:' + id) }, n ? 'REVIEW MISREADS · ' + n : 'REVIEW MISREADS'),
        h('button', { class: 'link', onclick: () => go('results:' + id) }, 'WHAT YOU UNDERSTAND')),
      h('button', { class: 'x', 'aria-label': 'Close', onclick: closeModal }, '×')));
  }

  /* ── settings / reset ──────────────────────────────────────── */
  function openSettings() {
    modal(h('div', { class: 'sheet' },
      h('p', { class: 'kicker' }, 'SETTINGS'),
      h('p', { class: 'sheet-p' }, 'Progress is stored only in this browser.'),
      h('div', { class: 'stack' },
        h('button', { class: 'btn danger', 'data-autofocus': true, onclick: confirmReset }, 'RESET PROGRESS')),
      h('button', { class: 'x', 'aria-label': 'Close', onclick: closeModal }, '×')));
  }
  function confirmReset() {
    modal(h('div', { class: 'sheet' },
      h('p', { class: 'kicker blood' }, 'RESET PROGRESS'),
      h('p', { class: 'sheet-p', 'data-autofocus': true }, 'This erases every answer, your Insight, review progress and depth in every chamber. You return to ' + fmt(DEEPEST) + '. This cannot be undone.'),
      h('div', { class: 'stack' },
        h('button', { class: 'btn danger', onclick: () => {
          try { localStorage.removeItem(KEY); } catch (e) { /* ignore */ }
          S = fresh(); save(); go('map');
        } }, 'ERASE EVERYTHING'),
        h('button', { class: 'btn ghost', onclick: closeModal }, 'CANCEL'))));
  }

  function modal(node) {
    $modal.replaceChildren(h('div', { class: 'scrim', onclick: e => { if (e.target === e.currentTarget) closeModal(); } }, node));
    $modal.classList.add('on');
    document.body.classList.add('locked');
    const f = node.querySelector('[data-autofocus]') || node.querySelector('button');
    if (f) { f.setAttribute('tabindex', f.getAttribute('tabindex') || '-1'); f.focus({ preventScroll: true }); }
  }
  function closeModal() {
    $modal.classList.remove('on');
    $modal.replaceChildren();
    document.body.classList.remove('locked');
  }
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && $modal.classList.contains('on')) closeModal(); });

  /* ── PLAY ──────────────────────────────────────────────────── */
  function playBar(step, opts) {
    const run = R();
    const answered = C.scored.filter(q => run.answers[q.id]).length;
    const qn = step.type === 'question' && step.scored ? step.n : Math.min(C.total, answered);
    return h('header', { class: 'bar' },
      h('button', { class: 'bar-back', onclick: () => go('map'), 'aria-label': 'Return to map (progress is saved)' }, '← MAP'),
      h('div', { class: 'bar-mid' },
        h('span', { class: 'bar-ch' }, C.meta.name),
        h('span', { class: 'bar-sep' }, '·'),
        h('span', { class: 'bar-count' }, pad(qn) + ' / ' + C.total)),
      h('div', { class: 'bar-right' },
        h('span', { class: 'bar-ins' }, h('small', null, 'INSIGHT '), runInsight(C, run)),
        h('span', { class: 'bar-depth' }, fmt(opts && opts.depth != null ? opts.depth : depthAt(step.i)))),
      h('div', { class: 'bar-prog', style: '--p:' + (answered / C.total) }));
  }

  function gauge(depth) {
    // vertical depth instrument (desktop); surface at top
    return h('div', { class: 'gauge', 'aria-hidden': 'true' },
      h('span', { class: 'gauge-top' }, 'SURFACE'),
      h('span', { class: 'gauge-line' }),
      h('span', { class: 'gauge-mark', style: '--y:' + gaugeY(depth) }, h('i'), h('b', null, fmt(depth))));
  }

  function renderPlay() {
    const run = R();
    if (!run) return go('map');
    const step = C.steps[run.step];
    if (!step) return go('results:' + C.id);
    const answered = C.scored.filter(q => run.answers[q.id]).length;
    // light grows through the chamber's twelve metres as questions are answered
    const d = depthAt(step.i), span = C.meta.endDepth - C.meta.startDepth;
    const mood = (C.data.moods && C.data.moods[step.act]) || 'play';
    setMood(mood, lift(Math.max(d, C.meta.startDepth + span * answered / C.total * 0.9)));

    switch (step.type) {
      case 'question': return renderQuestion(step);
      case 'concept': return renderConcept(step);
      case 'beat': return renderBeat(step);
      case 'found': return renderFoundConcept(step);
      case 'interrupt': return renderInterrupt(step);
      case 'rise': return renderRise(step);
      case 'clear': return renderClear(step);
      default: return advance();
    }
  }

  function actKicker(step) {
    // animate the act label only on the first screen of a new act
    let prev = step.i - 1;
    while (prev >= 0 && C.steps[prev].type === 'act') prev--;
    const isNew = prev < 0 || C.steps[prev].act !== step.act;
    return h('p', { class: 'act' + (isNew ? ' act-new' : '') }, h('span', null, C.data.acts[step.act]));
  }

  function frame(step, inner, opts) {
    opts = opts || {};
    return h('div', { class: 'play' + (opts.cls ? ' ' + opts.cls : '') },
      playBar(step, opts),
      gauge(opts.depth != null ? opts.depth : depthAt(step.i)),
      h('div', { class: 'col' }, inner));
  }

  /* questions */
  const HOLD_MS = 1200;   // a miss registers before the best reading appears

  /*
    Answering never re-renders or scrolls the page. The question is built once;
    an answer only changes classes on the existing options and fills two regions
    that were reserved when the question was drawn:
      .fb-bar   — the verdict line and CONTINUE, sticky at the viewport bottom
      .fb-panel — fixed-height explanation area that scrolls internally
  */
  function renderQuestion(q, opts) {
    opts = opts || {};
    const store = opts.store || R().answers;
    const answers = h('div', { class: 'answers' });
    const bar = h('div', { class: 'fb-bar', role: 'status', 'aria-live': 'polite' });
    const panel = h('div', { class: 'fb-panel' });
    const view = h('article', { class: 'q' + (q.voice ? ' voiced' : '') + (q.final ? ' final' : '') },
      opts.review ? opts.kicker : actKicker(q),
      h('p', { class: 'q-type' }, h('span', null, q.label), q.scored === false ? h('em', null, 'not scored') : null),
      q.quotes ? h('div', { class: 'quotes' }, q.quotes.map((t, i) => excerpt(t, '', { style: '--d:' + i }))) : null,
      q.speech ? h('div', { class: 'speech' }, h('p', { class: 'um-label' }, 'UNDERGROUND MAN'), excerpt(q.speech, 'bare')) : null,
      q.lines ? h('div', { class: 'lines' }, q.lines.map((t, i) => h('p', { style: '--d:' + i }, t))) : null,
      h('div', { class: 'prompt focus' }, q.prompt.map(p => h('p', null, p))),
      q.hint ? h('p', { class: 'hint' }, q.hint) : null,   // kept after answering, so nothing above the options moves
      answers, bar, panel);

    const show = (ans, fresh) => {
      const hold = fresh && !ans.correct;
      view.classList.add('answered');
      view.classList.toggle('hold', hold);
      mark(ans);
      fillFeedback(q, ans, opts, bar, panel);
      panel.scrollTop = 0;
      if (!opts.review) refreshBar();
      const release = () => {
        view.classList.remove('hold');
        if (q.final) answers.classList.add('withdraw');     // Q24: unchosen misreadings fade in place
        const btn = bar.querySelector('.btn');
        if (fresh && btn && answers.contains(document.activeElement || null)) btn.focus({ preventScroll: true });
      };
      if (hold) setTimeout(release, HOLD_MS);
      else if (fresh) setTimeout(release, reduced() ? 0 : 400);
      else release();
    };
    const commit = pick => {
      if (store[q.id]) return;                      // first attempt only — never re-scored
      const correct = isCorrect(q, pick);
      store[q.id] = { pick, correct, at: Date.now() };
      if (opts.onAnswer) opts.onAnswer(correct, pick);
      save();                                        // persisted before any feedback is shown
      show(store[q.id], true);
    };

    const mark = q.kind === 'multi' ? buildMulti(q, answers, commit)
      : q.kind === 'sequence' ? buildSequence(q, answers, commit)
      : buildChoice(q, answers, commit);

    mount(opts.wrap ? opts.wrap(view) : frame(q, view, { cls: q.voice ? 'voice' : '' }));
    if (store[q.id]) show(store[q.id], false);
  }

  // header insight and progress, updated in place
  function refreshBar() {
    const run = R();
    if (!run) return;
    const ins = $app.querySelector('.bar-ins');
    if (ins) ins.lastChild.textContent = runInsight(C, run);
    const prog = $app.querySelector('.bar-prog');
    if (prog) prog.style.setProperty('--p', C.scored.filter(q => run.answers[q.id]).length / C.total);
  }

  function buildChoice(q, slot, commit) {
    slot.classList.add('opts', q.layout ? 'layout-' + q.layout : 'layout-list');
    const btns = q.options.map((text, i) => {
      const b = h('button', { class: 'opt', onclick: () => commit(i) },
        q.layout ? null : h('span', { class: 'opt-l' }, letter(i)), h('span', { class: 'opt-t' }, text));
      slot.append(b);
      return b;
    });
    return ans => btns.forEach((b, i) => {
      b.disabled = true;
      b.setAttribute('aria-pressed', String(i === ans.pick));
      if (i === ans.pick) b.classList.add('chosen', ans.correct ? 'hit' : 'miss');
      else b.classList.add(i === q.answer ? 'key' : 'dim');
    });
  }

  function buildMulti(q, slot, commit) {
    slot.classList.add('opts', 'layout-list', 'multi');
    const sel = new Set();
    const confirm = h('button', { class: 'btn confirm', disabled: true, onclick: () => commit([...sel].sort()) }, 'CONFIRM');
    const btns = q.options.map((text, i) => {
      const b = h('button', {
        class: 'opt check', role: 'checkbox', 'aria-checked': 'false',
        onclick: () => {
          sel.has(i) ? sel.delete(i) : sel.add(i);
          b.setAttribute('aria-checked', String(sel.has(i)));
          b.classList.toggle('on', sel.has(i));
          confirm.disabled = sel.size === 0;
        }
      }, h('span', { class: 'opt-l box' }, letter(i)), h('span', { class: 'opt-t' }, text));
      slot.append(b);
      return b;
    });
    slot.append(confirm);
    return ans => {
      const got = new Set(ans.pick);
      btns.forEach((b, i) => {
        const want = q.answer.includes(i), picked = got.has(i);
        b.disabled = true;
        b.classList.remove('on');
        b.setAttribute('aria-checked', String(picked));
        b.classList.add(want && picked ? 'hit' : picked ? 'miss' : want ? 'key' : 'dim');
        if (picked) b.classList.add('chosen');
      });
      confirm.disabled = true;
      confirm.classList.add('spent');                // hidden, but still holding its space
    };
  }

  function buildSequence(q, slot, commit) {
    slot.classList.add('seq');
    let placed = [], result = null;
    const chain = h('ol', { class: 'chain' });
    const tray = h('div', { class: 'tray' });
    const confirm = h('button', { class: 'btn confirm', disabled: true, onclick: () => commit([...placed]) }, 'CONFIRM');
    const draw = () => {
      chain.replaceChildren();
      tray.replaceChildren();
      for (let k = 0; k < q.tiles.length; k++) {
        const t = placed[k];
        if (t == null) { chain.append(h('li', { class: 'slot empty' }, h('span', { class: 'slot-n' }, k + 1))); continue; }
        const cls = 'slot filled' + (result ? (t === q.answer[k] ? ' hit' : ' miss') : '');
        chain.append(h('li', { class: cls },
          h('button', { class: 'tile placed', disabled: !!result, 'aria-label': 'Remove ' + q.tiles[t],
            onclick: () => { placed.splice(k, 1); draw(); } },
            h('span', { class: 'slot-n' }, k + 1), h('span', { class: 'tile-t' }, q.tiles[t]))));
      }
      q.tiles.forEach((t, i) => {
        if (placed.includes(i)) return;
        tray.append(h('button', { class: 'tile', disabled: !!result, onclick: () => { placed.push(i); draw(); } }, t));
      });
      confirm.disabled = !!result || placed.length !== q.tiles.length;
    };
    draw();
    slot.append(chain, tray, confirm);
    return ans => {
      result = ans;
      placed = [...ans.pick];
      draw();
      confirm.classList.add('spent');
    };
  }

  // Fill the reserved verdict bar and explanation panel.
  function fillFeedback(q, ans, opts, bar, panel) {
    const r = ans.correct;
    const f = r ? q.right : q.wrong;
    const scored = !opts.review && q.scored;
    const next = opts.review ? opts.next : () => advance();
    const points = opts.review ? opts.scoreNote()
      : !scored ? 'NOT SCORED'
      : r ? '+' + POINTS + ' INSIGHT' : '0 INSIGHT';
    const flavour = r && q.right.label && q.right.label !== 'INSIGHT' ? q.right.label : null;

    const reading = which => {
      if (q.kind === 'choice') return [h('span', { class: 'rd-l' }, letter(which)), h('span', { class: 'rd-t' }, q.options[which])];
      if (q.kind === 'multi') return [h('span', { class: 'rd-t' }, which.length ? which.map(letter).join(' · ') : '—')];
      return [h('span', { class: 'rd-t' }, which.map(t => q.tiles[t]).join(' → '))];
    };

    bar.className = 'fb-bar ' + (r ? 'right' : 'wrong');
    bar.replaceChildren(
      h('div', { class: 'fb-result' },
        h('span', { class: 'fb-verdict' }, r ? 'INSIGHT' : 'MISREAD'),
        h('span', { class: 'fb-points' }, points)),
      h('button', { class: 'btn late', onclick: next }, opts.review ? opts.nextLabel : 'CONTINUE'));

    panel.className = 'fb-panel fb ' + (r ? 'right' : 'wrong');
    panel.replaceChildren(...[
      r ? null : h('div', { class: 'rd rd-mine' }, h('span', { class: 'rd-k' }, 'YOUR READING · MISREAD'), reading(ans.pick)),
      flavour ? h('p', { class: 'fb-label' }, flavour) : null,
      q.headline ? h('p', { class: 'fb-head' }, q.headline) : null,
      f && f.body ? h('div', { class: 'fb-body' }, arr(f.body).map(t => h('p', null, t))) : null,
      r ? null : h('div', { class: 'rd rd-best late' }, h('span', { class: 'rd-k' }, 'BEST READING'), reading(q.answer)),
      q.coda ? h('div', { class: 'coda' + (q.final ? ' coda-final' : '') }, q.coda.map((t, i) => h('p', { style: '--d:' + i }, t))) : null,
      q.quote ? excerpt(q.quote, 'fb-quote') : null
    ].filter(Boolean));
  }

  /* reveals */
  function renderConcept(step) {
    mount(frame(step, h('article', { class: 'concept' },
      actKicker(step),
      h('p', { class: 'kicker' }, 'CONCEPT'),
      h('h2', { class: 'concept-t' }, step.title),
      h('div', { class: 'concept-b' }, step.body.map(p => h('p', null, p))),
      step.quote ? excerpt(step.quote, 'concept-q') : null,
      step.note ? h('p', { class: 'concept-n' }, step.note) : null,
      h('button', { class: 'btn', onclick: advance }, 'CONTINUE'))));
  }

  function renderBeat(step) {
    mount(frame(step, h('article', { class: 'beat' + (step.full ? ' full' : '') },
      h('div', { class: 'beat-lines focus' }, step.lines.map((l, i) => h('p', { style: '--d:' + i }, l))),
      step.sub ? h('p', { class: 'beat-sub' }, step.sub) : null,
      h('button', { class: 'btn ghost', onclick: advance }, 'CONTINUE')), { cls: step.full ? 'bare' : '' }));
  }

  function renderFoundConcept(step) {
    mount(frame(step, h('article', { class: 'beat found-c' },
      h('p', { class: 'kicker' }, 'CONCEPT FOUND'),
      h('h2', { class: 'found-t' }, step.title),
      h('p', { class: 'found-l' }, step.line),
      h('button', { class: 'btn ghost', onclick: advance }, 'CONTINUE'))));
  }

  function renderInterrupt(step) {
    setMood('under', 0);
    const run = R();
    const reply = h('div', { class: 'um-reply', 'aria-live': 'polite' });   // reserved; filled in place
    const opts = step.responses.map((r, i) => h('button', {
      class: 'um-opt', style: '--k:' + i, onclick: () => choose(i)
    }, r.text));
    const view = h('article', { class: 'um' },
      h('p', { class: 'um-label' }, 'UNDERGROUND MAN'),
      typeof step.line === 'string'
        ? h('p', { class: 'um-line said-line focus' }, step.line)
        : h('div', { class: 'um-line focus' }, excerpt(step.line, 'bare')),
      h('div', { class: 'um-resp' }, opts),
      reply);
    const show = pick => {
      const chosen = step.responses[pick];
      view.classList.add('answered');
      opts.forEach((b, i) => { b.disabled = true; b.classList.add(i === pick ? 'said' : 'gone'); });
      reply.replaceChildren(
        h('p', { class: 'said-line' }, chosen.reply),
        h('p', { class: 'um-aside' }, chosen.aside),
        h('button', { class: 'btn ghost', onclick: advance }, 'CONTINUE'));
    };
    const choose = i => {
      if (run.interrupts[step.id] != null) return;
      run.interrupts[step.id] = i; cs().interrupts[step.id] = i; save();
      show(i);
    };
    mount(h('div', { class: 'play under' },
      h('button', { class: 'bar-back ghosted', onclick: () => go('map'), 'aria-label': 'Return to map' }, '← MAP'),
      h('div', { class: 'col' }, view)));
    if (run.interrupts[step.id] != null) show(run.interrupts[step.id]);
  }

  function renderRise(step) {
    const from = step.from != null ? step.from : depthAt(step.i);
    const to = step.to;
    const num = h('p', { class: 'rise-n focus' }, fmt(from));
    const btn = h('button', { class: 'btn ghost', onclick: advance }, 'CONTINUE');
    btn.style.visibility = 'hidden';
    const view = h('article', { class: 'rise' + (step.final ? ' final' : '') },
      h('p', { class: 'kicker' }, step.final ? 'ASCENT' : 'RISING'),
      num,
      h('div', { class: 'rise-shaft' }, h('span', { class: 'rise-mark', style: '--from:' + gaugeY(from) + ';--to:' + gaugeY(to) })),
      step.final ? h('p', { class: 'rise-sub' }, fmt(from) + ' → ' + fmt(to)) : null,
      btn);
    mount(frame(step, view, { cls: 'bare', depth: to }));
    S.depth = Math.max(S.depth, to); // deepest→shallowest; a replay never sinks you again
    save();
    setTimeout(() => {
      $app.querySelector('.rise') && $app.querySelector('.rise').classList.add('go');
      countTo(num, from, to, step.final ? 2600 : 1600, () => { btn.style.visibility = 'visible'; });
    }, reduced() ? 0 : 350);
  }

  function renderClear() {
    completeRun();
    setMood('dawn', lift(C.meta.endDepth) + 0.08);
    mount(h('div', { class: 'play bare' },
      h('div', { class: 'col' }, h('article', { class: 'clear' },
        h('span', { class: 'clear-seam', 'aria-hidden': 'true' }),
        h('p', { class: 'kicker' }, 'DEPTH ' + C.meta.n + ' · ', h('span', { class: 'nocase' }, fmt(C.meta.endDepth))),
        h('h1', { class: 'clear-t focus' }, C.meta.name + ' CLEARED'),
        h('button', { class: 'btn', onclick: () => go('results:' + C.id) }, 'WHAT YOU UNDERSTAND')))));
  }

  function completeRun() {
    const st = cs(), run = st.run;
    if (!run) return;
    const answers = {};
    C.scored.forEach(q => { answers[q.id] = run.answers[q.id] || { pick: null, correct: false }; });
    if (!st.record) st.record = { answers, completedAt: Date.now() };
    st.completed = true;
    st.completedAt = st.completedAt || Date.now();
    st.runs = (st.runs || 0) + 1;
    S.depth = Math.max(S.depth, C.meta.endDepth);
    st.lastRun = { correct: runCorrect(C, run), insight: runInsight(C, run), replay: !!run.replay, at: Date.now() };
    st.run = null;
    save();
  }

  /* ── RESULTS ───────────────────────────────────────────────── */
  function renderResults() {
    const m = mastery(C);
    if (!m) return go('map');
    setMood('dawn', lift(C.meta.endDepth) + 0.08);
    const last = cs().lastRun;
    const n = openReviews(C);
    const view = h('section', { class: 'results' },
      h('p', { class: 'kicker' }, C.meta.name + ' · ', h('span', { class: 'nocase' }, fmt(C.meta.endDepth))),
      h('h1', { class: 'res-t' }, 'WHAT YOU UNDERSTAND'),
      h('ul', { class: 'mastery' }, m.concepts.map((c, i) => h('li', { style: '--d:' + i },
        h('div', { class: 'm-row' },
          h('span', { class: 'm-name' }, c.name),
          h('span', { class: 'm-pct' }, c.pctWith + '%')),
        h('div', { class: 'm-bar', 'aria-hidden': 'true' },
          h('span', { class: 'm-known', style: '--w:' + c.pct / 100 }),
          h('span', { class: 'm-reg', style: '--x:' + c.pct / 100 + ';--w:' + (c.pctWith - c.pct) / 100 })),
        h('p', { class: 'm-sub' }, c.known + ' of ' + c.total + (c.regained ? ' · ' + c.regained + ' recovered in review' : ''))))),
      h('div', { class: 'tally' },
        h('p', null, h('b', null, m.correct + ' / ' + C.total), h('span', null, 'FIRST-ATTEMPT CORRECT')),
        h('p', null, h('b', null, m.insight + ' / ' + C.max), h('span', null, 'INSIGHT'))),
      last && last.replay ? h('p', { class: 'res-note' },
        'This descent: ' + last.correct + ' / ' + C.total + ' first-attempt. Your record stays from your first descent. Misreads are recovered only through review.') : null,
      m.regained ? h('p', { class: 'res-note' }, m.regained + ' misread' + (m.regained > 1 ? 's' : '') + ' recovered in review. Insight stays as first earned.') : null,
      h('div', { class: 'stack' },
        h('button', { class: 'btn', onclick: () => go('map', { ascent: C.id }) }, 'CONTINUE ASCENT'),
        h('button', { class: 'btn ghost', onclick: () => go('review:' + C.id) }, n ? 'REVIEW MISREADS · ' + n : 'REVIEW MISREADS'),
        h('button', { class: 'btn ghost', onclick: () => startRun(C.id) }, 'REENTER ' + C.meta.name)));
    mount(h('div', { class: 'page' }, h('div', { class: 'col' }, view)));
  }

  /* ── REVIEW MISREADS ───────────────────────────────────────── */
  const actOf = qid => 'ACT ' + ROMAN[C.Q[qid].act - 1];

  function renderReview() {
    if (!cs().record) return go('map');
    setMood('play', lift(S.depth));
    const groups = reviewGroups(C);
    const list = groups.map(x => {
      const acts = [...new Set(x.missed.map(actOf))].join(', ');
      const status = { open: 'A NEW ANGLE', recovered: 'RECOVERED', unresolved: 'STILL OPEN' }[x.status];
      const inner = [
        h('span', { class: 'rv-c' }, x.g.concept),
        h('span', { class: 'rv-m' }, 'Misread in ' + acts),
        h('span', { class: 'rv-s' }, status)
      ];
      return x.status === 'open'
        ? h('li', null, h('button', { class: 'rv open', onclick: () => go('reviewq:' + C.id + ':' + x.g.id) }, inner))
        : h('li', null, h('div', { class: 'rv ' + x.status }, inner));
    });
    const view = h('section', { class: 'review' },
      h('button', { class: 'bar-back', onclick: () => go('map') }, '← MAP'),
      h('p', { class: 'kicker' }, C.meta.name),
      h('h1', { class: 'res-t' }, 'REVIEW MISREADS'),
      h('p', { class: 'rv-intro' }, 'Not the same questions. The same ideas, from another angle. Answer correctly on the first try to recover mastery.'),
      groups.length
        ? h('ul', { class: 'rv-list' }, list)
        : h('p', { class: 'rv-empty' }, 'No misreads recorded on your first descent.'),
      groups.some(x => x.status === 'unresolved')
        ? h('p', { class: 'res-note' }, 'An idea marked STILL OPEN has used all its current angles. More will come with the full game.') : null,
      h('div', { class: 'stack' },
        h('button', { class: 'btn ghost', onclick: () => go('results:' + C.id) }, 'WHAT YOU UNDERSTAND')));
    mount(h('div', { class: 'page' }, h('div', { class: 'col' }, view)));
  }

  function renderReviewQ(gid) {
    const st = cs();
    const g = C.review.find(x => x.id === gid);
    if (!g || !st.record) return go('review:' + C.id);
    const rs = st.review[gid] = st.review[gid] || { v: 0, exhausted: false, answered: null };
    const variant = g.variants[rs.answered ? rs.answered.v : rs.v];
    if (!variant) return go('review:' + C.id);
    setMood('play', lift(S.depth));
    const q = {
      id: gid, kind: 'choice', label: 'A NEW ANGLE', scored: false, quotes: variant.quotes,
      prompt: variant.prompt, options: variant.options, answer: variant.answer,
      right: { label: 'RECOVERED', body: variant.right }, wrong: { body: variant.wrong }
    };
    const store = {};
    if (rs.answered) store[gid] = rs.answered;
    renderQuestion(q, {
      review: true,
      store,
      kicker: h('p', { class: 'act' }, h('span', null, 'REVIEW · ' + g.concept)),
      onAnswer: (correct) => {
        rs.answered = { v: rs.v, pick: store[gid].pick, correct, at: Date.now() };
        if (correct) g.sources.forEach(id => {
          const a = st.record.answers[id];
          if (!(a && a.correct)) st.recovered[id] = true;
        });
        else { rs.v++; if (rs.v >= g.variants.length) rs.exhausted = true; }
      },
      next: () => { rs.answered = null; save(); go('review:' + C.id); },
      nextLabel: 'BACK TO MISREADS',
      // read after onAnswer has updated rs, so the note reflects this answer
      scoreNote: () => !rs.answered ? '' : rs.answered.correct ? 'MASTERY RECOVERED'
        : rs.exhausted ? 'STILL OPEN' : 'ANOTHER ANGLE WAITS',
      wrap: art => h('div', { class: 'page' }, h('div', { class: 'col' },
        h('button', { class: 'bar-back', onclick: () => go('review:' + C.id) }, '← MISREADS'), art))
    });
  }

  /* ── boot ──────────────────────────────────────────────────── */
  (function boot() {
    const v = S.view || 'map';
    const [kind, id] = v.split(':');
    if (kind === 'map' || !playable(id)) return go('map');
    const st = peek(id);
    if (kind === 'play' && !st.run) return go('map');
    if (kind !== 'play' && !st.record) return go('map');
    go(v);
  })();

  // test hook (harmless in production): lets automated checks read state and content
  window.__underground = {
    state: () => JSON.parse(JSON.stringify(S)),
    current: () => C && C.id,
    chamber: id => ({ steps: CHAMBERS[id].steps, total: CHAMBERS[id].total }),
    playable: () => Object.keys(CHAMBERS)
  };
})();
