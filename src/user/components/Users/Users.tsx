import { useState } from 'react';
import Button from '@mui/material/Button';
import { getUsers, type User } from '../../application/usersService';

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const handleGetUsers = () => {
    console.info('getUsers');
    void getUsers().then(setUsers);
  };
  return (
    <>
      <p>users works!</p>
      <Button type="button" variant="contained" color="error" onClick={handleGetUsers}>Get Users</Button>
      <div>
        <ul>
          {users.map((user) => (<li key={user.id}>{user.name}</li>))}
        </ul>
      </div>
    </>
  );
}
