import React from 'react';
import { useUsers } from '../../hooks/useUsers';

export const UsersComponent: React.FC = () => {
  const { users, loading, error, fetchUsers } = useUsers();

  return (
    <div>
      <p>users works!</p>
      <button
        type="button"
        onClick={fetchUsers}
        style={{
          backgroundColor: '#f44336',
          color: 'white',
          padding: '8px 16px',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Get Users
      </button>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
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
