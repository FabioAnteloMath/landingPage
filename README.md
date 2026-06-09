# Matheus Fabio — Landing Page

A minimalist, tech-forward single-page portfolio for **Matheus Fabio** — AI Engineer & Conversational AI Developer.

Built with vanilla HTML, CSS, and JavaScript. **No frameworks, no build step, no dependencies.**

---

## File structure

```
landing-page/
├── index.html      # Semantic structure, all 7 sections
├── 404.html        # Custom not-found page (GH Pages picks it up automatically)
├── styles.css      # Design system + responsive layout
├── script.js       # Interactivity (nav, scroll, counter, particles)
├── .nojekyll       # Tells GitHub Pages to skip Jekyll — pure static deploy
├── .gitignore      # OS / editor noise
└── README.md       # This file
```

---

## Deploy to GitHub Pages

This repo is already wired for static GitHub Pages — no build step, no theme, no `_config.yml`. The `.nojekyll` file guarantees it stays that way.

1. Go to the repo on GitHub → **Settings** → **Pages**
2. **Source:** `Deploy from a branch`
3. **Branch:** `main` / `(root)`
4. Click **Save**

In about a minute the site will be live at:
**`https://fabioantlomath.github.io/landingPage/`**

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
| Email address | `index.html` contact + `mailto:` CTAs | search for `matheusfabio13@hotmail.com` |
| Number of particles | `script.js` | `const count = ...` inside `createParticles()` |

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
- ✅ System fonts fallback if Google Fonts fail
- ✅ No external runtime dependencies
- ✅ Lighthouse-friendly: <100KB total (no images, all CSS+JS in source)

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
