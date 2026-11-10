import { Navigate, type RouteObject } from 'react-router';
import App from './App';
import ItemsComponent from './shop/infrastructure/components/items/ItemsComponent';
import UsersComponent from './user/infrastructure/components/users/UsersComponent';

/** Port of app-routing.module.ts: /shop, /users, '' → /shop. No wildcard, matching Angular. */
export const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Navigate to="/shop" replace /> },
      { path: 'shop', element: <ItemsComponent /> },
      { path: 'users', element: <UsersComponent /> },
    ],
  },
];
