import { useCallback, useState } from 'react';

/**
 * React port of `UsersServices` (`src/app/user/application/UsersServices.ts`).
 *
 * The Angular service exposed a single `getUsers(): Observable<Object>` method
 * backed by `HttpClient`. The framework-free equivalent used here is the
 * built-in `fetch` API (see `~/notes.md` for the rationale for choosing
 * `fetch` over `axios`). The public method name `getUsers` is preserved so the
 * hook API mirrors the original Angular service signature; the return type is
 * the idiomatic JS equivalent — `Promise<User[]>` instead of
 * `Observable<Object>`.
 *
 * The HTTP endpoint, method and request shape are preserved exactly:
 *   GET https://jsonplaceholder.typicode.com/users
 */

export const USERS_ENDPOINT = 'https://jsonplaceholder.typicode.com/users';

export interface UserAddressGeo {
  lat: string;
  lng: string;
}

export interface UserAddress {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: UserAddressGeo;
}

export interface UserCompany {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: UserAddress;
  phone: string;
  website: string;
  company: UserCompany;
}

export async function fetchUsers(): Promise<User[]> {
  const response = await fetch(USERS_ENDPOINT);
  if (!response.ok) {
    throw new Error(`Failed to fetch users: ${response.status} ${response.statusText}`);
  }
  const data: unknown = await response.json();
  return data as User[];
}

export interface UseUsersResult {
  users: User[];
  getUsers: () => Promise<User[]>;
}

export function useUsers(): UseUsersResult {
  const [users, setUsers] = useState<User[]>([]);

  const getUsers = useCallback(async (): Promise<User[]> => {
    // eslint-disable-next-line no-console
    console.info('getUsers');
    const next = await fetchUsers();
    setUsers(next);
    return next;
  }, []);

  return { users, getUsers };
}
