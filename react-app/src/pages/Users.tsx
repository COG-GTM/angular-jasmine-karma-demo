import { useEffect, useRef, useState } from 'react';
import { getUsers } from '../services/usersService';
import type { User } from '../types/user';

export function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const controllerRef = useRef<AbortController | null>(null);

  useEffect(() => () => controllerRef.current?.abort(), []);

  const handleGetUsers = async () => {
    console.info('getUsers');
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;
    try {
      setUsers(await getUsers(controller.signal));
    } catch (error) {
      if ((error as Error).name !== 'AbortError') {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <p>users works!</p>
      <button type="button" className="mat-raised-button" onClick={handleGetUsers}>
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
}

export default Users;
