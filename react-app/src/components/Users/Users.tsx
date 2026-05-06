import { useState } from 'react';
import type { User } from '../../models/user.model';
import { getUsers } from '../../services/usersService';

export function Users() {
  const [users, setUsers] = useState<User[]>([]);

  const handleGetUsers = async () => {
    console.info('getUsers');
    const data = await getUsers();
    setUsers(data);
  };

  return (
    <div style={{ display: 'inline' }}>
      <p style={{ margin: '0 0 12px', fontSize: '14px', lineHeight: '20px' }}>users works!</p>
      <button
        type="button"
        onClick={handleGetUsers}
        style={{
          padding: '1px 6px',
          margin: '0',
          display: 'inline-block',
          fontSize: '13.3333px',
          lineHeight: 'normal',
        }}
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
}
