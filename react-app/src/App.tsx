import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { ItemsPage } from './pages/ItemsPage';
import { UsersPage } from './pages/UsersPage';

/**
 * Routing ported from app-routing.module.ts, preserving the original URLs:
 *   '' -> redirect to /shop, /shop -> items, /users -> users.
 */
export function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/shop" element={<ItemsPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/" element={<Navigate to="/shop" replace />} />
        <Route path="*" element={<Navigate to="/shop" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
