import type { User } from '../domain/user.model';

export class UsersServices {
  private url = 'https://jsonplaceholder.typicode.com/users';

  async getUsers(): Promise<User[]> {
    const response = await fetch(this.url);
    return (await response.json()) as User[];
  }
}

export const usersServices = new UsersServices();
