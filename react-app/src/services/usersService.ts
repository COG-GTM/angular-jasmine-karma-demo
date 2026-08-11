import type { User } from '../types/user';

const url = 'https://jsonplaceholder.typicode.com/users';

export async function getUsers(signal?: AbortSignal): Promise<User[]> {
  const response = await fetch(url, { signal });
  if (!response.ok) {
    throw new Error(`Failed to fetch users: ${response.status}`);
  }
  return (await response.json()) as User[];
}
