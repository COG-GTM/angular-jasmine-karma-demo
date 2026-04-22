# angular-jasmine-karma-demo (React + Vite rewrite)

This project was originally an Angular 12 demo app. It has been migrated to
**React 19 + TypeScript + Vite**. The original routes, UI, and external API
calls are preserved.

## Stack

- [Vite](https://vitejs.dev/) build tool
- [React 19](https://react.dev/) with function components and hooks
- TypeScript
- [React Router](https://reactrouter.com/) v7 for routing
- SCSS via [sass](https://www.npmjs.com/package/sass)
- [Vitest](https://vitest.dev/) + [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) for tests

## Getting started

Install dependencies:

```bash
npm install
```

Start the dev server:

```bash
npm run dev
```

The app is served at http://localhost:5173/ by default.

## Scripts

| Command           | What it does                                             |
| ----------------- | -------------------------------------------------------- |
| `npm run dev`     | Start the Vite dev server with HMR                       |
| `npm run build`   | Type-check with `tsc -b` and produce a production bundle |
| `npm run preview` | Preview the production bundle locally                    |
| `npm run lint`    | Run ESLint on the project                                |
| `npm test`        | Run the Vitest test suite                                |

## Routes

| URL      | Component             | Notes                              |
| -------- | --------------------- | ---------------------------------- |
| `/`      | redirects to `/users` | Matches the original Angular route |
| `/shop`  | `src/pages/Items.tsx` | List of demo items (Item cards)    |
| `/users` | `src/pages/Users.tsx` | Fetches users from JSONPlaceholder |

The Users page calls
[`https://jsonplaceholder.typicode.com/users`](https://jsonplaceholder.typicode.com/users)
on click — the same endpoint used by the original Angular `UsersServices`.

## Project layout

```
src/
├── App.tsx             # Router + app shell
├── main.tsx            # React entry point
├── types/              # Plain TypeScript interfaces (e.g. Item)
├── services/           # fetch-based API clients with AbortSignal support
├── components/         # Reusable UI components (Item, AddItem, ItemDetail)
├── pages/              # Route-level components (Items, Users)
├── styles/             # Global SCSS styles
└── test/               # Vitest setup
```
