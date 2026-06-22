import { useState } from 'react';
import { Button } from '@mui/material';
import { usersServices } from '../application/UsersServices';
import type { User } from '../domain/user.model';

export const Users = () => {
  const [users, setUsers] = useState<User[]>([]);

  const getUsers = () => {
    console.info('getUsers');
    usersServices.getUsers().then((data) => setUsers(data));
  };

  return (
    <>
      <p>users works!</p>
      <Button type="button" variant="contained" color="warning" onClick={getUsers}>
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
};
