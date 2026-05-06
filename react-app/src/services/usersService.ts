import type { User } from '../models/user.model';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

export async function getUsers(): Promise<User[]> {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}
