import React from 'react';
import { useUsers } from '../../../application/useUsers';
import './UsersComponent.css';

export const UsersComponent: React.FC = () => {
  const { users, getUsers } = useUsers();

  return (
    <div className="users-container">
      <p>users works!</p>
      <button
        type="button"
        className="get-users-button"
        onClick={getUsers}
      >
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
