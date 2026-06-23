import { Navigate, Route, Routes } from 'react-router-dom';
import Items from './shop/infrastructure/components/Items';
import Users from './user/infrastructure/components/Users';

// Mirrors AppComponent: a title span followed by the router outlet.
export default function App() {
  const title = 'angular-jasmine-karma-demo';

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
