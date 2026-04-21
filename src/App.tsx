import { NavLink, Navigate, Route, Routes } from "react-router-dom";

import { Items } from "./shop/components/Items";
import { AddItem } from "./shop/components/AddItem";
import { Users } from "./users/components/Users";

/**
 * App: React port of Angular's `AppComponent` + `AppRoutingModule`.
 *
 * Angular patterns replaced:
 *   - `<router-outlet>` + `RouterModule.forRoot(routes)` → React Router's
 *     `<Routes>` + `<Route>` declarations.
 *   - `routerLink` in templates → `<NavLink>` from `react-router-dom`.
 */
export const title = "react-jasmine-karma-demo";

export function App() {
  return (
    <>
      <nav>
        <span>{title} app is running!</span>
        <NavLink to="/shop">Shop</NavLink>
        <NavLink to="/shop/add">Add item</NavLink>
        <NavLink to="/users">Users</NavLink>
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/shop" element={<Items />} />
          <Route path="/shop/add" element={<AddItem />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
