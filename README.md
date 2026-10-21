# angular-jasmine-karma-demo

An introduction to unit testing a front-end app, with the most basic concepts and sample tests.
The app started as an Angular 12 project tested with Jasmine + Karma. It is now a **React +
TypeScript + Vite** app tested with **Vitest + React Testing Library** (unit and component
tests) and **Playwright** (end-to-end). Every original Jasmine spec was ported to Vitest with the
same intent; the name of the repo is kept for history. How the migration was done, and which
legacy quirks were kept on purpose, is in [docs/MIGRATION.md](./docs/MIGRATION.md).

The app has two pages: `/shop` (a sortable list of item cards) and `/users` (loads users from
https://jsonplaceholder.typicode.com/users). `/` redirects to `/shop`.

<br />

## Commands

Node `^20.19 || ^22.13 || >=24` (CI runs Node 20 and 22).

| Command | What it does |
| --- | --- |
| `npm ci` | install from the lockfile |
| `npm run dev` | Vite dev server on http://localhost:5173 (reloads on every change) |
| `npm test` | run all unit/component tests once (`vitest run`) - no server needed 😲 |
| `npm run test:watch` | Vitest in watch mode |
| `npm run test:coverage` | tests + v8 coverage report (text + `coverage/index.html`) |
| `npm run e2e` | Playwright: builds, serves on :4173, runs `e2e/*.spec.ts` in Chromium (first time: `npx playwright install chromium`) |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc -b` (TypeScript strict) |
| `npm run build` | type-check and build to `dist/` |
| `npm run preview` | serve `dist/` on http://localhost:4173 |

CI (`.github/workflows/ci.yml`) runs `npm ci && npm run lint && npm run typecheck && npm test && npm run build && npm run e2e`.

<br />

## Folder layout

The clean-architecture split of the Angular app is kept: `domain/` (plain models),
`application/` (services) and `components/` (UI; was `infrastructure/ng-components/`).

```
index.html                      page shell, <body class="mat-typography">
vite.config.ts                  Vite + Vitest config (the `test` key)
playwright.config.ts            Playwright config
e2e/                            end-to-end specs (smoke + every main user flow)
src/
  main.tsx                      router + MUI theme + <App />
  App.tsx, App.test.tsx         title span and routes
  theme.ts, index.css           Angular Material look (indigo-pink) in MUI + global styles
  setupTests.ts                 loads the jest-dom matchers
  shop/
    domain/item.model.ts
    components/
      Item/                     one item card (like button)
      Items/                    /shop page: list + sorting (itemsSort.ts, useItemsSort.ts)
      AddItem/                  form with validation (addItemForm.ts)
      ItemDetail/               receives an item from its parent
  user/
    domain/user.model.ts
    application/usersService.ts fetch users from the REST API
    components/Users/           /users page
```

<br />

## About the tests

> **Vitest** is a test runner and assertion library built on Vite. It runs the tests in Node with
> a simulated DOM (jsdom), and its API (`describe`, `it`, `expect`, `vi`) is compatible with Jest
> and close to Jasmine's.

> **React Testing Library (RTL)** renders a component into that DOM and lets the test find
> elements the way a user would (by role, label or text). **user-event** simulates real user
> interactions (click, type, tab).

> **Playwright** drives a real browser against the built app for end-to-end tests.

> Unit and component tests live next to the code they test, in `<Name>.test.tsx` (components) or
> `<name>.test.ts` (plain modules) files, so Vitest can find them. End-to-end tests are
> `e2e/*.spec.ts`.

> **The best commented examples are the _Item_ and _AddItem_ tests.**

<br />

### Test doubles
A test double is a generic term for any case where a production object is replaced by another one
just to test the code.

According to Gerard Meszaros there are at least 5 kinds of doubles
https://en.wikipedia.org/wiki/Test_double
- Test stub: used for providing the tested code with "indirect input".
  `getUsersMock.mockResolvedValue(users)` in `Users.test.tsx` makes the service return canned users.
- Mock object: used for verifying "indirect output" of the tested code, by first defining the expectations before the tested code is executed.
  `vi.mock('../../application/usersService', ...)` in `Users.test.tsx` replaces the whole service module.
- Test spy: used for verifying "indirect output" of the tested code, by asserting the expectations afterwards, without having defined the expectations before the tested code is executed. It helps in recording information about the indirect object created.
  `vi.spyOn(console, 'info')` in `Item.test.tsx` records the `like <name>` log.
- Fake object: used as a simpler implementation, e.g. using an in-memory database in the tests instead of doing real database access.
  `vi.stubGlobal('fetch', fetchMock)` in `usersService.test.ts` swaps the network for a function that returns a `Response`.
- Dummy object: used when a parameter is needed for the tested method but without actually needing to use the parameter.
  The `onSave` callback passed to `<AddItem onSave={onSave} />` in tests that never click Save.

<br />

### AAA Pattern: sections of a Unit Test
1. Arrange: code required to set up a specific test. Here objects would be created, mocks set up, ...
    ``` tsx
    const user = userEvent.setup();
    render(<AddItem onSave={onSave} />);
    ```
2. Act: which should be the invocation of the method being tested
    ``` tsx
    await user.type(screen.getByLabelText('name'), 'foo');
    await user.type(screen.getByLabelText('description'), 'bar');
    await user.type(screen.getByLabelText('price'), '33');
    ```
3. Assert: check whether the expectations were met.
    ``` tsx
    expect(screen.getByRole('button', { name: /save/i })).toBeEnabled();
    ```

The validation rules also live in a pure module, so the same idea works without rendering anything:
``` ts
const values = { name: '', description: '', price: '' };   // Arrange
const valid = isAddItemFormValid(values);                  // Act
expect(valid).toBe(false);                                 // Assert
```
<br />

### Assertion functions
Vitest's `expect` (Jest-compatible):
- expect(array).toContain(member);
- expect(array).toHaveLength(number);
- expect(fn).toThrow(string | RegExp | ErrorClass);
- await expect(promise).rejects.toThrow(...); / await expect(promise).resolves.toEqual(...);
- expect(instance).toBe(instance);
- expect(mixed).toBeDefined();
- expect(mixed).toBeFalsy();
- expect(mixed).toBeNull();
- expect(mixed).toBeTruthy();
- expect(mixed).toBeUndefined();
- expect(mixed).toEqual(mixed);
- expect(object).toHaveProperty(path, value?);
- expect(string).toMatch(pattern);
- expect(number).toBeCloseTo(number, numDigits);
- expect(number).toBeGreaterThan(number);
- expect(number).toBeLessThan(number);
- expect(number).toBeNaN();
- expect(spy).toHaveBeenCalled();
- expect(spy).toHaveBeenCalledTimes(number);
- expect(spy).toHaveBeenCalledWith(…arguments);

DOM matchers from `@testing-library/jest-dom` (loaded in `src/setupTests.ts`):
- expect(element).toBeInTheDocument();
- expect(element).toBeVisible();
- expect(element).toBeDisabled(); / toBeEnabled();
- expect(element).toHaveTextContent(text);
- expect(element).toHaveAttribute(name, value?);
- expect(element).toHaveClass(...classNames);

<br />

### Functions that can be run before or after tests
To help a test suite DRY up any duplicated setup and teardown code, Vitest provides the global
beforeEach, afterEach, beforeAll, and afterAll functions (same names as Jasmine):
- beforeAll: is called only once before all the tests in the describe are run
  - e.g.: to start a shared resource used by every test
- afterAll: is called only once after all the tests in the describe are run
  - e.g.: to run some shared teardown once the whole describe is done.
- beforeEach: is called once before each test in the describe in which it is called
  - This functionality is very useful for running the common code in the application, like data initialization.
  - e.g.: `usersService.test.ts` creates a fresh `fetch` double with `vi.stubGlobal` before each test.
- afterEach: is called once after each test in the describe in which it is called
  - Generally used to reset/clean up purposes at the end of tests
  - e.g.: `usersService.test.ts` calls `vi.unstubAllGlobals()` to put the real `fetch` back.

Two things happen automatically: RTL unmounts every rendered component after each test, and
`restoreMocks: true` (in `vite.config.ts`) restores every `vi.spyOn` spy. Doubles created with
`vi.fn()` inside a `vi.mock` factory are not reset by it, so `Users.test.tsx` calls
`getUsersMock.mockReset()` in `beforeEach`.

<br />

## Testing tools
- `render()` (RTL): mounts a component into a jsdom container. It replaces Angular's `TestBed` + `ComponentFixture`: there is no test module to configure, a component is just a function.
- `screen` (RTL): queries the rendered DOM. Prefer `getByRole`, `getByLabelText` and `getByText`; use `findBy...` to wait for something async.
- `userEvent` (user-event): simulates a user (`click`, `type`, `clear`, `tab`). After an `await`, the DOM is already updated, so there is no `fixture.detectChanges()`.
- `vi.spyOn(obj, 'method')`: a Vitest feature that intercepts calls to a function and can change its result (`.mockReturnValue(x)`, `.mockResolvedValue(x)`, `.mockImplementation(fn)`). It replaces Jasmine's `spyOn(...).and.returnValue(x)`.
- `vi.mock(path, factory)`: replaces a whole module for every import in the test file.
- `vi.stubGlobal(name, value)`: replaces a global such as `fetch`.
- `MemoryRouter` (react-router): renders routes at a chosen URL in tests (`App.test.tsx`).
- `page.route()` (Playwright): intercepts network requests in e2e tests so they don't depend on a live API (`e2e/flows.spec.ts`).

<br />

## Testing Cases / How to test...

### Testing component creation
- You can see an example in **`Item.test.tsx`** (`should create`)
- this is a very basic test, but it's well documented.

### Testing form validation
You can see an example in **`AddItem.test.tsx`** (pure rules from `addItemForm.ts`, plus typing into the real inputs).

### Testing sharing data from parent to child (using props)
Angular's `@Input` is a prop in React. You can see an example in **`ItemDetail.test.tsx`** (a thin parent records the props and `rerender` passes new ones) and in **`Item.test.tsx`**.

### Testing a child notifying its parent (callback props)
Angular's `@Output`/`EventEmitter` is an `on*` callback prop. **`AddItem.test.tsx`** checks that Save calls `onSave` with the form values.

### Testing sorting logic and a custom hook
**`itemsSort.test.ts`** tests the pure sort function, **`useItemsSort.test.ts`** uses `renderHook` + `act`, and **`Items.test.tsx`** clicks the sort buttons.

### Testing calling a service from a component
You can see an example in **`Users.test.tsx`**: the service module is replaced with `vi.mock` and each test decides what `getUsers()` resolves to.

### Testing routes
**`App.test.tsx`** renders the app inside a `MemoryRouter` at `/`, `/shop`, `/users` and an unknown URL. The e2e tests check the redirect and back/forward in a real browser.

### Testing service against rest api
**`usersService.test.ts`** replaces `fetch` with a double: it checks the URL and method, the parsed body, HTTP errors (`UsersHttpError`) and network errors. These tests never hit the network, so they always pass whether the API is up or not: they check how our code talks to the API, not that the API works.

### Testing the app end to end
**`e2e/flows.spec.ts`** covers every main user flow: the `/` -> `/shop` redirect and title, the five cards, every sort sequence, the like log, `/users` before and after Get Users (with `page.route` serving fixed users, so CI is deterministic) and back/forward navigation.

### Testing against the **real** rest api
Not covered on purpose: a test against the live API fails whenever the network or the API is down. If you need one, call `getUsers()` without stubbing `fetch` in a separate, opt-in test file.

<br />

## Angular -> React map

| Angular (Jasmine + Karma) | React (Vitest + RTL) |
| --- | --- |
| `ng serve` | `npm run dev` |
| `ng test` (Karma + Jasmine in Chrome) | `npm test` (Vitest + jsdom) |
| `*.spec.ts` | `*.test.ts(x)`; e2e in `e2e/*.spec.ts` |
| `karma.conf.js`, `src/test.ts` | `vite.config.ts` (`test` key), `src/setupTests.ts` |
| `TestBed.configureTestingModule(...)`, `fixture = TestBed.createComponent(X)` | `render(<X />)` |
| `fixture.nativeElement.querySelector(...)`, `By.css(...)` | `screen.getByRole(...)`, `getByText(...)` |
| `fixture.detectChanges()` | re-render / `await user.click(...)` |
| `component.someInput = value` (`@Input`) | `render(<X someInput={value} />)` / `rerender(...)` |
| `@Output() saved = new EventEmitter()` | `onSave` callback prop + `vi.fn()` |
| `spyOn(obj, 'm').and.returnValue(x)` | `vi.spyOn(obj, 'm').mockReturnValue(x)` |
| `spyOn(service, 'getUsers').and.returnValue(of(users))` | `vi.mocked(getUsers).mockResolvedValue(users)` |
| `HttpClientTestingModule` + `HttpTestingController` | `vi.stubGlobal('fetch', vi.fn())` |
| `FormBuilder` + `Validators.required` | `useState` + pure `addItemForm.ts` validators |
| `RouterTestingModule` | `MemoryRouter` |
| `mat-card`, `mat-icon-button`, `mat-raised-button`, `mat-form-field` | MUI `Card`, `IconButton`, `Button variant="contained"`, `TextField variant="filled"` |
| `item.component.spec.ts` (9) | `Item.test.tsx` (12) |
| `items.component.spec.ts` (21) | `itemsSort.test.ts` (21) + `useItemsSort.test.ts` (5) + `Items.test.tsx` (12) |
| `add-item.component.spec.ts` (14) | `AddItem.test.tsx` (19) |
| `item-detail.component.spec.ts` (8) | `ItemDetail.test.tsx` (9) |
| `UsersServices.service.spec.ts` (11) | `usersService.test.ts` (13) |
| `users.component.spec.ts` (9) | `Users.test.tsx` (12) |
| `app.component.spec.ts` (5) | `App.test.tsx` (9) |
| 77 Jasmine cases | 112 Vitest tests + 19 Playwright tests |
