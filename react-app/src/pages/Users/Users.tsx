import { useState } from 'react';
import type { User } from '../../types';
import { getUsers } from '../../services/users-service';
import './Users.scss';

export function Users() {
  const [users, setUsers] = useState<User[]>([]);

  const handleGetUsers = async () => {
    console.info('getUsers');
    const data = await getUsers();
    setUsers(data);
  };

  return (
    <div className="users-container">
      <p>users works!</p>
      <button className="get-users-btn" type="button" onClick={handleGetUsers}>
        Get Users
      </button>
      <div>
        <ul>
          {users.map(user => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
