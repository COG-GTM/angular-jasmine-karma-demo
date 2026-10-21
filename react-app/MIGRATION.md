# Angular -> React migration contract (`react-app/`)

This file is the contract between the foundation PR, the four parallel wave-2 children and the
integration child. If something here conflicts with a child prompt, ask the parent before deviating.

## 1. Stack (versions actually installed, see `package-lock.json`)

| Concern | Package | Version |
| --- | --- | --- |
| UI | `react`, `react-dom` | 19.3.1 |
| Routing | `react-router` (v7, **not** `react-router-dom` / v6) | 7.18.4 |
| Components (Angular Material parity) | `@mui/material`, `@mui/icons-material` | 9.5.0 |
| Styling engine for MUI | `@emotion/react`, `@emotion/styled` | 11.14.0 / 11.14.1 |
| Language | `typescript` (strict) | 5.9.3 |
| Bundler / dev server | `vite`, `@vitejs/plugin-react` | 8.3.5 / 6.1.2 |
| Unit tests | `vitest`, `@vitest/coverage-v8`, `jsdom` | 4.1.12 / 4.1.12 / 29.1.1 |
| Component tests | `@testing-library/react`, `@testing-library/dom`, `@testing-library/jest-dom`, `@testing-library/user-event` | 16.3.3 / 10.4.2 / 6.9.1 / 14.6.8 |
| E2E | `@playwright/test` (Chromium) | 1.64.1 |
| Lint | `eslint` 10 flat config, `@eslint/js`, `typescript-eslint`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`, `globals` | 10.13.0 / 10.0.0 / 8.72.0 / 7.1.1 / 0.5.7 / 17.13.0 |

Node: `"engines": { "node": ">=20" }`; CI runs Node 20 and 22. Versions were chosen so the whole
toolchain still runs on Node 20 (react-router 8, vitest 5, jsdom 30 and jest-dom 7 need Node 22). Effective
minimum from transitive engines (ESLint 10, jsdom 29): Node `^20.19 || ^22.13 || >=24`; on 22.12 `npm ci`
only prints EBADENGINE warnings and everything still runs.

**Every dependency the migration needs is already installed. Wave-2 children must not edit
`package.json` or `package-lock.json`.** If you think you need a new package, report it as a
shared change instead.

## 2. Commands (run inside `react-app/`)

| Command | What it does |
| --- | --- |
| `npm ci` | install from the lockfile (never `npm install` in the repo root: it rewrites the Angular lockfile) |
| `npm run dev` | Vite dev server on http://localhost:5173 |
| `npm run build` | `tsc -b && vite build` -> `dist/` |
| `npm run preview` | serve `dist/` on http://localhost:4173 |
| `npm run lint` | ESLint (`eslint.config.js`) |
| `npm run typecheck` | `tsc -b` (app + node tsconfigs) |
| `npm test` | `vitest run` (all `src/**/*.test.{ts,tsx}`) |
| `npm run test:watch` | `vitest` in watch mode |
| `npm run test:coverage` | `vitest run --coverage` (v8, text + html in `coverage/`) |
| `npm run e2e` | Playwright: always rebuilds, serves with `vite preview` on :4173 (port must be free; no server reuse, so it never tests a stale build), runs `e2e/*.spec.ts` in Chromium (first time: `npx playwright install chromium`) |

Checks every PR must pass: `npm ci && npm run lint && npm run typecheck && npm test && npm run build`
(CI also runs `npm run e2e`). CI workflow: `.github/workflows/react-app.yml`.

Vitest is configured **inside `vite.config.ts`** (`test` key): jsdom, `globals: true`,
`setupFiles: ['./src/setupTests.ts']` (imports `@testing-library/jest-dom/vitest`),
`restoreMocks: true`, `css: false`, `include: ['src/**/*.test.{ts,tsx}']`. Vitest globals
(`describe`, `it`, `expect`, `vi`) and jest-dom matchers are typed via `tsconfig.app.json`.

## 3. Folder layout (mirrors the legacy clean architecture)

