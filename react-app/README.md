# react-app

Phase 1 scaffold of the Angular → React migration for `angular-jasmine-karma-demo`.
Vite 5 + React 18 + TypeScript (strict) + React Router 6 + MUI 5 + Vitest.

## Run

```bash
npm ci            # install deps
npm run dev       # dev server
npm test          # run tests once (vitest)
npm run test:watch
npm run typecheck # tsc --noEmit over src incl. tests
npm run build     # tsc -b && vite build
npm run preview   # preview production build
```

## Layout

```
react-app/
  index.html
  vite.config.ts          # vite + vitest config (jsdom, globals, setupTests)
  src/
    main.tsx              # StrictMode > BrowserRouter > ThemeProvider > App
    index.css             # global styles (ported from src/styles.scss)
    setupTests.ts         # @testing-library/jest-dom
    App.tsx               # title + routes (/shop, /users, / -> /shop)
    App.test.tsx          # routing smoke tests (MemoryRouter)
    shop/
      domain/item.model.ts
      components/{Item,Items,AddItem,ItemDetail}/   # placeholders
    user/
      application/usersService.ts                   # getUsers placeholder
      components/Users/                             # placeholder
```

## Migration map

| Angular file | React target | Status |
| --- | --- | --- |
| src/app/app.component.{ts,html,scss} | src/App.tsx | Ported |
| src/app/app-routing.module.ts | src/App.tsx routes | Ported |
| src/app/app.module.ts | src/main.tsx | Ported |
| src/app/app.component.spec.ts | src/App.test.tsx | Ported |
| src/styles.scss | src/index.css | Ported |
| src/app/shop/domain/item.model.ts | src/shop/domain/item.model.ts | Ported |
| src/app/user/application/UsersServices.ts (+ .service.spec.ts) | src/user/application/usersService.ts | Placeholder (later session) |
| shop/infrastructure/ng-components/item/* | src/shop/components/Item/ | Placeholder (later session) |
| shop/infrastructure/ng-components/items/* | src/shop/components/Items/ | Placeholder (later session) |
| shop/infrastructure/ng-components/add-item/* | src/shop/components/AddItem/ | Placeholder (later session) |
| shop/infrastructure/ng-components/item-detail/* | src/shop/components/ItemDetail/ | Placeholder (later session) |
| user/infrastructure/ng-components/users/* | src/user/components/Users/ | Placeholder (later session) |
