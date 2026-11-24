import { test, expect } from '@playwright/test';
import { cardDescriptions, cardNames, cardPrices, open, shot } from './helpers';

const sortButton = (page: any, label: string) => page.locator('.sort-controls button', { hasText: label });

test.describe('shop items', () => {
  test('lists the five items in their initial order', async ({ page }, testInfo) => {
    await open(page, '/shop');
    await expect(page.locator('app-item')).toHaveCount(5);
    // Initial order is the declaration order (the list is not pre-sorted, even though "Name ↑" is shown).
    expect(await cardNames(page)).toEqual(['foo', 'mario', 'luigi', 'apple', 'banana']);
    expect(await cardPrices(page)).toEqual(['123 €', '456 €', '789 €', '99 €', '59 €']);
    expect(await cardDescriptions(page)).toEqual(['bar', 'bross', 'bross', 'fruit', 'fruit']);
    await expect(page.getByText('Sort by:')).toBeVisible();
    await expect(sortButton(page, 'Name')).toHaveText(/Name\s*↑/);
    await expect(sortButton(page, 'Name')).toHaveClass(/active/);
    await expect(sortButton(page, 'Price')).not.toHaveClass(/active/);
    await expect(page.getByRole('button', { name: 'like' })).toHaveCount(5);
    await shot(page, testInfo, '01-shop');
  });

  test('sort by name toggles to descending, then ascending', async ({ page }) => {
    await open(page, '/shop');
    await sortButton(page, 'Name').click();
    await expect(sortButton(page, 'Name')).toHaveText(/Name\s*↓/);
    expect(await cardNames(page)).toEqual(['mario', 'luigi', 'foo', 'banana', 'apple']);
    await sortButton(page, 'Name').click();
    await expect(sortButton(page, 'Name')).toHaveText(/Name\s*↑/);
    expect(await cardNames(page)).toEqual(['apple', 'banana', 'foo', 'luigi', 'mario']);
  });

  test('sort by price compares prices as text', async ({ page }, testInfo) => {
    await open(page, '/shop');
    await sortButton(page, 'Price').click();
    await expect(sortButton(page, 'Price')).toHaveText(/Price\s*↑/);
    await expect(sortButton(page, 'Price')).toHaveClass(/active/);
    await expect(sortButton(page, 'Name')).not.toHaveClass(/active/);
    await expect(sortButton(page, 'Name')).toHaveText(/^\s*Name\s*$/);
    expect(await cardPrices(page)).toEqual(['123 €', '456 €', '59 €', '789 €', '99 €']);
    await shot(page, testInfo, '02-shop-sorted-by-price');
    await sortButton(page, 'Price').click();
    await expect(sortButton(page, 'Price')).toHaveText(/Price\s*↓/);
    expect(await cardPrices(page)).toEqual(['99 €', '789 €', '59 €', '456 €', '123 €']);
  });

  test('sort by description', async ({ page }) => {
    await open(page, '/shop');
    await sortButton(page, 'Description').click();
    await expect(sortButton(page, 'Description')).toHaveText(/Description\s*↑/);
    expect(await cardDescriptions(page)).toEqual(['bar', 'bross', 'bross', 'fruit', 'fruit']);
    await sortButton(page, 'Description').click();
    expect(await cardDescriptions(page)).toEqual(['fruit', 'fruit', 'bross', 'bross', 'bar']);
  });

  test('like button logs the item name', async ({ page }) => {
    const logs: string[] = [];
    page.on('console', (m) => logs.push(m.text()));
    await open(page, '/shop');
    await page.getByRole('button', { name: 'like' }).nth(1).click();
    await expect.poll(() => logs).toContain('like mario');
  });
});
