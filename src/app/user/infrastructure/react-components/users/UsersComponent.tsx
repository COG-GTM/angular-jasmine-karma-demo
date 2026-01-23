import React from 'react';
import { useUsers } from './useUsers';

export const UsersComponent: React.FC = () => {
  const { users, loading, error, getUsers } = useUsers();

  return (
    <div>
      <p>users works!</p>
      <button
        type="button"
        onClick={getUsers}
        style={{
          backgroundColor: '#f44336',
          color: 'white',
          padding: '8px 16px',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontWeight: 500,
          textTransform: 'uppercase',
          boxShadow: '0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12)',
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
