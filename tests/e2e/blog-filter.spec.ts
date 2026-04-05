import { test, expect } from '@playwright/test';

test.describe('blog category filter', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/blog/');
  });

  test('All is active by default', async ({ page }) => {
    const allPill = page.locator('.cat-pill[data-filter="All"]');
    await expect(allPill).toHaveClass(/active/);
  });

  test('Guest Blog posts are hidden on initial load', async ({ page }) => {
    const guestItems = page.locator('.blog-item[data-category="Guest Blog"]');
    const count = await guestItems.count();
    if (count > 0) {
      for (let i = 0; i < count; i++) {
        await expect(guestItems.nth(i)).toBeHidden();
      }
    }
  });

  test('non-guest posts are visible on initial load', async ({ page }) => {
    const nonGuestItems = page.locator('.blog-item:not([data-category="Guest Blog"])');
    const count = await nonGuestItems.count();
    if (count > 0) {
      await expect(nonGuestItems.first()).toBeVisible();
    }
  });

  test('clicking Guest Blog shows only guest posts', async ({ page }) => {
    await page.locator('.cat-pill[data-filter="Guest Blog"]').click();

    const guestItems = page.locator('.blog-item[data-category="Guest Blog"]');
    const nonGuestItems = page.locator('.blog-item:not([data-category="Guest Blog"])');

    const guestCount = await guestItems.count();
    if (guestCount > 0) {
      await expect(guestItems.first()).toBeVisible();
    }

    const nonGuestCount = await nonGuestItems.count();
    for (let i = 0; i < nonGuestCount; i++) {
      await expect(nonGuestItems.nth(i)).toBeHidden();
    }
  });

  test('clicking All after Guest Blog hides guest posts again', async ({ page }) => {
    await page.locator('.cat-pill[data-filter="Guest Blog"]').click();
    await page.locator('.cat-pill[data-filter="All"]').click();

    const guestItems = page.locator('.blog-item[data-category="Guest Blog"]');
    const count = await guestItems.count();
    for (let i = 0; i < count; i++) {
      await expect(guestItems.nth(i)).toBeHidden();
    }
  });

  test('clicking a non-guest category shows only that category', async ({ page }) => {
    const pill = page.locator('.cat-pill:not([data-filter="All"]):not([data-filter="Guest Blog"])').first();
    const filter = await pill.getAttribute('data-filter');
    await pill.click();

    const matchingItems = page.locator(`.blog-item[data-category="${filter}"]`);
    const otherItems = page.locator(`.blog-item:not([data-category="${filter}"])`);

    const matchCount = await matchingItems.count();
    if (matchCount > 0) {
      await expect(matchingItems.first()).toBeVisible();
    }

    const otherCount = await otherItems.count();
    for (let i = 0; i < otherCount; i++) {
      await expect(otherItems.nth(i)).toBeHidden();
    }
  });

  test('active pill updates when switching categories', async ({ page }) => {
    const guestPill = page.locator('.cat-pill[data-filter="Guest Blog"]');
    await guestPill.click();
    await expect(guestPill).toHaveClass(/active/);
    await expect(page.locator('.cat-pill[data-filter="All"]')).not.toHaveClass(/active/);

    await page.locator('.cat-pill[data-filter="All"]').click();
    await expect(page.locator('.cat-pill[data-filter="All"]')).toHaveClass(/active/);
    await expect(guestPill).not.toHaveClass(/active/);
  });
});
