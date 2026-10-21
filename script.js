/* ==========================================================================
   Balaji S. — Video Editor Portfolio
   ========================================================================== */

/*
 * PROJECTS — the only place to add work. Use original, owner-supplied media only.
 * Titles, descriptions and URLs come from https://balajimedia.framer.website/projects.
 *
 *   title        Project name shown on the card (required).
 *   kicker       Short category label above the title.
 *   description  One-sentence summary.
 *   group        'featured'  → landscape grid in Featured projects
 *                'spotlight' → the single vertical card beside the short-form copy
 *                'more'      → mixed-format grid in More projects
 *   orientation  'landscape' (16:9) or 'portrait' (9:16). Set per project — never assumed.
 *   youtubeId    YouTube video ID, OR
 *   video        Path to a self-hosted MP4, e.g. './assets/video/launch.mp4'
 *   poster       Base path of the poster WebP; `-{width}.webp` is appended for srcset.
 *   url          Original destination link for "Watch on YouTube".
 *
 * Featured: three landscape cards render with a wide lead card; add a fourth landscape
 * project and the grid switches to an even 2 × 2 on its own. More projects pairs
 * portrait and landscape cards by height, so extra cards can be added without layout changes.
 */
const PROJECTS = [
  {
    title: 'SaaS Explainer',
    kicker: 'SaaS · Explainer',
    description: 'Clean explainer animations showcasing software features, workflows and user benefits.',
    group: 'featured',
    orientation: 'landscape',
    youtubeId: 'okOgj-Q0-Zo',
    url: 'https://youtu.be/okOgj-Q0-Zo',
    poster: './assets/posters/saas-explainer',
  },
  {
    title: 'Mobile App Promo',
    kicker: 'App · Promo',
    description: 'Engaging promotional videos that demonstrate app functionality and user experience.',
    group: 'featured',
    orientation: 'landscape',
    youtubeId: 'ghtg4HnkXSg',
    url: 'https://youtu.be/ghtg4HnkXSg',
    poster: './assets/posters/mobile-app-promo',
  },
  {
    title: 'Feature Launch',
    kicker: 'Product · Launch',
    description: 'Motion graphics and product launch videos designed to highlight key features with impact.',
    group: 'featured',
    orientation: 'landscape',
    youtubeId: 'GAmm46AhDXw',
    url: 'https://youtu.be/GAmm46AhDXw',
    poster: './assets/posters/feature-launch',
  },
  {
    title: 'Social Media Hook',
    kicker: 'Short-form · Hook edit',
    description: 'Fast-paced short-form videos crafted to capture attention within the first few seconds.',
    group: 'spotlight',
    orientation: 'portrait',
    youtubeId: 'eMlzboyEmfE',
    url: 'https://youtube.com/shorts/eMlzboyEmfE?feature=share',
    poster: './assets/posters/social-media-hook',
  },
  {
    title: 'Realistic AI Video',
    kicker: 'AI video',
    description: 'AI-powered cinematic visuals combining realistic characters, storytelling and motion design.',
    group: 'more',
    orientation: 'portrait',
    youtubeId: 'UDt3EvvI_e8',
    url: 'https://youtube.com/shorts/UDt3EvvI_e8?feature=share',
    poster: './assets/posters/realistic-ai-video',
  },
  {
    title: 'Montages',
    kicker: 'Montage · Highlight edit',
    description: 'Dynamic highlight edits with seamless transitions, music synchronisation and storytelling.',
    group: 'more',
    orientation: 'portrait',
    youtubeId: 'vuWSU01Wufk',
    url: 'https://youtube.com/shorts/vuWSU01Wufk?feature=share',
    poster: './assets/posters/montage',
  },
  {
    title: 'Graphical Advertisement',
    kicker: 'Graphical video · Ad',
    description: 'Eye-catching promotional videos using motion graphics to boost brand engagement.',
    group: 'more',
    orientation: 'landscape',
    youtubeId: 'OOs1dQGcIIU',
    url: 'https://youtu.be/OOs1dQGcIIU',
    poster: './assets/posters/graphical-advertisement',
  },
  {
    title: 'Lyrical Video',
    kicker: 'Kinetic type · Music',
    description: 'Creative typography and visual storytelling synchronised with music and lyrics.',
    group: 'more',
    orientation: 'landscape',
    youtubeId: '82LbbeZzp5I',
    url: 'https://youtu.be/82LbbeZzp5I',
    poster: './assets/posters/lyrical-video',
  },

];

