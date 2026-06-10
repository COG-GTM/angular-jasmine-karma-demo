import { Routes, Route, Navigate, Link } from 'react-router-dom';
import { Items } from './components/shop/Items';
import { Users } from './components/user/Users';

// Ported from app.component.ts / app-routing.module.ts.
// Routes preserve the original URL structure:
//   ''      -> redirect to /shop
//   /shop   -> Items
//   /users  -> Users
export const App = () => {
  const title = 'angular-jasmine-karma-demo';

  return (
    <>
      <span>{title} app is running!</span>
      <nav style={{ display: 'flex', gap: '1rem', padding: '0.5rem 0' }}>
        <Link to="/shop">Shop</Link>
        <Link to="/users">Users</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Navigate to="/shop" replace />} />
        <Route path="/shop" element={<Items />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </>
  );
};
