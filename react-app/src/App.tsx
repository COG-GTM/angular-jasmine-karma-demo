import { Navigate, Route, Routes } from 'react-router-dom';
import Items from './shop/components/Items';
import Users from './user/components/Users';

export default function App() {
  return (
    <>
      <span>angular-jasmine-karma-demo app is running!</span>
      <Routes>
        <Route path="/shop" element={<Items />} />
        <Route path="/users" element={<Users />} />
        <Route path="*" element={<Navigate to="/shop" replace />} />
      </Routes>
    </>
  );
}
