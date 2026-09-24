import { useState } from 'react';
import Button from '@mui/material/Button';
import { getUsers, type User } from '../application/UsersServices';
import './Users.css';

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);

  const handleGetUsers = async () => {
    console.info('getUsers');
    try {
      setUsers(await getUsers());
    } catch (error) {
      console.error(error);
      setUsers([]);
    }
  };

  return (
    <div className="users">
      <p>users works!</p>
      <Button type="button" variant="contained" color="error" onClick={handleGetUsers}>
        Get Users
      </Button>
      <div>
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
