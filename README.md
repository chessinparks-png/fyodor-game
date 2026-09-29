# UNDERGROUND — SPITE prototype

A playable vertical slice of a philosophical learning game based on Dostoevsky's *Notes from Underground*. Only chamber 05, **SPITE**, is built.

## Run

Open `index.html` in a browser. There is no build step, no server and no network access. For a phone on the same network, you can also serve the folder with any static server, for example `npx serve .`.

## Files

- `index.html` — the page shell
- `styles.css` — all visual design (system fonts only, so it works offline)
- `content.js` — every question, feedback line, interruption and review variant, as data
- `app.js` — the engine: map, play loop, scoring, results, review and localStorage
- `tools/verify_quotes.py` — checks every quotation in `content.js` against the novel

## Sources

`notes-from-the-underground.pdf` is Constance Garnett's translation and the only text the game quotes. Every excerpt carries a small part/chapter tag (for example `PART I · VII`). The Underground Man's interruption lines are written for the game, so they are shown as dash-led dialogue rather than as quotations. The other PDFs are scholarship consulted for interpretation.

To re-check quotations after editing content (requires `node` and `pip install pypdf`):

    python3 tools/verify_quotes.py

Progress is saved in `localStorage` under `underground.v1`. To clear it, use **SETTINGS → RESET PROGRESS** on the map.
