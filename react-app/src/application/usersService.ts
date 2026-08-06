export interface User {
  id: number;
  name: string;
}

const usersUrl = 'https://jsonplaceholder.typicode.com/users';

export async function getUsers(): Promise<User[]> {
  const response = await fetch(usersUrl);
  if (!response.ok) {
    throw new Error(`Unable to fetch users: ${response.status}`);
  }
  return (await response.json()) as User[];
}
