# Matheus Fabio Antelo — Portfolio

Personal portfolio for **Matheus Fabio Antelo** — AI Engineer & Automation Architect.

Rebuilt on the stack of the [Magic UI portfolio template](https://magicui.design/docs/templates/portfolio):
**Next.js 16 (App Router, static export) · React 19 · Tailwind CSS 4 · shadcn/ui (Radix) · Motion · Magic UI**.

Live: <https://fabioantelomath.github.io/landingPage/> · `/es/` · `/pt/`

---

## What's on the page

| Section | Magic UI / shadcn pieces |
| --- | --- |
| Hero — greeting, rotating role, CTAs, avatar | `BlurFade`, `WordRotate`, `AnimatedShinyText`, `ShimmerButton`, `BorderBeam` |
| Key numbers | `NumberTicker` (years are computed from Oct 2022 at build time) |
| Tech strip | `Marquee` (two counter-scrolling rows) |
| About · Work experience · Education | Template layout, Radix `Accordion` (CXP, BRF, ONNI.IA, Reach) |
| **Anatomy of an agent system** | `AnimatedBeam` diagram: channels → orchestrator → LLM / RAG / MCP tools / CRM |
| Projects | `MagicCard` spotlight cards; featured `edge-llm-benchmark` with `BorderBeam` + animated `Terminal` (figures from that repo's README) |
| Skills | Grouped pills + draggable 3D `IconCloud` (desktop, lazy-loaded) |
| Highlights | Template `Timeline` |
| GitHub activity | github-readme-stats / streak cards, light & dark variants, graceful fallback |
| Contact | `FlickeringGrid` card |
| Navigation | Floating macOS-style `Dock` with tooltips, language switcher and light/dark toggle |
| Global | `ScrollProgress`, `FlickeringGrid` header, custom trilingual 404 |

## Project structure

```
src/
├── app/
│   ├── (en)/layout.tsx, page.tsx   # "/"  — English, <html lang="en">
│   ├── [lang]/layout.tsx, page.tsx # "/es/", "/pt/" — <html lang="es|pt">
│   ├── global-not-found.tsx        # 404.html
│   └── globals.css                 # Theme tokens (light/dark) + Magic UI keyframes
├── components/
│   ├── magicui/                    # Magic UI components (MIT), lightly adapted
│   ├── ui/                         # shadcn/ui primitives
│   ├── sections/                   # One file per page section
│   ├── navbar.tsx                  # Dock navigation
│   └── site-document.tsx           # Shared <html>/<body> shell
└── data/content.ts                 # ALL copy in EN/ES/PT + links, projects, skills
public/
├── assets/                         # Avatar, favicons, OG image
├── cv.html, cv.js, cv-*.{css,js}   # Print-friendly CV (unchanged), styles.css is used by it
└── robots.txt, sitemap.xml, site.webmanifest, .nojekyll
```

## Editing content

Everything a visitor reads is in **`src/data/content.ts`**:

- `SITE` — language-neutral data: links, projects (repo URL + tech tags), skills, certifications.
- `DICTIONARY.en / es / pt` — every string. ES and PT are typed against EN, so a missing or extra key is a **build error**.

Add a project: append it to `SITE.projects` and add its description under `projects.items` in all three languages.

## i18n

Real routes instead of client-side swapping: `/` (EN), `/es/`, `/pt/`, each with its own `<html lang>`, canonical URL, `hreflang` alternates and Open Graph locale.
On a first visit to `/`, a tiny inline script sends Spanish/Portuguese browsers to `/es/` or `/pt/`; a choice made in the dock's language menu is remembered in `localStorage` and always wins.

## Development

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static export to ./out (basePath /landingPage)
npm run typecheck
```

Preview the production build exactly as GitHub Pages serves it:

```bash
mkdir -p /tmp/site && ln -sfn "$PWD/out" /tmp/site/landingPage && python3 -m http.server -d /tmp/site 8080
# open http://localhost:8080/landingPage/
```

## Deploy

`.github/workflows/deploy.yml` builds and publishes `out/` on every push to `main`.

**One-time setup:** GitHub → *Settings → Pages → Build and deployment → Source:* **GitHub Actions**
(the old "Deploy from a branch" mode would publish the raw source, not the build).

Deploying to a root domain (Vercel, Netlify, custom domain)? Build with `NEXT_PUBLIC_BASE_PATH=""`.

## Credits

UI components from [Magic UI](https://magicui.design) and the [portfolio template](https://github.com/dillionverma/portfolio) by Dillion Verma (MIT). Brand icons from [Simple Icons](https://simpleicons.org).
