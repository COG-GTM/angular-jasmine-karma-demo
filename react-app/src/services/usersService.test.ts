import { afterEach, describe, expect, it, vi } from 'vitest';
import { getUsers } from './usersService';

describe('usersService', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('returns the users returned by the API', async () => {
    const users = [{ id: 1, name: 'Leanne Graham' }];
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ ok: true, json: async () => users }),
    );

    await expect(getUsers()).resolves.toEqual(users);
    expect(fetch).toHaveBeenCalledWith(
      'https://jsonplaceholder.typicode.com/users',
      expect.anything(),
    );
  });

  it('throws when the response is not ok', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 500 }));

    await expect(getUsers()).rejects.toThrow('Failed to fetch users: 500');
  });
});
