## Design Context

register: brand

### Purpose
raywinkelman.com is a **funnel to shadowsoftware.com**. It establishes the founder's credibility (the dossier) and the blog's expertise, then routes visitors who need software development, SEO/AEO, or cold email/outbound services to Shadow Software LLC.

### Users
- **Prospective Shadow Software clients** — founders and operators evaluating whether to hire the firm for software builds, search visibility, or outbound systems
- **Blog readers arriving from search/AI answers** — they came for one answer; the per-category promo converts the relevant ones
- **99% of traffic is mobile.** The 390px fold is the most valuable surface on the site; design mobile-first, always.

### Identity & Anonymity
- Ray is a founder, **not available for hire**. The homepage is a founder dossier, not a job-seeking resume.
- **No photos of Ray anywhere** (pages, favicons, OG images, schema). His visual identity is **"Big Shadow"**: a cartoon hooded, heavily-muscled figure with glowing green eyes (`/big-shadow.png` + avif/webp + favicon set), matching the Shadow Software shadowman mascot.

### Brand Personality
- The site speaks Shadow Software's design language: dark, confident, engineered. "Our code. Your product." energy.
- Quiet authority retained from the original brief: information-dense, no hype, every element earns its place.

### Design System (ported from shadowsoftware.com)
- **Dark-only** (`color-scheme: dark`). Print stylesheet renders light for the printable dossier.
- Tokens: bg `#060606`, surfaces `#0e0e0e`/`#151515`, hairlines `#232323`/`#1a1a1a`, text `#ededed`/`#b4b4b4`/`#8c8c8c`, accent green `#8fd468` (hover `#9de073`, ink `#07210a`), radius `18px`/`11px`, ease `cubic-bezier(0.22,1,0.36,1)`.
- Typography: **Bricolage Grotesque** display (700/800, -0.035em, lh ~1.02), **DM Sans** body, mono kickers (ui-monospace, ~0.72rem, uppercase, tracked). Noto Sans Thai for `/th/`.
- Components: floating pill nav (blur + hairline border), green pill buttons with arrow-translate hover, bordered surface cards (no side-stripe accents), staggered scroll reveals.

### Funnel mechanics
- Hero: kicker + name + positioning line + proof strip + primary CTA ("Work with Shadow Software" → shadowsoftware.com/contact).
- Resume-page funnel block lists the three service lanes (software development → /what-we-do, SEO & AEO → shadowsoftware.com, cold email → /contact).
- Blog promo component has four variants selected by post category: `seo`, `software`, `outbound`, `brand`.
- All outbound links carry `utm_source=raywinkelman.com` (added by page-init).

### Anti-References (what this must NOT look like)
- Generic LinkedIn profile (headshot + timeline + endorsements)
- Developer portfolio template (terminal aesthetic, card grids)
- Corporate consulting site (stock photos, buzzwords)
- A different brand from shadowsoftware.com — the two sites must read as one family

### Technical Requirements
- Static Astro build, Cloudflare Pages
- Multi-language: English, Spanish, Thai with language switching
- Fully responsive, mobile-first; verify at 390px before desktop
