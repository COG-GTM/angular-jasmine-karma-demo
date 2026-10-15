# Angular Jasmine Karma Demo

This repository is a React 18 + TypeScript application built with Vite, MUI, and React Router v6, tested with Vitest and React Testing Library. It was originally an Angular 12/Jasmine/Karma testing demo and keeps the same teaching purpose while showing the equivalent React testing patterns.

## Development server

Run the Vite development server:

```bash
npm run dev
```

By default, the app is available at `http://localhost:5173/`.

## Running unit tests

Run the unit tests once with:

```bash
npm test
```

Run Vitest in watch mode with:

```bash
npm run test:watch
```

## Commands

```bash
npm ci            # install dependencies from the lockfile
npm run dev       # start the Vite development server
npm test          # run tests once
npm run test:watch
npm run typecheck # typecheck the app and tests
npm run build     # typecheck and create a production build
npm run preview   # preview the production build
```

## Folder layout

```text
.
├── .editorconfig
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
└── src/
    ├── App.tsx
    ├── App.test.tsx
    ├── index.css
    ├── main.tsx
    ├── setupTests.ts
    ├── vite-env.d.ts
    ├── shop/
    │   ├── domain/
    │   │   └── item.model.ts
    │   └── components/
    │       ├── AddItem/
    │       │   ├── AddItem.tsx
    │       │   ├── AddItem.test.tsx
    │       │   └── index.ts
    │       ├── Item/
    │       │   ├── Item.tsx
    │       │   ├── Item.test.tsx
    │       │   ├── Item.css
    │       │   └── index.ts
    │       ├── ItemDetail/
    │       │   ├── ItemDetail.tsx
    │       │   ├── ItemDetail.test.tsx
    │       │   └── index.ts
    │       └── Items/
    │           ├── Items.tsx
    │           ├── Items.test.tsx
    │           ├── Items.css
    │           ├── useItemsSort.ts
    │           └── index.ts
    └── user/
        ├── application/
        │   ├── usersService.ts
        │   └── usersService.test.ts
        └── components/
            └── Users/
                ├── Users.tsx
                ├── Users.test.tsx
                └── index.ts
```

## About this project

This project introduces unit testing through small, runnable examples in the shop and user features. Tests render real React components in a simulated DOM, interact with them as a user would, and isolate calls to external services. The examples also demonstrate component props, routing, validation, and sorting.

## About Vitest tests

Vitest is the test runner and assertion framework. Tests use `describe`, `it`, and `expect`; these names are available globally because `vite.config.ts` sets `test.globals` to `true`. The configured `jsdom` environment provides browser-like DOM APIs for component tests.

The test setup in `src/setupTests.ts` imports `@testing-library/jest-dom/vitest`. This adds DOM assertions such as `toBeInTheDocument()` and `toBeDisabled()` to Vitest's `expect`. React Testing Library's `render` mounts a component into the test DOM, and `screen` queries it by accessible role, label, or text.

### Test doubles

A test double replaces or observes a production dependency to keep a test focused and predictable. The common kinds are:

- **Dummy**: a value passed only because a parameter is required.
- **Stub**: a dependency configured to return controlled data.
- **Spy**: a function wrapper used to inspect calls while retaining or replacing its implementation.
- **Mock**: a programmable function or module used to control behavior and verify interactions.
- **Fake**: a simpler working implementation used instead of a real dependency.

Vitest provides `vi.fn()` for mock functions, `vi.spyOn()` for spies, and `vi.mock()` for module mocks. For example, `Users.test.tsx` mocks `getUsers` and resolves it with sample users, while `usersService.test.ts` stubs global `fetch` and supplies a `Response` with `mockResolvedValue`:

```ts
vi.stubGlobal('fetch', vi.fn());
vi.mocked(fetch).mockResolvedValue(createResponse([{ id: 1, name: 'foo' }]));
```

Here, `createResponse` is the helper in `src/user/application/usersService.test.ts`. The service test restores the global and mock state after each test with `vi.unstubAllGlobals()` and `vi.restoreAllMocks()`.

### AAA Pattern: sections of a unit test

The Arrange-Act-Assert pattern separates setup, the behavior being exercised, and the expected result. This example follows `AddItem.test.tsx`:

```tsx
const user = userEvent.setup();
const onSave = vi.fn();
render(<AddItem onSave={onSave} />);

// Arrange: enter valid form values.
await user.type(screen.getByPlaceholderText('name'), 'foo');
await user.type(screen.getByPlaceholderText('description'), 'bar');
await user.type(screen.getByPlaceholderText('price'), '33');

// Act: save the item.
await user.click(screen.getByRole('button', { name: /save/i }));

// Assert: the callback received the entered values.
expect(onSave).toHaveBeenCalledWith({ name: 'foo', description: 'bar', price: '33' });
```

### Vitest/jest-dom assertion functions

Examples used by Vitest and the installed jest-dom matchers include:

- `expect(value).toBe(value)` for identity or primitive equality.
- `expect(value).toEqual(value)` for deep equality.
- `expect(mock).toHaveBeenCalledWith(...args)` and `toHaveBeenCalledTimes(number)` for interactions.
- `expect(element).toBeInTheDocument()` and `toHaveTextContent(text)` for rendered content.
- `expect(element).toBeDisabled()` and `toBeEnabled()` for controls.
- `expect(element).toBeRequired()`, `toBeInvalid()`, and `toHaveValue(value)` for form fields.
- `expect(value).toContain(member)`, `toMatch(pattern)`, and `toThrow(message)` for values and errors.

