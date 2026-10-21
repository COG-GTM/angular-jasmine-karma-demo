# Angular -> React migration notes

The app was migrated from Angular 12 (Jasmine + Karma) to React in three waves: a foundation PR
(stack, config, routes, placeholders and this contract), four parallel component PRs (Item, Items,
AddItem + ItemDetail, Users + usersService) and an integration PR that merged them, moved the app
to the repo root and removed Angular. The bar was **parity**: same text, structure, behaviour and
look as the Angular app, including its oddities (section 6). See the [README](../README.md) for
the commands, the folder layout and the testing guide.

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

## 2. Conventions

- **Named exports only**, no default exports. Each component folder has an `index.ts` barrel; import
  other units through their barrel (`import { Item } from '../Item'`), never their internals.
- Test files are colocated: `<Name>.test.tsx` for components, `<name>.test.ts` for plain modules.
  Playwright specs are `e2e/*.spec.ts`.
- Every Angular `*.spec.ts` case was ported to Vitest + RTL with the same intent; each unit has
  at least as many tests as its Angular spec (section 5). Use AAA (Arrange / Act / Assert)
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
- Global CSS lives only in `src/index.css`. Its `.mat-typography` heading rules are wrapped in
  `:where(.mat-typography)` so they have element-only specificity and any component rule wins.
