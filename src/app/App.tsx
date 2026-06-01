import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';

// Placeholder components - these will be migrated separately
const ItemsComponent = () => <div>Items Component (placeholder)</div>;
const UsersComponent = () => <div>Users Component (placeholder)</div>;

interface AppLayoutProps {
  title: string;
}

const AppLayout = ({ title }: AppLayoutProps) => {
  return (
    <>
      <span>{title} app is running!</span>
      <Outlet />
    </>
  );
};

export const App = () => {
  const title = 'angular-jasmine-karma-demo';

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout title={title} />}>
          <Route path="/shop" element={<ItemsComponent />} />
          <Route path="/users" element={<UsersComponent />} />
          <Route path="/" element={<Navigate to="/users" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
