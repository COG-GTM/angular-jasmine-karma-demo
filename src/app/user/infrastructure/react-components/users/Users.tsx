import React from 'react';
import { useUsers } from '../../../application/useUsers';

export const Users: React.FC = () => {
  const { users, getUsers } = useUsers();

  return (
    <>
      <p>users works!</p>
      {/* TODO: Angular source used `mat-raised-button color="warn"` from
          @angular/material. The plain <button> below will be styled via a
          sibling SCSS file in the next step to approximate that look without
          introducing a new UI library. */}
      <button type="button" onClick={() => { void getUsers(); }}>
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
