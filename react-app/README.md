# react-app

React scaffold for the `angular-jasmine-karma-demo` project: Vite + React 18 +
TypeScript, with React Router v6, MUI, and Vitest + React Testing Library.

## Commands

```bash
npm install      # install dependencies
npm run dev      # start the dev server
npm test         # run tests (vitest run)
npm run build    # type-check and build for production
npm run lint     # lint with oxlint
```

## Directory layout

```
src/
  main.tsx                          # entry: StrictMode > MUI ThemeProvider > CssBaseline > BrowserRouter > App
  App.tsx                           # top-level routes (/shop, /users, * -> /shop)
  App.test.tsx                      # route tests via MemoryRouter
  setupTests.ts                     # jest-dom matchers for Vitest
  shop/
    domain/item.model.ts            # Item interface (name, description, price)
    components/Items.tsx            # placeholder component
  user/
    application/UsersServices.ts    # getUsers() service + unit tests
    components/Users.tsx            # placeholder component
```

`Items.tsx` and `Users.tsx` are placeholders — the real feature components
(Items/Item/AddItem/ItemDetail/Users) are intentionally not implemented yet.

## Angular -> React mapping

| Angular (this repo)              | React equivalent                          |
| -------------------------------- | ----------------------------------------- |
| Angular Material                 | MUI (`@mui/material`, `@mui/icons-material`) |
| Jasmine / Karma                  | Vitest / React Testing Library            |
| HttpClient                       | `fetch` (see `UsersServices.ts`)          |
| Reactive Forms                   | Controlled components + `useState`        |
| `@Input()`                       | Props                                     |
| Router module (`app-routing`)    | `react-router-dom` (`BrowserRouter`/`Routes`) |
