import { useState } from 'react';
import { User } from '../../../domain/user.model';

// React port of the Angular `UsersComponent`.
// - Angular `@Input()`/`@Output()`: none on this component.
// - Angular `users: any = []` -> typed local state.
// - Angular `ngOnInit()` was empty, so no `useEffect` on mount is required.
export const Users = () => {
  const [users, setUsers] = useState<User[]>([]);

  const getUsers = async () => {
    console.info('getUsers');
    // TODO: wire up the users service (see step 6). Mirrors
    // `usersServices.getUsers().subscribe(users => this.users = users)`.
    setUsers([]);
  };

  return (
    <>
      <p>users works!</p>
      {/* TODO: Angular Material `mat-raised-button color="warn"` has no React
          equivalent in this repo; rendered as a plain button. */}
      <button type="button" onClick={getUsers}>
        Get Users
      </button>
      <div>
        <ul>
          {users.map((user, index) => (
            <li key={index}>{user.name}</li>
          ))}
        </ul>
      </div>
    </>
  );
};
