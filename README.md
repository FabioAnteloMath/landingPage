# Matheus Fabio — Landing Page

A minimalist, tech-forward single-page portfolio for **Matheus Fabio** — AI Engineer & Conversational AI Developer.

Built with vanilla HTML, CSS, and JavaScript. **No frameworks, no build step, no dependencies.**

---

## File structure

```
landing-page/
├── index.html             # Semantic structure, all 7 sections, i18n markup, SEO meta
├── cv.html                # Print-friendly CV (ES/EN/PT) with toggle, ready for "Save as PDF"
├── cv-print.css           # CV-specific styles (screen + print media query)
├── cv-translations.js     # Hand-curated ES/EN/PT strings for the CV
├── cv.js                  # CV runtime: language switch, print trigger
├── 404.html               # Custom not-found page (GH Pages picks it up automatically)
├── sitemap.xml            # Search-engine sitemap with hreflang alternates
├── robots.txt             # Crawler rules + sitemap pointer
├── site.webmanifest       # PWA manifest (installable, theme color, icons)
├── styles.css             # Design system + responsive layout
├── script.js              # Interactivity (nav, scroll, counter, particles, CV dropdown)
├── i18n.js                # Runtime: applies translations, persists choice
├── i18n.translations.js   # Generated dictionary (en/es/pt)
├── i18n.source.json       # Source strings in EN (editable)
├── i18n.overrides.json    # Manual post-edits to fix machine-translation errors
├── translate-build.js     # Calls MyMemory API → writes i18n.translations.js
├── assets/
│   ├── avatar.jpg         # Profile photo
│   ├── og-image.jpg       # Open Graph / Twitter card (1200×630, 89KB)
│   ├── favicon.svg        # Modern vector favicon (neural-network symbol on gradient)
│   ├── favicon-32x32.png  # Browser tab favicon
│   ├── favicon-16x16.png  # Small browser tab / bookmark favicon
│   ├── apple-touch-icon.png  # iOS home-screen icon (180×180)
│   ├── android-chrome-192x192.png  # Android home-screen icon
│   └── android-chrome-512x512.png  # Android splash-screen icon
├── .nojekyll              # Tells GitHub Pages to skip Jekyll — pure static deploy
├── .gitignore             # OS / editor noise
└── README.md              # This file
```

---

## Internationalization (i18n)

The page ships in **English**, **Español**, and **Português** with a language switcher in the navbar.

