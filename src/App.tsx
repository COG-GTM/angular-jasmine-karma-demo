import { Navigate, Route, Routes } from 'react-router';
import { Items } from './shop/components/Items';
import { Users } from './user/components/Users';

export interface AppProps {
  title?: string;
}

// Port of app.component + app-routing.module: title span followed by the routed view.
export function App({ title = 'angular-jasmine-karma-demo' }: AppProps) {
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
