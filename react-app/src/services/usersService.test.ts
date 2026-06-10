import { UsersService, USERS_URL } from './usersService';

// Converted from UsersServices.service.spec.ts (HttpTestingController -> fetch mock)
describe('UsersService', () => {
  let service: UsersService;

  beforeEach(() => {
    service = new UsersService();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const mockFetch = (impl: (input: RequestInfo | URL) => Promise<Response>) => {
    return vi.spyOn(globalThis, 'fetch').mockImplementation(impl as typeof fetch);
  };

  it('makes a GET request to the correct URL', async () => {
    const fetchSpy = mockFetch(async () =>
      new Response(JSON.stringify([]), { status: 200 }),
    );

    await service.getUsers();

    expect(fetchSpy).toHaveBeenCalledTimes(1);
    expect(fetchSpy).toHaveBeenCalledWith(USERS_URL, expect.anything());
  });

  it('returns users data on a successful response', async () => {
    const mockUsers = [
      { id: 1, name: 'Leanne Graham', email: 'leanne@example.com' },
      { id: 2, name: 'Ervin Howell', email: 'ervin@example.com' },
    ];
    mockFetch(async () =>
      new Response(JSON.stringify(mockUsers), { status: 200 }),
    );

    const users = await service.getUsers();
    expect(users).toEqual(mockUsers);
    expect(users).toHaveLength(2);
  });

  it('handles an empty response array', async () => {
    mockFetch(async () => new Response(JSON.stringify([]), { status: 200 }));
    const users = await service.getUsers();
    expect(users).toEqual([]);
  });

  it('throws on a 404 Not Found response', async () => {
    mockFetch(async () =>
      new Response('Not Found', { status: 404, statusText: 'Not Found' }),
    );
    await expect(service.getUsers()).rejects.toThrow(/404/);
  });

  it('throws on a 500 Internal Server Error response', async () => {
    mockFetch(async () =>
      new Response('Server Error', {
        status: 500,
        statusText: 'Internal Server Error',
      }),
    );
    await expect(service.getUsers()).rejects.toThrow(/500/);
  });

  it('propagates network errors', async () => {
    mockFetch(async () => {
      throw new TypeError('Network Error');
    });
    await expect(service.getUsers()).rejects.toThrow('Network Error');
  });

  it('passes the AbortSignal through to fetch', async () => {
    const fetchSpy = mockFetch(async () =>
      new Response(JSON.stringify([]), { status: 200 }),
    );
    const controller = new AbortController();

    await service.getUsers(controller.signal);

    expect(fetchSpy).toHaveBeenCalledWith(USERS_URL, { signal: controller.signal });
  });
});
