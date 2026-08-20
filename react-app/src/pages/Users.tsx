import { useState } from 'react';
import { getUsers } from '../services/usersService';
import type { User } from '../types/user';

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);

  const handleGetUsers = async () => {
    console.info('getUsers');
    try {
      setUsers(await getUsers());
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <p>users works!</p>
      <button type="button" className="mat-raised-button" onClick={handleGetUsers}>
        Get Users
      </button>
      <div>
        <ul>
          {users.map((user) => (
            <li key={user.id ?? user.name}>{user.name}</li>
          ))}
        </ul>
      </div>
    </>
  );
}
