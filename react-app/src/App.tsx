import { Outlet } from 'react-router';

export const title = 'angular-jasmine-karma-demo';

/** Port of AppComponent: banner + router outlet. */
export default function App() {
  return (
    <>
      <span>{title} app is running!</span>
      <Outlet />
    </>
  );
}
