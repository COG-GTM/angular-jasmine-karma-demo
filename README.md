# AngularJasmineKarmaDemo → React

This project was originally an Angular 12 + Jasmine/Karma demo. It has been
migrated to **React 18 + TypeScript + Vite**, with tests rewritten in
**Vitest + React Testing Library**. The React application lives in the
[`react-app/`](./react-app) directory.

All original functionality is preserved:

- The same routes/URLs: `/shop` (item list with sorting) and `/users`, with `/`
  redirecting to `/shop`.
- The shop and user domains, the users API call to
  `https://jsonplaceholder.typicode.com/users`, and the add-item reactive form.
- The Angular Material look-and-feel, reproduced with plain CSS (no new UI
  library was added).

## Getting started

```bash
cd react-app
npm install
```

### Development server

```bash
npm run dev
```

Vite serves the app at `http://localhost:5173/`. It reloads automatically when
you change source files.

### Build

```bash
npm run build
```

Type-checks with `tsc` and produces a production build in `react-app/dist/`.

### Lint

```bash
npm run lint
```

### Running unit tests

```bash
npm test          # single run (CI)
npm run test:watch
```

Tests run with [Vitest](https://vitest.dev) and
[React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
in a jsdom environment. Test files live next to the code they cover as
`*.test.ts` / `*.test.tsx`.

## Project structure

```
react-app/src/
├── types/        # TypeScript interfaces (Item, User)
├── services/     # usersService (fetch + AbortController, ported from UsersServices)
├── utils/        # sort helpers (ported from ItemsComponent sorting logic)
├── components/   # Item, AddItem, ItemDetail, Layout (app shell)
├── pages/        # ItemsPage (/shop), UsersPage (/users)
├── styles/       # global + Material-like CSS
├── App.tsx       # React Router routes
└── main.tsx      # entry point
```

## Angular → React mapping

| Angular | React |
| --- | --- |
| `@Component` + template | Function component returning JSX |
| `@Input` | Props |
| Services + RxJS `HttpClient` | `fetch` + `async/await` with `AbortController` |
| `*ngFor` / `*ngIf` | `.map()` / conditional rendering |
| Angular Router (`<router-outlet>`) | React Router (`<Outlet>`, `<Routes>`) |
| Reactive forms | `useState` + derived validation |
| Jasmine + Karma | Vitest + React Testing Library |
| Angular Material components | Plain CSS replicas (`mat-*` class names) |

## Continuous Integration

[`.github/workflows/ci.yml`](./.github/workflows/ci.yml) installs dependencies
and runs lint, build, and tests for `react-app/` on every push and pull request.
