import { useState } from 'react';
import Button from '@mui/material/Button';
import { getUsers } from '../../application/usersService';
import type { User } from '../../domain/user.model';

// Port of users.component: a "Get Users" button that loads the users and lists their names.
// Like the Angular component there is no loading or error UI; a failed request is only logged.
export function Users() {
  const [users, setUsers] = useState<User[]>([]);

  function handleGetUsers() {
    console.info('getUsers');
    getUsers()
      .then(setUsers)
      .catch((error: unknown) => {
        console.error(error);
      });
  }

  return (
    <>
      <p>users works!</p>
      {/* Match mat-raised-button height (36px); case and letter spacing come from the theme. */}
      <Button
        type="button"
        variant="contained"
        color="error"
        onClick={handleGetUsers}
        sx={{ lineHeight: '36px', py: 0 }}
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
