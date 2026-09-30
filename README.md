# UNDERGROUND

A philosophical learning game based on Dostoevsky's *Notes from Underground*, in eight chambers, from −91 m to the surface:

01 THE NOTE FROM BELOW · 02 TOO CONSCIOUS · 03 THE FORMULA · 04 THE ADVANTAGE · 05 SPITE · 06 THE WALL · 07 LIZA · 08 SURFACE

All eight are currently open; sequential unlocking is not enforced yet.

## Run

Open `index.html` in a browser. There is no build step, no server and no network access. For a phone on the same network, you can also serve the folder with any static server, for example `npx serve .`.

## Files

- `index.html` — the page shell
- `styles.css` — all visual design (system fonts only, so it works offline)
- `content.js` — the shared map, depth ladder, and the chamber content schema
- `chambers/<id>.js` — one file per chamber: questions, feedback, interruptions, review variants
- `app.js` — the engine: map, play loop, scoring, results, review and localStorage

To add a chamber, write `chambers/<id>.js` following the schema in `content.js` and add a `<script>` tag for it in `index.html` before `app.js`. A chamber becomes playable as soon as its file is loaded.

- `tools/verify_quotes.py` — checks every quotation in `content.js` and the chamber files against the novel
- `tools/answer_keys.py` — audits a chamber's answer keys (position balance, length cues, cue words); `--shuffle` rebalances key positions

## Sources

`notes-from-the-underground.pdf` is Constance Garnett's translation and the only text the game quotes. Every excerpt carries a small part/chapter tag (for example `PART I · VII`). The Underground Man's interruption lines are written for the game, so they are shown as dash-led dialogue rather than as quotations. The other PDFs are scholarship consulted for interpretation.

To re-check quotations after editing content (requires `node` and `pip install pypdf`):

    python3 tools/verify_quotes.py

Progress is saved in `localStorage` under `underground.v1`. To clear it, use **SETTINGS → RESET PROGRESS** on the map.
