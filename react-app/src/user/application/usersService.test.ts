import { getUsers, USERS_URL, UsersRequestError } from './usersService';

function createResponse(data: unknown, status = 200, statusText = 'OK') {
  return new Response(JSON.stringify(data), {
    status,
    statusText,
    headers: { 'Content-Type': 'application/json' },
  });
}

describe('UsersServices', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('should be created', () => {
    // Arrange

    // Act
    const service = getUsers;

    // Assert
    expect(service).toBeTruthy();
    expect(USERS_URL).toBe('https://jsonplaceholder.typicode.com/users');
  });

  it('should be properly injected', async () => {
    // Arrange
    vi.mocked(fetch).mockResolvedValue(createResponse([]));

    // Act
    const result = getUsers();

    // Assert
    expect(getUsers).toBeInstanceOf(Function);
    expect(result).toBeInstanceOf(Promise);
    expect(globalThis.fetch).toBe(fetch);
    expect(vi.isMockFunction(fetch)).toBe(true);
    await expect(result).resolves.toEqual([]);
  });

  describe('getUsers()', () => {
    it('should make HTTP GET request to correct URL', async () => {
      // Arrange
      vi.mocked(fetch).mockResolvedValue(createResponse([]));

      // Act
      await getUsers();

      // Assert
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(USERS_URL, expect.objectContaining({ method: 'GET' }));
    });

    it('should return users data on successful response', async () => {
      // Arrange
      const mockUsers = [
        { id: 1, name: 'Leanne Graham', email: 'leanne@example.com' },
        { id: 2, name: 'Ervin Howell', email: 'ervin@example.com' },
        { id: 3, name: 'Clementine Bauch', email: 'clementine@example.com' },
      ];
      vi.mocked(fetch).mockResolvedValue(createResponse(mockUsers));

      // Act
      const users = await getUsers();

      // Assert
      expect(users).toEqual(mockUsers);
      expect(users.length).toBe(3);
    });

    it('should handle empty response array', async () => {
      // Arrange
      const mockUsers: unknown[] = [];
      vi.mocked(fetch).mockResolvedValue(createResponse(mockUsers));

      // Act
      const users = await getUsers();

      // Assert
      expect(users).toEqual([]);
      expect(users.length).toBe(0);
    });

    it('should handle response data structure correctly', async () => {
      // Arrange
      const mockUsers = [
        {
          id: 1,
          name: 'Leanne Graham',
          username: 'Bret',
          email: 'Sincere@april.biz',
          address: {
            street: 'Kulas Light',
            suite: 'Apt. 556',
            city: 'Gwenborough',
            zipcode: '92998-3874',
          },
        },
      ];
      vi.mocked(fetch).mockResolvedValue(createResponse(mockUsers));

      // Act
      const users = await getUsers();

      // Assert
      expect(Array.isArray(users)).toBe(true);
      expect(users[0]).toHaveProperty('id');
      expect(users[0]).toHaveProperty('name');
      expect(users[0]).toHaveProperty('email');
      expect(users[0].id).toBe(1);
      expect(users[0].name).toBe('Leanne Graham');
    });

    it('should handle 404 Not Found error', async () => {
      // Arrange
      vi.mocked(fetch).mockResolvedValue(createResponse('Not Found', 404, 'Not Found'));

      // Act
      const request = getUsers();

      // Assert
      await expect(request).rejects.toBeInstanceOf(UsersRequestError);
      await expect(request).rejects.toMatchObject({ status: 404, statusText: 'Not Found' });
    });

    it('should handle 500 Internal Server Error', async () => {
      // Arrange
      vi.mocked(fetch).mockResolvedValue(
        createResponse('Internal Server Error', 500, 'Internal Server Error'),
      );

      // Act
      const request = getUsers();

      // Assert
      await expect(request).rejects.toBeInstanceOf(UsersRequestError);
      await expect(request).rejects.toMatchObject({
        status: 500,
        statusText: 'Internal Server Error',
      });
    });

    it('should handle network error', async () => {
      // Arrange
      vi.mocked(fetch).mockRejectedValue(new TypeError('Network Error'));

      // Act
      const request = getUsers();

      // Assert
      await expect(request).rejects.toThrow('Network Error');
      await expect(request).rejects.not.toBeInstanceOf(UsersRequestError);
    });

    it('should handle 403 Forbidden error', async () => {
      // Arrange
      vi.mocked(fetch).mockResolvedValue(createResponse('Access forbidden', 403, 'Forbidden'));

      // Act
      const request = getUsers();

      // Assert
      await expect(request).rejects.toBeInstanceOf(UsersRequestError);
      await expect(request).rejects.toMatchObject({ status: 403, statusText: 'Forbidden' });
    });

    it('should handle multiple concurrent requests', async () => {
      // Arrange
      const users1 = [{ id: 1, name: 'User 1' }];
      const users2 = [{ id: 2, name: 'User 2' }];
      vi.mocked(fetch)
        .mockResolvedValueOnce(createResponse(users1))
        .mockResolvedValueOnce(createResponse(users2));

      // Act
      const results = await Promise.all([getUsers(), getUsers()]);

      // Assert
      expect(fetch).toHaveBeenCalledTimes(2);
      expect(results).toEqual([users1, users2]);
    });
  });
});
