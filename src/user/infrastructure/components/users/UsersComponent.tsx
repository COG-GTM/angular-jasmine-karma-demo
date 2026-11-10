import { useEffect, useRef, useState } from 'react';
import Button from '@mui/material/Button';
import { getUsers, type User } from '../../../application/usersService';

/** Port of users.component: "Get Users" fetches jsonplaceholder users and lists their names. */
export default function UsersComponent() {
  const [users, setUsers] = useState<User[]>([]);
  const controllers = useRef(new Set<AbortController>());

  useEffect(() => {
    const pending = controllers.current;
    return () => {
      pending.forEach((controller) => controller.abort());
      pending.clear();
    };
  }, []);

  const onGetUsers = () => {
    console.info('getUsers');
    const controller = new AbortController();
    controllers.current.add(controller);
    getUsers(controller.signal)
      .then(setUsers)
      .catch((error: unknown) => {
        if (!controller.signal.aborted) console.error(error);
      })
      .finally(() => controllers.current.delete(controller));
  };

  return (
    <>
      <p>users works!</p>
      <Button type="button" variant="contained" color="error" onClick={onGetUsers}>
        Get Users
      </Button>
      <div>
        <ul>
          {users.map((user, index) => (
            <li key={index}>{user.name}</li>
          ))}
        </ul>
      </div>
    </>
  );
}
