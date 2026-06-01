import { useState } from 'react';
import { useUsers, User } from '../../../application/hooks/useUsers';

export const UsersComponent = () => {
  const [users, setUsers] = useState<User[]>([]);
  const { getUsers } = useUsers();

  const handleGetUsers = async () => {
    console.info('getUsers');
    try {
      const fetchedUsers = await getUsers();
      setUsers(fetchedUsers);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  };

  return (
    <div>
      <p>users works!</p>
      <button
        type="button"
        onClick={handleGetUsers}
        style={{
          backgroundColor: '#f44336',
          color: 'white',
          padding: '8px 16px',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          textTransform: 'uppercase',
          fontWeight: 500,
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
};
