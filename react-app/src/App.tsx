import { Navigate, Route, Routes } from 'react-router-dom';
import Items from './pages/Items';
import Users from './pages/Users';

export const title = 'angular-jasmine-karma-demo';

export default function App() {
  return (
    <>
      <span>{title} app is running!</span>
      <Routes>
        <Route path="/shop" element={<Items />} />
        <Route path="/users" element={<Users />} />
        <Route path="/" element={<Navigate to="/shop" replace />} />
      </Routes>
    </>
  );
}