### Setup/teardown

Vitest provides global `beforeEach`, `afterEach`, `beforeAll`, and `afterAll` hooks:

- `beforeAll` and `afterAll` run once before or after a suite.
- `beforeEach` and `afterEach` run around each test and are useful for shared setup and cleanup.

React Testing Library automatically calls `cleanup` after each test when the test runner exposes `afterEach`. Use `vi.restoreAllMocks()` to restore spies, and `vi.unstubAllGlobals()` to remove globals installed by `vi.stubGlobal()`. The `Users` and service tests demonstrate these hooks.

## Vitest methods

- `describe` groups related tests; `it` (or `test`) defines an individual test.
- `expect` checks values and DOM state.
- `vi.fn()` creates a mock function.
- `vi.spyOn(object, method)` observes or replaces a method.
- `vi.mock(path, factory)` replaces a module for a test.
- `vi.mocked(value).mockResolvedValue(data)` configures a mock to resolve a promise.
- `vi.stubGlobal(name, value)` and `vi.unstubAllGlobals()` set and remove globals for tests.
- `vi.restoreAllMocks()` restores spies and mock implementations.
- `render`, `screen`, and `userEvent` come from React Testing Library and its user-event package.

## Testing Cases / How to test...

### Testing component creation

`src/shop/components/Item/Item.test.tsx` renders `Item` and queries its content with `screen`:

```tsx
render(<Item name="Test Item" description="Test Description" price="100" />);
expect(screen.getByText('Test Item')).toBeInTheDocument();
```

### Testing form validation

`src/shop/components/AddItem/AddItem.test.tsx` uses `userEvent` to fill the fields and checks the Save button state:

```tsx
const user = userEvent.setup();
render(<AddItem />);
await user.type(screen.getByPlaceholderText('name'), 'foo');
await user.type(screen.getByPlaceholderText('description'), 'bar');
await user.type(screen.getByPlaceholderText('price'), '33');
expect(screen.getByRole('button', { name: /save/i })).toBeEnabled();
```

### Testing sharing data from parent to child (using props instead of `@Input`)

React passes data through props. `Items` maps its records to `Item` components using the `name`, `description`, and `price` props; `Item.test.tsx` verifies those values render. `ItemDetail` accepts an optional `item` prop typed as `Item`, and `ItemDetail.test.tsx` checks the values passed through that prop.

```tsx
<Item name="Test Item" description="Test Description" price="100" />
```

### Testing calling a service from a component

`src/user/components/Users/Users.test.tsx` mocks the `getUsers` service export, clicks the button, and checks the asynchronously rendered user:

```tsx
getUsersMock.mockResolvedValue([{ id: 1, name: 'foo' }]);
await user.click(screen.getByRole('button', { name: 'Get Users' }));
expect(await screen.findByText('foo')).toBeInTheDocument();
expect(getUsersMock).toHaveBeenCalledTimes(1);
```

### RouterLink

The React equivalent in this app is route rendering with React Router. `src/App.test.tsx` uses `MemoryRouter` with `initialEntries` to test routes without a browser:

```tsx
render(
  <MemoryRouter initialEntries={['/shop']}>
    <App />
  </MemoryRouter>,
);
expect(screen.getByRole('heading', { name: 'Shop Items' })).toBeInTheDocument();
```

The same test file checks `/users` and that `/` redirects to `/shop`.

### Testing service against REST API

`src/user/application/usersService.test.ts` tests `getUsers()` without making a network request by stubbing `fetch`. Its `createResponse` helper returns a `Response` with controlled JSON:

```ts
vi.stubGlobal('fetch', vi.fn());
vi.mocked(fetch).mockResolvedValue(createResponse([]));
await expect(getUsers()).resolves.toEqual([]);
expect(fetch).toHaveBeenCalledWith(
  USERS_URL,
  expect.objectContaining({ method: 'GET' }),
);
```

These tests exercise the service's request and response handling while remaining deterministic.

### Testing service against **real** REST API

The default test suite stubs `fetch`; it does not call the live API at `https://jsonplaceholder.typicode.com/users`. Live API tests are not part of the default suite, which keeps tests independent of network availability and external data.

## Migration from Angular

| Angular file | React target | Status |
| --- | --- | --- |
| `src/app/app.component.{ts,html,scss}` | `src/App.tsx` | Ported |
| `src/app/app-routing.module.ts` | `src/App.tsx` routes | Ported |
| `src/app/app.module.ts` | `src/main.tsx` | Ported |
| `src/app/app.component.spec.ts` | `src/App.test.tsx` | Ported |
| `src/styles.scss` | `src/index.css` | Ported |
| `src/app/shop/domain/item.model.ts` | `src/shop/domain/item.model.ts` | Ported |
| `src/app/user/application/UsersServices.ts` (+ `.service.spec.ts`) | `src/user/application/usersService.ts` and `src/user/application/usersService.test.ts` | Ported |
| `shop/infrastructure/ng-components/item/*` | `src/shop/components/Item/` | Ported |
| `shop/infrastructure/ng-components/items/*` | `src/shop/components/Items/` | Ported |
| `shop/infrastructure/ng-components/add-item/*` | `src/shop/components/AddItem/` | Ported |
| `shop/infrastructure/ng-components/item-detail/*` | `src/shop/components/ItemDetail/` | Ported |
| `user/infrastructure/ng-components/users/*` | `src/user/components/Users/` | Ported |
