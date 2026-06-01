import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// TODO: Import actual migrated components once they are converted to React
// import { ItemsComponent } from '../shop/infrastructure/ng-components/items/ItemsComponent';
// import { UsersComponent } from '../users/infrastructure/ng-components/users/UsersComponent';

/**
 * Placeholder for ItemsComponent (not yet migrated to React).
 * Angular source: src/app/shop/infrastructure/ng-components/items/items.component.ts
 */
const ItemsPlaceholder: React.FC = () => {
  return <div>Items Component (placeholder - pending React migration)</div>;
};

/**
 * Placeholder for UsersComponent (not yet migrated to React).
 * Angular source: src/app/users/infrastructure/ng-components/users/users.component.ts
 */
const UsersPlaceholder: React.FC = () => {
  return <div>Users Component (placeholder - pending React migration)</div>;
};

/**
 * Props interface for the App component.
 * Currently empty as the Angular AppComponent has no @Input() or @Output() bindings.
 */
interface AppProps {
  /** Optional override for the application title. Defaults to 'angular-jasmine-karma-demo'. */
  title?: string;
}

/**
 * Root application component — React equivalent of Angular's AppComponent.
 *
 * Angular source:
 *   - src/app/app.component.ts
 *   - src/app/app.component.html
 *   - src/app/app.component.scss (empty)
 *
 * Routing (from app-routing.module.ts):
 *   - /shop   -> ItemsComponent
 *   - /users  -> UsersComponent
 *   - /       -> redirects to /users
 */
export const App: React.FC<AppProps> = ({
  title = 'angular-jasmine-karma-demo',
}) => {
  return (
    <BrowserRouter>
      <span>{title} app is running!</span>
      <Routes>
        {/* Route: /shop -> ItemsComponent */}
        <Route path="/shop" element={<ItemsPlaceholder />} />
        {/* Route: /users -> UsersComponent */}
        <Route path="/users" element={<UsersPlaceholder />} />
        {/* Default route: redirect to /users (equivalent to Angular's pathMatch: 'full' redirect) */}
        <Route path="/" element={<Navigate to="/users" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
