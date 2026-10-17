export const USERS_URL = "https://jsonplaceholder.typicode.com/users";

export interface User {
  id: number;
  name: string;
  [key: string]: unknown;
}

export class UsersRequestError extends Error {
  constructor(public readonly status: number, public readonly statusText: string) {
    super(`GET ${USERS_URL} failed: ${status} ${statusText}`);
    this.name = 'UsersRequestError';
  }
}

export async function getUsers(): Promise<User[]> {
  const response = await fetch(USERS_URL, { method: 'GET' });
  if (!response.ok) throw new UsersRequestError(response.status, response.statusText);
  return (await response.json()) as User[];
}
