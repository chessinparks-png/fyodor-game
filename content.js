/*
  UNDERGROUND — shared content registry.

  This file holds only what every chamber shares: the map, the depth ladder,
  and the register() hook. Each chamber's content lives in chambers/<id>.js
  and calls UNDERGROUND.register(id, data). A chamber is playable exactly when
  its file is loaded; the rest stay sealed on the map.

  ── CHAMBER SCHEMA ─────────────────────────────────────────────────────────
  {
    contentVersion: n,        bump when questions change; stored progress for
                              that chamber (only) is reset on mismatch
    concepts: [...],          mastery categories shown on WHAT YOU UNDERSTAND
    acts: { 1: 'ACT I — …' }, act titles
    moods: { 6: 'warm' },     optional per-act mood
    found: { lines: [...] },  the seam text shown on the map once cleared
    steps: [...],             see step types below
    review: [...]             Review Misreads groups (see below)
  }

  QUOTATIONS
  Anything written as { text, src } is a verbatim excerpt from Constance
  Garnett's translation (notes-from-the-underground.pdf). `src` is the part
  and chapter, shown as a small tag. " ... " marks an omission; each piece
  must appear in the novel exactly, in order. tools/verify_quotes.py checks
  every excerpt and every “curly-quoted” phrase in game text.
  Plain strings spoken by the Underground Man are game-authored dialogue and
  are never styled as quotations.

  STEP TYPES
    act        quiet act change (updates the header)
    concept    non-scored explanatory card
    question   scored: true | false
    beat       short full-screen reveal
    found      "CONCEPT FOUND" reveal
    interrupt  the Underground Man addresses the player (never scored)
    rise       depth animates upward ({ to } or { from, to, final })
    clear      chamber completion

  QUESTION KINDS
    choice     answer: index
    multi      answer: [indices]       (select all that apply)
    sequence   answer: [tile indices]  (tap tiles into order)
  Every scored question carries concepts: [...] for mastery, plus
  right: { label, body }, wrong: { body }, and optional headline / quote / coda.

  REVIEW GROUPS
    { id, concept, sources: [question ids], variants: [ { prompt, options,
      answer, right, wrong, quotes? } ] }
  A group opens when any source was missed on the first completed descent.
*/

window.UNDERGROUND = {
  // Twelve metres per chamber, from the deepest chamber to the surface.
  chambers: [
    { id: 'note',      n: '01', name: 'THE NOTE FROM BELOW', startDepth: -91, endDepth: -79,
      question: 'Who is speaking — and why read him at all?' },
    { id: 'conscious', n: '02', name: 'TOO CONSCIOUS',       startDepth: -79, endDepth: -67 },
    { id: 'formula',   n: '03', name: 'THE FORMULA',         startDepth: -67, endDepth: -55 },
    { id: 'advantage', n: '04', name: 'THE ADVANTAGE',       startDepth: -55, endDepth: -43 },
    { id: 'spite',     n: '05', name: 'SPITE',               startDepth: -43, endDepth: -31,
      question: 'Why hurt yourself when you know better?' },
    { id: 'wall',      n: '06', name: 'THE WALL',            startDepth: -31, endDepth: -19 },
    { id: 'liza',      n: '07', name: 'LIZA',                startDepth: -19, endDepth: -7 },
    { id: 'surface',   n: '08', name: 'SURFACE',             startDepth: -7,  endDepth: 0 }
  ],

  content: {},

  register(id, data) {
    if (!this.chambers.some(c => c.id === id)) throw new Error('Unknown chamber: ' + id);
    this.content[id] = data;
  }
};
