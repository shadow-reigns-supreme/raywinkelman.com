import { test, expect } from '@playwright/test';

const POSTS = [
  { slug: 'claude-code-aeo-seo-tool', title: 'Claude Code' },
  { slug: 'public-apis-apilayer-github', title: 'Public APIs' },
  { slug: 'worldview-kevtoe-tactical-intelligence', title: 'Worldview Kevtoe' },
  { slug: 'linux-anti-fingerprinting-hardening', title: 'Linux Hardening' },
  { slug: 'dabdash-for-thai-dispensaries', title: 'DabDash' },
];

test.describe('blog post routing', () => {
  for (const post of POSTS) {
    test(`${post.title} — loads at correct slug`, async ({ page }) => {
      const res = await page.goto(`/blog/${post.slug}/`);
      expect(res?.status()).toBe(200);
      await expect(page).not.toHaveURL(/\/blog\/$/); // must not redirect to index
      await expect(page.locator('h1.wp-title')).toBeVisible();
    });
  }
});

test.describe('blog post featured images', () => {
  for (const post of POSTS) {
    test(`${post.title} — featured image loads (200)`, async ({ request }) => {
      const imgRes = await request.get(`/blog-img/${post.slug}.avif`);
      expect(imgRes.status()).toBe(200);
      expect(imgRes.headers()['content-type']).toContain('avif');
    });
  }
});

test.describe('blog post SEO', () => {
  test('og:image points to featured image AVIF', async ({ page }) => {
    await page.goto('/blog/claude-code-aeo-seo-tool/');
    const ogImage = await page.locator('meta[property="og:image"]').getAttribute('content');
    expect(ogImage).toContain('claude-code-aeo-seo-tool');
    expect(ogImage).toContain('avif');
  });

  test('twitter:card is summary_large_image', async ({ page }) => {
    await page.goto('/blog/claude-code-aeo-seo-tool/');
    const card = await page.locator('meta[name="twitter:card"]').getAttribute('content');
    expect(card).toBe('summary_large_image');
  });

  test('og:image dimensions are 1200x630', async ({ page }) => {
    await page.goto('/blog/claude-code-aeo-seo-tool/');
    const w = await page.locator('meta[property="og:image:width"]').getAttribute('content');
    const h = await page.locator('meta[property="og:image:height"]').getAttribute('content');
    expect(w).toBe('1200');
    expect(h).toBe('630');
  });

  test('canonical URL matches slug', async ({ page }) => {
    await page.goto('/blog/linux-anti-fingerprinting-hardening/');
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    expect(canonical).toContain('linux-anti-fingerprinting-hardening');
  });

  test('JSON-LD BlogPosting has image with dimensions', async ({ page }) => {
    await page.goto('/blog/claude-code-aeo-seo-tool/');
    const ldJson = await page.locator('script[type="application/ld+json"]').textContent();
    const data = JSON.parse(ldJson as string);
    const posting = data['@graph'].find((n: { '@type': string }) => n['@type'] === 'BlogPosting');
    expect(posting).toBeDefined();
    expect(posting.image['@type']).toBe('ImageObject');
    expect(posting.image.width).toBe(1200);
    expect(posting.image.height).toBe(630);
  });
});

test.describe('blog post funnel promo', () => {
  test('AEO post shows the SEO promo variant', async ({ page }) => {
    await page.goto('/blog/claude-code-aeo-seo-tool/');
    await expect(page.locator('.ss-promo-heading')).toContainText('search visibility');
  });

  test('Cybersecurity post shows the software promo variant', async ({ page }) => {
    await page.goto('/blog/linux-anti-fingerprinting-hardening/');
    await expect(page.locator('.ss-promo-heading')).toContainText('software');
  });

  test('Guest Blog post (venture promo) shows the brand promo variant', async ({ page }) => {
    await page.goto('/blog/dabdash-for-thai-dispensaries/');
    await expect(page.locator('.ss-promo-heading')).toContainText('Built by');
  });
});

test.describe('blog index links', () => {
  test('all index links use clean slugs (no spaces, no commas)', async ({ page }) => {
    await page.goto('/blog/');
    const links = await page.locator('.blog-title').all();
    expect(links.length).toBeGreaterThan(0);
    for (const link of links) {
      const href = await link.getAttribute('href');
      expect(href).toMatch(/^\/blog\/[a-z0-9-]+\/$/);
    }
  });
});
