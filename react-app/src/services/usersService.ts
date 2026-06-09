import type { User } from '../types/user';

const url = 'https://jsonplaceholder.typicode.com/users';

/**
 * Ported from Angular's UsersServices (HttpClient + RxJS) to fetch + async/await.
 * Accepts an optional AbortSignal so callers can cancel in-flight requests
 * (e.g. from a useEffect cleanup) the way the Observable could be unsubscribed.
 */
export async function getUsers(signal?: AbortSignal): Promise<User[]> {
  const response = await fetch(url, { signal });
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  return (await response.json()) as User[];
}

export const usersService = { getUsers };
