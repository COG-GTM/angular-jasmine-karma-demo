# react-app

React 18 + TypeScript (Vite) port of the Angular UI in `../src`. The Angular app
is untouched; this directory is additive.

```bash
npm install
npm run dev -- --port 5173   # dev server
npm run build                # tsc -b && vite build
npm run lint
```

## Layout

The clean-architecture layout of the Angular app is preserved, with
`infrastructure/ng-components` becoming `infrastructure/react-components`:

```
src/shop/domain/item.model.ts            Item model (framework-agnostic)
src/shop/application/itemsService.ts     catalog + sorting rules (framework-agnostic)
src/shop/infrastructure/react-components Items, Item, AddItem, ItemDetail
src/user/domain/user.model.ts            User model
src/user/application/UsersService.ts     users API client (fetch)
src/user/infrastructure/react-components Users
src/styles/material.scss                 subset of the Angular Material theme
src/styles/global.scss                   ported src/styles.scss + mat-typography
```

## Routes

`/shop` and `/users` plus the `/` → `/shop` redirect mirror
`src/app/app-routing.module.ts`. `/add-item` is additional: the Angular app
declares `AddItemComponent` but never routes to it, so the port exposes it to
keep the reactive-form validation behaviour reachable and testable.

Visual parity against the Angular app is verified by `../visual-tests`.
