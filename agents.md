# AGENTS.md

## What this is
A static, no-build portfolio for Balaji S. (Video Editor & Motion Graphics Designer). It is plain HTML/CSS/JS by explicit owner requirement. Do not introduce React, bundlers or a backend.

## Layout
- `index.html`: every section in reference order: hero (01) → ticker → Portfolio reels (02) → Longform (03) → Services (04) → Process (05) → About (06) → Contact + footer (07). Each `section[data-sequence]` gets a "SEQ 0X" label from CSS. SVG icon symbols are inlined at the top of `<main>`.
- `styles.css`: numbered sections (tokens, base, edit-suite chrome, header, hero, ticker, work, longform, services/process, about, contact, responsive, reduced motion). Breakpoints are 1000 / 980 / 820 / 600px, taken from the reference.
- `script.js`: the `PROJECTS` array (the single content source for work) and `CATEGORIES`, then init functions. `attachPlayer` handles hover preview and click-to-play for YouTube and MP4 files. Only one player is active at a time, via the `player` object.

## Conventions and decisions
- Never fabricate clients, metrics, testimonials, tool proficiency or project titles. Only owner-supplied facts go on the page. The reference's "Tools & skills" section with self-rated levels was left out because no data exists for it.
- Empty `PROJECTS` renders labelled "coming soon" format slots. These are intentionally non-interactive, and filters and carousel controls stay hidden until real content needs them.
- Hover previews are muted and mouse-only. They are disabled for `prefers-reduced-motion`, touch and Save-Data. The reference's mobile scroll-autoplay was deliberately not reproduced.
- YouTube embeds use `youtube-nocookie.com` and are created only on interaction. Thumbnails use `hqdefault.jpg`, which always exists. `maxresdefault` can 404 and log console errors.
- The CSS variable `--lime` holds the orange accent. The name was kept from the reference for easy side-by-side comparison.
