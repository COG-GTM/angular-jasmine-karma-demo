import React from 'react';
import { User, useUsers } from '../../../application/useUsers';
import './Users.scss';

export interface UsersProps {
  /**
   * Optional hook invoked with the fetched users after a successful load.
   * The Angular source exposed no `@Output()` events; this callback is an
   * opt-in convenience for parent components and leaves behavior unchanged
   * when omitted.
   */
  onUsersLoaded?: (users: User[]) => void;
}

export const Users: React.FC<UsersProps> = ({ onUsersLoaded }) => {
  const { users, getUsers } = useUsers();

  const handleClick = (): void => {
    void getUsers().then((next) => {
      if (onUsersLoaded) {
        onUsersLoaded(next);
      }
    });
  };

  return (
    <>
      <p>users works!</p>
      {/* TODO: Angular source used `mat-raised-button color="warn"` from
          @angular/material. The plain <button> below is styled via Users.scss
          to approximate that look without introducing a new UI library. */}
      <button type="button" className="users__button users__button--warn" onClick={handleClick}>
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
