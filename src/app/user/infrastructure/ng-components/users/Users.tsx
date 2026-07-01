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

  return null;
};
