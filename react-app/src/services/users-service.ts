import type { User } from '../types';

const URL = 'https://jsonplaceholder.typicode.com/users';

export async function getUsers(signal?: AbortSignal): Promise<User[]> {
  const res = await fetch(URL, { signal });
  return res.json();
}
