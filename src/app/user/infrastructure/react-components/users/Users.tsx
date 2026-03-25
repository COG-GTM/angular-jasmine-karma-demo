import React from 'react';
import { useUsers } from '../../../application/useUsers';

/**
 * React equivalent of the Angular UsersComponent.
 *
 * Original Angular component:
 * - Selector: app-users
 * - Routed at /users (default redirect from /)
 * - Injects UsersServices, calls getUsers() on button click
 * - Renders a list of user names with *ngFor
 *
 * This React version uses the useUsers custom hook instead of the
 * Angular UsersServices injectable.
 */
export const Users: React.FC = () => {
  const { users, getUsers } = useUsers();

  const handleGetUsers = () => {
    getUsers();
  };

  return (
    <div>
      <p>users works!</p>
      {/* TODO: Replace with Material UI Button (mat-raised-button color="warn") when MUI is added */}
      <button type="button" onClick={handleGetUsers}>
        Get Users
      </button>
      <div>
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
