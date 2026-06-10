import { useEffect, useRef, useState } from 'react';
import { Button } from '@mui/material';
import { usersService, type User } from '../../services/usersService';

// Ported from users.component.ts / .html
// Angular's injected UsersServices + RxJS subscribe becomes a fetch-based
// service call. An AbortController cancels any in-flight request on unmount.
export const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const controllerRef = useRef<AbortController | null>(null);

  const getUsers = async () => {
    console.info('getUsers');
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;
    try {
      const result = await usersService.getUsers(controller.signal);
      setUsers(result);
    } catch (error) {
      if ((error as Error)?.name !== 'AbortError') {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    return () => controllerRef.current?.abort();
  }, []);

  return (
    <>
      <p>users works!</p>
      <Button type="button" variant="contained" color="warning" onClick={getUsers}>
        Get Users
      </Button>
      <div>
        <ul>
          {Array.isArray(users) &&
            users.map((user, index) => <li key={index}>{user.name}</li>)}
        </ul>
      </div>
    </>
  );
};
