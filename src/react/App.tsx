import { Navigate, Route, Routes } from 'react-router-dom';
import { Items } from '../app/shop/infrastructure/react-components/items/Items';

// Mirrors AppComponent + AppRoutingModule. Route elements are swapped in by
// the per-component migration branches.
export const App = () => {
  const title = 'angular-jasmine-karma-demo';
  return (
    <>
      <span>{title} app is running!</span>
      <Routes>
        <Route path="/shop" element={<Items />} />
        <Route path="/users" element={null} />
        <Route path="/" element={<Navigate to="/shop" replace />} />
      </Routes>
    </>
  );
};
