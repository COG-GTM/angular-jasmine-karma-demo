import { useState } from 'react';
import Button from '@mui/material/Button';
import { getUsers, User } from '../../application/usersService';
import './users.scss';

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);

  const handleGetUsers = () => {
    console.info('getUsers');
    getUsers().then((data) => setUsers(data));
  };

  return (
    <>
      <p>users works!</p>
      <Button
        type="button"
        variant="contained"
        color="error"
        onClick={handleGetUsers}
      >
        Get Users
      </Button>
      <div>
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      </div>
    </>
  );
}
