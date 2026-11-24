import { Page, TestInfo, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

export const HEADER = 'angular-jasmine-karma-demo app is running!';

// Both apps use path routing; kept as a helper in case a project needs a different URL scheme.
export function route(logical: string): string {
  return logical;
}

export async function open(page: Page, logical: string) {
  await page.goto(route(logical));
  await expect(page.getByText(HEADER)).toBeVisible();
}

export async function cardNames(page: Page): Promise<string[]> {
  return (await page.locator('app-item mat-card-title').allInnerTexts()).map((t) => t.trim());
}

export async function cardPrices(page: Page): Promise<string[]> {
  return (await page.locator('app-item mat-card-content p:first-child').allInnerTexts()).map((t) => t.trim());
}

export async function cardDescriptions(page: Page): Promise<string[]> {
  return (await page.locator('app-item mat-card-content p:nth-child(2)').allInnerTexts()).map((t) => t.trim());
}

export async function shot(page: Page, testInfo: TestInfo, name: string) {
  // Fonts come from Google Fonts; wait so both apps are captured in the same state.
  await page.evaluate(() => (document as any).fonts.ready);
  const dir = path.join(__dirname, '..', 'report', 'screens', testInfo.project.name);
  fs.mkdirSync(dir, { recursive: true });
  await page.screenshot({ path: path.join(dir, `${name}.png`), fullPage: true, animations: 'disabled' });
}
