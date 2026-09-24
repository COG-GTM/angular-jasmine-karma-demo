import { Link, Navigate, Route, Routes } from 'react-router-dom';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import AddItem from './shop/components/AddItem';
import Items from './shop/components/Items';
import Users from './user/components/Users';

export default function App() {
  return (
    <>
      <span>angular-jasmine-karma-demo app is running!</span>
      <Stack component="nav" direction="row" spacing={1} sx={{ my: 2 }}>
        <Button component={Link} to="/shop" variant="outlined">
          Shop
        </Button>
        <Button component={Link} to="/shop/add" variant="outlined">
          Add Item
        </Button>
        <Button component={Link} to="/users" variant="outlined">
          Users
        </Button>
      </Stack>
      <Routes>
        <Route path="/shop" element={<Items />} />
        <Route path="/shop/add" element={<AddItem />} />
        <Route path="/users" element={<Users />} />
        <Route path="*" element={<Navigate to="/shop" replace />} />
      </Routes>
    </>
  );
}
