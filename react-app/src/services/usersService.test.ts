import { afterEach, describe, expect, it, vi } from 'vitest';
import { getUsers, USERS_URL } from './usersService';

describe('usersService', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('requests the users endpoint with GET semantics', async () => {
    const fetchMock = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValue(new Response('[]', { status: 200 }));

    await getUsers();

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock.mock.calls[0][0]).toBe(USERS_URL);
  });

  it('returns the users payload on success', async () => {
    const users = [
      { id: 1, name: 'Leanne Graham', email: 'leanne@example.com' },
      { id: 2, name: 'Ervin Howell', email: 'ervin@example.com' },
    ];
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify(users), { status: 200 })
    );

    await expect(getUsers()).resolves.toEqual(users);
  });

  it('returns an empty array when the API has no users', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response('[]', { status: 200 }));

    await expect(getUsers()).resolves.toEqual([]);
  });

  it('throws on a 404 response', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response('Not Found', { status: 404 })
    );

    await expect(getUsers()).rejects.toThrow('Request failed with status 404');
  });

  it('throws on a 500 response', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response('Internal Server Error', { status: 500 })
    );

    await expect(getUsers()).rejects.toThrow('Request failed with status 500');
  });

  it('propagates network errors', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new TypeError('Network Error'));

    await expect(getUsers()).rejects.toThrow('Network Error');
  });

  it('forwards the abort signal to fetch', async () => {
    const fetchMock = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValue(new Response('[]', { status: 200 }));
    const controller = new AbortController();

    await getUsers(controller.signal);

    expect(fetchMock.mock.calls[0][1]).toEqual({ signal: controller.signal });
  });
});
