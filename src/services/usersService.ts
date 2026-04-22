export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone?: string;
  website?: string;
}

const USERS_URL = "https://jsonplaceholder.typicode.com/users";

export async function getUsers(signal?: AbortSignal): Promise<User[]> {
  const response = await fetch(USERS_URL, { signal });
  if (!response.ok) {
    throw new Error(`Failed to fetch users: ${response.status} ${response.statusText}`);
  }
  return (await response.json()) as User[];
}
