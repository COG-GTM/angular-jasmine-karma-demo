import { Outlet } from 'react-router-dom';
import './App.css';

const title = 'angular-jasmine-karma-demo';

function App() {
  return (
    <>
      <span>{title} app is running!</span>
      <Outlet />
    </>
  );
}

export default App;
