import type { User } from '../domain/user.model';

export const USERS_URL = 'https://jsonplaceholder.typicode.com/users';

// Placeholder: replaced by the Users child (fetch port of UsersServices.getUsers()).
export async function getUsers(): Promise<User[]> {
  return [];
}
