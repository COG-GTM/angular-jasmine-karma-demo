export interface User {
  id: number;
  name: string;
  username?: string;
  email?: string;
  [key: string]: unknown;
}
