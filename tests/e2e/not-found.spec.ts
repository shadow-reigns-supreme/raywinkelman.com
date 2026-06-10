import { test, expect } from '@playwright/test';

test.describe('404 page', () => {
  test('unknown route returns 404 status and renders the page', async ({ page }) => {
    const res = await page.goto('/this-page-does-not-exist/');
    expect(res?.status()).toBe(404);
    await expect(page.locator('.nf-code')).toContainText('404');
  });

  test('shows the Big Shadow avatar', async ({ page }) => {
    await page.goto('/this-page-does-not-exist/');
    const alt = await page.locator('img.nf-avatar').getAttribute('alt');
    expect(alt).toContain('Big Shadow');
  });

  test('advertises Shadow Software via the brand promo', async ({ page }) => {
    await page.goto('/this-page-does-not-exist/');
    await expect(page.locator('.ss-promo-heading')).toContainText('Shadow Software');
    const ctaHref = await page.locator('.ss-promo-cta').getAttribute('href');
    expect(ctaHref).toContain('shadowsoftware.com');
  });

  test('offers blog and profile escape hatches', async ({ page }) => {
    await page.goto('/this-page-does-not-exist/');
    await expect(page.locator('.hero-cta a[href="/blog/"]')).toBeVisible();
    await expect(page.locator('.hero-cta a[href="/"]')).toBeVisible();
  });

  test('redirects to /blog/ after 10 seconds', async ({ page }) => {
    await page.clock.install();
    await page.goto('/this-page-does-not-exist/');
    await expect(page.locator('[data-nf-seconds]')).toHaveText('10');
    await page.clock.fastForward(11_000);
    await page.waitForURL('**/blog/**');
    await expect(page.locator('h1.wp-title')).toContainText('Blog');
  });

  test('"stay here" cancels the redirect', async ({ page }) => {
    await page.clock.install();
    await page.goto('/this-page-does-not-exist/');
    await page.locator('[data-nf-cancel]').click();
    await expect(page.locator('[data-nf-countdown]')).toHaveCount(0);
    await page.clock.fastForward(15_000);
    await expect(page).toHaveURL(/this-page-does-not-exist/);
  });

  test('is excluded from indexing', async ({ page }) => {
    await page.goto('/this-page-does-not-exist/');
    const robots = await page.locator('meta[name="robots"]').getAttribute('content');
    expect(robots).toContain('noindex');
  });
});
