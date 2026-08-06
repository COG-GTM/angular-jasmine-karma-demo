import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Items from './shop/components/Items';
import Users from './user/components/Users';

export default function App(): JSX.Element {
  return (
    <BrowserRouter>
      <span>angular-jasmine-karma-demo app is running!</span>
      <Routes>
        <Route path="/shop" element={<Items />} />
        <Route path="/users" element={<Users />} />
        <Route path="/" element={<Navigate to="/shop" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
