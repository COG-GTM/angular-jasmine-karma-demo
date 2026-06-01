import { useState, useCallback } from 'react';

export interface User {
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

interface UseUsersReturn {
  users: User[];
  loading: boolean;
  error: string | null;
  getUsers: () => Promise<void>;
}

const USERS_URL = 'https://jsonplaceholder.typicode.com/users';

export const useUsers = (): UseUsersReturn => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getUsers = useCallback(async () => {
    console.info('getUsers');
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(USERS_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: User[] = await response.json();
      setUsers(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  return { users, loading, error, getUsers };
};
