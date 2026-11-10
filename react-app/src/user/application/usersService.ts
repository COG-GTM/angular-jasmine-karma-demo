export const USERS_URL = 'https://jsonplaceholder.typicode.com/users';

export interface User {
  name: string;
  [key: string]: unknown;
}

/** Port of UsersServices.getUsers(): GET the jsonplaceholder users list; pass a signal to cancel. */
export async function getUsers(signal?: AbortSignal): Promise<User[]> {
  const response = await fetch(USERS_URL, { signal });
  if (!response.ok) {
    throw new Error(`GET ${USERS_URL} failed: ${response.status} ${response.statusText}`);
  }
  return (await response.json()) as User[];
}
