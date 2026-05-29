import type { User } from '../types';

const URL = 'https://jsonplaceholder.typicode.com/users';

export async function getUsers(signal?: AbortSignal): Promise<User[]> {
  const res = await fetch(URL, { signal });
  if (!res.ok) throw new Error(`HTTP error ${res.status}`);
  return res.json();
}
