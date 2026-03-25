import { useState, useCallback } from 'react';

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

interface UseUsersReturn {
  users: User[];
  getUsers: () => Promise<void>;
}

/**
 * Custom hook that replaces the Angular UsersServices injectable.
 *
 * Original Angular service used HttpClient to GET from the JSONPlaceholder API
 * and returned an Observable. This hook uses fetch + async/await with React state instead.
 */
export const useUsers = (): UseUsersReturn => {
  const [users, setUsers] = useState<User[]>([]);

  const getUsers = useCallback(async () => {
    console.info('getUsers');
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!response.ok) {
        throw new Error(`Failed to fetch users: ${response.status}`);
      }
      const data: User[] = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }, []);

  return { users, getUsers };
};
