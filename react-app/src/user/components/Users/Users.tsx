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
      {/* Angular Material buttons keep the label's case; MUI uppercases it by default. */}
      <Button
        type="button"
        variant="contained"
        color="error"
        onClick={handleGetUsers}
        sx={{ textTransform: 'none', letterSpacing: 'normal' }}
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
