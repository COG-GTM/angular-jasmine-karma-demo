# React Vitest Demo (migrated from AngularJasmineKarmaDemo)

This project was originally an Angular 12 + Jasmine/Karma demo. It has been migrated to
**React 19 + TypeScript + Vite**, with unit tests running on **Vitest + React Testing Library**.
The application source lives in [`react-app/`](./react-app).

<br />

## Development server

```bash
cd react-app
npm install
npm run dev
```

Navigate to `http://localhost:5173/`. The app reloads automatically when source files change.

<br />

## Running unit tests

```bash
cd react-app
npm test            # single run
npm run test:watch  # watch mode
npm run test:coverage
```

<br />

## Lint and build

```bash
cd react-app
npm run lint
npm run build
```

<br />

## Routes

| Path     | Page                    |
| -------- | ----------------------- |
| `/shop`  | Shop items with sorting |
| `/users` | Users loaded from the JSONPlaceholder API |
| `/`      | Redirects to `/shop`    |

<br />

## Project structure

```
react-app/src/
├── components/   # Item, ItemDetail, AddItem
├── pages/        # Items (shop), Users
├── services/     # usersService (fetch-based, replaces HttpClient)
├── data/         # static item data
├── types/        # Item, User interfaces (former domain models)
├── utils/        # sorting, form validation, like handler
├── styles/       # global + Angular Material replacement styles
├── App.tsx       # routing
└── main.tsx      # entry point
```

<br />

## About this project

It is intended to be an introduction to unit testing a React app, providing information on the
most basic concepts and sample tests. The original Angular/Jasmine notes are preserved below and
translated to their Vitest equivalents.

<br />

## About Vitest tests

> Vitest is a Vite-native test runner with a Jest/Jasmine-compatible API (`describe`, `it`,
> `expect`, `beforeEach`, ...). It runs the component tests in a `jsdom` environment.

> React Testing Library renders components and queries them the way a user would (by role, label
> or text), which replaces Angular's `TestBed` + `fixture.debugElement` approach.

> Test files are named `*.test.ts` / `*.test.tsx` and live next to the code they cover.

<br />

### Test doubles

Son un término genérico que hace referencia a cualquier caso en el que se reemplaza un objeto de
producción con otro con el único objetivo de probar el código.

According with Gerard Meszaros there are at least 5 kinds of doubles
https://en.wikipedia.org/wiki/Test_double

- Test stub: used for providing the tested code with "indirect input".
- Mock object: used for verifying "indirect output" of the tested code, by first defining the expectations before the tested code is executed.
- Test spy: used for verifying "indirect output" of the tested code, by asserting the expectations afterwards, without having defined the expectations before the tested code is executed. It helps in recording information about the indirect object created.
- Fake object: used as a simpler implementation, e.g. using an in-memory database in the tests instead of doing real database access.
- Dummy object: used when a parameter is needed for the tested method but without actually needing to use the parameter.

In Vitest, doubles are created with `vi.fn()`, `vi.spyOn(object, 'method')` and
`vi.mock('./module')`.

<br />

### AAA Pattern: sections of a Unit Test

1. Arrange: code required to setup a specific test.
   ```tsx
   render(<AddItem />);
   ```
2. Act: the invocation of the behaviour being tested.
   ```tsx
   await userEvent.type(screen.getByLabelText('name'), 'foo');
   await userEvent.type(screen.getByLabelText('description'), 'bar');
   await userEvent.type(screen.getByLabelText('price'), '33');
   ```
3. Assert: check whether the expectations were met.
   ```tsx
   expect(screen.getByRole('button', { name: /save/i })).toBeEnabled();
   ```

<br />

### Common assertions (Vitest + jest-dom)

- expect(array).toContain(member);
- expect(fn).toThrow(string);
- expect(instance).toBe(instance);
- expect(mixed).toBeDefined();
- expect(mixed).toBeFalsy();
- expect(mixed).toBeNull();
- expect(mixed).toBeTruthy();
- expect(mixed).toBeUndefined();
- expect(mixed).toEqual(mixed);
- expect(mixed).toMatch(pattern);
- expect(number).toBeCloseTo(number, decimalPlaces);
- expect(number).toBeGreaterThan(number);
- expect(spy).toHaveBeenCalled();
- expect(spy).toHaveBeenCalledTimes(number);
- expect(spy).toHaveBeenCalledWith(…arguments);
- expect(element).toBeInTheDocument(); // jest-dom
- expect(element).toBeDisabled(); // jest-dom
- expect(element).toHaveTextContent(text); // jest-dom

<br />

### Hooks that run before or after tests

Vitest provides the same global `beforeEach`, `afterEach`, `beforeAll` and `afterAll` helpers as
Jasmine, with identical semantics. `afterEach(() => vi.restoreAllMocks())` is the usual teardown
for spied-on globals such as `fetch` or `console`.

<br />

## Testing Cases / How to test...

### Testing component rendering

See **src/components/Item.test.tsx**.

### Testing form validation

See **src/components/AddItem.test.tsx**.

### Testing data passed from parent to child (former `@Input`)

See **src/components/ItemDetail.test.tsx** — inputs are plain props in React.

### Testing a component that calls a service

See **src/pages/Users.test.tsx**, which stubs `fetch` with `vi.spyOn`.

### Testing routing

See **src/App.test.tsx**, which renders the app inside a `MemoryRouter`.

### Testing a service against a REST api

See **src/services/usersService.test.ts**, covering success, empty, 404/500 and network errors.
