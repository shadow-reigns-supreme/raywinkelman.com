import { test, expect } from '@playwright/test';

// The site is dark-only (Shadow Software design language). There is no theme
// toggle and no data-theme attribute — these tests guard against regressions
// that would reintroduce a light mode or leave stale toggle UI behind.

test.describe('dark-only theme', () => {
  test('no theme toggle is rendered on the profile page', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.theme-toggle')).toHaveCount(0);
  });

  test('no theme toggle is rendered on the blog index page', async ({ page }) => {
    await page.goto('/blog/');
    await expect(page.locator('.theme-toggle')).toHaveCount(0);
  });

  test('html carries no data-theme attribute', async ({ page }) => {
    await page.goto('/');
    const attr = await page.locator('html').getAttribute('data-theme');
    expect(attr).toBeNull();
  });

  test('background stays dark even under light system preference', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light' });
    await page.goto('/');
    const bg = await page.evaluate(
      () => getComputedStyle(document.body).backgroundColor
    );
    expect(bg).toBe('rgb(6, 6, 6)');
  });

  test('meta theme-color is the brand black', async ({ page }) => {
    await page.goto('/');
    const themeColor = await page
      .locator('meta[name="theme-color"]')
      .getAttribute('content');
    expect(themeColor).toBe('#060606');
  });

  test('accent green is applied to the primary CTA', async ({ page }) => {
    await page.goto('/');
    const bg = await page.evaluate(() => {
      const btn = document.querySelector('.btn--primary');
      return btn ? getComputedStyle(btn).backgroundColor : null;
    });
    expect(bg).toBe('rgb(143, 212, 104)');
  });
});
