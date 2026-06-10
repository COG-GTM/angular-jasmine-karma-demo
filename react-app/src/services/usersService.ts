// Application service ported from src/app/user/application/UsersServices.ts.
// The Angular version used RxJS HttpClient; this uses fetch + async/await with
// AbortController for cancellation. The endpoint and data contract are unchanged.

export const USERS_URL = 'https://jsonplaceholder.typicode.com/users';

export interface User {
  id?: number;
  name: string;
  [key: string]: unknown;
}

export class UsersService {
  private url = USERS_URL;

  async getUsers(signal?: AbortSignal): Promise<User[]> {
    const response = await fetch(this.url, { signal });
    if (!response.ok) {
      throw new Error(
        `Request failed with status ${response.status} ${response.statusText}`,
      );
    }
    return (await response.json()) as User[];
  }
}

// Singleton instance mirroring Angular's `providedIn: 'root'` behaviour.
export const usersService = new UsersService();
