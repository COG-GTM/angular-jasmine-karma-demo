# AngularJasmineKarmaDemo

A small shop/users demo app for learning unit testing. It began as an Angular 12 + Jasmine/Karma project and now runs on **React 19 + TypeScript**, built with [Vite](https://vite.dev). Unit tests use [Vitest](https://vitest.dev) and [Testing Library](https://testing-library.com), and end-to-end tests use [Playwright](https://playwright.dev). The routes, markup and behavior are the same as in the Angular version.

<br />

## Requirements

Node `^20.19.0 || ^22.13.0 || >=24`, with npm.

```bash
npm ci
```

<br />

## Development server

Run `npm run dev`, then open `http://localhost:5173/`. The app reloads automatically when you change a source file.

| Route    | View                                                                         |
| -------- | ---------------------------------------------------------------------------- |
| `/`      | redirects to `/shop`                                                         |
| `/shop`  | shop items with Name / Description / Price sorting                           |
| `/users` | "Get Users" button that fetches `https://jsonplaceholder.typicode.com/users` |

Run `npm run build` to make a production build in `dist/`. Run `npm run preview` to serve that build.

<br />

## Scripts

| Script                            | What it does                                                                                         |
| --------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `npm test`                        | unit tests (Vitest + Testing Library, jsdom)                                                         |
| `npm run test:watch`              | unit tests in watch mode                                                                             |
| `npm run test:e2e`                | Playwright smoke tests against a production build (run `npx playwright install chromium` once first) |
| `npm run typecheck`               | `tsc -b`                                                                                             |
| `npm run lint`                    | ESLint                                                                                               |
| `npm run format` / `format:check` | Prettier                                                                                             |

CI (`.github/workflows/ci.yml`) runs format check, lint, typecheck, unit tests, build and e2e.

<br />

## Project layout

```
src/
  shop/domain/                         Item model + seed data
  shop/application/sortItems.ts        sort logic (pure functions)
  shop/infrastructure/components/      Items, Item, AddItem, ItemDetail
  user/application/usersService.ts     fetch-based users API (AbortSignal-aware)
  user/infrastructure/components/      Users
  routes.tsx                           react-router route table
e2e/                                   Playwright specs
```

<br />

## About this project

This project is an introduction to unit testing. It covers the most basic concepts and includes sample tests. Every component and service has a colocated `*.test.ts(x)` file.

<br />

### Test doubles

Son un término genérico que hace referencia a cualquier caso en el que se reemplaza un objeto de producción con otro con el único objetivo de probar el código.

According with Gerard Meszaros there are at least 5 kinds of doubles
https://en.wikipedia.org/wiki/Test_double

- Test stub: used for providing the tested code with "indirect input".
- Mock object: used for verifying "indirect output" of the tested code, by first defining the expectations before the tested code is executed.
- Test spy: used for verifying "indirect output" of the tested code, by asserting the expectations afterwards, without having defined the expectations before the tested code is executed. It helps in recording information about the indirect object created.
- Fake object: used as a simpler implementation, e.g. using an in-memory database in the tests instead of doing real database access.
- Dummy object: used when a parameter is needed for the tested method but without actually needing to use the parameter.

<br />

### AAA Pattern: sections of a Unit Test

1. Arrange: write the code that sets up a specific test, such as rendering the component and setting up mocks.
   ```tsx
   render(<AddItemComponent />);
   ```
2. Act: perform the action under test.
   ```tsx
   await userEvent.type(screen.getByRole('textbox', { name: 'name' }), 'foo');
   await userEvent.type(screen.getByRole('textbox', { name: 'description' }), 'bar');
   await userEvent.type(screen.getByRole('textbox', { name: 'price' }), '33');
   ```
3. Assert: check that the expectations were met.
   ```tsx
   expect(screen.getByRole('button', { name: /save/i })).toBeEnabled();
   ```

<br />

### Common assertions (Vitest + jest-dom)

- `expect(array).toContain(member)`
- `expect(fn).toThrow(message)`
- `expect(value).toBe(value)` / `toEqual(value)`
- `expect(value).toBeDefined()` / `toBeUndefined()` / `toBeNull()`
- `expect(value).toBeTruthy()` / `toBeFalsy()`
- `expect(string).toMatch(pattern)`
- `expect(number).toBeCloseTo(number, digits)` / `toBeGreaterThan` / `toBeLessThan`
- `expect(spy).toHaveBeenCalled()` / `toHaveBeenCalledTimes(n)` / `toHaveBeenCalledWith(...args)`
- DOM: `toBeInTheDocument()`, `toHaveTextContent()`, `toHaveClass()`, `toBeDisabled()` / `toBeEnabled()`

<br />

### Setup and teardown

`beforeAll` and `afterAll` each run once per `describe`. `beforeEach` and `afterEach` run around every test. `src/setupTests.ts` unmounts rendered components after each test.

<br />

### Spies and mocks

- `vi.spyOn(console, 'info')` intercepts calls so a test can assert on them. For an example, see the like button test in `ItemComponent.test.tsx`.
- `vi.stubGlobal('fetch', vi.fn()...)` stubs the network. For examples, see `usersService.test.ts` and `UsersComponent.test.tsx`. In e2e tests, `page.route()` does the same job.

<br />

## Testing Cases / How to test...

### Testing component rendering

See `ItemComponent.test.tsx`.

### Testing form validation

See `AddItemComponent.test.tsx`.

### Testing data passed from parent to child (props)

See `ItemDetailComponent.test.tsx` and `ItemsComponent.test.tsx`.

### Testing a component that calls a service

See `UsersComponent.test.tsx`.

### Testing routes

See `routes.test.tsx`, which uses `createMemoryRouter`.

### Testing a service against a REST API

See `usersService.test.ts`, which stubs `fetch`.
