import { useState, useEffect, useCallback } from 'react';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

interface UseUsersResult {
  users: User[];
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

const USERS_API_URL = 'https://jsonplaceholder.typicode.com/users';

/**
 * React custom hook that replaces the Angular UsersServices.
 * Fetches users from the JSONPlaceholder API.
 *
 * Angular equivalent:
 * - @Injectable({ providedIn: 'root' }) -> Custom hook (module singleton)
 * - HttpClient.get() -> fetch()
 * - Observable<any> -> Promise<User[]> with useState
 * - Constructor injection -> Hook internal state
 */
export const useUsers = (): UseUsersResult => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchUsers = useCallback(async (): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(USERS_API_URL);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: User[] = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An unknown error occurred'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return {
    users,
    loading,
    error,
    refetch: fetchUsers,
  };
};

/**
 * Standalone async function for fetching users without React hooks.
 * Useful for non-component contexts or when you need direct Promise access.
 *
 * This is the direct equivalent of Angular's UsersServices.getUsers() method.
 */
export const getUsers = async (): Promise<User[]> => {
  const response = await fetch(USERS_API_URL);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

export type { User, UseUsersResult };