```
react-app/
  index.html                 same <title>, Roboto + Material Icons fonts, <body class="mat-typography">
  public/favicon.ico         copied from src/favicon.ico
  src/
    main.tsx                 StrictMode > BrowserRouter > ThemeProvider(theme) > CssBaseline > App
    App.tsx                  title span + <Routes> (port of app.component + app-routing.module)
    App.test.tsx             port of app.component.spec.ts + route tests (vi.mocks the barrels)
    theme.ts                 MUI theme approximating Angular Material indigo-pink
    index.css                port of styles.scss + .mat-typography subset
    setupTests.ts            jest-dom matchers
    shop/
      domain/item.model.ts   Item interface
      components/
        Item/{Item.tsx,index.ts,Item.test.tsx}
        Items/{Items.tsx,index.ts,Items.test.tsx}
        AddItem/{AddItem.tsx,index.ts,AddItem.test.tsx}
        ItemDetail/{ItemDetail.tsx,index.ts,ItemDetail.test.tsx}
    user/
      domain/user.model.ts   User interface
      application/usersService.ts (+ usersService.test.ts)
      components/Users/{Users.tsx,index.ts,Users.test.tsx}
  e2e/smoke.spec.ts          Playwright smoke (title, / -> /shop, /users)
```

`infrastructure/ng-components/<name>` becomes `components/<Name>`; `domain/` and `application/`
keep their names.

## 4. Exported names, props and signatures (exact; do not rename)

```ts
// src/shop/domain/item.model.ts  (FINAL, foundation-owned)
export interface Item { name: string; description: string; price: string }

// src/shop/components/Item  (barrel: export { Item }, export type { ItemProps })
export interface ItemProps { name: string; description: string; price: string }
export function Item(props: ItemProps): JSX.Element

// src/shop/components/Items  (barrel: export { Items })
export function Items(): JSX.Element

// src/shop/components/AddItem  (barrel: export { AddItem }, export type { AddItemProps })
export interface AddItemProps { onSave?: (item: Item) => void }
export function AddItem(props: AddItemProps): JSX.Element

// src/shop/components/ItemDetail  (barrel: export { ItemDetail }, export type { ItemDetailProps })
export interface ItemDetailProps { item?: Item | null }
export function ItemDetail(props: ItemDetailProps): JSX.Element

// src/user/domain/user.model.ts  (Users child owns it after foundation)
export interface User { id: number; name: string; [key: string]: unknown }

// src/user/application/usersService.ts
export const USERS_URL = 'https://jsonplaceholder.typicode.com/users';
export async function getUsers(): Promise<User[]>

// src/user/components/Users  (barrel: export { Users })
export function Users(): JSX.Element

// src/App.tsx  (FINAL)
export interface AppProps { title?: string }          // default 'angular-jasmine-karma-demo'
export function App(props: AppProps): JSX.Element
```

Placeholders shipped by the foundation (replace them in your own folder):

| Component | Placeholder renders |
| --- | --- |
| `Item` | name (`h3`), `{price} €`, description, `<button aria-label="like">` (plain markup) |
| `Items` | `<h2>Shop Items</h2>` |
| `AddItem` | `<p>add-item works!</p>` |
| `ItemDetail` | `<p>item-detail works!</p>` |
| `Users` | `<p>users works!</p>` |
| `getUsers()` | resolves `[]` |

Wave-2 children may add new exports or files inside their own folders, but must keep the names
and prop types above (App, routes and other children import them).

## 5. Conventions

- **Named exports only**, no default exports. Each component folder has an `index.ts` barrel; import
  other units through their barrel (`import { Item } from '../Item'`), never their internals.
- Test files are colocated: `<Name>.test.tsx` for components, `<name>.test.ts` for plain modules.
  Playwright specs are `e2e/*.spec.ts` (integration-owned).
