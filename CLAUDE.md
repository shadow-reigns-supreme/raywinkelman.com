## Design Context

### Purpose
The site is a **funnel to shadowsoftware.com** for visitors who need software development, SEO/AEO, or cold email/outbound services. The homepage is a founder dossier (proof of competence), not a job-seeking resume.

### Users
- **Prospective Shadow Software clients** evaluating the firm through its founder
- **Blog readers from search/AI answers**, converted by per-category promos
- **99% of traffic is mobile** — design and verify at 390px first

### Brand & Anonymity
- The site speaks **Shadow Software's design language** — the two sites must read as one family
- **No photos of Ray anywhere** (pages, favicons, OG, schema). His visual identity is the **"Big Shadow"** avatar: cartoon hooded, heavily-muscled figure with green eyes (`/big-shadow.png` + variants), matching the SS shadowman mascot
- Ray is the founder of **AmericanGuntrader.com** and **DabDash.com** — presented as proof of shipping, with CTAs woven in, never bolted on

### Aesthetic Direction (ported from shadowsoftware.com)
- **Dark-only** (`color-scheme: dark`); print stylesheet stays light
- Tokens: `--bg: #060606`, surfaces `#0e0e0e`/`#151515`, hairlines `#232323`, `--accent: #8fd468` (hover `#9de073`, ink `#07210a`), radius 18px/11px, ease `cubic-bezier(0.22,1,0.36,1)`
- Type: **Bricolage Grotesque** display (700/800, tight tracking) + **DM Sans** body + mono kickers; Noto Sans Thai on `/th/`
- Components: floating pill nav, green pill buttons, bordered surface cards (never side-stripe accents), staggered reveals

### Anti-References (what this must NOT look like)
- Generic LinkedIn profile (headshot + timeline + endorsements)
- Developer portfolio template (terminal aesthetic, card grids)
- Corporate consulting site (stock photos, buzzwords)
- A visually different brand from shadowsoftware.com

### Design Principles
1. **One brand, two surfaces** — anything that would look foreign on shadowsoftware.com doesn't ship here
2. **Mobile fold first** — the 390px first screen carries the funnel; it gets designed before anything else
3. **Earned density** — information-rich but never cluttered; every element justifies its presence
4. **Quiet authority** — proof over claims; the dossier states facts and lets them sell
5. **Contextual commerce** — every CTA matches what the visitor is reading (per-category promo variants)

---

## Author Profile

Ray Winkelman is a **full-time nomad and SaaS founder** — not an employee, not available for hire. Founder & CEO of Shadow Software LLC. No fixed home base — never reference a home city or "returning home." For full content rules, see `BLOGGING.md`.

---

## Docs

Detailed reference documentation lives in `docs/`:

| File | Contents |
|---|---|
| [`docs/architecture.md`](docs/architecture.md) | Tech stack, directory structure, page types, i18n routing, theme system, build |
| [`docs/blog-system.md`](docs/blog-system.md) | n8n webhooks, `rays_blogs` schema, MCP upsert field mapping, featured images, publish workflow |
| [`docs/design-system.md`](docs/design-system.md) | CSS tokens, typography, layout, animations, all component classes |
| [`docs/testing.md`](docs/testing.md) | Test setup, all test files, known post slugs, how to add tests for new posts |
| [`docs/code-conventions.md`](docs/code-conventions.md) | TypeScript strict options, ESLint rules, Unicorn/SonarJS rules, code patterns |

Blog content rules and publishing workflow: `BLOGGING.md`.
Blog publish skill: `.claude/commands/blog.md`.
