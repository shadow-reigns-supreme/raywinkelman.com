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
│   ├── Funnel.astro        Service-lanes funnel block (homepage CTA to Shadow Software)
│   ├── Role.astro          Experience/role entry with nested ventures
│   ├── ShadowSoftwarePromo.astro  Sponsored promo card — 4 variants via `variant` prop
│   ├── TopNav.astro        Centered floating pill nav (Profile / Blog / Shadow Software ↗ / lang)
│   └── Venture.astro       Venture card (dossier page)
├── content/
│   └── posts/              {slug}.json — one static JSON file per blog post
├── data/
│   ├── types.ts            ResumeData, Hero, Funnel, Role, Education, Venture interfaces
│   ├── en.ts               English dossier content
│   ├── es.ts               Spanish dossier content
│   └── th.ts               Thai dossier content
├── layouts/
│   ├── Base.astro          Dossier layout — hero, funnel, JSON-LD, i18n hreflang
│   └── Whitepaper.astro    Blog/venture layout — OG 1200×630, BlogPosting JSON-LD, featured image, promoVariant
├── pages/
│   ├── index.astro         / — English founder dossier (SSR, middleware-driven)
│   ├── es/index.astro      /es/ — Spanish dossier
│   ├── th/index.astro      /th/ — Thai dossier
│   ├── americanguntrader/  /americanguntrader/ — venture whitepaper (prerendered)
│   ├── dabdash/            /dabdash/ — venture whitepaper (prerendered)
│   ├── blog/index.astro    /blog/ — blog index (prerendered from local JSON)
│   └── blog/[slug].astro   /blog/{slug}/ — prerendered post (getStaticPaths over local JSON)
├── scripts/
│   └── page-init.ts        Client-side init: nav progress, UTM, lang dropdown, print, name split, scroll/wp reveal
├── styles/
│   ├── global.css          Design tokens, reset, dossier layout, animations
│   └── whitepaper.css      Whitepaper/blog styles
└── middleware.ts           i18n redirect at / only

scripts/
└── sitemap.mjs             Generates public/sitemap.xml at build time

public/
├── big-shadow.png/.avif/.webp  "Big Shadow" avatar — site identity, OG/schema image
├── blog-img/               {slug}.avif + {slug}.webp, 1200×630 — one pair per post
├── logos/                  agt.jpeg, dabdash.png, shadow-software.webp
└── sw.js                   Service worker (cache version rw-v3, precaches /big-shadow.*)
```

## Page Types

| Type | Rendering | Example |
|---|---|---|
| Dossier (EN) | SSR | `/` |
| Dossier (ES/TH) | SSR | `/es/`, `/th/` |
| Venture whitepapers | Prerendered | `/americanguntrader/` |
| Blog index | Prerendered (`prerender = true`) | `/blog/` |
| Blog posts | Prerendered (`getStaticPaths` over local JSON) | `/blog/claude-code-aeo-seo-tool/` |

## i18n Routing

Middleware runs at `/` only. Logic:

1. Check `Accept-Language` header for `es` or `th`
2. Fall back to Cloudflare `cf.country` geoIP
3. Spanish-speaking countries → 302 to `/es/`
4. Thailand → 302 to `/th/`
5. Default → serve English at `/`

`/en/` does not exist — English lives at `/`. The Astro i18n config has `prefixDefaultLocale: false`.

## Theme System

The site is **dark-only** (Shadow Software design language — shadowsoftware.com):

1. CSS tokens in `:root` with `color-scheme: dark` — no light mode, no `prefers-color-scheme` media query
2. No theme toggle, no `data-theme` attribute, no `localStorage.theme` — all theme-switching code was removed from `TopNav.astro` and `page-init.ts`
3. The only light rendering is the `@media print` block, which overrides the tokens to a white-background palette

## Build

```bash
npm run build   # node scripts/sitemap.mjs && astro build
npm run dev     # astro dev → http://localhost:4321
npm run preview # astro preview (built dist/)
```

The sitemap script runs first because it reads the post JSON files in `src/content/posts/` and writes `public/sitemap.xml` before Astro bundles it into the output.

## Deployments

Cloudflare Workers via Wrangler. The `@astrojs/cloudflare` adapter compiles the Astro SSR output into a Workers-compatible bundle. Image service set to `'compile'` (Cloudflare processes images).
