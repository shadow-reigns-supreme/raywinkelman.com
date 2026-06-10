# Testing

## Setup

Playwright E2E only — no unit tests. Chromium browser only. Tests run against the dev server (`npm run dev`).

```bash
npm run dev        # start dev server first (required)
npm run test       # run all tests headless
npm run test:ui    # run with Playwright UI (interactive)
npm run test:headed # run with visible browser
```

Config: `playwright.config.ts` — `baseURL: http://localhost:4321`, `reuseExistingServer: true`, `fullyParallel: false`.

## Test Files

| File | What it covers |
|---|---|
| `tests/e2e/resume-pages.spec.ts` | All 3 locales (/, /es/, /th/) load, correct `lang` attr, 4 sections render, >=2 venture cards, `/big-shadow.avif` avatar loads |
| `tests/e2e/resume-seo.spec.ts` | Canonical URLs, OG tags, hreflang alternates, JSON-LD (WebSite/Org/Person/FAQ), robots meta |
| `tests/e2e/venture-whitepapers.spec.ts` | All 3 ventures load, h1 visible, Visit link, wp-body has content, SEO meta, JSON-LD |
| `tests/e2e/blog-posts.spec.ts` | 5 known posts load at correct slug, featured images return 200, SEO (og:image, twitter:card, canonical, JSON-LD), promo variant matches post category |
| `tests/e2e/blog-filter.spec.ts` | Category filter default state, Guest Blog hidden, switching categories, aria-pressed state |
| `tests/e2e/theme-toggle.spec.ts` | Dark-only guards: no `.theme-toggle`, no `data-theme`, `#060606` body bg even under light system preference, `#060606` theme-color meta, green `.btn--primary` CTA |
| `tests/e2e/navigation.spec.ts` | Pill nav links (Profile / Blog / Shadow Software), language dropdown, aria-current, cross-page clicks, hero/funnel CTAs target shadowsoftware.com/contact, Big Shadow alt text |
| `tests/e2e/responsive.spec.ts` | Mobile (375px), tablet (768px), desktop (1920px) — content visible, max-width constrained |

## Known Slugs (blog-posts.spec.ts)

Update this array when new posts are published:

```typescript
const POSTS = [
  { slug: 'claude-code-aeo-seo-tool', title: 'Claude Code' },
  { slug: 'public-apis-apilayer-github', title: 'Public APIs' },
  { slug: 'worldview-kevtoe-tactical-intelligence', title: 'Worldview Kevtoe' },
  { slug: 'linux-anti-fingerprinting-hardening', title: 'Linux Hardening' },
  { slug: 'dabdash-for-thai-dispensaries', title: 'DabDash' },
];
```

## CI Behavior

`playwright.config.ts` sets `retries: process.env['CI'] ? 2 : 0` and `forbidOnly: !!process.env['CI']`. No GitHub Actions are currently configured — tests run manually.

## Adding Tests for New Posts

After publishing a new post (JSON file in `src/content/posts/`), add the slug to the `POSTS` array in `tests/e2e/blog-posts.spec.ts`. The test will verify:
- Post loads at `/blog/{slug}/` (200 status, no redirect)
- Featured image exists at `/blog-img/{slug}.avif` (200 status, `content-type: avif`)

The funnel-promo tests in the same file assert that the post category maps to the right `ShadowSoftwarePromo` variant (e.g. an AEO post shows the `seo` variant heading) — if you add a post in a new category, consider extending those.
