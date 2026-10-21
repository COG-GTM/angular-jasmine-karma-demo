import { getUsers, USERS_URL } from './usersService';

// Placeholder smoke test: the Users child replaces this file with the UsersServices.service.spec.ts port.
describe('usersService (placeholder)', () => {
  it('exposes the jsonplaceholder users URL', () => {
    expect(USERS_URL).toBe('https://jsonplaceholder.typicode.com/users');
  });

  it('getUsers() resolves to an array', async () => {
    await expect(getUsers()).resolves.toEqual([]);
  });
});
