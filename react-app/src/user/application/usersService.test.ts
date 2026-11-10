import { getUsers, USERS_URL } from './usersService';

describe('usersService.getUsers', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('GETs the jsonplaceholder users endpoint and returns the parsed body', async () => {
    const users = [{ name: 'Leanne Graham' }, { name: 'Ervin Howell' }];
    const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify(users)));
    vi.stubGlobal('fetch', fetchMock);

    await expect(getUsers()).resolves.toEqual(users);
    expect(USERS_URL).toBe('https://jsonplaceholder.typicode.com/users');
    expect(fetchMock).toHaveBeenCalledWith(USERS_URL, { signal: undefined });
  });

  it('forwards the abort signal so the request can be cancelled', async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response('[]'));
    vi.stubGlobal('fetch', fetchMock);
    const controller = new AbortController();

    await getUsers(controller.signal);
    expect(fetchMock).toHaveBeenCalledWith(USERS_URL, { signal: controller.signal });
  });

  it('rejects on a non-2xx response', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(new Response('nope', { status: 500, statusText: 'Server Error' })),
    );
    await expect(getUsers()).rejects.toThrow('500');
  });
});
