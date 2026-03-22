## Design Context

### Users
- **Recruiters & hiring managers** evaluating Ray for senior/executive engineering roles or contracts
- **Potential clients** considering Shadow Software LLC for engineering engagements
- Both audiences arrive expecting credibility, clarity, and proof of serious experience
- Context: quick scanning on desktop and mobile, often comparing against other candidates/firms

### Brand Personality
- **Understated, authoritative, precise** — Swiss-design inspired minimalism
- The interface should feel like a well-set table: everything in its right place, nothing extra
- Emotional goals: instant credibility, quiet confidence, respect for the visitor's time
- Ray is a founder/CEO with deep technical roots — the site should reflect someone who builds real things, not someone who markets themselves

### Ventures & CTAs
- Ray is the founder of **AmericanGuntrader.com**, **DabDash.com**, and **OrderPrepped.com**
- The site serves as a hub directing traffic to these ventures via strategic CTAs, SEO-backlinked blog content, and ads
- CTAs should feel organic and contextual, not salesy — integrated naturally into the resume narrative

### Aesthetic Direction
- **Minimal & refined** — restrained palette, generous whitespace, typographic hierarchy does the heavy lifting
- Light and dark modes via `prefers-color-scheme`, both equally considered (not dark-as-afterthought)
- Tinted neutrals, not pure black/white — warm or cool depending on final palette direction
- The existing navy `#22437f` is a starting point but not sacred

### Anti-References (what this must NOT look like)
- Generic LinkedIn profile (headshot + timeline + endorsements)
- Developer portfolio template (dark mode, terminal aesthetic, card grids)
- Corporate consulting site (stock photos, blue gradients, buzzwords)
- Flashy startup landing page (hero sections, CTAs everywhere, animated illustrations)

### Design Principles
1. **Typography is the design** — hierarchy, weight, and spacing carry the visual identity; decorative elements are nearly absent
2. **Earned density** — information-rich but never cluttered; every element justifies its presence
3. **Quiet authority** — the design should feel like it was made by someone who doesn't need to prove anything
4. **Dual-purpose clarity** — a recruiter and a potential client should both find what they need within seconds
5. **Contextual commerce** — ventures and CTAs are woven into the narrative, never bolted on

### Technical Requirements
- Server-side rendered for SEO (Cloudflare Pages deployment)
- Multi-language: English, Spanish, Thai with language switching
- Light/dark theme via system preference
- No LaTeX pipeline — clean, maintainable web-native code
- Fully responsive, mobile-first
