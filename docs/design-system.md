# Design System

The site is **dark-only** — Shadow Software's (shadowsoftware.com) design language. `color-scheme: dark`, no light mode, no theme toggle. The only light rendering is the print stylesheet.

## CSS Design Tokens

Defined in `src/styles/global.css`. All components reference these vars — never hardcode colors.

| Token | Value |
|---|---|
| `--bg` | `#060606` |
| `--surface` / `--surface-2` | `#0e0e0e` / `#151515` |
| `--text` | `#ededed` |
| `--text-strong` | `#ffffff` |
| `--text-2` | `#b4b4b4` |
| `--text-muted` | `#8c8c8c` |
| `--accent` | `#8fd468` (green) |
| `--accent-bright` | `#9de073` (hover) |
| `--accent-ink` | `#07210a` (text on green buttons) |
| `--rule` / `--rule-soft` | `#232323` / `#1a1a1a` (hairlines) |
| `--radius` / `--radius-sm` | `18px` / `11px` |
| `--max-w` | `41rem` |
| `--gutter` | `clamp(1.25rem, 5vw, 3rem)` |
| `--font` | `'DM Sans', 'DM Sans Fallback', 'Noto Sans Thai', system-ui, sans-serif` |
| `--font-display` | `'Bricolage Grotesque', var(--font)` |
| `--font-mono` | `ui-monospace, 'SF Mono', 'JetBrains Mono', monospace` |

## Typography

- Base size: `1rem`, line-height `1.65`, letter-spacing `-0.011em`; body text color is `--text-2`
- Body font: DM Sans 400–700 — loaded non-blocking via Google Fonts, with a size-adjusted `'DM Sans Fallback'` (local Arial) `@font-face` to prevent CLS
- Display font: Bricolage Grotesque 600/700/800 — headings, `.name`, funnel/promo headings
- Mono: `--font-mono` (ui-monospace stack) — kickers, proof strip, top nav
- Thai pages also load Noto Sans Thai (400/500/700)
- `-webkit-font-smoothing: antialiased` + `text-rendering: optimizeLegibility`

## Layout

- Max width: `41rem` — applied to `body` directly
- Horizontal padding: `clamp(1.25rem, 5vw, 3rem)` — responsive gutter
- Vertical padding: `clamp(5.5rem, 14vh, 9rem) var(--gutter) 4rem`
- Content is centered via `margin: 0 auto` on body

## Animations

Three custom easing functions:
- `--ease: cubic-bezier(0.22, 1, 0.36, 1)` — house ease, used for buttons, char-in, most transitions
- `--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1)` — fast-out, used for reveals and underline draws
- `--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1)` — overshoot spring, used for logo hover

View transitions:
- Old page: 0.15s ease-out
- New page: 0.25s ease-out

All animations respect `prefers-reduced-motion` — disable with `animation: none !important` and `opacity: 1 !important`.

## Scroll Reveal

`.reveal` elements (dossier sections, funnel, whitepaper content) use IntersectionObserver to fade in as they enter the viewport. JS adds `.visible` class. Without JS, elements are always visible (no `.js` class on `<html>`).

Whitepaper body children (`.wp-body > *`) have a staggered reveal with CSS `--wp-i` counter.

## Dossier Components

The homepage is a "founder dossier" — hero, proof strip, CTA, then the funnel block (`Funnel.astro` replaced `ShadowSoftwarePromo` on the homepage).

| Class | Element | Purpose |
|---|---|---|
| `.kicker` | `p` | Mono uppercase eyebrow with green dash prefix (`::before`) |
| `.name` | `h1` | Large Bricolage 800 name with letter-stagger animation |
| `.position-line` | `p` | Hero position statement, `strong` rendered in `--text-strong` |
| `.proof-strip` | `div` | Mono uppercase metric row, `strong` in accent green |
| `.hero-cta` | `div` | Hero button row |
| `.btn` / `.btn--primary` / `.btn--ghost` | `a` | Pill buttons — primary is green (`--accent` bg, `--accent-ink` text), ghost is hairline-bordered; primary CTA targets shadowsoftware.com/contact |
| `.section-label` | `h2` | Small-caps uppercase section header with animated underline |
| `.role` | `article` | Experience entry with border-bottom rule |
| `.venture` | `article` | Venture card with left accent border, hover indent |
| `.edu` | `article` | Education entry |
| `.top-nav` | `nav` | Centered floating pill — fixed, blur backdrop, hairline border; Profile / Blog / Shadow Software ↗ (`.nav-ext`, green) / language dropdown |
| `.funnel` | `aside` | Service-lanes funnel block (`.funnel-kicker`, `.funnel-heading`, `.funnel-lanes`, `.funnel-lane`, `.funnel-lane-name`, `.funnel-lane-note`) |
| `.headshot` | `img` | "Big Shadow" avatar (`/big-shadow.avif`/`.webp`) — no photos of Ray anywhere on the site |
| `.site-footer` | `footer` | Copyright + download button |

## Whitepaper Components

See `BLOGGING.md` for usage examples.

| Class | Element | Purpose |
|---|---|---|
| `.wp-header` | `header` | Platform logo + title + tagline + optional "Visit site" link |
| `.wp-hero` | `figure` | Featured image (1200×630 aspect ratio) |
| `.wp-body` | `main` | Post content wrapper |
| `.wp-stats` | `div` | Ruled row of bold metrics — required on every post |
| `.wp-tech` | `div` | Tag chip row (jurisdictions, tech stacks, platforms) |
| `.wp-table` | `div` | Scrollable comparison table wrapper |
| `.wp-code` | `div` | Syntax-highlighted code block (GitHub Dark palette, `data-lang` label) |
| `.wp-faq` | `section` | FAQ accordion (HTML only, no JS collapse) |
| `.wp-faq-item` | `div` | Individual Q&A pair |
| `.wp-trademark` | `p` | Small muted disclosure line with top rule |
| `.cat-nav` | `nav` | Blog index category filter pills |
| `.cat-pill` | `button` | Individual filter pill (`.active` state) |
| `.blog-list` | `ul` | Post list |
| `.blog-item` | `li` | Post card with `data-category` for JS filtering |
| `.ss-promo` | `aside` | Sponsored Shadow Software card on blog posts (`ShadowSoftwarePromo.astro`) — eyebrow, heading, body, pills, CTA; copy chosen by the `variant` prop (`'seo' \| 'software' \| 'outbound' \| 'brand'`) |

## Print Styles

Both `global.css` and `whitepaper.css` include `@media print` blocks. Print is the one place the site renders light:
- `:root` tokens overridden to a white-background palette (white bg/surfaces, dark text, green accent `#2f6b1e`)
- Nav, footer, hero CTA, and funnel hidden
- Body padding reduced to `0.5in 0.6in`
- Font size reduced to `9.5pt`
- All animations/transforms reset
- `break-inside: avoid` on roles and ventures
