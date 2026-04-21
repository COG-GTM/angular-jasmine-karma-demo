/**
 * usersService: React port of the Angular `UsersServices` class.
 *
 * Angular patterns replaced:
 *   - `@Injectable({ providedIn: 'root' })` + `HttpClient` → a plain module
 *     with a `getUsers()` function that uses the browser's `fetch` API.
 *   - `Observable<any>` → `Promise<User[]>`.
 *
 * Tests can replace `getUsers` with a stub/spy using `vi.mock()` or
 * `vi.spyOn()` (the Vitest/Jest equivalents of Jasmine's `spyOn`).
 */
export interface User {
  id: number;
  name: string;
  [key: string]: unknown;
}

const URL = "https://jsonplaceholder.typicode.com/users";

export async function getUsers(): Promise<User[]> {
  const response = await fetch(URL);
  if (!response.ok) {
    throw new Error(`Failed to fetch users: ${response.status}`);
  }
  return (await response.json()) as User[];
}

// Exported as an object so components can call `usersService.getUsers()` —
// mirroring the Angular `this.usersServices.getUsers()` pattern and making
// it easy to spy on the method with `vi.spyOn(usersService, 'getUsers')`.
export const usersService = { getUsers };
