import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getUsers } from './usersService';

const URL = 'https://jsonplaceholder.typicode.com/users';

function mockFetchOnce(value: unknown, ok = true, status = 200) {
  return vi.fn().mockResolvedValue({
    ok,
    status,
    json: async () => value,
  } as Response);
}

describe('usersService.getUsers (ported from UsersServices)', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('makes a GET request to the correct URL', async () => {
    const fetchMock = mockFetchOnce([]);
    vi.stubGlobal('fetch', fetchMock);

    await getUsers();

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(URL, { signal: undefined });
  });

  it('returns users data on a successful response', async () => {
    const mockUsers = [
      { id: 1, name: 'Leanne Graham', email: 'leanne@example.com' },
      { id: 2, name: 'Ervin Howell', email: 'ervin@example.com' },
      { id: 3, name: 'Clementine Bauch', email: 'clementine@example.com' },
    ];
    vi.stubGlobal('fetch', mockFetchOnce(mockUsers));

    const users = await getUsers();

    expect(users).toEqual(mockUsers);
    expect(users.length).toBe(3);
  });

  it('handles an empty response array', async () => {
    vi.stubGlobal('fetch', mockFetchOnce([]));

    const users = await getUsers();

    expect(users).toEqual([]);
    expect(users.length).toBe(0);
  });

  it('returns the correct data structure', async () => {
    const mockUsers = [
      {
        id: 1,
        name: 'Leanne Graham',
        username: 'Bret',
        email: 'Sincere@april.biz',
      },
    ];
    vi.stubGlobal('fetch', mockFetchOnce(mockUsers));

    const users = await getUsers();

    expect(Array.isArray(users)).toBe(true);
    expect(users[0]).toHaveProperty('id');
    expect(users[0]).toHaveProperty('name');
    expect(users[0]).toHaveProperty('email');
    expect(users[0].id).toBe(1);
    expect(users[0].name).toBe('Leanne Graham');
  });

  it('throws on a 404 Not Found response', async () => {
    vi.stubGlobal('fetch', mockFetchOnce('Not Found', false, 404));
    await expect(getUsers()).rejects.toThrow('status 404');
  });

  it('throws on a 500 Internal Server Error response', async () => {
    vi.stubGlobal('fetch', mockFetchOnce('Server Error', false, 500));
    await expect(getUsers()).rejects.toThrow('status 500');
  });

  it('propagates network errors', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockRejectedValue(new Error('Network Error'))
    );
    await expect(getUsers()).rejects.toThrow('Network Error');
  });

  it('passes the AbortSignal through to fetch', async () => {
    const fetchMock = mockFetchOnce([]);
    vi.stubGlobal('fetch', fetchMock);
    const controller = new AbortController();

    await getUsers(controller.signal);

    expect(fetchMock).toHaveBeenCalledWith(URL, { signal: controller.signal });
  });
});
