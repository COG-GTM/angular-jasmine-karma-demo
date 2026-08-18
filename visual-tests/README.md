# Visual regression tests (Angular vs React)

Playwright + pixelmatch harness that proves the React port in `react-app/` renders
identically to the Angular app in `src/`.

## Running

```bash
# terminal 1 - Angular source app
NODE_OPTIONS=--openssl-legacy-provider npx ng serve --port 4200

# terminal 2 - React app
cd react-app && npm install && npm run dev -- --port 5173 --strictPort

# terminal 3
cd visual-tests
npm install
npx playwright install chromium
npm run capture   # writes screenshots/source and screenshots/react
npm run compare   # prints a table and writes screenshots/diff
```

`SOURCE_URL` / `REACT_URL` override the app URLs, `THRESHOLD_PCT` the allowed
mismatch (default `2`).

## Files

- `matrix.ts` — screenshot matrix derived from `src/app/app-routing.module.ts`
  (`/`, `/shop`, `/users`, unknown route) plus each sort state and the loaded
  users list, at 1280x800 and 375x812. Also holds the users API fixture.
- `capture.ts` — captures one app: disables animations, waits for `networkidle`
  and `document.fonts.ready`, intercepts the jsonplaceholder users API and
  fulfils it with the fixture so both apps render identical data.
- `capture-both.ts` — runs the capture against the Angular and React apps.
- `compare.ts` — pixelmatch comparison, writes diff images and a pass/fail table.
- `probe-rects.ts` — debug helper that diffs `getBoundingClientRect()` of the
  shared selectors between both apps; useful for tracking down layout drift.

Screenshots are generated artefacts and are not committed (`.gitignore`).
