import { Navigate, Route, Routes } from 'react-router-dom';
import Items from './pages/Items';
import Users from './pages/Users';

const title = 'angular-jasmine-karma-demo';

export function App() {
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

export default App;
