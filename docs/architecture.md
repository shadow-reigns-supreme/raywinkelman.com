# Architecture

## Tech Stack

| Layer | Tech | Notes |
|---|---|---|
| Framework | Astro 5 SSR | `output: 'server'` — not static |
| Hosting | Cloudflare Workers | Via `@astrojs/cloudflare` adapter |
| Language | TypeScript | Strict mode throughout |
| Styling | Plain CSS | No Tailwind — custom tokens in `global.css` |
| Client JS | Vanilla TS | `src/scripts/page-init.ts`, deduped by Astro |
| Testing | Playwright | E2E only, Chromium, requires dev server |
| Lint | ESLint | `--max-warnings 0` — zero tolerance |
| Pre-commit | lefthook | typecheck + lint in parallel |

## Directory Structure

```
src/
├── components/
│   ├── Edu.astro           Education entry
│   ├── Role.astro          Experience/role entry with nested ventures
│   └── Venture.astro       Venture card (resume page)
├── data/
│   ├── types.ts            ResumeData, Role, Education, Venture interfaces
│   ├── en.ts               English resume content
│   ├── es.ts               Spanish resume content
│   └── th.ts               Thai resume content
├── layouts/
│   ├── Base.astro          Resume layout — JSON-LD, i18n hreflang, theme init
│   └── Whitepaper.astro    Blog/venture layout — OG 1200×630, BlogPosting JSON-LD, featured image
├── pages/
│   ├── index.astro         / — English resume (SSR, middleware-driven)
│   ├── es/index.astro      /es/ — Spanish resume
│   ├── th/index.astro      /th/ — Thai resume
│   ├── americanguntrader/  /americanguntrader/ — venture whitepaper (prerendered)
│   ├── dabdash/            /dabdash/ — venture whitepaper (prerendered)
│   ├── blog/index.astro    /blog/ — blog index (prerendered, fetches at build time)
│   └── blog/[slug].astro   /blog/{slug}/ — dynamic post (SSR, fetches at request time)
├── scripts/
│   └── page-init.ts        Client-side init: theme, UTM, email reveal, scroll/wp reveal
├── styles/
│   ├── global.css          Design tokens, reset, resume layout, animations
│   └── whitepaper.css      Whitepaper/blog styles
└── middleware.ts           i18n redirect at / only

scripts/
└── sitemap.mjs             Generates public/sitemap.xml at build time

public/
├── blog-img/               {slug}.avif + {slug}.webp, 1200×630 — one pair per post
└── logos/                  agt.jpeg, dabdash.png
```

## Page Types

| Type | Rendering | Example |
|---|---|---|
| Resume (EN) | SSR | `/` |
| Resume (ES/TH) | SSR | `/es/`, `/th/` |
| Venture whitepapers | Prerendered | `/americanguntrader/` |
| Blog index | Prerendered (`prerender = true`) | `/blog/` |
| Blog posts | SSR (dynamic) | `/blog/mercury-bank-non-resident-saas-founders/` |

## i18n Routing

Middleware runs at `/` only. Logic:

1. Check `Accept-Language` header for `es` or `th`
2. Fall back to Cloudflare `cf.country` geoIP
3. Spanish-speaking countries → 302 to `/es/`
4. Thailand → 302 to `/th/`
5. Default → serve English at `/`

`/en/` does not exist — English lives at `/`. The Astro i18n config has `prefixDefaultLocale: false`.

## Theme System

1. CSS tokens in `:root` (light default)
2. `@media (prefers-color-scheme: dark)` overrides tokens
3. `html[data-theme="light|dark"]` forced override (highest specificity)
4. Inline `<script is:inline>` in `<head>` reads `localStorage.theme` and sets `data-theme` before first paint — prevents flash
5. `astro:after-swap` listener in `page-init.ts` re-applies theme after each Astro view transition

## Build

```bash
npm run build   # node scripts/sitemap.mjs && astro build
npm run dev     # astro dev → http://localhost:4321
npm run preview # astro preview (built dist/)
```

The sitemap script runs first because it fetches live post data from n8n and writes `public/sitemap.xml` before Astro bundles it into the output.

## Deployments

Cloudflare Workers via Wrangler. The `@astrojs/cloudflare` adapter compiles the Astro SSR output into a Workers-compatible bundle. Image service set to `'compile'` (Cloudflare processes images).