- **Source of truth:** `i18n.source.json` — flat dictionary of keys → English strings
- **Build step:** `node translate-build.js` calls the free [MyMemory](https://mymemory.translated.net) API for `es` and `pt`, then layers any manual fixes from `i18n.overrides.json` on top
- **Runtime:** `i18n.js` reads the generated dictionary, applies translations on load, and persists the user's choice in `localStorage`
- **Detection:** first visit picks `navigator.language` if it's one of the supported codes; otherwise falls back to `en`

### Refreshing translations

```bash
# Edit the English source…
$EDITOR i18n.source.json

# …then re-pull the other languages from the API:
node translate-build.js
```

The build script prints which keys were machine-translated vs. overridden, so you always know which strings were hand-edited.

### Add a new language

1. Add the code to `TARGETS` in `translate-build.js`
2. Add the flag + label to the `<ul class="lang-menu">` in `index.html`
3. Add the code to `SUPPORTED` in `i18n.js`
4. Run `node translate-build.js`

### Add a new string

1. Add the key + English value to `i18n.source.json`
2. Tag the matching DOM element with `data-i18n="<key>"` (or `data-i18n-aria` for `aria-label`)
3. Run `node translate-build.js` to translate the new key

### API notes

- MyMemory is free and keyless for low volume, but throttles around ~5k chars/day per IP. The build script batches 4 requests at a time with retries and graceful EN fallbacks.
- For production-grade volume, swap the URL in `translate-build.js` (DeepL, Google Cloud Translation, etc.) — the build script is ~80 lines and easy to replace.

---

## Deploy to GitHub Pages

This repo is already wired for static GitHub Pages — no build step, no theme, no `_config.yml`. The `.nojekyll` file guarantees it stays that way.

1. Go to the repo on GitHub → **Settings** → **Pages**
2. **Source:** `Deploy from a branch`
3. **Branch:** `main` / `(root)`
4. Click **Save**

In about a minute the site will be live at:
**`https://fabioantlomath.github.io/landingPage/`**

The `node translate-build.js` step is **optional** in production — `i18n.translations.js` is already committed. You only re-run it when the source strings change.

---

## Quick start (local dev)

### Option 1 — Open directly
Double-click `index.html` or open it in any modern browser. Done.

### Option 2 — Local server (recommended for font/dev tools)
Any static server works. From the project root:

```bash
# Python 3
python -m http.server 8080

# Node.js
npx serve .

# PHP
php -S localhost:8080
```

Then open <http://localhost:8080>.

---

## Deploy to other platforms

No config needed — drop the folder or connect the repo:

- **Vercel** — `vercel deploy`
- **Netlify** — drag-and-drop the folder onto the dashboard
- **Cloudflare Pages** — connect the repo, build command empty, output dir `/`

---

## Customization

All visual tokens live in **CSS custom properties** at the top of `styles.css`:

```css
:root {
    --bg-primary: #0a0a0f;        /* page background */
    --bg-secondary: #12121a;      /* cards / sections */
    --bg-tertiary: #1a1a24;       /* hover / elevated */
    --accent-primary: #6366f1;    /* indigo */
    --accent-secondary: #8b5cf6;  /* violet */
    --accent-tertiary: #a855f7;   /* purple */
    --text-primary: #f8fafc;
    --text-secondary: #94a3b8;
    --text-muted: #64748b;
    --border: rgba(255,255,255,0.08);
    --glow: rgba(99,102,241,0.15);
    /* ...spacing, radius, font tokens below... */
}
```

Change any value and the whole page updates.

### Common tweaks

| Goal | Where | What to change |
| --- | --- | --- |
| Brand colors | `:root` in `styles.css` | `--accent-primary` / `--accent-secondary` |
| Background tone | `:root` in `styles.css` | `--bg-primary` / `--bg-secondary` |
| Section padding | `:root` in `styles.css` | `--space-5xl` (top-level sections) |
| Navbar height | `:root` in `styles.css` | `--nav-height` |
| Your name | `index.html` hero | `<h1 class="hero-title">` |
| Tagline / subtitle | `index.html` hero | `.hero-subtitle` / `.hero-tagline` |
| Bio paragraph | `index.html` about | `.about-bio` |
| Projects | `index.html` projects | Each `.project-card` block |
| Skills list | `index.html` skills | Each `.tag` inside `.skill-card` |
| Social links | `index.html` contact | `href` on `.social-link` and the hero CTAs |
| Email address | `index.html` contact + `mailto:` CTAs | search for `matheus.antelo@gmail.com` |
| Number of particles | `script.js` | `const count = ...` inside `createParticles()` |
| Add a translated string | `i18n.source.json` + `index.html` | add key/value, then tag the DOM with `data-i18n="key"`, then `node translate-build.js` |
| Add a new language | `i18n.js` + `translate-build.js` + `index.html` | add code to `SUPPORTED` and `TARGETS`, add a `<li>` to the lang menu, run build |

---

## Sections

1. **Hero** — name, role, tagline, two CTAs, animated orbs + particles
2. **Stats bar** — 4 quick wins, animated counter
3. **About** — bio + skill pills
4. **Projects** — 2×2 grid of featured work (tech tags + repo link)
5. **Skills & Stack** — 3 category cards (AI · Full-Stack · Cloud)
6. **Experience Highlights** — vertical timeline of shipped achievements
7. **Contact** — large CTA, email button, social pills

---

## Features

- ✅ Semantic HTML5 (`<header>`, `<main>`, `<section>`, `<article>`, `<footer>`)
- ✅ ARIA labels, focus states, keyboard nav, escape-to-close menu
- ✅ Responsive — mobile-first, tested at 480 / 768 / 1024 / 1280 / 1920
- ✅ `prefers-reduced-motion` respected (animations off, content visible)
- ✅ `prefers-reduced-transparency` friendly
- ✅ `IntersectionObserver` for reveal + counter + active nav
- ✅ 60fps CSS animations (transforms + opacity only)
- ✅ Inline SVG icons (no emoji, no icon font, no icon CDN)
- ✅ Trilingual i18n (EN / ES / PT) with language switcher, `localStorage` persistence, and `navigator.language` detection
- ✅ `html[lang]` updates on language change (a11y + SEO)
- ✅ System fonts fallback if Google Fonts fail
- ✅ No external runtime dependencies
- ✅ Lighthouse-friendly: <100KB total (no images, all CSS+JS in source)

### SEO & social

- ✅ Custom **Open Graph image** (1200×630 JPG, 89KB) — generated from your avatar + name + role on a deep-purple gradient
- ✅ **Twitter Card** (`summary_large_image`) with same image
- ✅ **`og:locale` alternates** for `en_US` / `es_ES` / `pt_BR` (so LinkedIn/Twitter know the site is trilingual)
- ✅ **Schema.org `Person` JSON-LD** with `jobTitle`, `knowsAbout`, `sameAs` (GitHub, LinkedIn), `email`
- ✅ `<link rel="canonical">` pinned to the GitHub Pages URL
- ✅ `sitemap.xml` with `hreflang` alternates per language
- ✅ `robots.txt` pointing at the sitemap
- ✅ **Custom favicon set**: SVG (modern) + PNG 16/32 + `apple-touch-icon` 180 + `android-chrome` 192/512 — all derived from your `avatar.jpg` with a subtle purple ring that matches the site theme
- ✅ `site.webmanifest` so the site is installable as a PWA (theme color, dark background, maskable icons)
- ✅ `<meta name="theme-color">` + `<meta name="color-scheme">` for browser chrome

### Customizing the favicon / OG image

- **Favicon** is the AI/neural-network symbol on a purple gradient. Replace `assets/favicon.svg` (and the PNGs) any time — keep the same file names so the `<link rel="icon">` tags keep working.
- **OG image** (`assets/og-image.jpg`, 1200×630, 89KB) was generated from the avatar using a generative image service and then resized with Pillow. Replace it with your own design any time — keep the file path and dimensions so the meta tags keep working.

---

## Curriculum Vitae

The hero CTA **Download CV** links to `cv.html?lang=es|en|pt` — a print-friendly, A4-sized CV page styled to match the site (same gradient, same typography, same avatar with the purple ring).

### Sharing a PDF

There is **no pre-generated PDF** in the repo on purpose — the CV is meant to be exported on demand:

1. Open `https://fabioantelomath.github.io/landingPage/cv.html?lang=en` (or `es` / `pt`)
2. Press <kbd>Ctrl</kbd>+<kbd>P</kbd> (or <kbd>⌘</kbd>+<kbd>P</kbd> on macOS)
3. Pick "Save as PDF" as the destination
4. The toolbar, language switcher, and backdrop are automatically hidden by the `@media print` rules

**Why HTML, not a committed PDF?**
- The CV stays in sync with `index.html` — edit once, deploy once
- The recruiter can pick the language right in the page before exporting
- No ~300KB binary in git
- Any browser exports it at full A4 quality

### Editing the CV content

The CV strings live in **`cv-translations.js`** as a flat dictionary per language (no API call, no machine translation — these are hand-edited because CV wording is too important to leave to a generic translator). To add a job or a certification, edit `cv.html` and the corresponding entries in `cv-translations.js`.

---

## Browser support

- Chrome / Edge 90+
- Firefox 88+
- Safari 14+ (macOS / iOS)
- Mobile Safari iOS 14+, Chrome Android 90+

Uses: `IntersectionObserver`, `requestAnimationFrame`, CSS `clamp()`, `backdrop-filter`. No transpilation needed.

---

## Project links

Currently all "Repo" buttons point to the GitHub profile (`https://github.com/FabioAnteloMath`). To link each card to its own repo, replace the `href` on each `.project-link` inside the corresponding `.project-card`.

---

## License

Personal portfolio code. Adapt freely.
