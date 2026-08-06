import type { FC } from 'react';
import { useState } from 'react';
import { getUsers, type User } from '../../application/usersService';

export interface UsersProps {}

const Users: FC<UsersProps> = () => {
  const [users, setUsers] = useState<User[]>([]);

  const handleGetUsers = async (): Promise<void> => {
    console.info('getUsers');
    const fetchedUsers = await getUsers();
    setUsers(fetchedUsers);
  };

  return (
    <>
      <p>users works!</p>
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
    </>
  );
};

export default Users;
