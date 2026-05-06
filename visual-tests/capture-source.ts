import { chromium, Browser, Page } from 'playwright';

const BASE_URL = 'http://localhost:4200';
const SCREENSHOT_DIR = './screenshots/source';

const VIEWPORTS = {
  desktop: { width: 1280, height: 800 },
  mobile: { width: 375, height: 812 },
};

interface ScreenshotEntry {
  name: string;
  url: string;
  action?: (page: Page) => Promise<void>;
}

const SCREENSHOTS: ScreenshotEntry[] = [
  { name: 'users-initial', url: '/users' },
  {
    name: 'users-loaded',
    url: '/users',
    action: async (page: Page) => {
      await page.click('button:has-text("Get Users")');
      await page.waitForResponse('**/users');
      await page.waitForTimeout(500);
    },
  },
  { name: 'shop', url: '/shop' },
];

async function disableAnimations(page: Page) {
  await page.addStyleTag({
    content: `*, *::before, *::after { 
      transition: none !important; 
      animation: none !important; 
    }`,
  });
}

async function captureScreenshots() {
  const browser: Browser = await chromium.launch({ headless: true });

  for (const [vpName, vpSize] of Object.entries(VIEWPORTS)) {
    const context = await browser.newContext({ viewport: vpSize });
    const page = await context.newPage();

    for (const entry of SCREENSHOTS) {
      console.log(`Capturing ${entry.name}-${vpName}...`);
      await page.goto(`${BASE_URL}${entry.url}`, { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      await disableAnimations(page);

      if (entry.action) {
        await entry.action(page);
      }

      await page.waitForTimeout(300);
      await page.screenshot({
        path: `${SCREENSHOT_DIR}/${entry.name}-${vpName}.png`,
        fullPage: true,
      });
    }

    await context.close();
  }

  await browser.close();
  console.log('Source screenshots captured successfully.');
}

captureScreenshots().catch(console.error);
