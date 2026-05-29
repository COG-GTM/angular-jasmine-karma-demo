import { describe, it, expect, vi, afterEach } from 'vitest';
import { getUsers } from './users-service';

describe('UsersService', () => {
  const originalFetch = globalThis.fetch;

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  it('should make GET request to correct URL', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      json: () => Promise.resolve([]),
    });
    globalThis.fetch = mockFetch;

    await getUsers();
    expect(mockFetch).toHaveBeenCalledWith(
      'https://jsonplaceholder.typicode.com/users',
      expect.objectContaining({})
    );
  });

  it('should return users data on successful response', async () => {
    const mockUsers = [
      { id: 1, name: 'Leanne Graham', email: 'leanne@example.com' },
      { id: 2, name: 'Ervin Howell', email: 'ervin@example.com' },
    ];
    globalThis.fetch = vi.fn().mockResolvedValue({
      json: () => Promise.resolve(mockUsers),
    });

    const result = await getUsers();
    expect(result).toEqual(mockUsers);
    expect(result.length).toBe(2);
  });

  it('should handle empty response array', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      json: () => Promise.resolve([]),
    });

    const result = await getUsers();
    expect(result).toEqual([]);
    expect(result.length).toBe(0);
  });

  it('should pass AbortSignal when provided', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      json: () => Promise.resolve([]),
    });
    globalThis.fetch = mockFetch;

    const controller = new AbortController();
    await getUsers(controller.signal);
    expect(mockFetch).toHaveBeenCalledWith(
      'https://jsonplaceholder.typicode.com/users',
      { signal: controller.signal }
    );
  });
});
