export interface User {
  id: number;
  name: string;
  [key: string]: unknown;
}

// Port of UsersServices: same endpoint and request behavior as the Angular app.
const url = 'https://jsonplaceholder.typicode.com/users';

export async function getUsers(): Promise<User[]> {
  const response = await fetch(url);
  return response.json();
}
