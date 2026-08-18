import { Navigate, Route, Routes } from 'react-router-dom';
import { Items } from './shop/infrastructure/react-components/Items';
import { AddItem } from './shop/infrastructure/react-components/AddItem';
import { Users } from './user/infrastructure/react-components/Users';

const title = 'angular-jasmine-karma-demo';

export default function App() {
  return (
    <>
      <span>{title} app is running!</span>
      <Routes>
        <Route path="/shop" element={<Items />} />
        <Route path="/users" element={<Users />} />
        <Route path="/add-item" element={<AddItem />} />
        <Route path="/" element={<Navigate to="/shop" replace />} />
      </Routes>
    </>
  );
}
