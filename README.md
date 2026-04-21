# React Jasmine/Karma-Style Testing Demo

> This repository was originally an Angular 12 demo showcasing unit testing with
> **Jasmine + Karma**. It has been migrated to a **React + TypeScript** project
> built with **Vite**, with the unit tests rewritten in **Vitest** +
> **React Testing Library**. The educational intent — teaching test doubles,
> the AAA pattern, and common assertion patterns — is preserved, just
> translated to the React ecosystem.

<br />

## Development server

```bash
npm install
npm run dev
```

Navigate to `http://localhost:5173/`. The app will automatically reload if you
change any of the source files.

<br />

## Running unit tests

```bash
npm test            # run all tests once
npm run test:watch  # run tests in watch mode
```

Tests run via [Vitest](https://vitest.dev) against [jsdom](https://github.com/jsdom/jsdom)
and use [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
to render components. The Vitest API is intentionally Jest-compatible, so most
patterns from the Angular/Jasmine tests port directly.

<br />

## Building for production

```bash
npm run build
```

The optimized bundle is written to `dist/`.

<br />

## About this project

An introduction to unit testing in React, providing the most basic concepts and
sample tests. Originally written against Angular + Jasmine + Karma, now
translated to React + Vitest + React Testing Library so the concepts can be
studied alongside modern React idioms.

<br />

## About Vitest & React Testing Library

> [Vitest](https://vitest.dev) is a blazing-fast unit test framework powered by
> Vite. Its API is compatible with Jest — `describe`, `it`, `expect`,
> `beforeEach`/`afterEach`, `vi.fn()`, `vi.spyOn()`, `vi.mock()` — so tests
> written for Jest (or ported from Jasmine) typically run unchanged.

> [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
> renders React components into a real DOM (jsdom) and exposes queries that
> mirror how a user would interact with the page. It replaces Angular's
> `TestBed` + `ComponentFixture` pattern with the simpler `render()` function.

> Unit tests live next to the component they cover in `*.test.ts` /
> `*.test.tsx` files, so Vitest automatically discovers them.

> **There are well-documented example tests on the `Item`, `AddItem`,
> `ItemDetail` and `Users` components.**

<br />

### Test doubles
Son un término genérico que hace referencia a cualquier caso en el que se
reemplaza un objeto de producción con otro con el único objetivo de probar el
código.

According to Gerard Meszaros there are at least 5 kinds of doubles —
<https://en.wikipedia.org/wiki/Test_double>:
- **Test stub**: used for providing the tested code with "indirect input".
- **Mock object**: used for verifying "indirect output" of the tested code, by
  first defining the expectations before the tested code is executed.
- **Test spy**: used for verifying "indirect output" of the tested code, by
  asserting the expectations afterwards, without having defined the
  expectations before the tested code is executed. It helps in recording
  information about the indirect object created.
- **Fake object**: used as a simpler implementation, e.g. using an in-memory
  database in the tests instead of doing real database access.
- **Dummy object**: used when a parameter is needed for the tested method but
  without actually needing to use the parameter.

In Vitest you create these with `vi.fn()` (stub / mock / spy),
`vi.spyOn(obj, 'method')` (spy on an existing method), and `vi.mock('module')`
(replace a whole module — similar to Jest's `jest.mock`).

<br />

### AAA Pattern: sections of a Unit Test
1. **Arrange**: code required to set up a specific test. Here React components
   would be rendered, spies installed, controlled inputs primed, etc.
   ```tsx
   render(<AddItem onSave={onSave} />);
   const user = userEvent.setup();
   ```
2. **Act**: the invocation of the behavior being tested.
   ```tsx
   await user.type(screen.getByLabelText("name"), "foo");
   await user.type(screen.getByLabelText("description"), "bar");
   await user.type(screen.getByLabelText("price"), "33");
   await user.click(screen.getByRole("button", { name: /save/i }));
   ```
3. **Assert**: check whether the expectations were met.
   ```tsx
   expect(onSave).toHaveBeenCalledTimes(1);
   expect(onSave).toHaveBeenCalledWith({
     name: "foo",
     description: "bar",
     price: "33",
   });
   ```
<br />

### Jest/Vitest assertion functions
The Jasmine matchers used in the original project port almost one-to-one. All
of these are available in Vitest:
- `expect(array).toContain(member);`
- `expect(fn).toThrow(string);`
- `expect(fn).toThrowError(string);`
- `expect(instance).toBe(instance);`
- `expect(mixed).toBeDefined();`
- `expect(mixed).toBeFalsy();`
- `expect(mixed).toBeNull();`
- `expect(mixed).toBeTruthy();`
- `expect(mixed).toBeUndefined();`
- `expect(mixed).toEqual(mixed);`
- `expect(mixed).toMatch(pattern);`
- `expect(number).toBeCloseTo(number, decimalPlaces);`
- `expect(number).toBeGreaterThan(number);`
- `expect(number).toBeLessThan(number);`
- `expect(number).toBeNaN();`
- `expect(spy).toHaveBeenCalled();`
- `expect(spy).toHaveBeenCalledTimes(number);`
- `expect(spy).toHaveBeenCalledWith(…arguments);`

`@testing-library/jest-dom` adds DOM-specific matchers such as
`toBeInTheDocument()`, `toHaveTextContent(...)`, `toBeEnabled()`,
`toBeDisabled()`, and `toHaveAttribute(...)`.

<br />

### Functions that can be run before or after tests
Vitest exposes the same global lifecycle helpers as Jest/Jasmine to help DRY up
setup and teardown code:
- `beforeAll`: called only once before all the specs in `describe` run.
  - e.g. to install a one-time fixture.
- `afterAll`: called only once after all the specs in `describe` run.
  - e.g. to tear down a shared resource.
- `beforeEach`: called once before each spec in the surrounding `describe`.
  - Very useful for rendering the component under test.
- `afterEach`: called once after each spec in the surrounding `describe`.
  - Used to restore spies (`vi.restoreAllMocks()`), reset timers, etc.

<br />

## Vitest utilities

- `render(<Component />)`: from `@testing-library/react`, mounts the component
  into jsdom. Replaces Angular's `TestBed.createComponent(...)` +
  `fixture.detectChanges()`.
- `screen.getByRole(...)`, `screen.getByText(...)`, `screen.getByLabelText(...)`:
  queries that mirror how a user would find an element on the page. Replace
  the `fixture.debugElement.query(By.css(...))` pattern.
- `userEvent.setup()`: simulates real user interactions (typing, clicking,
  tabbing). Preferred over firing raw DOM events.
- `vi.spyOn(obj, 'method')`: intercepts calls to an existing function and
  allows changing its return value. Direct replacement for Jasmine's `spyOn`.

<br />

## Testing Cases / How to test...

### Testing component creation
- You can see an example at **`src/shop/components/Item.test.tsx`**.
- This is a very basic test, but it's well documented.

### Testing form validation
You can see an example at **`src/shop/components/AddItem.test.tsx`**.

### Testing sharing data from parent to child (via props — the React equivalent of `@Input`)
You can see an example at **`src/shop/components/ItemDetail.test.tsx`**.

### Testing calling a service from a component
You can see an example at **`src/users/components/Users.test.tsx`**, which
stubs `usersService.getUsers()` with `vi.spyOn(...).mockResolvedValue(...)`.

### Router link testing
// TODO: pending to code (in React Router context: assert that a `<NavLink>`
renders the expected `href` and that clicking it navigates via
`MemoryRouter`/`createMemoryRouter`).

### Testing a service against a REST API
// TODO: pending to code
- I'm not sure it's a very useful test because the API gets stubbed and the
  test always "works".
- In React this is done by spying on `globalThis.fetch` or by using a library
  like `msw` (Mock Service Worker).

### Testing a service against a **real** REST API
// TODO: pending to code
- Hit the real endpoint from inside a test and assert on the response shape.
  Beware of flakiness and rate limits.
