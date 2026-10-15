export const USERS_URL = "https://jsonplaceholder.typicode.com/users";

export interface User {
  id: number;
  name: string;
  [key: string]: unknown;
}

export async function getUsers(): Promise<User[]> {
  throw new Error('not implemented');
}
