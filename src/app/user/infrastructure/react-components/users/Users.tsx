import { useState } from 'react';
import { User } from '../../../domain/user.model';
import { useUsersService } from '../../../react-hooks/useUsersService';
import './Users.css';

// React counterpart of UsersComponent (ng-components/users/users.component.ts).
export const Users = () => {
  const usersService = useUsersService();
  const [users, setUsers] = useState<User[]>([]);

  const getUsers = () => {
    console.info('getUsers');
    usersService
      .getUsers()
      .then((result) => setUsers(result))
      // TODO: Angular version has no error handling; surface errors in the UI if desired.
      .catch((error: unknown) => console.error(error));
  };

  return (
    <>
      <p>users works!</p>
      <button type="button" className="mat-raised-button mat-warn" onClick={getUsers}>
        Get Users
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
};
