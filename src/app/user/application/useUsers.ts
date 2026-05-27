import { useState, useCallback } from 'react';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface UseUsersResult {
  users: User[];
  getUsers: () => void;
}

const USERS_API_URL = 'https://jsonplaceholder.typicode.com/users';

export const useUsers = (): UseUsersResult => {
  const [users, setUsers] = useState<User[]>([]);

  const getUsers = useCallback(() => {
    console.info('getUsers');
    fetch(USERS_API_URL)
      .then((response) => response.json())
      .then((data: User[]) => {
        setUsers(data);
      });
  }, []);

  return { users, getUsers };
};
