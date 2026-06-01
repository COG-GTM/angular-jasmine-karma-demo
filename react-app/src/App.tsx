import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import ItemsPage from './components/ItemsPage';
import UsersPage from './components/UsersPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <span>angular-jasmine-karma-demo app is running!</span>
        <nav>
          <Link to="/shop">Shop</Link>
          {' | '}
          <Link to="/users">Users</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/shop" element={<ItemsPage />} />
          <Route path="/users" element={<UsersPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
