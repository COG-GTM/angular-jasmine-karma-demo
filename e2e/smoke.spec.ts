import { expect, test } from '@playwright/test';

test.describe('smoke', () => {
  test('shows the document title and the app title span', async ({ page }) => {
    await page.goto('/shop');

    await expect(page).toHaveTitle('AngularJasmineKarmaDemo');
    await expect(page.locator('span', { hasText: 'app is running!' })).toHaveText(
      'angular-jasmine-karma-demo app is running!',
    );
  });

  test("redirects '/' to '/shop'", async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveURL(/\/shop$/);
    await expect(page.getByRole('heading', { name: 'Shop Items' })).toBeVisible();
  });

  test("loads '/users'", async ({ page }) => {
    await page.goto('/users');

    await expect(page).toHaveURL(/\/users$/);
    await expect(page.getByText('users works!')).toBeVisible();
  });
});
