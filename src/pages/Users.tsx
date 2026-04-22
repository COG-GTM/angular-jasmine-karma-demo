import { useState } from "react";
import { getUsers, type User } from "../services/usersService";

export function Users() {
  const [users, setUsers] = useState<User[]>([]);

  const handleGetUsers = async () => {
    console.info("getUsers");
    try {
      const fetched = await getUsers();
      setUsers(fetched);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="users">
      <p>users works!</p>
      <button
        type="button"
        className="mat-raised-button mat-warn"
        onClick={handleGetUsers}
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

export default Users;
