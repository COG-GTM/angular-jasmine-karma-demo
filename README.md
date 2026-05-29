# React Jasmine Karma Demo (Migrated from Angular)

This project was migrated from Angular 12 to React 19 + TypeScript + Vite.

## Development server

```bash
cd react-app
npm install
npm run dev
```

Navigate to `http://localhost:3002/`. The app will automatically reload if you change any of the source files.

## Running unit tests

```bash
cd react-app
npm test
```

Tests use Vitest + React Testing Library (migrated from Karma/Jasmine).

## About this project

It is intended to be an introduction to unit testing, providing information on the most basic concepts and sample tests. This is a work in progress, so content will be added whenever possible.

## Project Structure

```
react-app/src/
├── components/
│   ├── Item/          # Individual item card with like button
│   ├── Items/         # Items list with sorting controls
│   ├── AddItem/       # Form to add new items
│   └── ItemDetail/    # Item detail view
├── pages/
│   ├── Shop/          # Shop page (items list)
│   └── Users/         # Users page (API fetch demo)
├── services/          # API services (users)
├── types/             # TypeScript interfaces
├── styles/            # Global SCSS styles
├── App.tsx            # Router + app shell
└── main.tsx           # Entry point
```

## Features

- **Shop page**: Display items with sortable columns (name, description, price)
- **Users page**: Fetch users from JSONPlaceholder API
- **Add Item form**: Form with validation (all fields required)
- **Routing**: React Router v6 with `/shop` and `/users` routes

## Testing Patterns

Tests demonstrate:
- Component rendering tests
- User interaction tests (clicking, typing)
- Form validation tests
- Service/API mocking
- Console spy tests

## Tech Stack

- React 19 + TypeScript
- Vite (build tool)
- React Router v6
- Vitest + React Testing Library
- SCSS for styling
- Material Icons (via Google Fonts CDN)
