# angular-jasmine-karma-demo (React edition)

An introduction to unit testing a React application with [Vitest](https://vitest.dev) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/), using the AAA (Arrange–Act–Assert) pattern. This repo was originally an Angular 12 + Jasmine/Karma testing demo; it has been migrated to React 18 + Vite + TypeScript + MUI (Material UI) + react-router-dom v7.

## Commands

```bash
npm install      # install dependencies (or `npm ci` for a clean install)
npm run dev      # dev server at http://localhost:5173
npm test         # run the unit test suite (vitest run)
npm run build    # type-check (tsc -b) and produce a production build in dist/
npm run lint     # lint with oxlint
```

## Project layout

```
index.html                     # Vite entry page
vite.config.ts                 # Vite + Vitest configuration
src/main.tsx                   # bootstrap: ThemeProvider, CssBaseline, BrowserRouter, App
src/App.tsx                    # nav links + route table
src/App.test.tsx               # routing/nav tests
src/setupTests.ts              # jest-dom matchers setup
src/shop/domain/item.model.ts  # Item model
src/shop/components/
  Items.tsx / Items.test.tsx   # shop item list (sortable by name/price)
  Item.tsx / Item.test.tsx     # single item card
  AddItem.tsx / AddItem.test.tsx  # add-item form with validation
  ItemDetail.tsx / ItemDetail.test.tsx  # item detail (receives an Item prop)
src/user/application/
  UsersServices.ts / UsersServices.test.ts  # fetch-based users service
src/user/components/
  Users.tsx / Users.test.tsx   # users list, calls getUsers()
```

### Routes

| Path        | Component          |
| ----------- | ------------------ |
| `/shop`     | `Items`            |
| `/shop/add` | `AddItem`          |
| `/users`    | `Users`            |
| `*`         | redirects to `/shop` |

`ItemDetail` is intentionally unrouted — it is rendered by a parent and fed via props (the same setup the Angular version used).

## Angular -> React migration

| Angular                                    | React                                                                                           |
| ------------------------------------------ | ----------------------------------------------------------------------------------------------- |
| Angular 12 CLI (ng serve / ng test / ng build) | Vite + React 18 + TypeScript (`npm run dev` / `npm test` / `npm run build`)                  |
| Angular Material (`@angular/material`)     | MUI (`@mui/material`)                                                                            |
| Jasmine + Karma (`*.spec.ts`)              | Vitest + React Testing Library with jsdom (`*.test.tsx`)                                         |
| `TestBed.configureTestingModule` / `fixture` | RTL `render(...)` / `screen` queries                                                            |
| `fixture.detectChanges()`                  | not needed — RTL renders and the DOM updates automatically; use `fireEvent` / `userEvent` to interact |
| `spyOn(component, 'method')`               | `vi.spyOn(obj, 'method')` / `vi.fn()` / `vi.mock()`                                              |
| `HttpClient`                               | `fetch`                                                                                          |
| Reactive Forms (`FormBuilder`, `form.valid`) | controlled inputs with `useState`                                                              |
| `@Input()`                                 | props                                                                                            |
| `RouterModule` / `routerLink`              | `react-router-dom` (`<Routes>`, `<Route>`, `<Link>`, `<Navigate>`)                               |
| `*.spec.ts`                                | `*.test.tsx` (or `*.test.ts` for services)                                                       |

## About the tests

The test runner is Vitest; the DOM environment is jsdom, configured in `vite.config.ts`, with `src/setupTests.ts` loading the jest-dom matchers (`toBeInTheDocument`, `toBeDisabled`, ...). Unit tests live next to the code they test in `*.test.tsx` / `*.test.ts` files. You can run the tests even without the dev server running.

### Test doubles

Test doubles is a generic term for any case where a production object is replaced with another one solely for the purpose of testing the code.

According to Gerard Meszaros there are at least 5 kinds of doubles — https://en.wikipedia.org/wiki/Test_double

- Test stub: used for providing the tested code with "indirect input".
- Mock object: used for verifying "indirect output" of the tested code, by first defining the expectations before the tested code is executed.
- Test spy: used for verifying "indirect output" of the tested code, by asserting the expectations afterwards, without having defined the expectations before the tested code is executed. It helps in recording information about the indirect object created.
- Fake object: used as a simpler implementation, e.g. using an in-memory database in the tests instead of doing real database access.
- Dummy object: used when a parameter is needed for the tested method but without actually needing to use the parameter.

### AAA Pattern: sections of a Unit Test

1. **Arrange**: code required to set up a specific test. Objects would be created, mocks set up, the component rendered, ...

   ```tsx
   render(<AddItem />);
   ```

2. **Act**: the invocation of the behavior being tested.

   ```tsx
   fireEvent.change(name, { target: { value: 'foo' } });
   fireEvent.change(description, { target: { value: 'bar' } });
   fireEvent.change(price, { target: { value: '33' } });
   ```

3. **Assert**: check whether the expectations were met.

   ```tsx
   expect(getSaveButton()).toBeEnabled();
   ```

### Assertion functions

- expect(array).toContain(member);
- expect(fn).toThrow(string);
- expect(instance).toBe(instance);
- expect(mixed).toBeDefined();
- expect(mixed).toBeTruthy();
- expect(mixed).toEqual(mixed);
- expect(mixed).toMatch(pattern);
- expect(spy).toHaveBeenCalled();
- expect(spy).toHaveBeenCalledTimes(number);
- expect(spy).toHaveBeenCalledWith(...arguments);
- jest-dom: expect(el).toBeInTheDocument();
- jest-dom: expect(el).toBeDisabled();
- jest-dom: expect(el).toHaveTextContent(text);

### Functions that can be run before or after tests

To help a test suite DRY up duplicated setup and teardown code, Vitest provides the `beforeEach`, `afterEach`, `beforeAll`, and `afterAll` functions (imported from `vitest` or available as globals):

- beforeAll: called only once before all the tests in a `describe` run
  - e.g. to create shared fixtures
- afterAll: called only once after all the tests in a `describe` run
  - e.g. shared teardown for the describe in which it is called
- beforeEach: called once before each test in the describe in which it is declared
  - very useful for common per-test setup, like data initialization
- afterEach: called once after each test in the describe in which it is declared
  - generally used to reset/clean up at the end of tests (e.g. `vi.restoreAllMocks()`)

### Vitest methods

- `vi.spyOn(obj, 'method')`: dynamically intercepts calls to a function and can change its result.
- `vi.mock(module)`: replaces a whole module's exports (used to mock `UsersServices` in `Users.test.tsx`).
- `vi.stubGlobal('fetch', mock)`: swaps a global like `fetch` for a mock (used in `UsersServices.test.ts`).

## Testing Cases / How to test...

### Testing component creation

See **src/shop/components/Item.test.tsx** — renders `<Item {...props} />` and asserts the item card is in the document.

### Testing form validation

See **src/shop/components/AddItem.test.tsx** — asserts the save button is disabled until all fields are filled (`fireEvent.change` + `toBeDisabled` / `toBeEnabled`), and that `saveItem` is only called when the form is valid (`vi.spyOn(console, 'info')`).

### Testing sharing data from parent to child (props)

See **src/shop/components/ItemDetail.test.tsx** — renders `<ItemDetail item={itemInput} />` with a hand-made `Item` and asserts the prop values reach the DOM (the React equivalent of `@Input`).

### Testing calling a service from a component

See **src/user/components/Users.test.tsx** — mocks the `UsersServices` module with `vi.mock`, drives `getUsers` to resolve/reject, clicks "Get Users" with `userEvent`, and uses `waitFor` to assert the rendered list or the error logging.

### Testing a service against a REST API (mocked fetch)

See **src/user/application/UsersServices.test.ts** — replaces `fetch` with `vi.stubGlobal`, asserts that `getUsers()` parses the JSON response, rejects on non-ok responses, and calls the expected URL.
