import { test, expect } from '@playwright/test';
import { HEADER, open, route, shot } from './helpers';

test.describe('app shell and routing', () => {
  test('root redirects to /shop', async ({ page }) => {
    await page.goto(route('/'));
    await expect(page).toHaveURL(/\/shop$/);
    await expect(page.getByText(HEADER)).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Shop Items' })).toBeVisible();
  });

  test('document title and fonts are the same', async ({ page }) => {
    await open(page, '/shop');
    await expect(page).toHaveTitle('AngularJasmineKarmaDemo');
    const font = await page.evaluate(() => getComputedStyle(document.body).fontFamily);
    expect(font).toContain('Roboto');
  });

  test('unknown route keeps the shell and renders no page', async ({ page }, testInfo) => {
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(e.message));
    page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
    await page.goto(route('/does-not-exist'));
    await expect(page.getByText(HEADER)).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Shop Items' })).toHaveCount(0);
    await expect(page.getByRole('button', { name: 'Get Users' })).toHaveCount(0);
    expect(errors.join('\n')).toContain('Cannot match any routes');
    await shot(page, testInfo, '03-unknown-route');
  });

  test('navigating between /shop and /users with history', async ({ page }) => {
    await open(page, '/shop');
    await page.goto(route('/users'));
    await expect(page.getByRole('button', { name: 'Get Users' })).toBeVisible();
    await page.goBack();
    await expect(page).toHaveURL(/\/shop$/);
    await expect(page.getByRole('heading', { name: 'Shop Items' })).toBeVisible();
  });
});
