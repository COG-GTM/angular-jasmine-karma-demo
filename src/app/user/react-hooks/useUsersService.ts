import { createContext, useContext } from 'react';
import { User } from '../domain/user.model';

// React counterpart of UsersServices (application/UsersServices.ts).
export interface UsersService {
  getUsers(): Promise<User[]>;
}

const USERS_URL = 'https://jsonplaceholder.typicode.com/users';

export const createUsersService = (fetchFn: typeof fetch = fetch): UsersService => ({
  async getUsers() {
    const response = await fetchFn(USERS_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch users: ${response.status}`);
    }
    return (await response.json()) as User[];
  },
});

export const UsersServiceContext = createContext<UsersService | null>(null);

export const useUsersService = (): UsersService => {
  const service = useContext(UsersServiceContext);
  if (!service) {
    throw new Error('useUsersService must be used within a UsersServiceContext.Provider');
  }
  return service;
};
