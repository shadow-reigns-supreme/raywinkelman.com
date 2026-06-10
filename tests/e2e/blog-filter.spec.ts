import { test, expect } from '@playwright/test';

test.describe('blog category filter', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/blog/');
  });

  test('All is active by default', async ({ page }) => {
    const allPill = page.locator('.cat-pill[data-filter="All"]');
    await expect(allPill).toHaveClass(/active/);
  });

  test('posts are visible on initial load', async ({ page }) => {
    const items = page.locator('.blog-item:not([data-category="Guest Blog"])');
    const count = await items.count();
    expect(count).toBeGreaterThan(0);
    await expect(items.first()).toBeVisible();
  });

  test('Guest Blog posts, if any, are hidden on initial load', async ({ page }) => {
    const guestItems = page.locator('.blog-item[data-category="Guest Blog"]');
    const count = await guestItems.count();
    for (let i = 0; i < count; i++) {
      await expect(guestItems.nth(i)).toBeHidden();
    }
  });

  test('clicking a category shows only that category', async ({ page }) => {
    const pill = page.locator('.cat-pill:not([data-filter="All"]):not([data-filter="Guest Blog"])').first();
    const filter = await pill.getAttribute('data-filter');
    await pill.click();

    const matchingItems = page.locator(`.blog-item[data-category="${filter}"]`);
    const otherItems = page.locator(`.blog-item:not([data-category="${filter}"])`);

    const matchCount = await matchingItems.count();
    expect(matchCount).toBeGreaterThan(0);
    await expect(matchingItems.first()).toBeVisible();

    const otherCount = await otherItems.count();
    for (let i = 0; i < otherCount; i++) {
      await expect(otherItems.nth(i)).toBeHidden();
    }
  });

  test('clicking All restores the default view', async ({ page }) => {
    const pill = page.locator('.cat-pill:not([data-filter="All"])').first();
    await pill.click();
    await page.locator('.cat-pill[data-filter="All"]').click();

    const items = page.locator('.blog-item:not([data-category="Guest Blog"])');
    await expect(items.first()).toBeVisible();
  });

  test('active pill updates when switching categories', async ({ page }) => {
    const pill = page.locator('.cat-pill:not([data-filter="All"])').first();
    await pill.click();
    await expect(pill).toHaveClass(/active/);
    await expect(page.locator('.cat-pill[data-filter="All"]')).not.toHaveClass(/active/);

    await page.locator('.cat-pill[data-filter="All"]').click();
    await expect(page.locator('.cat-pill[data-filter="All"]')).toHaveClass(/active/);
    await expect(pill).not.toHaveClass(/active/);
  });

  test('only funnel-aligned categories are offered', async ({ page }) => {
    const pills = await page.locator('.cat-pill').allTextContents();
    expect(pills).not.toContain('Tax');
    expect(pills).not.toContain('Banking');
  });
});
