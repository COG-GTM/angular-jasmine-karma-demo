import { chromium, Browser, Page, BrowserContext } from 'playwright';

const SOURCE_URL = 'http://localhost:4200';
const REACT_URL = 'http://localhost:5173';
const SOURCE_DIR = './screenshots/source';
const REACT_DIR = './screenshots/react';

const VIEWPORTS = {
  desktop: { width: 1280, height: 800 },
  mobile: { width: 375, height: 812 },
};

const MOCK_USERS = [
  { id: 1, name: 'Leanne Graham' },
  { id: 2, name: 'Ervin Howell' },
  { id: 3, name: 'Clementine Bauch' },
  { id: 4, name: 'Patricia Lebsack' },
  { id: 5, name: 'Chelsey Dietrich' },
  { id: 6, name: 'Mrs. Dennis Schulist' },
  { id: 7, name: 'Kurtis Weissnat' },
  { id: 8, name: 'Nicholas Runolfsdottir V' },
  { id: 9, name: 'Glenna Reichert' },
  { id: 10, name: 'Clementina DuBuque' },
];

interface ScreenshotEntry {
  name: string;
  path: string;
  action?: (page: Page) => Promise<void>;
}

const SCREENSHOTS: ScreenshotEntry[] = [
  { name: 'users-initial', path: '/users' },
  {
    name: 'users-loaded',
    path: '/users',
    action: async (page: Page) => {
      await page.click('button:has-text("Get Users")');
      await page.waitForTimeout(1000);
    },
  },
  { name: 'shop', path: '/shop' },
];

async function setupMockRoutes(context: BrowserContext) {
  await context.route('**/jsonplaceholder.typicode.com/users', (route) => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(MOCK_USERS),
    });
  });
}

async function disableAnimations(page: Page) {
  await page.addStyleTag({
    content: `*, *::before, *::after { 
      transition: none !important; 
      animation: none !important; 
    }`,
  });
}

async function captureApp(browser: Browser, baseUrl: string, outputDir: string) {
  for (const [vpName, vpSize] of Object.entries(VIEWPORTS)) {
    const context = await browser.newContext({ viewport: vpSize });
    await setupMockRoutes(context);
    const page = await context.newPage();

    for (const entry of SCREENSHOTS) {
      console.log(`  Capturing ${entry.name}-${vpName}...`);
      await page.goto(`${baseUrl}${entry.path}`, { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      await disableAnimations(page);

      if (entry.action) {
        await entry.action(page);
      }

      await page.waitForTimeout(300);
      await page.screenshot({
        path: `${outputDir}/${entry.name}-${vpName}.png`,
        fullPage: true,
      });
    }

    await context.close();
  }
}

async function main() {
  const browser = await chromium.launch({ headless: true });

  console.log('Capturing source (Angular) app...');
  await captureApp(browser, SOURCE_URL, SOURCE_DIR);

  console.log('Capturing React app...');
  await captureApp(browser, REACT_URL, REACT_DIR);

  await browser.close();
  console.log('Both apps captured with identical mock data.');
}

main().catch(console.error);
