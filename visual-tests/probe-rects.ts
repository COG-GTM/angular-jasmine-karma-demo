import { chromium } from 'playwright';

const SELECTORS = [
  'span', '.items-container', 'h2', '.sort-controls', '.sort-controls > span', '.sort-btn',
  '.items-grid', '.items-grid > *', '.mat-card', '.mat-card-header', '.mat-card-header-text',
  '.mat-card-title', '.mat-card-content', '.mat-card-content > p', '.mat-icon-button', '.mat-icon',
];

async function rects(url: string, width: number): Promise<Record<string, string>> {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width, height: 800 } });
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  const out = await page.evaluate((selectors: string[]) => {
    const res: Record<string, string> = {};
    for (const sel of selectors) {
      const el = document.querySelector(sel);
      if (!el) { res[sel] = 'MISSING'; continue; }
      const r = el.getBoundingClientRect();
      res[sel] = `${r.x.toFixed(1)},${r.y.toFixed(1)} ${r.width.toFixed(1)}x${r.height.toFixed(1)}`;
    }
    return res;
  }, SELECTORS);
  await browser.close();
  return out;
}

async function main(): Promise<void> {
  const width = Number(process.argv[2] ?? '1280');
  const a = await rects('http://localhost:4200/shop', width);
  const b = await rects('http://localhost:5173/shop', width);
  for (const sel of SELECTORS) {
    const flag = a[sel] === b[sel] ? '   ' : '>>>';
    console.log(`${flag} ${sel.padEnd(26)} ng=${(a[sel] ?? '').padEnd(24)} react=${b[sel]}`);
  }
}

void main();
