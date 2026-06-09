import { useEffect, useRef, useState } from 'react';
import type { User } from '../types/user';
import { usersService } from '../services/usersService';

/**
 * Ported from UsersComponent (the /users route). Fetches users on demand when
 * the "Get Users" button is clicked, using the ported usersService. An
 * AbortController cancels any in-flight request on unmount.
 */
export function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const controllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    return () => controllerRef.current?.abort();
  }, []);

  const getUsers = () => {
    console.info('getUsers');
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;
    usersService
      .getUsers(controller.signal)
      .then((data) => setUsers(data))
      .catch((error) => {
        if ((error as Error).name !== 'AbortError') {
          console.error(error);
        }
      });
  };

  return (
    <div className="users-container">
      <p>users works!</p>
      <button
        type="button"
        className="mat-raised-button mat-warn"
        onClick={getUsers}
      >
        Get Users
      </button>
      <div>
        <ul>
          {users.map((user, index) => (
            <li key={user.id ?? index}>{user.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default UsersPage;
