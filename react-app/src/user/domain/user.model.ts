// Shape returned by https://jsonplaceholder.typicode.com/users (only id/name are guaranteed).
export interface User {
  id: number;
  name: string;
  [key: string]: unknown;
}