- Port **every** Angular `*.spec.ts` case of your unit to Vitest + RTL with the same intent; your
  test count must be >= the Angular count (table in section 8). Use AAA (Arrange / Act / Assert)
  and keep the teaching comments in English where they explain a testing concept. Prefer
  `screen.getByRole`/`getByText` and `userEvent` over implementation details.
  Jasmine -> Vitest: `spyOn(obj, 'm').and.returnValue(x)` -> `vi.spyOn(obj, 'm').mockReturnValue(x)`;
  `HttpTestingController` -> `vi.spyOn(globalThis, 'fetch')` / `vi.stubGlobal('fetch', ...)`;
  `fixture.detectChanges()` -> re-render / `await` user-event. `restoreMocks: true` resets spies
  after each test.
- Angular `@Input` -> props; `@Output`/`EventEmitter` -> `on*` callback props; component state ->
  `useState`; `console.info(...)` calls are part of legacy behaviour (specs assert them) - keep them.
- MUI for Angular Material elements:
  - `mat-card` / `mat-card-header` / `mat-card-title` / `mat-card-content` -> `Card` / `CardHeader title=...` / `CardContent`
  - `<mat-icon>name</mat-icon>` -> the matching `@mui/icons-material` icon (`favorite` -> `FavoriteIcon`, `save` -> `SaveIcon`)
  - `mat-raised-button color="warn"` -> `<Button variant="contained" color="error">` (theme `error` = Material warn `#f44336`)
  - `mat-icon-button color="warn"` -> `<IconButton color="error">`
  - `mat-form-field appearance="fill"` + `mat-label` + `matInput` -> `<TextField variant="filled" label=... placeholder=...>`
