# Parity report: Angular 12 baseline vs Angular 21 upgrade

Same Playwright specs, two projects: `baseline` (Angular 12, http://localhost:4000) and `upgraded` (Angular 21, http://localhost:4200).
Retries: 2 (the /users page calls the shared public API jsonplaceholder.typicode.com).

Result: baseline 12/12 pass, upgraded 0/12 pass.

## Flows

| Page / flow | Baseline | Upgraded |
|---|---|---|
| shell.spec.ts › app shell and routing › root redirects to /shop | pass | - |
| shell.spec.ts › app shell and routing › document title and fonts are the same | pass | - |
| shell.spec.ts › app shell and routing › unknown route keeps the shell and renders no page | pass | - |
| shell.spec.ts › app shell and routing › navigating between /shop and /users with history | pass | - |
| shop.spec.ts › shop items › lists the five items in their initial order | pass | - |
| shop.spec.ts › shop items › sort by name toggles to descending, then ascending | pass | - |
| shop.spec.ts › shop items › sort by price compares prices as text | pass | - |
| shop.spec.ts › shop items › sort by description | pass | - |
| shop.spec.ts › shop items › like button logs the item name | pass | - |
| users.spec.ts › users › starts empty, then loads users from the API | pass | - |
| users.spec.ts › users › renders whatever the API returns (stubbed, run-unique data) | pass | - |
| users.spec.ts › users › API failure leaves the list empty and the page usable | pass | - |

## Screenshots (baseline left, upgraded right)

| Page | Pixel diff | Size (baseline / upgraded) |
|---|---|---|
| [01-shop.png](side-by-side/01-shop.png) | missing | - |
| [02-shop-sorted-by-price.png](side-by-side/02-shop-sorted-by-price.png) | missing | - |
| [03-unknown-route.png](side-by-side/03-unknown-route.png) | missing | - |
| [04-users-empty.png](side-by-side/04-users-empty.png) | missing | - |
| [05-users-loaded.png](side-by-side/05-users-loaded.png) | missing | - |

## Run it

```bash
# baseline (Angular 12) on :4000 from a checkout of master
git worktree add ../baseline origin/master && cd ../baseline
nvm use 20 && npm ci && NODE_OPTIONS=--openssl-legacy-provider npx ng serve --port 4000

# upgraded (Angular 21) on :4200 from this branch
nvm use 22 && npm ci && npx ng serve --port 4200

# parity suite
cd parity && npm ci && npx playwright install chromium
npx playwright test && node compose.mjs
```
