import { NavLink, Outlet } from 'react-router-dom';
import './Layout.scss';

export const title = 'angular-jasmine-karma-demo';

/**
 * App shell ported from AppComponent. Preserves the original status text
 * ("<title> app is running!") and hosts the routed pages via <Outlet>, the
 * React Router equivalent of Angular's <router-outlet>. Navigation links are
 * provided so the /shop and /users routes are reachable from the UI.
 */
export function Layout() {
  return (
    <>
      <header className="app-toolbar">
        <span className="app-title">{title} app is running!</span>
        <nav className="app-nav">
          <NavLink to="/shop">Shop</NavLink>
          <NavLink to="/users">Users</NavLink>
        </nav>
      </header>
      <main className="app-content">
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
