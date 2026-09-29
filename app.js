/* UNDERGROUND — prototype engine. Vanilla JS, no network, state in localStorage. */
(function () {
  'use strict';

  const U = window.UNDERGROUND;
  const CH = U.spite;
  const META = U.chambers.find(c => c.id === 'spite');
  const KEY = 'underground.v1';
  const POINTS = 10;

  /* ── content index ─────────────────────────────────────────── */
  let act = 1;
  const STEPS = CH.steps.map((s, i) => {
    if (s.type === 'act') act = s.act;
    return Object.assign({ i, act }, s);
  });
  const QUESTIONS = STEPS.filter(s => s.type === 'question');
  const SCORED = QUESTIONS.filter(q => q.scored);
  SCORED.forEach((q, i) => { q.n = i + 1; });
  const Q = Object.fromEntries(QUESTIONS.map(q => [q.id, q]));
  const REVIEW = CH.review;
  const TOTAL = SCORED.length;             // 24
  const MAX = TOTAL * POINTS;              // 240

  /* ── state ─────────────────────────────────────────────────── */
  function fresh() {
    return {
      version: 1,
      contentVersion: U.contentVersion,
      depth: META.startDepth,
      view: 'map',
      run: null,          // in-progress descent
      lastRun: null,      // summary of the most recent completed descent
      spite: {
        completed: false,
        completedAt: null,
        runs: 0,
        record: null,     // first completed descent: { answers: { qid: { pick, correct } } }
        recovered: {},    // qid -> true when regained through review
        review: {},       // groupId -> { v, exhausted, answered }
        interrupts: {}
      }
    };
  }
  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const s = JSON.parse(raw);
        if (s && s.version === 1 && s.spite && s.contentVersion === U.contentVersion) return s;
      }
    } catch (e) { /* storage unavailable or corrupt: start clean */ }
    return fresh();
  }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* private mode: play on */ }
  }
  let S = load();

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

  function setMood(mood, lift) {
    document.body.dataset.mood = mood || '';
    root.style.setProperty('--lift', Math.max(0, Math.min(1, lift)).toFixed(3));
  }
  const depthLift = d => (d - META.startDepth) / (META.endDepth - META.startDepth); // −43→0, −31→1

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
  const runInsight = run => SCORED.reduce((n, q) => n + (run.answers[q.id] && run.answers[q.id].correct ? POINTS : 0), 0);
  const runCorrect = run => SCORED.filter(q => run.answers[q.id] && run.answers[q.id].correct).length;

  function mastery() {
    const rec = S.spite.record;
    if (!rec) return null;
    const known = q => !!(rec.answers[q.id] && rec.answers[q.id].correct);
    const regained = q => !known(q) && !!S.spite.recovered[q.id];
    const concepts = U.concepts.map(c => {
      const qs = SCORED.filter(q => q.concepts.includes(c));
      const k = qs.filter(known).length, r = qs.filter(regained).length;
      return { name: c, total: qs.length, known: k, regained: r,
               pct: Math.round(k / qs.length * 100), pctWith: Math.round((k + r) / qs.length * 100) };
    });
    const correct = SCORED.filter(known).length;
    return { concepts, correct, insight: correct * POINTS, regained: SCORED.filter(regained).length };
  }

  function reviewGroups() {
    const rec = S.spite.record;
    if (!rec) return [];
    return REVIEW.map(g => {
      const missed = g.sources.filter(id => !(rec.answers[id] && rec.answers[id].correct));
      const open = missed.filter(id => !S.spite.recovered[id]);
      const st = S.spite.review[g.id] || { v: 0, exhausted: false, answered: null };
      const status = !missed.length ? 'none' : !open.length ? 'recovered' : st.exhausted ? 'unresolved' : 'open';
      return { g, missed, open, st, status };
    }).filter(x => x.status !== 'none');
  }
  const openReviews = () => reviewGroups().filter(x => x.status === 'open').length;

  /* ── navigation ────────────────────────────────────────────── */
  function go(view, opts) {
    S.view = view;
    save();
    closeModal();
    if (view === 'map') renderMap(opts);
    else if (view === 'play') renderPlay();
    else if (view === 'results') renderResults();
    else if (view === 'review') renderReview();
    else if (view.startsWith('reviewq:')) renderReviewQ(view.slice(8));
    else renderMap();
  }

  function startRun() {
    S.run = { step: 0, answers: {}, interrupts: {}, startedAt: Date.now(), replay: !!S.spite.record };
    skipActs();
    go('play');
  }
  function skipActs() {
    while (S.run.step < STEPS.length && STEPS[S.run.step].type === 'act') S.run.step++;
  }
  function advance() {
    S.run.step++;
    skipActs();
    save();
    renderPlay();
  }

  const depthAt = idx => {
    let d = META.startDepth;
    for (let i = 0; i < idx; i++) if (STEPS[i].type === 'rise') d = STEPS[i].to;
    return d;
  };

  /* ── MAP ───────────────────────────────────────────────────── */
  function renderMap(opts) {
    opts = opts || {};
    const done = S.spite.completed;
    setMood('map', depthLift(S.depth));
    const rows = [...U.chambers].reverse().map(c => {
      if (c.id === 'spite') return spiteRow(c, done);
      const pulse = opts.ascent && c.id === 'wall';
      return h('li', { class: 'ch locked' + (c.id === 'surface' ? ' surface' : '') + (pulse ? ' pulse' : ''), 'aria-disabled': 'true' },
        h('span', { class: 'ch-n' }, c.n),
        h('span', { class: 'ch-name' }, c.name),
        h('span', { class: 'ch-lock' }, 'SEALED'));
    });
    if (done) {
      const idx = rows.findIndex(r => r.classList.contains('spite'));
      rows.splice(idx, 0, h('li', { class: 'you' }, h('span', { class: 'you-line' }), h('span', null, 'YOU ARE HERE · ' + fmt(S.depth))));
    }

    const view = h('section', { class: 'map' },
      h('header', { class: 'map-head' },
        h('p', { class: 'eyebrow' }, 'After Dostoevsky · ', h('em', null, 'Notes from Underground')),
        h('h1', { class: 'title', 'data-autofocus': true }, 'UNDERGROUND'),
        h('p', { class: 'now' }, h('span', { class: 'now-k' }, 'CURRENT DEPTH'), h('span', { class: 'num' }, fmt(S.depth)))),
      h('ol', { class: 'chambers', 'aria-label': 'Chambers, surface at top' }, rows),
      opts.ascent ? h('p', { class: 'map-note' }, 'THE WALL is still sealed. The next chamber has not been opened yet.') : null,
      h('footer', { class: 'map-foot' },
        h('button', { class: 'link', onclick: openSettings }, 'SETTINGS')));
    mount(view);
  }

  function spiteRow(c, done) {
    const inRun = !!S.run;
    const kick = h('p', { class: 'card-k' }, h('span', null, 'DEPTH ' + c.n), done ? h('span', { class: 'cleared' }, 'CLEARED') : null);
    const body = [
      kick,
      h('h2', { class: 'card-title' }, c.name),
      h('p', { class: 'card-q' }, c.question)
    ];
    if (!done) {
      body.push(h('button', { class: 'btn', onclick: () => (inRun ? go('play') : startRun()) }, inRun ? 'RESUME' : 'ENTER'));
      return h('li', { class: 'ch spite open' }, h('div', { class: 'card' }, body));
    }
    body.push(h('div', { class: 'card-actions' },
      h('button', { class: 'btn ghost', onclick: openFound }, 'TOUCH THE SEAM'),
      inRun ? h('button', { class: 'btn ghost', onclick: () => go('play') }, 'RESUME DESCENT') : null));
    return h('li', { class: 'ch spite open done' },
      h('button', { class: 'fissure', 'aria-label': 'The seam of light in SPITE', onclick: openFound }, h('span')),
      h('div', { class: 'card' }, body));
  }

  function openFound() {
    const n = openReviews();
    modal(h('div', { class: 'sheet found' },
      h('p', { class: 'kicker' }, 'YOU FOUND'),
      h('blockquote', { class: 'found-q', 'data-autofocus': true }, CH.found.lines.map(l => h('span', null, l))),
      h('div', { class: 'stack' },
        h('button', { class: 'btn', onclick: () => { closeModal(); startRun(); } }, 'REENTER SPITE'),
        h('button', { class: 'btn ghost', onclick: () => go('review') }, n ? 'REVIEW MISREADS · ' + n : 'REVIEW MISREADS'),
        h('button', { class: 'link', onclick: () => go('results') }, 'WHAT YOU UNDERSTAND')),
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
      h('p', { class: 'sheet-p', 'data-autofocus': true }, 'This erases every answer, your Insight, review progress and depth. You return to ' + fmt(META.startDepth) + '. This cannot be undone.'),
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
    const run = S.run;
    const answered = SCORED.filter(q => run.answers[q.id]).length;
    const qn = step.type === 'question' && step.scored ? step.n : Math.min(TOTAL, answered);
    return h('header', { class: 'bar' + (opts && opts.hide ? ' hide' : '') },
      h('button', { class: 'bar-back', onclick: () => go('map'), 'aria-label': 'Return to map (progress is saved)' }, '← MAP'),
      h('div', { class: 'bar-mid' },
        h('span', { class: 'bar-ch' }, 'SPITE'),
        h('span', { class: 'bar-sep' }, '·'),
        h('span', { class: 'bar-count' }, pad(qn) + ' / ' + TOTAL)),
      h('div', { class: 'bar-right' },
        h('span', { class: 'bar-ins' }, h('small', null, 'INSIGHT '), runInsight(run)),
        h('span', { class: 'bar-depth' }, fmt(opts && opts.depth != null ? opts.depth : depthAt(step.i)))),
      h('div', { class: 'bar-prog', style: '--p:' + (answered / TOTAL) }));
  }

  function gauge(depth) {
    // vertical depth instrument (desktop); surface at top
    const y = Math.min(1, Math.abs(depth) / 45);
    return h('div', { class: 'gauge', 'aria-hidden': 'true' },
      h('span', { class: 'gauge-top' }, 'SURFACE'),
      h('span', { class: 'gauge-line' }),
      h('span', { class: 'gauge-mark', style: '--y:' + y }, h('i'), h('b', null, fmt(depth))));
  }

  function renderPlay() {
    const run = S.run;
    if (!run) return go('map');
    const step = STEPS[run.step];
    if (!step) return go('results');
    const answered = SCORED.filter(q => run.answers[q.id]).length;
    const warm = step.act === 6;
    setMood(warm ? 'warm' : 'play', Math.max(depthLift(depthAt(step.i)), answered / TOTAL * 0.9));

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
    while (prev >= 0 && STEPS[prev].type === 'act') prev--;
    const fresh = prev < 0 || STEPS[prev].act !== step.act;
    return h('p', { class: 'act' + (fresh ? ' act-new' : '') }, h('span', null, U.acts[step.act]));
  }

  function frame(step, inner, opts) {
    opts = opts || {};
    return h('div', { class: 'play' + (opts.cls ? ' ' + opts.cls : '') },
      playBar(step, opts),
      gauge(opts.depth != null ? opts.depth : depthAt(step.i)),
      h('div', { class: 'col' }, inner));
  }

  /* questions */
  function renderQuestion(q, opts) {
    opts = opts || {};
    const store = opts.store || S.run.answers;
    const ans = store[q.id];
    const view = h('article', { class: 'q' + (q.voice ? ' voiced' : '') + (q.final ? ' final' : '') },
      opts.review ? opts.kicker : actKicker(q),
      h('p', { class: 'q-type' }, h('span', null, q.label), q.scored === false ? h('em', null, 'not scored') : null),
      q.quotes ? h('div', { class: 'quotes' }, q.quotes.map((t, i) => excerpt(t, '', { style: '--d:' + i }))) : null,
      q.speech ? h('div', { class: 'speech' }, h('p', { class: 'um-label' }, 'UNDERGROUND MAN'), excerpt(q.speech, 'bare')) : null,
      q.lines ? h('div', { class: 'lines' }, q.lines.map((t, i) => h('p', { style: '--d:' + i }, t))) : null,
      h('div', { class: 'prompt focus' }, q.prompt.map(p => h('p', null, p))),
      q.hint && !ans ? h('p', { class: 'hint' }, q.hint) : null,
      h('div', { class: 'answers' }),
      h('div', { class: 'fb-slot', 'aria-live': 'polite' }));

    const slot = view.querySelector('.answers');
    const fbSlot = view.querySelector('.fb-slot');
    const commit = pick => {
      if (store[q.id]) return;                      // first attempt only — never re-scored
      const correct = isCorrect(q, pick);
      store[q.id] = { pick, correct, at: Date.now() };
      if (opts.onAnswer) opts.onAnswer(correct, pick);
      save();                                        // persisted before any feedback is shown
      rerender();
    };
    const rerender = () => {
      if (opts.review) return opts.rerender();
      const y = window.scrollY;
      renderQuestion(q, opts);
      window.scrollTo(0, y);
      const fb = $app.querySelector('.fb');
      if (fb && !reduced()) fb.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      else if (fb) fb.scrollIntoView({ block: 'nearest' });
    };

    if (q.kind === 'choice') buildChoice(q, slot, ans, commit);
    else if (q.kind === 'multi') buildMulti(q, slot, ans, commit);
    else if (q.kind === 'sequence') buildSequence(q, slot, ans, commit);

    if (ans) fbSlot.append(feedback(q, ans, opts));

    const node = opts.review ? view : frame(q, view, { cls: q.voice ? 'voice' : '' });
    mount(node, { keepScroll: !!ans });
    if (ans && q.final) {
      const a = $app.querySelector('.answers');
      setTimeout(() => a && a.classList.add('collapse'), reduced() ? 0 : 400);
    }
  }

  function buildChoice(q, slot, ans, commit) {
    slot.classList.add('opts', q.layout ? 'layout-' + q.layout : 'layout-list');
    q.options.forEach((text, i) => {
      let cls = 'opt';
      if (ans) {
        if (i === q.answer) cls += ans.correct ? ' hit' : ' key';
        else if (i === ans.pick) cls += ' miss';
        else cls += ' dim';
      }
      slot.append(h('button', {
        class: cls, disabled: !!ans, 'aria-pressed': ans ? String(i === ans.pick) : null,
        onclick: () => commit(i)
      }, q.layout ? null : h('span', { class: 'opt-l' }, letter(i)), h('span', { class: 'opt-t' }, text)));
    });
  }

  function buildMulti(q, slot, ans, commit) {
    slot.classList.add('opts', 'layout-list', 'multi');
    const sel = new Set(ans ? ans.pick : []);
    const confirm = h('button', { class: 'btn confirm', disabled: true, onclick: () => commit([...sel].sort()) }, 'CONFIRM');
    q.options.forEach((text, i) => {
      let cls = 'opt check';
      if (ans) {
        const want = q.answer.includes(i), got = sel.has(i);
        cls += want && got ? ' hit' : !want && got ? ' miss' : want ? ' key' : ' dim';
      }
      const b = h('button', {
        class: cls, disabled: !!ans, role: 'checkbox', 'aria-checked': String(sel.has(i)),
        onclick: () => {
          sel.has(i) ? sel.delete(i) : sel.add(i);
          b.setAttribute('aria-checked', String(sel.has(i)));
          b.classList.toggle('on', sel.has(i));
          confirm.disabled = sel.size === 0;
        }
      }, h('span', { class: 'opt-l box' }, letter(i)), h('span', { class: 'opt-t' }, text));
      if (sel.has(i)) b.classList.add('on');
      slot.append(b);
    });
    if (!ans) slot.append(confirm);
  }

  function buildSequence(q, slot, ans, commit) {
    slot.classList.add('seq');
    const placed = ans ? [...ans.pick] : [];
    const chain = h('ol', { class: 'chain' });
    const tray = h('div', { class: 'tray' });
    const confirm = h('button', { class: 'btn confirm', disabled: true, onclick: () => commit([...placed]) }, 'CONFIRM');
    const draw = () => {
      chain.replaceChildren();
      tray.replaceChildren();
      for (let k = 0; k < q.tiles.length; k++) {
        const t = placed[k];
        if (t == null) { chain.append(h('li', { class: 'slot empty' }, h('span', { class: 'slot-n' }, k + 1))); continue; }
        let cls = 'slot filled';
        if (ans) cls += t === q.answer[k] ? ' hit' : ' miss';
        chain.append(h('li', { class: cls },
          h('button', { class: 'tile placed', disabled: !!ans, 'aria-label': 'Remove ' + q.tiles[t],
            onclick: () => { placed.splice(k, 1); draw(); } },
            h('span', { class: 'slot-n' }, k + 1), q.tiles[t])));
      }
      q.tiles.forEach((t, i) => {
        if (placed.includes(i)) return;
        tray.append(h('button', { class: 'tile', disabled: !!ans, onclick: () => { placed.push(i); draw(); } }, t));
      });
      confirm.disabled = placed.length !== q.tiles.length;
    };
    draw();
    slot.append(chain);
    if (!ans) slot.append(tray, confirm);
    else if (!ans.correct) {
      slot.append(h('div', { class: 'chain-key' },
        h('p', { class: 'kicker' }, 'THE CHAIN'),
        h('p', { class: 'chain-line' }, q.answer.map((t, k) => [k ? h('span', { class: 'arr' }, '→') : null, h('span', null, q.tiles[t])]))));
    }
  }

  function feedback(q, ans, opts) {
    const r = ans.correct;
    const f = r ? q.right : q.wrong;
    const scored = !opts.review && q.scored;
    const next = opts.review ? opts.next : () => advance();
    const nextLabel = opts.review ? opts.nextLabel : 'CONTINUE';
    return h('section', { class: 'fb ' + (r ? 'right' : 'wrong') },
      h('p', { class: 'fb-label' }, r ? (q.right.label || 'INSIGHT') : 'MISREAD'),
      q.headline ? h('p', { class: 'fb-head' }, q.headline) : null,
      f && f.body ? h('div', { class: 'fb-body' }, arr(f.body).map(t => h('p', null, t))) : null,
      q.coda ? h('div', { class: 'coda' + (q.final ? ' coda-final' : '') }, q.coda.map((t, i) => h('p', { style: '--d:' + i }, t))) : null,
      q.quote ? excerpt(q.quote, 'fb-quote') : null,
      opts.review ? opts.extra : null,
      h('div', { class: 'fb-foot' },
        h('span', { class: 'fb-score' }, scored ? (r ? '+' + POINTS + ' INSIGHT' : '0 INSIGHT') : opts.review ? opts.scoreNote : 'NOT SCORED'),
        h('button', { class: 'btn', 'data-autofocus': true, onclick: next }, nextLabel)));
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
    const pick = S.run.interrupts[step.id];
    setMood('under', 0);
    const chosen = pick != null ? step.responses[pick] : null;
    const view = h('article', { class: 'um' + (chosen ? ' answered' : '') },
      h('p', { class: 'um-label' }, 'UNDERGROUND MAN'),
      typeof step.line === 'string'
        ? h('p', { class: 'um-line said-line focus' }, step.line)
        : h('div', { class: 'um-line focus' }, excerpt(step.line, 'bare')),
      h('div', { class: 'um-resp' }, step.responses.map((r, i) => h('button', {
        class: 'um-opt' + (chosen ? (i === pick ? ' said' : ' gone') : ''), style: '--k:' + i, disabled: !!chosen,
        onclick: () => { S.run.interrupts[step.id] = i; S.spite.interrupts[step.id] = i; save(); renderInterrupt(step); }
      }, r.text))),
      chosen ? h('div', { class: 'um-reply', 'aria-live': 'polite' },
        h('p', { class: 'said-line' }, chosen.reply),
        h('p', { class: 'um-aside' }, chosen.aside),
        h('button', { class: 'btn ghost', 'data-autofocus': true, onclick: advance }, 'CONTINUE')) : null);
    mount(h('div', { class: 'play under' },
      h('button', { class: 'bar-back ghosted', onclick: () => go('map'), 'aria-label': 'Return to map' }, '← MAP'),
      h('div', { class: 'col' }, view)), { keepScroll: !!chosen });
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
      h('div', { class: 'rise-shaft' }, h('span', { class: 'rise-mark', style: '--from:' + Math.abs(from) / 45 + ';--to:' + Math.abs(to) / 45 })),
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

  function renderClear(step) {
    completeRun();
    setMood('dawn', 1);
    mount(h('div', { class: 'play bare' },
      h('div', { class: 'col' }, h('article', { class: 'clear' },
        h('span', { class: 'clear-seam', 'aria-hidden': 'true' }),
        h('p', { class: 'kicker' }, 'DEPTH 05 · ', h('span', { class: 'nocase' }, fmt(META.endDepth))),
        h('h1', { class: 'clear-t focus' }, 'SPITE CLEARED'),
        h('button', { class: 'btn', onclick: () => go('results') }, 'WHAT YOU UNDERSTAND')))));
  }

  function completeRun() {
    const run = S.run;
    if (!run) return;
    const answers = {};
    SCORED.forEach(q => { answers[q.id] = run.answers[q.id] || { pick: null, correct: false }; });
    if (!S.spite.record) S.spite.record = { answers, completedAt: Date.now() };
    S.spite.completed = true;
    S.spite.completedAt = S.spite.completedAt || Date.now();
    S.spite.runs = (S.spite.runs || 0) + 1;
    S.depth = META.endDepth;
    S.lastRun = { correct: runCorrect(run), insight: runInsight(run), replay: !!run.replay, at: Date.now() };
    S.run = null;
    save();
  }

  /* ── RESULTS ───────────────────────────────────────────────── */
  function renderResults() {
    const m = mastery();
    if (!m) return go('map');
    setMood('dawn', 1);
    const last = S.lastRun;
    const n = openReviews();
    const view = h('section', { class: 'results' },
      h('p', { class: 'kicker' }, 'SPITE · ', h('span', { class: 'nocase' }, fmt(META.endDepth))),
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
        h('p', null, h('b', null, m.correct + ' / ' + TOTAL), h('span', null, 'FIRST-ATTEMPT CORRECT')),
        h('p', null, h('b', null, m.insight + ' / ' + MAX), h('span', null, 'INSIGHT'))),
      last && last.replay ? h('p', { class: 'res-note' },
        'This descent: ' + last.correct + ' / ' + TOTAL + ' first-attempt. Your record stays from your first descent. Misreads are recovered only through review.') : null,
      m.regained ? h('p', { class: 'res-note' }, m.regained + ' misread' + (m.regained > 1 ? 's' : '') + ' recovered in review. Insight stays as first earned.') : null,
      h('div', { class: 'stack' },
        h('button', { class: 'btn', onclick: () => go('map', { ascent: true }) }, 'CONTINUE ASCENT'),
        h('button', { class: 'btn ghost', onclick: () => go('review') }, n ? 'REVIEW MISREADS · ' + n : 'REVIEW MISREADS'),
        h('button', { class: 'btn ghost', onclick: startRun }, 'REENTER SPITE')));
    mount(h('div', { class: 'page' }, h('div', { class: 'col' }, view)));
  }

  /* ── REVIEW MISREADS ───────────────────────────────────────── */
  function actOf(qid) { return 'ACT ' + ['I', 'II', 'III', 'IV', 'V', 'VI'][Q[qid].act - 1]; }

  function renderReview() {
    if (!S.spite.record) return go('map');
    setMood('play', depthLift(S.depth));
    const groups = reviewGroups();
    const list = groups.map(x => {
      const acts = [...new Set(x.missed.map(actOf))].join(', ');
      const status = { open: 'A NEW ANGLE', recovered: 'RECOVERED', unresolved: 'STILL OPEN' }[x.status];
      const inner = [
        h('span', { class: 'rv-c' }, x.g.concept),
        h('span', { class: 'rv-m' }, 'Misread in ' + acts),
        h('span', { class: 'rv-s' }, status)
      ];
      return x.status === 'open'
        ? h('li', null, h('button', { class: 'rv open', onclick: () => go('reviewq:' + x.g.id) }, inner))
        : h('li', null, h('div', { class: 'rv ' + x.status }, inner));
    });
    const view = h('section', { class: 'review' },
      h('button', { class: 'bar-back', onclick: () => go('map') }, '← MAP'),
      h('p', { class: 'kicker' }, 'SPITE'),
      h('h1', { class: 'res-t' }, 'REVIEW MISREADS'),
      h('p', { class: 'rv-intro' }, 'Not the same questions. The same ideas, from another angle. Answer correctly on the first try to recover mastery.'),
      groups.length
        ? h('ul', { class: 'rv-list' }, list)
        : h('p', { class: 'rv-empty' }, 'No misreads recorded on your first descent.'),
      groups.some(x => x.status === 'unresolved')
        ? h('p', { class: 'res-note' }, 'An idea marked STILL OPEN has used all its current angles. More will come with the full game.') : null,
      h('div', { class: 'stack' },
        h('button', { class: 'btn ghost', onclick: () => go('results') }, 'WHAT YOU UNDERSTAND')));
    mount(h('div', { class: 'page' }, h('div', { class: 'col' }, view)));
  }

  function renderReviewQ(gid) {
    const g = REVIEW.find(x => x.id === gid);
    if (!g || !S.spite.record) return go('review');
    const st = S.spite.review[gid] = S.spite.review[gid] || { v: 0, exhausted: false, answered: null };
    const shownV = st.answered ? st.answered.v : st.v;
    const variant = g.variants[shownV];
    if (!variant) return go('review');
    setMood('play', depthLift(S.depth));
    const q = {
      id: gid, kind: 'choice', label: 'A NEW ANGLE', scored: false, quotes: variant.quotes,
      prompt: variant.prompt, options: variant.options, answer: variant.answer,
      right: { label: 'RECOVERED', body: variant.right }, wrong: { body: variant.wrong }
    };
    const store = {};
    if (st.answered) store[gid] = st.answered;
    const more = st.answered && !st.answered.correct && !st.exhausted;
    renderQuestion(q, {
      review: true,
      store,
      kicker: h('p', { class: 'act' }, h('span', null, 'REVIEW · ' + g.concept)),
      onAnswer: (correct) => {
        st.answered = { v: st.v, pick: store[gid].pick, correct, at: Date.now() };
        if (correct) g.sources.forEach(id => {
          const a = S.spite.record.answers[id];
          if (!(a && a.correct)) S.spite.recovered[id] = true;
        });
        else { st.v++; if (st.v >= g.variants.length) st.exhausted = true; }
      },
      rerender: () => renderReviewQ(gid),
      next: () => { st.answered = null; save(); go('review'); },
      nextLabel: 'BACK TO MISREADS',
      scoreNote: st.answered ? (st.answered.correct ? 'MASTERY RECOVERED' : more ? 'ANOTHER ANGLE WAITS' : 'STILL OPEN') : '',
      extra: null
    });
    // renderQuestion mounted the bare article; wrap it in a page frame
    const art = $app.firstChild;
    const page = h('div', { class: 'page' }, h('div', { class: 'col' },
      h('button', { class: 'bar-back', onclick: () => go('review') }, '← MISREADS'), art));
    mount(page, { keepScroll: !!st.answered });
  }

  /* ── boot ──────────────────────────────────────────────────── */
  const start = S.view || 'map';
  if (start === 'play' && !S.run) go('map');
  else if ((start === 'results' || start === 'review' || start.startsWith('reviewq:')) && !S.spite.record) go('map');
  else go(start);

  // test hook (harmless in production): lets automated checks read state
  window.__underground = { state: () => JSON.parse(JSON.stringify(S)), steps: STEPS, total: TOTAL };
})();
