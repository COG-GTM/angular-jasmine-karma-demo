import { Navigate, Route, Routes } from 'react-router-dom';
import { Users } from '../app/user/infrastructure/react-components/users/Users';

// Mirrors AppComponent + AppRoutingModule. Route elements are swapped in by
// the per-component migration branches.
export const App = () => {
  const title = 'angular-jasmine-karma-demo';
  return (
    <>
      <span>{title} app is running!</span>
      <Routes>
        <Route path="/shop" element={null} />
        <Route path="/users" element={<Users />} />
        <Route path="/" element={<Navigate to="/shop" replace />} />
      </Routes>
    </>
  );
};
