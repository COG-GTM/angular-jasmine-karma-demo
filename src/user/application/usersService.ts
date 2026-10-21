import type { User } from '../domain/user.model';

export const USERS_URL = 'https://jsonplaceholder.typicode.com/users';

// Rejection reason for a non-2xx response, carrying the same fields Angular's
// HttpErrorResponse exposed to subscribers (status / statusText).
export class UsersHttpError extends Error {
  readonly status: number;
  readonly statusText: string;

  constructor(status: number, statusText: string) {
    super(`GET ${USERS_URL} failed: ${status} ${statusText}`);
    this.name = 'UsersHttpError';
    this.status = status;
    this.statusText = statusText;
  }
}

// Port of UsersServices.getUsers(): a single GET of the users endpoint whose JSON body is
// returned as-is. HttpClient errored on non-2xx responses, so this rejects on them too.
// Network failures reject with the TypeError thrown by fetch.
export async function getUsers(): Promise<User[]> {
  const response = await fetch(USERS_URL, { method: 'GET' });
  if (!response.ok) {
    throw new UsersHttpError(response.status, response.statusText);
  }
  return (await response.json()) as User[];
}
