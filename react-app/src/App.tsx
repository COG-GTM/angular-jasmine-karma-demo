import { BrowserRouter, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { Shop } from './pages/Shop/Shop';
import { Users } from './pages/Users/Users';
import './styles/global.scss';

function AppShell() {
  const location = useLocation();

  return (
    <div className="app">
      <header className="app-header">
        <span className="app-title">angular-jasmine-karma-demo app is running!</span>
        <nav className="app-nav">
          <Link
            to="/shop"
            className={location.pathname === '/shop' ? 'active' : ''}
          >
            Shop
          </Link>
          <Link
            to="/users"
            className={location.pathname === '/users' ? 'active' : ''}
          >
            Users
          </Link>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/shop" replace />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}

export default App;
