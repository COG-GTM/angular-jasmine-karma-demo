import { useState } from 'react';
import { User } from '../models/user';

function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);

  const getUsers = () => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((data: User[]) => setUsers(data))
      .catch((error) => console.error('Error fetching users:', error));
  };

  return (
    <div>
      <p>users works!</p>
      <button onClick={getUsers}>Get Users</button>
      {users.length > 0 && (
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.name} ({user.email})</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default UsersPage;
