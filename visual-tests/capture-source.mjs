/**
 * Captures baseline screenshots from the Angular source app.
 * Usage: node capture-source.mjs [port]
 * Default port: 4200
 */
import { chromium } from "playwright";
import { mkdir } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.argv[2] || "4200";
const BASE_URL = `http://localhost:${PORT}`;
const OUTPUT_DIR = path.join(__dirname, "screenshots", "source");

const VIEWPORTS = [
  { name: "desktop", width: 1280, height: 800 },
  { name: "mobile", width: 375, height: 812 },
];

const ROUTES = [
  { path: "/users", name: "users" },
  { path: "/shop", name: "shop" },
];

async function main() {
  await mkdir(OUTPUT_DIR, { recursive: true });

  const browser = await chromium.launch({ headless: true });

  for (const viewport of VIEWPORTS) {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
    });
    const page = await context.newPage();

    // Disable animations
    await page.addInitScript(() => {
      const style = document.createElement("style");
      style.textContent = `
        *, *::before, *::after {
          animation-duration: 0s !important;
          animation-delay: 0s !important;
          transition-duration: 0s !important;
          transition-delay: 0s !important;
        }
      `;
      document.head.appendChild(style);
    });

    for (const route of ROUTES) {
      await page.goto(`${BASE_URL}${route.path}`, {
        waitUntil: "networkidle",
        timeout: 30000,
      });
      await page.waitForTimeout(1000);

      const filename = `${route.name}-${viewport.name}.png`;
      await page.screenshot({
        path: path.join(OUTPUT_DIR, filename),
        fullPage: true,
      });
      console.log(`Captured: ${filename}`);
    }

    await context.close();
  }

  await browser.close();
  console.log("Source screenshots captured successfully.");
}

main().catch((err) => {
  console.error("Failed to capture source screenshots:", err);
  process.exit(1);
});
