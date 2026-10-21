# Balaji S. — Video Editor & Motion Graphics Designer

Static portfolio (plain HTML/CSS/JS, no build step), deployed on Netlify from the repo root.

- `index.html` — page structure and copy
- `styles.css` — styles; section 14 holds the orientation-aware project cards
- `script.js` — `PROJECTS` array (title, group, `orientation: 'landscape' | 'portrait'`, YouTube ID, poster)
- `assets/images`, `assets/posters` — optimised WebP portraits and thumbnails taken from the original Framer portfolio

Run locally with any static server, e.g. `npx serve .`.


## Local preview
Run `py -m http.server 5500` from this folder and open `http://localhost:5500`. The hero uses a transparent PNG cutout generated from the supplied portrait; inspect its edge quality before production use.
