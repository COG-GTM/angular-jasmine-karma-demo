import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { chromium, type Browser, type Page } from 'playwright';
import { USERS_FIXTURE, VIEWPORTS, VIEWS } from './matrix';

const DISABLE_ANIMATIONS = `*, *::before, *::after {
  transition: none !important;
  animation: none !important;
  caret-color: transparent !important;
}`;

export async function captureApp(baseUrl: string, outDir: string): Promise<string[]> {
  await mkdir(outDir, { recursive: true });
  const browser: Browser = await chromium.launch();
  const written: string[] = [];
  try {
    for (const viewport of VIEWPORTS) {
      const context = await browser.newContext({
        viewport: { width: viewport.width, height: viewport.height },
        deviceScaleFactor: 1,
        reducedMotion: 'reduce',
      });
      // Serve identical mock API data to both apps so diffs only reflect rendering.
      await context.route('**/jsonplaceholder.typicode.com/users*', (route) =>
        route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(USERS_FIXTURE),
        }),
      );
      const page: Page = await context.newPage();
      for (const view of VIEWS) {
        await page.goto(baseUrl + view.path, { waitUntil: 'networkidle' });
        await page.addStyleTag({ content: DISABLE_ANIMATIONS });
        await page.evaluate(() => document.fonts.ready);
        if (view.prepare) {
          await view.prepare(page);
          await page.waitForLoadState('networkidle');
        }
        await page.evaluate(() => document.fonts.ready);
        await page.waitForTimeout(150);
        const file = path.join(outDir, `${view.name}-${viewport.name}.png`);
        await page.screenshot({ path: file, fullPage: true, animations: 'disabled' });
        written.push(file);
      }
      await context.close();
    }
  } finally {
    await browser.close();
  }
  return written;
}

async function main(): Promise<void> {
  const [baseUrl, outDir] = process.argv.slice(2);
  if (!baseUrl || !outDir) {
    throw new Error('usage: tsx capture.ts <baseUrl> <outDir>');
  }
  const files = await captureApp(baseUrl, path.resolve(outDir));
  console.log(`captured ${files.length} screenshots from ${baseUrl} into ${outDir}`);
}

if (process.argv[1]?.endsWith('capture.ts')) {
  void main();
}
