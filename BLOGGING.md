# Blogging — Context & Guidelines

## Author Voice

Ray Winkelman is a **full-time nomad** — no fixed home base, travels the world continuously. This is a core identity signal and must be reflected in every post. Never reference a home city, home country, or "returning home." The framing is always: moving between places, not leaving and coming back.

## Primary Topics (in order of priority)

1. **Tech entrepreneurship** — building platforms, founding companies, lessons from Shadow Software LLC and its ventures (AmericanGunTrader, DabDash, OrderPrepped)
2. **AEO/SEO** — answer engine optimization, search strategy, content architecture, AI search visibility
3. **Offshore tax residencies & tax optimization** — perpetual traveler strategies, flag theory, territorial tax jurisdictions, legal structures for location-independent founders
4. **Travel** — destination reviews, logistics, nomad infrastructure (accommodation, connectivity, banking); always framed through the lens of a working founder, not a leisure tourist

## Tone & Style

- First-person, direct, no filler — mirrors the resume's "quiet authority" aesthetic
- Earned density: information-rich, never padded
- No motivational language, no "hustle" framing
- Links and CTAs are contextual, never bolted on

## Permitted Categories

Every post must be assigned exactly one of these categories:

| Category | Use for |
|---|---|
| `Tax` | Offshore tax residencies, flag theory, territorial tax, legal structures |
| `AEO` | Answer engine optimization, AI search visibility, prompt-based discovery |
| `SEO` | Search strategy, content architecture, technical SEO, link building |
| `DabDash` | DabDash.com platform updates, cannabis delivery market, SaaS |
| `Prepped` | OrderPrepped.com updates, food/catering industry, meal prep |
| `American Gun Trader` | AmericanGunTrader.com updates, firearms market, P2P marketplace |
| `Guest Blog` | First-person reviews, travel write-ups, and SEO backlink placements |

Categories are fetched from `https://n8n.americanguntrader.com/webhook/67a78c43-734d-407a-9bfe-da21cca71d34` at runtime and fall back to the hardcoded list above.

## SEO Backlink Posts

Posts written to place backlinks for partner/client sites should:
- Read as genuine first-hand experience — not advertorial
- Anchor text must be natural within the sentence
- Disclosure line at the bottom: *"This review reflects a personal stay/experience. No compensation was received."* (or omit if compensation was received and add appropriate disclosure)
- Category: Travel (even if the primary purpose is a backlink)

## Technical Setup

- Blog index: `src/pages/blog/index.astro` — SSR, fetches dynamic posts from n8n webhook, hardcoded static posts merged in
- Individual posts: `src/pages/blog/[slug].astro` — `export const prerender = true` for static generation
- Layout: `src/layouts/Whitepaper.astro` with `logo="/ray.png"`, `platformName="[Post Title or Category]"`, `platformUrl="https://raywinkelman.com/blog/"`
- Sitemap: update `scripts/sitemap.mjs` and regenerate `public/sitemap.xml` after adding a post

## What NOT to Write

- No fixed-location references (no "back home in X", no city as a base)
- No generic lifestyle content unrelated to the four topic pillars
- No developer-portfolio aesthetic (dark mode terminal vibes, tutorial listicles)
- No unsolicited opinions on tools/frameworks without a clear business angle
