import { expect, test, type Page } from '@playwright/test';

const banner = 'angular-jasmine-karma-demo app is running!';
const USERS_URL = 'https://jsonplaceholder.typicode.com/users';

const cardTitles = (page: Page) => page.locator('.items-grid .MuiCardHeader-title');
const sortButton = (page: Page, label: string) =>
  page.locator('.sort-controls .sort-btn', { hasText: label });

test('redirects / to /shop and shows the banner', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveURL(/\/shop$/);
  await expect(page.getByText(banner)).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Shop Items' })).toBeVisible();
});

test('shop: initial order, sorting and like', async ({ page }) => {
  await page.goto('/shop');
  await expect(cardTitles(page)).toHaveText(['foo', 'mario', 'luigi', 'apple', 'banana']);
  await expect(sortButton(page, 'Name')).toHaveClass(/active/);
  await expect(sortButton(page, 'Name')).toHaveText('Name ↑');

  await sortButton(page, 'Name').click();
  await expect(sortButton(page, 'Name')).toHaveText('Name ↓');
  await expect(cardTitles(page)).toHaveText(['mario', 'luigi', 'foo', 'banana', 'apple']);

  await sortButton(page, 'Price').click();
  await expect(sortButton(page, 'Price')).toHaveText('Price ↑');
  await expect(sortButton(page, 'Name')).not.toHaveClass(/active/);
  await expect(cardTitles(page)).toHaveText(['foo', 'mario', 'banana', 'luigi', 'apple']);

  const logged = page.waitForEvent('console', (msg) => msg.text() === 'like foo');
  await page.getByRole('button', { name: 'like' }).first().click();
  await logged;
});

test('users: fetches and lists names on click', async ({ page }) => {
  let requests = 0;
  await page.route(USERS_URL, (route) => {
    requests += 1;
    return route.fulfill({ json: [{ name: 'Leanne Graham' }, { name: 'Ervin Howell' }] });
  });

  await page.goto('/users');
  await expect(page.getByText('users works!')).toBeVisible();
  await expect(page.getByRole('listitem')).toHaveCount(0);
  expect(requests).toBe(0);

  await page.getByRole('button', { name: 'Get Users' }).click();
  await expect(page.getByRole('listitem')).toHaveText(['Leanne Graham', 'Ervin Howell']);
  expect(requests).toBe(1);
});

test('unknown URL keeps the banner with an empty outlet', async ({ page }) => {
  await page.goto('/does-not-exist');
  await expect(page.getByText(banner)).toBeVisible();
  await expect(page.locator('.items-container')).toHaveCount(0);
  await expect(page.getByText('users works!')).toHaveCount(0);
});
