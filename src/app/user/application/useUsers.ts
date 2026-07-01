import { useCallback } from 'react';
import { User } from '../domain/user.model';

const USERS_URL = 'https://jsonplaceholder.typicode.com/users';

// React equivalent of the Angular `UsersServices` (mimics the service with a hook).
// TODO: the Angular service uses `HttpClient` (Angular DI + interceptors). Here it is
// replaced by `fetch`. If a shared HTTP client / auth interceptors are introduced,
// route the request through them here.
export const useUsers = () => {
  const getUsers = useCallback(async (): Promise<User[]> => {
    const response = await fetch(USERS_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch users: ${response.status}`);
    }
    return (await response.json()) as User[];
  }, []);

  return { getUsers };
};