- Component SCSS was view-encapsulated in Angular. Port it to a colocated `<Name>.css` (plain CSS,
  no new deps) and scope every selector under the component's root class so it can't leak
  (e.g. Items' bare `h2` rule -> `.items-container h2`), or use MUI `sx`.
- No new global CSS: `src/index.css` is foundation/integration-owned.

## 6. Ownership map (wave 2)

| Owner | Files |
| --- | --- |
| Item child | `react-app/src/shop/components/Item/**` |
| Items child | `react-app/src/shop/components/Items/**` |
| AddItem + ItemDetail child | `react-app/src/shop/components/AddItem/**`, `react-app/src/shop/components/ItemDetail/**` |
| Users child | `react-app/src/user/**` |
| Foundation / integration only | everything else: `package.json`, `package-lock.json`, configs (`vite.config.ts`, `tsconfig*.json`, `eslint.config.js`, `playwright.config.ts`), `index.html`, `public/**`, `src/main.tsx`, `src/App.tsx`, `src/App.test.tsx`, `src/theme.ts`, `src/index.css`, `src/setupTests.ts`, `src/shop/domain/**`, `e2e/**`, `.github/**`, `MIGRATION.md`, `README.md`, and every Angular file outside `react-app/` |

Need a change in a file you don't own? Don't make it: describe the exact edit in your PR /
structured output under `shared_changes_needed`.

`src/App.test.tsx` mocks the `Items` and `Users` barrels, so wave-2 output can never break it.

## 7. Angular -> React file map

| Angular (`src/app/...`) | React (`react-app/src/...`) |
| --- | --- |
| `app.component.{ts,html,scss}` | `App.tsx` |
| `app-routing.module.ts` | `App.tsx` (`<Routes>`) |
| `app.module.ts` (Material modules, forms, HttpClient) | `main.tsx` + `theme.ts` (MUI ThemeProvider, CssBaseline); forms are plain React state; HTTP is `fetch` |
| `app.component.spec.ts` | `App.test.tsx` |
| `shop/domain/item.model.ts` | `shop/domain/item.model.ts` |
| `shop/infrastructure/ng-components/item/*` | `shop/components/Item/*` |
| `shop/infrastructure/ng-components/items/*` | `shop/components/Items/*` |
| `shop/infrastructure/ng-components/add-item/*` | `shop/components/AddItem/*` |
| `shop/infrastructure/ng-components/item-detail/*` | `shop/components/ItemDetail/*` |
| `user/application/UsersServices.ts` (+ `.service.spec.ts`) | `user/application/usersService.ts` (+ `usersService.test.ts`) |
| `user/infrastructure/ng-components/users/*` | `user/components/Users/*` |
| (implicit) user shape | `user/domain/user.model.ts` |
| `src/styles.scss` | `src/index.css` |
| `src/index.html` | `index.html` |
| `src/favicon.ico` | `public/favicon.ico` |
| `karma.conf.js`, `src/test.ts` | `vite.config.ts` (`test` key), `src/setupTests.ts` |

Routes (parity): `/shop` -> `Items`, `/users` -> `Users`, `/` -> `<Navigate to="/shop" replace />`;
no wildcard route (unknown paths render only the title, like Angular). `AddItem` and `ItemDetail`
are declared in `app.module.ts` but **not routed or rendered anywhere** in Angular: keep it that way.

## 8. Angular spec counts (minimum React test counts)

| Unit | Angular spec | `it` count |
| --- | --- | --- |
| App | `app.component.spec.ts` | 5 (React: 9, foundation) |
| Item | `item.component.spec.ts` | 9 |
| Items | `items.component.spec.ts` | 21 |
| AddItem | `add-item.component.spec.ts` | 14 |
| ItemDetail | `item-detail.component.spec.ts` | 8 |
| UsersServices | `UsersServices.service.spec.ts` | 11 |
| Users | `users.component.spec.ts` | 9 |

## 9. Known traps

- **Broken legacy imports on `master`.** `items.component.ts` imports `../../domain/item.model` and
  `users.component.ts` imports `../../application/UsersServices`; both need one more `../`. To run
  the Angular app side by side, use a separate `git worktree` of master, fix the two imports there
  only, symlink `node_modules`, and run
  `NODE_OPTIONS=--openssl-legacy-provider npx ng serve --port 4300`. **Never commit that fix.**
  With the fix, `ng build` succeeds. `ng test` still fails to compile on master even with the fix
  (and with `strict: false`): `UsersServices.service.spec.ts` uses the Jest matcher
  `toHaveProperty` and `.length` on `Object`, and `item-detail`/`users` specs have strict-null and
  implicit-any errors. Use the Angular specs as the source of intent, not as runnable tests.
- **Node / react-router.** Use `react-router` v7 (`import { Routes, Route, Navigate, MemoryRouter } from 'react-router'`).
  v6 (`react-router-dom` 6.x) is flagged by Snyk; v8 needs Node 22.22+. Don't bump majors.
- **Don't `npm install` in the repo root** - it rewrites the Angular `package-lock.json`. Only
  run npm inside `react-app/`.
- **npm 10 arborist bug.** Adding packages with the npm 10 bundled with Node 22.12 can fail with
  `Cannot read properties of null (reading 'edgesOut')`; the lockfile was produced with
  `npx npm@11 install`. `npm ci` works with npm 10 and 11. (Only foundation/integration add deps.)
- **Parity, not fixes.** Port behaviour as-is, including oddities: string price sort
  (`localeCompare` on `'123'`, `'99'`...), `sortItems` mutating the seed array, no error handling in
  `getUsers`, the AddItem `Save` button only logs `saveItem`, `like()` only logs, the Users spec
  expecting `{ users: [...] }` objects. If Devin Review / Snyk flags such behaviour, keep it, reply
  "matches legacy" on the PR and report it in `not_verified`.
- **JSX whitespace.** Angular templates keep text whitespace (`{{ price }} €`); write it explicitly
  in JSX (`{price} €`) and compare against the Angular app.
- **Encapsulated SCSS.** See conventions: scope every ported selector under the component root.
- `App.test.tsx` uses `vi.mock` on the `./shop/components/Items` and `./user/components/Users`
  barrels; keep those barrel paths stable.
- **Known Snyk finding without a fix:** `picomatch@4.0.7` (ReDoS, SNYK-JS-PICOMATCH-21248802) comes
  in through `vite`/`vitest`/`typescript-eslint` (dev/build-time only); 4.0.7 is the latest
  release, so there is nothing to upgrade to yet.
