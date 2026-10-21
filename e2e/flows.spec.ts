import { expect, test, type Page } from '@playwright/test';

// End-to-end coverage of every main user flow. The expected sort orders were recorded from the
// legacy Angular app (same seed list, same in-place string sort), so they include its quirks:
// seed order under an active "Name ↑" on first load and price sorted as text.

const cardTitles = (page: Page) => page.locator('.MuiCardHeader-title');
const sortButton = (page: Page, label: string) =>
  page.locator('.sort-btn', { hasText: new RegExp(`^${label}`) });

async function expectSortButtons(page: Page, labels: string[]) {
  await expect(page.locator('.sort-btn')).toHaveText(labels);
}

test.describe('shop', () => {
  test("redirects '/' to '/shop' and shows the title span", async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveURL(/\/shop$/);
    await expect(page.locator('span', { hasText: 'app is running!' })).toHaveText(
      'angular-jasmine-karma-demo app is running!',
    );
  });

  test('renders the five item cards with price and description', async ({ page }) => {
    await page.goto('/shop');

    await expect(page.getByRole('heading', { name: 'Shop Items' })).toBeVisible();
    await expect(cardTitles(page)).toHaveText(['foo', 'mario', 'luigi', 'apple', 'banana']);
    const first = page.locator('.item-card').first();
    await expect(first.locator('p')).toHaveText(['123 €', 'bar']);
    await expect(page.getByRole('button', { name: 'like' })).toHaveCount(5);
  });

  const sequences: { clicks: string[]; names: string[]; buttons: string[] }[] = [
    { clicks: [], names: ['foo', 'mario', 'luigi', 'apple', 'banana'], buttons: ['Name ↑', 'Description', 'Price'] },
    { clicks: ['Name'], names: ['mario', 'luigi', 'foo', 'banana', 'apple'], buttons: ['Name ↓', 'Description', 'Price'] },
    { clicks: ['Name', 'Name'], names: ['apple', 'banana', 'foo', 'luigi', 'mario'], buttons: ['Name ↑', 'Description', 'Price'] },
    { clicks: ['Description'], names: ['foo', 'mario', 'luigi', 'apple', 'banana'], buttons: ['Name', 'Description ↑', 'Price'] },
    { clicks: ['Description', 'Description'], names: ['apple', 'banana', 'mario', 'luigi', 'foo'], buttons: ['Name', 'Description ↓', 'Price'] },
    { clicks: ['Price'], names: ['foo', 'mario', 'banana', 'luigi', 'apple'], buttons: ['Name', 'Description', 'Price ↑'] },
    { clicks: ['Price', 'Price'], names: ['apple', 'luigi', 'banana', 'mario', 'foo'], buttons: ['Name', 'Description', 'Price ↓'] },
    { clicks: ['Price', 'Price', 'Price'], names: ['foo', 'mario', 'banana', 'luigi', 'apple'], buttons: ['Name', 'Description', 'Price ↑'] },
    { clicks: ['Name', 'Description'], names: ['foo', 'mario', 'luigi', 'banana', 'apple'], buttons: ['Name', 'Description ↑', 'Price'] },
    { clicks: ['Price', 'Name'], names: ['apple', 'banana', 'foo', 'luigi', 'mario'], buttons: ['Name ↑', 'Description', 'Price'] },
  ];

  for (const { clicks, names, buttons } of sequences) {
    test(`sort sequence [${clicks.join(' > ') || 'initial'}] matches the Angular order`, async ({ page }) => {
      await page.goto('/shop');

      for (const label of clicks) {
        await sortButton(page, label).click();
      }

      await expect(cardTitles(page)).toHaveText(names);
      await expectSortButtons(page, buttons);
      const active = buttons.find((b) => /[↑↓]$/.test(b))!;
      await expect(page.locator('.sort-btn.active')).toHaveText(active);
    });
  }

  test('clicking like logs "like <name>"', async ({ page }) => {
    const logs: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'info') logs.push(msg.text());
    });
    await page.goto('/shop');

    await page.getByRole('button', { name: 'like' }).nth(1).click();
    await page.getByRole('button', { name: 'like' }).nth(0).click();

    await expect.poll(() => logs).toEqual(['like mario', 'like foo']);
  });
});

test.describe('users', () => {
  test('shows the text and button, then lists the names after Get Users', async ({ page }) => {
    let requests = 0;
    await page.route('https://jsonplaceholder.typicode.com/users', (route) => {
      requests += 1;
      return route.fulfill({
        json: [
          { id: 1, name: 'Leanne Graham' },
          { id: 2, name: 'Ervin Howell' },
        ],
      });
    });
    const logs: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'info') logs.push(msg.text());
    });
    await page.goto('/users');

    await expect(page.getByText('users works!')).toBeVisible();
    const button = page.getByRole('button', { name: 'Get Users' });
    await expect(button).toBeVisible();
    await expect(page.locator('li')).toHaveCount(0);

    await button.click();

    await expect(page.locator('li')).toHaveText(['Leanne Graham', 'Ervin Howell']);
    expect(requests).toBe(1);
    expect(logs).toContain('getUsers');
  });
});

test.describe('navigation', () => {
  test('back and forward move between /shop and /users', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL(/\/shop$/);
    await page.goto('/users');
    await expect(page.getByText('users works!')).toBeVisible();

    await page.goBack();
    await expect(page).toHaveURL(/\/shop$/);
    await expect(page.getByRole('heading', { name: 'Shop Items' })).toBeVisible();

    await page.goForward();
    await expect(page).toHaveURL(/\/users$/);
    await expect(page.getByText('users works!')).toBeVisible();
  });

  test("going back after the '/' redirect does not bounce to '/' (replace)", async ({ page }) => {
    await page.goto('/users');
    await page.goto('/');
    await expect(page).toHaveURL(/\/shop$/);

    await page.goBack();

    await expect(page).toHaveURL(/\/users$/);
  });
});
