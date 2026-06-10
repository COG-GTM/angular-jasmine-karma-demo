# angular-jasmine-karma-demo (React migration)

This project was originally an Angular 12 demo (a Jasmine/Karma testing reference)
with **shop** and **user** domains. It has been migrated to **React 18 +
TypeScript**, built with **Vite** and tested with **Vitest + React Testing
Library**. The application lives in the [`react-app/`](./react-app) directory.

All user-facing behavior, routes, and the Material look-and-feel were preserved
1:1 during the migration.

<br />

## Getting started

```bash
cd react-app
npm install
```

### Development server

```bash
npm run dev
```

Navigate to `http://localhost:4200/`. The app reloads automatically on changes.

### Type-check & production build

```bash
npm run build      # tsc --noEmit && vite build
```

### Lint

```bash
npm run lint
```

### Unit tests

```bash
npm test           # vitest run
npm run test:watch # watch mode
```

<br />

## Application structure

| Area | Path | Notes |
| ---- | ---- | ----- |
| Routing | `src/App.tsx` | React Router. Routes: `''` → `/shop`, `/shop`, `/users` |
| Domain models | `src/types/` | e.g. `item.ts` |
| Services | `src/services/` | `usersService.ts` calls the API with `fetch` + `AbortController` |
| Shop domain | `src/components/shop/` | `Items`, `Item`, `ItemDetail`, `AddItem` |
| User domain | `src/components/user/` | `Users` |
| Theme | `src/theme.ts`, `src/main.tsx` | MUI (Material UI) + Roboto / Material Icons |

The Users page fetches data from
`https://jsonplaceholder.typicode.com/users` (unchanged from the Angular app).

<br />

## Routes

| URL | Component | Description |
| --- | --------- | ----------- |
| `/` | — | Redirects to `/shop` |
| `/shop` | `Items` | Item list with name/description/price sorting |
| `/users` | `Users` | Loads and lists users from the API |

<br />

## Migration notes

- **RxJS `HttpClient`** → `fetch` + `async/await` with `AbortController` for
  cancellation on unmount.
- **Angular Reactive Forms** (`AddItemComponent`) → controlled React form with
  validation in `AddItem.tsx`.
- **Angular Material** → **MUI** to preserve the original appearance.
- **Angular pipes / lifecycle hooks** → utility functions / `useEffect`.
- **Jasmine + Karma specs** → **Vitest + React Testing Library** (`*.test.tsx`).

CI builds, lints, type-checks, and tests the React app via
[`.github/workflows/react-ci.yml`](./.github/workflows/react-ci.yml).