// Poster widths generated for each orientation (see assets/posters).
const POSTER_SIZES = {
  landscape: { widths: [640, 1280], width: 1280, height: 720 },
  portrait: { widths: [405, 720], width: 720, height: 1280 },
};
const CARD_SIZES = {
  featured: '(max-width: 820px) 92vw, 50vw',
  spotlight: '320px',
  more: '(max-width: 820px) 92vw, 60vw',
};

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
const canHoverPreview = () => !reducedMotion.matches && finePointer.matches && !navigator.connection?.saveData;

const escapeHTML = (value) => String(value).replace(/[&<>"']/g, (char) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
}[char]));
const pad = (number) => String(number).padStart(2, '0');
const externalUrlFor = (project) => project.url
  || (project.youtubeId ? `https://www.youtube.com/watch?v=${encodeURIComponent(project.youtubeId)}` : '');

/* ---------- Editor ruler: scroll progress as a timecode ---------- */
function initEditorRuler() {
  const ruler = document.querySelector('.editor-ruler');
  const timecode = ruler.querySelector('.editor-ruler-timecode');
  let frame = 0;
  const update = () => {
    frame = 0;
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
    ruler.style.setProperty('--edit-progress', `${progress * 100}%`);
    const totalFrames = Math.round(progress * 60 * 30);
    timecode.textContent = `00:${pad(Math.floor(totalFrames / 1800))}:${pad(Math.floor((totalFrames % 1800) / 30))}:${pad(totalFrames % 30)}`;
  };
  const request = () => { if (!frame) frame = window.requestAnimationFrame(update); };
  window.addEventListener('scroll', request, { passive: true });
  window.addEventListener('resize', request);
  update();
}

/* ---------- Navigation: mobile menu + active section ---------- */
function initNavigation() {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-links');
  const setOpen = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    nav.classList.toggle('is-open', open);
  };
  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  nav.addEventListener('click', (event) => { if (event.target.closest('a')) setOpen(false); });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && nav.classList.contains('is-open')) {
      setOpen(false);
      toggle.focus();
    }
  });
  window.matchMedia('(min-width: 601px)').addEventListener('change', (event) => { if (event.matches) setOpen(false); });

  // Highlight the link for the section crossing the upper third of the viewport.
  if (!('IntersectionObserver' in window)) return;
  const links = new Map([...nav.querySelectorAll('a[href^="#"]')].map((link) => [link.hash.slice(1), link]));
  // Sections without their own link light up their parent entry.
  const linkFor = { projects: 'work', process: 'services' };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const current = links.get(linkFor[entry.target.id] ?? entry.target.id);
      links.forEach((link) => (link === current ? link.setAttribute('aria-current', 'true') : link.removeAttribute('aria-current')));
    });
  }, { rootMargin: '-30% 0px -65% 0px' });
  document.querySelectorAll('main > section[id]').forEach((section) => observer.observe(section));
}

