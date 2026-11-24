import { defineConfig, devices } from '@playwright/test';

// The same specs run against both apps:
//   baseline -> Angular 12 app from the default branch, served on :4000
//   upgraded -> Angular 21 app from this branch, served on :4200
// /users calls the shared public API jsonplaceholder.typicode.com, so retries are on.
export default defineConfig({
  testDir: './tests',
  outputDir: './test-results',
  fullyParallel: true,
  retries: 2,
  reporter: [['list'], ['json', { outputFile: 'report/results.json' }]],
  use: {
    ...devices['Desktop Chrome'],
    viewport: { width: 1280, height: 900 },
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'baseline', use: { baseURL: process.env.BASELINE_URL ?? 'http://localhost:4000' } },
    { name: 'upgraded', use: { baseURL: process.env.UPGRADED_URL ?? 'http://localhost:4200' } },
  ],
});
