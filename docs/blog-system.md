# Blog System

All posts are hardcoded JSON files in `src/content/posts/`. The blog is fully static — no database, no API, no SSR.

## How It Works

```
Build time
──────────
src/content/posts/*.json ──→ blog/index.astro (post list)
                         └──→ blog/[slug].astro (one page per post, via getStaticPaths)
```

Both routes use `export const prerender = true`. `getStaticPaths()` in `[slug].astro` globs all JSON files and returns one static path per post.

## Post File Format

Each post lives at `src/content/posts/{slug}.json`:

```json
{
  "title": "...",
  "excerpt": "~155 char meta description",
  "html": "inner body HTML only — no <html>/<head>/<body>",
  "category": "AEO",
  "keyword": "primary keyword",
  "lang": "en-US",
  "slug": "post-slug",
  "image_url": "/blog-img/post-slug.avif",
  "published_at": "2026-01-15T00:00:00Z"
}
```

## Publishing a New Post

1. Write the post HTML (inner body only — see `BLOGGING.md` for template and AEO rules)
2. Fetch and process the featured image → `public/blog-img/{slug}.avif` + `.webp`
3. Write `src/content/posts/{slug}.json` with all fields
4. Commit and push — Cloudflare Pages builds and deploys automatically

Use the `/blog` skill for the full guided workflow.

## What Whitepaper.astro Derives Automatically

`[slug].astro` passes `featuredImage={'/blog-img/' + post.slug + '.avif'}` to the layout, which then:

- Preloads the AVIF with `fetchpriority="high"` as the LCP asset
- Renders a `<figure class="wp-hero">` hero between nav and content
- Sets `og:image` to the AVIF at 1200×630 with correct dimension meta tags
- Sets `twitter:card` to `summary_large_image`
- Includes a `ImageObject` with `width: 1200, height: 630` in the JSON-LD BlogPosting
- Hides the hero via `onerror` if the image file is missing (graceful fallback)

## Shadow Software Promo Variants

Every post page ends with a `ShadowSoftwarePromo` card. `Whitepaper.astro` accepts a `promoVariant` prop (`'seo' | 'software' | 'outbound' | 'brand'`, default `'seo'`), and `[slug].astro` picks it from the post's category:

| Category | Variant |
|---|---|
| AEO, SEO | `seo` |
| Cold Email | `outbound` |
| Software Development, Cybersecurity | `software` |
| anything else (Guest Blog: venture promos, SaaS guest placements) | `brand` |

The mapping lives in `VARIANT_BY_CATEGORY` in `src/pages/blog/[slug].astro`.

## Featured Images

Every post requires both `{slug}.avif` and `{slug}.webp` in `public/blog-img/`. Filename must match the slug exactly.

Process with ImageMagick:
```bash
magick input.jpg -resize 1200x630^ -gravity Center -extent 1200x630 -strip -quality 80 public/blog-img/{slug}.avif
magick input.jpg -resize 1200x630^ -gravity Center -extent 1200x630 -strip -quality 82 public/blog-img/{slug}.webp
```

## Category Filter (Blog Index)

The blog index renders category filter pills in `PERMITTED_CATEGORIES` order, filtered to categories that have at least one post. The "All" filter hides `Guest Blog` posts by default — they only appear when the "Guest Blog" pill is explicitly clicked. This is enforced client-side in `blog/index.astro`'s inline `<script>`.
