import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ShopPage, UsersPage } from './pages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/" element={<Navigate to="/users" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
