import type { User } from "../models/User";

const URL = "https://jsonplaceholder.typicode.com/users";

export async function getUsers(): Promise<User[]> {
  const response = await fetch(URL);
  if (!response.ok) {
    throw new Error(`HTTP error ${response.status}`);
  }
  const data: User[] = await response.json();
  return data;
}
