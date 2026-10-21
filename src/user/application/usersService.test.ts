import type { Mock } from 'vitest';
import type { User } from '../domain/user.model';
import { getUsers, USERS_URL, UsersHttpError } from './usersService';

// Port of UsersServices.service.spec.ts.
// Angular's HttpTestingController intercepted HttpClient requests so no real network call
// was made. In React the service uses the global `fetch`, so we replace it with a test
// double (vi.stubGlobal) that records each call and returns a canned Response.
function jsonResponse(body: unknown, init: ResponseInit = { status: 200, statusText: 'OK' }) {
  return new Response(JSON.stringify(body), {
    ...init,
    headers: { 'Content-Type': 'application/json' },
  });
}

function textResponse(body: string, status: number, statusText: string) {
  return new Response(body, { status, statusText });
}

describe('usersService', () => {
  let fetchMock: Mock<typeof fetch>;

  beforeEach(() => {
    fetchMock = vi.fn<typeof fetch>();
    vi.stubGlobal('fetch', fetchMock);
  });

  afterEach(() => {
    // Equivalent of httpMock.verify() + teardown: restore the real fetch after each test.
    vi.unstubAllGlobals();
  });

  it('should be created', () => {
    // A plain module replaces the injectable service: its public API must exist.
    expect(typeof getUsers).toBe('function');
  });

  it('should be properly wired (URL constant and fetch double in place)', () => {
    expect(USERS_URL).toBe('https://jsonplaceholder.typicode.com/users');
    expect(globalThis.fetch).toBe(fetchMock);
    // Like httpMock.verify(): importing the module alone must not send any request.
    expect(fetchMock).not.toHaveBeenCalled();
  });

  describe('getUsers()', () => {
    it('should make HTTP GET request to correct URL', async () => {
      // Arrange
      const expectedUrl = 'https://jsonplaceholder.typicode.com/users';
      fetchMock.mockResolvedValue(jsonResponse([]));

      // Act
      await getUsers();

      // Assert: exactly one request (expectOne), to the right URL, with GET
      expect(fetchMock).toHaveBeenCalledTimes(1);
      const [url, init] = fetchMock.mock.calls[0];
      expect(url).toBe(expectedUrl);
      expect(init?.method ?? 'GET').toBe('GET');
    });

    it('should return users data on successful response', async () => {
      // Arrange
      const mockUsers = [
        { id: 1, name: 'Leanne Graham', email: 'leanne@example.com' },
        { id: 2, name: 'Ervin Howell', email: 'ervin@example.com' },
        { id: 3, name: 'Clementine Bauch', email: 'clementine@example.com' },
      ];
      fetchMock.mockResolvedValue(jsonResponse(mockUsers));

      // Act
      const users = await getUsers();

      // Assert
      expect(users).toEqual(mockUsers);
      expect(users).toHaveLength(3);
    });

    it('should handle empty response array', async () => {
      // Arrange
      const mockUsers: User[] = [];
      fetchMock.mockResolvedValue(jsonResponse(mockUsers));

      // Act
      const users = await getUsers();

      // Assert
      expect(users).toEqual([]);
      expect(users).toHaveLength(0);
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
      fetchMock.mockResolvedValue(jsonResponse(mockUsers));

      // Act
      const users = await getUsers();

      // Assert - verify the data structure is passed through untouched
      expect(Array.isArray(users)).toBe(true);
      expect(users[0]).toHaveProperty('id');
      expect(users[0]).toHaveProperty('name');
      expect(users[0]).toHaveProperty('email');
      expect(users[0].id).toBe(1);
      expect(users[0].name).toBe('Leanne Graham');
      expect(users[0]).toEqual(mockUsers[0]);
    });

    it('should handle 404 Not Found error', async () => {
      // Arrange
      fetchMock.mockResolvedValue(textResponse('Not Found', 404, 'Not Found'));

      // Act
      const result = getUsers();

      // Assert: the promise rejects (the "error" callback of subscribe in Angular)
      await expect(result).rejects.toBeInstanceOf(UsersHttpError);
      await expect(result).rejects.toMatchObject({ status: 404, statusText: 'Not Found' });
    });

    it('should handle 500 Internal Server Error', async () => {
      // Arrange
      fetchMock.mockResolvedValue(
        textResponse('Internal Server Error', 500, 'Internal Server Error'),
      );

      // Act
      const result = getUsers();

      // Assert
      await expect(result).rejects.toMatchObject({
        status: 500,
        statusText: 'Internal Server Error',
      });
    });

    it('should handle network error', async () => {
      // Arrange: fetch itself rejects when the network fails (Angular reported status 0)
      const networkError = new TypeError('Network Error');
      fetchMock.mockRejectedValue(networkError);

      // Act
      const result = getUsers();

      // Assert
      await expect(result).rejects.toBe(networkError);
      await expect(result).rejects.toThrow('Network Error');
    });

    it('should handle 403 Forbidden error', async () => {
      // Arrange
      const errorMessage = 'Access forbidden';
      fetchMock.mockResolvedValue(textResponse(errorMessage, 403, 'Forbidden'));

      // Act
      const result = getUsers();

      // Assert
      await expect(result).rejects.toMatchObject({ status: 403, statusText: 'Forbidden' });
    });

    it('should handle multiple concurrent requests', async () => {
      // Arrange: each call gets its own response (httpMock.match + flush per request)
      const mockUsers1 = [{ id: 1, name: 'User 1' }];
      const mockUsers2 = [{ id: 2, name: 'User 2' }];
      fetchMock
        .mockResolvedValueOnce(jsonResponse(mockUsers1))
        .mockResolvedValueOnce(jsonResponse(mockUsers2));

      // Act
      const [users1, users2] = await Promise.all([getUsers(), getUsers()]);

      // Assert
      expect(fetchMock).toHaveBeenCalledTimes(2);
      expect(fetchMock.mock.calls.every(([url]) => url === USERS_URL)).toBe(true);
      expect(users1).toEqual(mockUsers1);
      expect(users2).toEqual(mockUsers2);
    });

    // Extra cases beyond the Angular spec: pin down the "reject on non-2xx" boundary.
    it('should resolve for any 2xx status', async () => {
      const mockUsers = [{ id: 1, name: 'Leanne Graham' }];
      fetchMock.mockResolvedValue(jsonResponse(mockUsers, { status: 203, statusText: 'OK' }));

      await expect(getUsers()).resolves.toEqual(mockUsers);
    });

    it('should not parse the body of an error response', async () => {
      const response = textResponse('not json', 500, 'Internal Server Error');
      const jsonSpy = vi.spyOn(response, 'json');
      fetchMock.mockResolvedValue(response);

      await expect(getUsers()).rejects.toBeInstanceOf(UsersHttpError);
      expect(jsonSpy).not.toHaveBeenCalled();
    });
  });
});
