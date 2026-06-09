# Matheus Fabio — Landing Page

A minimalist, tech-forward single-page portfolio for **Matheus Fabio** — AI Engineer & Conversational AI Developer.

Built with vanilla HTML, CSS, and JavaScript. **No frameworks, no build step, no dependencies.**

---

## File structure

```
ladingpage/
├── index.html      # Semantic structure, all 7 sections
├── styles.css      # Design system + responsive layout
├── script.js       # Interactivity (nav, scroll, counter, particles)
└── README.md       # This file
```

---

## Deploy para GitHub Pages

### Passo 1 — Criar repositório no GitHub

1. Acesse [github.com/new](https://github.com/new)
2. Nome do repositório: `matheusfabio.github.io` (ou outro de sua preferência)
3. Selecione **Public**
4. Clique **Create repository**

### Passo 2 — Push dos arquivos

```bash
# No terminal, dentro da pasta do projeto:
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/FabioAnteloMath/matheusfabio.github.io.git
git push -u origin main
```

### Passo 3 — Habilitar GitHub Pages

1. Vá ao repositório no GitHub
2. **Settings** → **Pages** (no menu lateral)
3. Em **Source**, selecione:
   - **Branch:** `main`
   - **Folder:** `/ (root)`
4. Clique **Save**
5. Aguarde 1-2 minutos até o deploy finalizar
6. O site estará disponível em: `https://FabioAnteloMath.github.io/matheusfabio.github.io/`

---

## Quick start (desenvolvimento local)

### Opção 1 — Abrir diretamente
Double-click `index.html` ou abra em qualquer navegador moderno.

### Opção 2 — Servidor local (recomendado)
Qualquer servidor estático funciona. Na raiz do projeto:

```bash
# Python 3
python -m http.server 8080

# Node.js
npx serve .

# PHP
php -S localhost:8080
```

Acesse: <http://localhost:8080>

---

## Deploy em outras plataformas

- **Vercel** — `vercel deploy` (sem config)
- **Netlify** — arraste a pasta para o dashboard
- **Cloudflare Pages** — conecte o repo, build command vazio, output dir `/`

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