/* ---------- Scroll-triggered reveals ---------- */
function initScrollReveal() {
  const items = document.querySelectorAll('.scroll-reveal');
  if (reducedMotion.matches || !('IntersectionObserver' in window)) return;
  document.documentElement.classList.add('has-scroll-reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  items.forEach((item) => observer.observe(item));
}

/* ---------- Media players (one active player at a time) ---------- */
const player = {
  active: null, // { stop: fn }
  claim(stop) {
    if (this.active && this.active.stop !== stop) this.active.stop();
    this.active = { stop };
  },
  release(stop) {
    if (this.active?.stop === stop) this.active = null;
  },
};

function youtubeFrame(id, title) {
  const frame = document.createElement('iframe');
  frame.className = 'project-video';
  frame.title = `${title} — YouTube video player`;
  frame.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
  frame.allowFullscreen = true;
  frame.referrerPolicy = 'strict-origin-when-cross-origin';
  const params = new URLSearchParams({ autoplay: '1', playsinline: '1', rel: '0', modestbranding: '1' });
  frame.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?${params}`;
  return frame;
}

/*
 * Wires a poster button inside `container` to:
 *  - click / Enter / Space → playback with sound and controls (YouTube embed or MP4),
 *    created only on interaction so nothing loads up front
 *  - mouse hover → muted, looping preview for self-hosted MP4 only
 *    (skipped for reduced motion, touch and Save-Data; YouTube embeds are too heavy to preview reliably)
 */
function attachPlayer(container, poster, project) {
  let media = null;
  let withSound = false;

  const stop = () => {
    if (media) {
      if (media.tagName === 'VIDEO') { media.pause(); media.removeAttribute('src'); media.load(); }
      media.remove();
    }
    media = null;
    withSound = false;
    poster.hidden = false;
    poster.classList.remove('is-previewing');
    container.classList.remove('is-playing');
    player.release(stop);
  };

  const start = (preview) => {
    player.claim(stop);
    // A self-hosted preview can be unmuted in place instead of reloading.
    if (!preview && media?.tagName === 'VIDEO') {
      Object.assign(media, { muted: false, controls: true, loop: false });
      media.play().catch(() => {});
    } else {
      if (media) media.remove();
      if (project.youtubeId) {
        media = youtubeFrame(project.youtubeId, project.title);
      } else {
        media = document.createElement('video');
        media.className = 'project-video';
        media.src = project.video;
        if (project.poster) media.poster = posterSrc(project);
        media.playsInline = true;
        media.preload = 'metadata';
        media.loop = preview;
        media.muted = preview;
        media.controls = !preview;
        media.setAttribute('aria-label', project.title);
        media.play().catch(() => { if (preview) stop(); });
      }
      container.insertBefore(media, poster);
    }
    withSound = !preview;
    container.classList.toggle('is-playing', !preview);
    // During a preview the poster button stays on top (transparent) so a click still reaches it.
    poster.classList.toggle('is-previewing', preview);
    poster.hidden = !preview;
    if (!preview) media.focus({ preventScroll: true });
  };

  if (project.video) {
    container.addEventListener('pointerenter', (event) => {
      if (event.pointerType !== 'mouse' || media || !canHoverPreview()) return;
      start(true);
    });
    container.addEventListener('pointerleave', () => { if (media && !withSound) stop(); });
  }
  poster.addEventListener('click', () => start(false));
}

/* ---------- Project cards ---------- */
const posterSrc = (project) => `${project.poster}-${POSTER_SIZES[project.orientation].width}.webp`;

function posterImage(project, sizes) {
  if (!project.poster) {
    // Only a YouTube fallback; hqdefault always exists (maxresdefault can 404).
    return project.youtubeId
      ? `<img class="project-poster-image" src="https://i.ytimg.com/vi/${encodeURIComponent(project.youtubeId)}/hqdefault.jpg" alt="" loading="lazy" decoding="async" />`
      : '';
  }
  const size = POSTER_SIZES[project.orientation];
  const srcset = size.widths.map((width) => `${project.poster}-${width}.webp ${width}w`).join(', ');
  return `<img class="project-poster-image" src="${escapeHTML(posterSrc(project))}" srcset="${escapeHTML(srcset)}" sizes="${sizes}" alt="" width="${size.width}" height="${size.height}" loading="lazy" decoding="async" />`;
}

function projectCard(project, index, total) {
  const url = externalUrlFor(project);
  const format = project.orientation === 'portrait' ? '9:16' : '16:9';
  return `
    <article class="project-card project-card--${project.orientation} scroll-reveal" data-orientation="${project.orientation}">
      <div class="project-media">
        <button class="project-poster" type="button" aria-label="Play ${escapeHTML(project.title)}">
          ${posterImage(project, CARD_SIZES[project.group])}
          <span class="project-poster-play" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M8 5.5v13l11-6.5z" /></svg></span>
        </button>
        <span class="project-number" aria-hidden="true">${pad(index + 1)} / ${pad(total)} · ${format}</span>
      </div>
      <div class="project-info">
        <p class="project-kicker">${escapeHTML(project.kicker)}</p>
        <h3>${escapeHTML(project.title)}</h3>
        <p class="project-description">${escapeHTML(project.description)}</p>
        ${url ? `<a class="project-open" href="${escapeHTML(url)}" target="_blank" rel="noopener noreferrer">Watch on YouTube ↗<span class="visually-hidden"> — ${escapeHTML(project.title)} (opens in a new tab)</span></a>` : ''}
      </div>
    </article>`;
}

function renderProjects() {
  document.querySelectorAll('[data-group]').forEach((target) => {
    const projects = PROJECTS.filter((project) => project.group === target.dataset.group && (project.youtubeId || project.video));
    target.innerHTML = projects.map((project, index) => projectCard(project, index, projects.length)).join('');
    target.querySelectorAll('.project-card').forEach((card, index) => {
      attachPlayer(card.querySelector('.project-media'), card.querySelector('.project-poster'), projects[index]);
    });
  });
}

/* ---------- Boot ---------- */
initEditorRuler();
initNavigation();
renderProjects();
initScrollReveal();
document.querySelector('#year').textContent = String(new Date().getFullYear());
