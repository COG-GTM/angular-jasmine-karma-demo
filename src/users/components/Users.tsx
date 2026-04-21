import { useState } from "react";

import { usersService, type User } from "../services/usersService";

/**
 * Users: React port of the Angular `UsersComponent`.
 *
 * Angular patterns replaced:
 *   - Constructor-injected `UsersServices` → imported `usersService` module.
 *   - `Observable<any>` + `.subscribe(...)` → `await usersService.getUsers()`.
 *   - `*ngFor="let user of users"` → `users.map(...)` JSX.
 *
 * The `getUsers` function is exported alongside the component so tests can
 * stub the service with `vi.spyOn(usersService, 'getUsers')` — the same
 * testing pattern used in the Angular spec with Jasmine's `spyOn`.
 */
export function Users() {
  const [users, setUsers] = useState<User[]>([]);

  const getUsers = async () => {
    // eslint-disable-next-line no-console
    console.info("getUsers");
    const response = await usersService.getUsers();
    setUsers(response);
  };

  return (
    <div>
      <p>users works!</p>
      <button
        type="button"
        className="get-users-button"
        onClick={() => {
          // Kick off the async call; React will re-render when state updates.
          void getUsers();
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

export default Users;