- `theme.ts` holds the shared Angular Material look: white page background, and
  `MuiButton.styleOverrides.root` = `textTransform: 'none'`, `letterSpacing: 'normal'`
  (mat buttons keep the label's case).

## 3. Angular -> React file map

| Angular (`src/app/...`) | React (`src/...`) |
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
| `angular.json`, `tsconfig*.json`, `.browserslistrc` | `vite.config.ts`, `tsconfig*.json`, `eslint.config.js` |
| (none) | `e2e/*.spec.ts`, `playwright.config.ts` |

Routes (parity): `/shop` -> `Items`, `/users` -> `Users`, `/` -> `<Navigate to="/shop" replace />`;
no wildcard route (unknown paths render only the title, like Angular). `AddItem` and `ItemDetail`
are declared in `app.module.ts` but **not routed or rendered anywhere** in Angular: keep it that way.

## 4. Exported names, props and signatures

```ts
// src/shop/domain/item.model.ts
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

// src/user/domain/user.model.ts
export interface User { id: number; name: string; [key: string]: unknown }

// src/user/application/usersService.ts
export const USERS_URL = 'https://jsonplaceholder.typicode.com/users';
export async function getUsers(): Promise<User[]>

// src/user/components/Users  (barrel: export { Users })
export function Users(): JSX.Element

// src/App.tsx
export interface AppProps { title?: string }          // default 'angular-jasmine-karma-demo'
export function App(props: AppProps): JSX.Element
```

## 5. Test counts

| Unit | Angular spec (`it`) | React tests |
| --- | --- | --- |
| App | `app.component.spec.ts` (5) | `App.test.tsx` (9) |
| Item | `item.component.spec.ts` (9) | `Item.test.tsx` (12) |
| Items | `items.component.spec.ts` (21) | `itemsSort.test.ts` (21), `useItemsSort.test.ts` (5), `Items.test.tsx` (12) |
| AddItem | `add-item.component.spec.ts` (14) | `AddItem.test.tsx` (19) |
| ItemDetail | `item-detail.component.spec.ts` (8) | `ItemDetail.test.tsx` (9) |
| UsersServices | `UsersServices.service.spec.ts` (11) | `usersService.test.ts` (13) |
| Users | `users.component.spec.ts` (9) | `Users.test.tsx` (12) |
| **Total** | **77** (never ran: `ng test` did not compile) | **112 Vitest** + **19 Playwright** (`e2e/smoke.spec.ts` 3, `e2e/flows.spec.ts` 16) |

## 6. Legacy behaviour kept on purpose (needs a product decision to change)

- **Users:** no error UI (a failed request is only `console.error`-ed, with no unhandled
  rejection), no loading state, and no stale-response guard (a slower earlier response can
  overwrite a later one).
- **Items:** the seed order is shown on first load under an active `Name ↑` arrow (the legacy
  component never sorts on init), and price sorts as a **string** (`localeCompare`), so ascending
  price is `123, 456, 59, 789, 99`. Some Angular spec cases expected numeric or sorted order that the
  legacy app never produces; the React tests assert what the running Angular app actually does.
- **AddItem:** Save is `type="button"` and Enter does not save. Like Angular's `FormGroupDirective`,
  the form cancels every submit event (`onSubmit={(e) => e.preventDefault()}`) without saving.
  `AddItem` and `ItemDetail` are not routed or rendered anywhere, as in Angular.
- **`like()` and `saveItem()`** only log to the console (`like <name>`, `saveItem`).
- **Angular specs never ran.** `ng test` does not compile on the last Angular commit (see
  section 7); the tests were ported by intent.

## 7. Running the legacy Angular app for comparison

The last Angular commit is `9328009` on `master` (before this migration merged). To compare side by
side, check it out in a separate worktree and fix it **locally only** (never commit these fixes):

```bash
git worktree add ../ajkd-legacy 9328009
cd ../ajkd-legacy
npm ci   # or: cp -al <repo>/node_modules node_modules (only if it holds the Angular deps)
NODE_OPTIONS=--openssl-legacy-provider npx ng serve --port 4300
```

- **Broken imports.** `items.component.ts` imports `../../domain/item.model` and
  `users.component.ts` imports `../../application/UsersServices`; both need one more `../`.
  With that fix `ng build` succeeds.
- **Don't symlink `node_modules`** into the worktree: it loads a second Angular runtime and the app
  renders blank with `Cannot read properties of null (reading 'bindingStartIndex')`. Run `npm ci`
  in the worktree, hardlink-copy with `cp -al`, or set `"preserveSymlinks": true` in the
  worktree's `angular.json` build options.
- **Node 22** needs `NODE_OPTIONS=--openssl-legacy-provider` for `ng serve` (webpack 4 hashing).
- **AddItem** needs `MatInputModule` imported in `app.module.ts` to render the inputs faithfully
  (it is not routed, so this only matters if you mount it).
- `ng test` still fails to compile even with the import fix (and with `strict: false`):
  `UsersServices.service.spec.ts` uses the Jest matcher `toHaveProperty` and `.length` on
  `Object`, and the `item-detail`/`users` specs have strict-null and implicit-any errors.

## 8. Known traps

- **react-router.** Use `react-router` v7 (`import { Routes, Route, Navigate, MemoryRouter } from 'react-router'`).
  v6 (`react-router-dom` 6.x) is flagged by Snyk; v8 needs Node 22.22+. Don't bump majors.
- **npm 10 arborist bug.** Adding packages with the npm 10 bundled with Node 22.12 can fail with
  `Cannot read properties of null (reading 'edgesOut')`; the lockfile was produced with
  `npx npm@11 install`. `npm ci` works with npm 10 and 11.
- **JSX whitespace.** Angular templates keep text whitespace (`{{ price }} €`); write it explicitly
  in JSX (`{price} €`).
- **MUI vs mat-card metrics.** `Item.css` gives the card 16px padding with `content-box` sizing and
  removes the `CardHeader`/`CardContent` padding so a card measures like a `mat-card` (291×170 on
  the shop page).
- `App.test.tsx` uses `vi.mock` on the `./shop/components/Items` and `./user/components/Users`
  barrels; keep those barrel paths stable.
- **Known Snyk finding without a fix:** `picomatch@4.0.7` (ReDoS, SNYK-JS-PICOMATCH-21248802) comes
  in through `vite`/`vitest`/`typescript-eslint` (dev/build-time only); 4.0.7 is the latest
  release, so there is nothing to upgrade to yet.
