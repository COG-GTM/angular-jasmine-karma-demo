import { Navigate, Route, Routes, Link } from 'react-router-dom';
import { Items } from './shop/components/Items';
import { Users } from './user/components/Users';
import './App.css';

const title = 'angular-jasmine-karma-demo';

function App() {
  return (
    <>
      <span>{title} app is running!</span>
      <nav className="app-nav">
        <Link to="/shop">Shop</Link>
        <Link to="/users">Users</Link>
      </nav>
      <Routes>
        <Route path="/shop" element={<Items />} />
        <Route path="/users" element={<Users />} />
        <Route path="/" element={<Navigate to="/shop" replace />} />
      </Routes>
    </>
  );
}

export default App;
