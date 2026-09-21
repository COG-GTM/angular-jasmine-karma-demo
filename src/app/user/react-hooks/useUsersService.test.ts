import { createUsersService } from './useUsersService';

describe('createUsersService', () => {
  it('should GET users from jsonplaceholder', async () => {
    const users = [{ id: 1, name: 'Leanne Graham', username: 'Bret', email: 'a@b.c' }];
    const fetchFn = vi.fn().mockResolvedValue({ ok: true, json: () => Promise.resolve(users) });
    const service = createUsersService(fetchFn as unknown as typeof fetch);

    await expect(service.getUsers()).resolves.toEqual(users);
    expect(fetchFn).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users');
  });

  it('should reject on non-ok response', async () => {
    const fetchFn = vi.fn().mockResolvedValue({ ok: false, status: 500 });
    const service = createUsersService(fetchFn as unknown as typeof fetch);

    await expect(service.getUsers()).rejects.toThrow('500');
  });
});
