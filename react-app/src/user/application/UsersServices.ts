export const USERS_URL = 'https://jsonplaceholder.typicode.com/users';

export interface User {
  id: number;
  name: string;
  [key: string]: unknown;
}

export async function getUsers(): Promise<User[]> {
  const response = await fetch(USERS_URL);
  if (!response.ok) throw new Error(`Failed to fetch users: ${response.status}`);
  return (await response.json()) as User[];
}
