import { test, expect } from '@playwright/test';
import { open, shot } from './helpers';

test.describe('users', () => {
  test('starts empty, then loads users from the API', async ({ page }, testInfo) => {
    await open(page, '/users');
    await expect(page.getByText('users works!')).toBeVisible();
    const button = page.getByRole('button', { name: 'Get Users' });
    await expect(button).toBeEnabled();
    await expect(page.locator('li')).toHaveCount(0);
    await shot(page, testInfo, '04-users-empty');

    const response = page.waitForResponse((r) => r.url() === 'https://jsonplaceholder.typicode.com/users');
    await button.click();
    expect((await response).status()).toBe(200);
    await expect(page.locator('li')).toHaveCount(10);
    await expect(page.locator('li').first()).toHaveText('Leanne Graham');
    await expect(page.locator('li').last()).toHaveText('Clementina DuBuque');
    await shot(page, testInfo, '05-users-loaded');
  });

  test('renders whatever the API returns (stubbed, run-unique data)', async ({ page }) => {
    const stamp = Date.now();
    const users = [{ id: 1, name: `Parity User A ${stamp}` }, { id: 2, name: `Parity User B ${stamp}` }];
    await page.route('https://jsonplaceholder.typicode.com/users', (r) => r.fulfill({ json: users }));
    await open(page, '/users');
    await page.getByRole('button', { name: 'Get Users' }).click();
    await expect(page.locator('li')).toHaveText(users.map((u) => u.name));
  });

  test('API failure leaves the list empty and the page usable', async ({ page }) => {
    await page.route('https://jsonplaceholder.typicode.com/users', (r) => r.fulfill({ status: 500, body: 'boom' }));
    await open(page, '/users');
    const failed = page.waitForResponse((r) => r.url() === 'https://jsonplaceholder.typicode.com/users' && r.status() === 500);
    await page.getByRole('button', { name: 'Get Users' }).click();
    await failed;
    await expect(page.locator('li')).toHaveCount(0);
    await expect(page.getByRole('button', { name: 'Get Users' })).toBeEnabled();

    const recovered = [{ id: 1, name: `Recovered User ${Date.now()}` }];
    await page.unroute('https://jsonplaceholder.typicode.com/users');
    await page.route('https://jsonplaceholder.typicode.com/users', (r) => r.fulfill({ json: recovered }));
    await page.getByRole('button', { name: 'Get Users' }).click();
    await expect(page.locator('li')).toHaveText(recovered.map((u) => u.name));
  });
});
