import { Routes, Route, Navigate } from 'react-router-dom';
import { Users } from './components/Users/Users';
import { Items } from './components/Shop/Items/Items';

function App() {
  return (
    <div style={{ display: 'inline', fontSize: '14px', lineHeight: '20px' }}>
      <span>angular-jasmine-karma-demo app is running!</span>
      <Routes>
        <Route path="/users" element={<Users />} />
        <Route path="/shop" element={<Items />} />
        <Route path="/" element={<Navigate to="/users" replace />} />
      </Routes>
    </div>
  );
}

export default App;
