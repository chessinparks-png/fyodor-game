# UNDERGROUND — SPITE prototype

A playable vertical slice of a philosophical learning game based on Dostoevsky's *Notes from Underground*. Only chamber 05, **SPITE**, is built.

## Run

Open `index.html` in a browser. There is no build step, no server and no network access. For a phone on the same network, you can also serve the folder with any static server, for example `npx serve .`.

## Files

- `index.html` — the page shell
- `styles.css` — all visual design (system fonts only, so it works offline)
- `content.js` — every question, feedback line, interruption and review variant, as data
- `app.js` — the engine: map, play loop, scoring, results, review and localStorage

Progress is saved in `localStorage` under `underground.v1`. To clear it, use **SETTINGS → RESET PROGRESS** on the map.
