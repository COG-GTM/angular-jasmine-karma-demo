import type { User } from '../domain/user.model';

export class UsersService {
  private readonly url = 'https://jsonplaceholder.typicode.com/users';

  async getUsers(): Promise<User[]> {
    const response = await fetch(this.url);
    if (!response.ok) {
      throw new Error(`Failed to load users: ${response.status}`);
    }
    return (await response.json()) as User[];
  }
}

export const usersService = new UsersService();
