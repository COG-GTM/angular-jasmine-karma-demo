import { useState } from 'react';
import type { User } from '../../domain/user.model';
import { usersService } from '../../application/UsersService';

export function Users() {
  const [users, setUsers] = useState<User[]>([]);

  const getUsers = (): void => {
    console.info('getUsers');
    void usersService
      .getUsers()
      .then((loaded) => setUsers(loaded))
      .catch((error: unknown) => console.error(error));
  };

  return (
    <>
      <p>users works!</p>
      <button
        type="button"
        className="mat-raised-button mat-button-base mat-warn"
        onClick={getUsers}
      >
        <span className="mat-button-wrapper">Get Users</span>
      </button>
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
