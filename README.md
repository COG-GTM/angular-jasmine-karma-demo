# AngularJasmineKarmaDemo — React edition

This project was originally an Angular 12 + Jasmine/Karma demo. It has been migrated to
**React + TypeScript** built with **Vite** and tested with **Vitest + React Testing Library**.
The app lives in [`react-app/`](./react-app).

<br />

## Getting started

```bash
cd react-app
npm install
```

## Development server

Run `npm run dev` and navigate to `http://localhost:5173/`. The app reloads automatically when you
change any source file.

## Build

`npm run build` type-checks the project (`tsc -b`) and produces a production bundle in
`react-app/dist`. `npm run preview` serves that bundle locally.

## Running unit tests

`npm test` runs the suite once with Vitest; `npm run test:watch` keeps it running in watch mode.
Tests live next to the code they cover in `*.test.ts(x)` files.

## Lint

`npm run lint` runs oxlint.

<br />

## Routes

| Path     | Page                      |
| -------- | ------------------------- |
| `/`      | redirects to `/shop`      |
| `/shop`  | shop items with sorting   |
| `/users` | users loaded from the API |

The users page fetches from `https://jsonplaceholder.typicode.com/users`.

<br />

## Project structure

```
react-app/src/
├── components/   # Item, ItemDetail, AddItem
├── pages/        # Items (shop), Users
├── services/     # usersService (fetch + AbortController)
├── styles/       # global styles and Material-like primitives
├── types/        # Item and User interfaces
├── App.tsx       # routes
└── main.tsx      # entry point
```

<br />

## Angular → React mapping

| Angular                                | React                                             |
| -------------------------------------- | ------------------------------------------------- |
| `@Component` + template                | function component returning JSX                  |
| `@Input()`                             | props                                             |
| `ngOnInit` / `ngOnDestroy`             | `useEffect`                                       |
| Injectable service + `HttpClient`      | plain module with `fetch` / `async-await`         |
| RxJS `Observable` subscription         | `await` + `AbortController` for cancellation      |
| `RouterModule.forRoot(routes)`         | `react-router-dom` `<Routes>` / `<Route>`         |
| `*ngIf` / `*ngFor`                     | `{cond && ...}` / `{items.map(...)}` with `key`   |
| Reactive Forms (`FormBuilder`)         | `useState` form state + derived validity          |
| Angular Material components            | plain markup with `mat-*` styled classes          |

<br />

## About this project

It is an introduction to unit testing a front-end app, providing the most basic concepts and
sample tests. The Jasmine/Karma examples have been rewritten with Vitest and React Testing Library,
which keep the same behaviour-driven vocabulary (`describe` / `it` / `expect`).

### Test doubles

According to Gerard Meszaros there are at least 5 kinds of doubles
(https://en.wikipedia.org/wiki/Test_double):

- Test stub: used for providing the tested code with "indirect input".
- Mock object: used for verifying "indirect output" of the tested code, by first defining the
  expectations before the tested code is executed.
- Test spy: used for verifying "indirect output" of the tested code, by asserting the expectations
  afterwards. In Vitest these are created with `vi.spyOn` / `vi.fn`.
- Fake object: a simpler implementation, e.g. an in-memory store instead of a real database.
- Dummy object: a parameter that is needed but never actually used.

### AAA Pattern: sections of a unit test

1. Arrange: set up the test — render the component, stub collaborators.
   ```tsx
   render(<AddItem />);
   const save = screen.getByRole('button', { name: /save/i });
   ```
2. Act: invoke the behaviour under test.
   ```tsx
   await userEvent.type(screen.getByLabelText('name'), 'foo');
   ```
3. Assert: check whether the expectations were met.
   ```tsx
   expect(save).toBeEnabled();
   ```

### Common assertions

- `expect(array).toContain(member)`
- `expect(fn).toThrow(string)`
- `expect(value).toBe(other)` / `toEqual(other)`
- `expect(value).toBeDefined()` / `toBeNull()` / `toBeTruthy()` / `toBeFalsy()`
- `expect(spy).toHaveBeenCalled()` / `toHaveBeenCalledTimes(n)` / `toHaveBeenCalledWith(...args)`
- `expect(element).toBeInTheDocument()` / `toBeDisabled()` (from `@testing-library/jest-dom`)

### Hooks that run before or after tests

`beforeAll`, `beforeEach`, `afterEach` and `afterAll` work exactly as they did in Jasmine and are
imported from `vitest` (or used globally, since `globals: true` is set in `vite.config.ts`).

<br />

## Testing cases / how to test...

### Testing component rendering

See `src/components/Item.test.tsx`.

### Testing form validation

See `src/components/AddItem.test.tsx`.

### Testing data passed from parent to child (former `@Input`)

See `src/components/ItemDetail.test.tsx`.

### Testing a component that calls a service

See `src/pages/Users.test.tsx`, which stubs `fetch`.

### Testing a service

See `src/services/usersService.test.ts`.

### Testing routing

See `src/App.test.tsx`, which renders the app inside a `MemoryRouter`.
