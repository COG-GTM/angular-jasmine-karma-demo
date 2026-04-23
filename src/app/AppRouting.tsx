import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// TODO: Replace these placeholder imports with actual migrated React components
// Angular originals:
//   - ItemsComponent from 'src/app/shop/infrastructure/ng-components/items/items.component'
//   - UsersComponent from 'src/app/users/infrastructure/ng-components/users/users.component'
const ItemsComponent: React.FC = () => <div>ItemsComponent Placeholder</div>;
const UsersComponent: React.FC = () => <div>UsersComponent Placeholder</div>;

export const AppRouting: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/shop" element={<ItemsComponent />} />
        <Route path="/users" element={<UsersComponent />} />
        <Route path="/" element={<Navigate to="/users" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
