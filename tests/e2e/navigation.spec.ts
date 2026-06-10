import { test, expect } from '@playwright/test';

test.describe('navigation — profile pages', () => {
  test('nav has Profile, Blog, and Shadow Software links', async ({ page }) => {
    await page.goto('/');
    const nav = page.locator('nav.top-nav');
    await expect(nav.locator('a[href="/"]')).toBeVisible();
    await expect(nav.locator('a[href="/blog/"]')).toBeVisible();
    await expect(nav.locator('a[href="https://shadowsoftware.com"]')).toBeVisible();
  });

  test('language dropdown opens and shows ES and TH links', async ({ page }) => {
    await page.goto('/');
    await page.locator('.lang-drop-btn').click();
    await expect(page.locator('.lang-drop-menu a[href="/es/"]')).toBeVisible();
    await expect(page.locator('.lang-drop-menu a[href="/th/"]')).toBeVisible();
  });

  test('Profile link has aria-current="page" on /', async ({ page }) => {
    await page.goto('/');
    const profileLink = page.locator('nav.top-nav a[href="/"]');
    await expect(profileLink).toHaveAttribute('aria-current', 'page');
  });

  test('ES page still marks Profile as current', async ({ page }) => {
    await page.goto('/es/');
    const profileLink = page.locator('nav.top-nav a[href="/"]');
    await expect(profileLink).toHaveAttribute('aria-current', 'page');
  });
});

test.describe('navigation — blog/whitepaper pages', () => {
  test('Blog link has aria-current on /blog/', async ({ page }) => {
    await page.goto('/blog/');
    const blogLink = page.locator('nav.top-nav a[href="/blog/"]');
    await expect(blogLink).toHaveAttribute('aria-current', 'page');
  });

  test('whitepaper pages render the nav', async ({ page }) => {
    await page.goto('/americanguntrader/');
    await expect(page.locator('nav.top-nav')).toBeVisible();
  });
});

test.describe('navigation — cross-page links', () => {
  test('profile footer links to blog', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.site-footer a[href="/blog/"]')).toBeVisible();
  });

  test('whitepaper footer links back to profile', async ({ page }) => {
    await page.goto('/blog/');
    await expect(page.locator('.site-footer a[href="/"]')).toBeVisible();
  });

  test('clicking Blog from profile navigates to /blog/', async ({ page }) => {
    await page.goto('/');
    await page.locator('nav.top-nav a[href="/blog/"]').click();
    await page.waitForURL('**/blog/**');
    await expect(page.locator('h1.wp-title')).toContainText('Blog');
  });
});

test.describe('funnel — Shadow Software CTAs', () => {
  test('hero primary CTA targets shadowsoftware.com/contact', async ({ page }) => {
    await page.goto('/');
    const cta = page.locator('.hero-cta .btn--primary');
    await expect(cta).toBeVisible();
    const href = await cta.getAttribute('href');
    expect(href).toContain('shadowsoftware.com/contact');
  });

  test('funnel block lists the three service lanes', async ({ page }) => {
    await page.goto('/');
    const lanes = page.locator('.funnel-lane a');
    await expect(lanes).toHaveCount(3);
    for (const href of await lanes.evaluateAll((els) => els.map((el) => el.getAttribute('href')))) {
      expect(href).toContain('shadowsoftware.com');
    }
  });
});

test.describe('accessibility — focus and landmarks', () => {
  test('nav has aria-label', async ({ page }) => {
    await page.goto('/');
    const nav = page.locator('nav.top-nav');
    const label = await nav.getAttribute('aria-label');
    expect(label).toBeTruthy();
  });

  test('avatar has alt text naming Big Shadow', async ({ page }) => {
    await page.goto('/');
    const img = page.locator('img.headshot');
    const alt = await img.getAttribute('alt');
    expect(alt).toContain('Big Shadow');
  });

  test('venture logos have alt text', async ({ page }) => {
    await page.goto('/');
    const logos = page.locator('img.venture-logo');
    const count = await logos.count();
    for (let i = 0; i < count; i++) {
      const alt = await logos.nth(i).getAttribute('alt');
      expect(alt).toBeTruthy();
    }
  });

  test('all nav separators are aria-hidden', async ({ page }) => {
    await page.goto('/');
    const seps = page.locator('.nav-sep');
    const count = await seps.count();
    for (let i = 0; i < count; i++) {
      await expect(seps.nth(i)).toHaveAttribute('aria-hidden', 'true');
    }
  });
});
