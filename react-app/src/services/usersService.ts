import type { User } from '../types/user';

export const USERS_URL = 'https://jsonplaceholder.typicode.com/users';

export async function getUsers(signal?: AbortSignal): Promise<User[]> {
  const response = await fetch(USERS_URL, { signal });
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  return response.json();
}
