import { describe, it, expect, vi, afterEach } from 'vitest';
import { getUsers, USERS_URL } from './UsersServices';

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('getUsers', () => {
  it('returns parsed users on success', async () => {
    const users = [
      { id: 1, name: 'Leanne Graham' },
      { id: 2, name: 'Ervin Howell' },
    ];
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => users,
      }),
    );

    await expect(getUsers()).resolves.toEqual(users);
  });

  it('rejects when the response is not ok', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
        json: async () => ({}),
      }),
    );

    await expect(getUsers()).rejects.toThrow('Failed to fetch users: 500');
  });

  it('calls fetch with USERS_URL', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => [],
    });
    vi.stubGlobal('fetch', fetchMock);

    await getUsers();

    expect(fetchMock).toHaveBeenCalledWith(USERS_URL);
  });
});
