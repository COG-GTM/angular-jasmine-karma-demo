import { renderHook, act } from '@testing-library/react';
import { useUsers } from './useUsers';

const mockUsers = [
  { id: 1, name: 'foo', username: 'foo1', email: 'foo@test.com' },
  { id: 2, name: 'bar', username: 'bar1', email: 'bar@test.com' },
  { id: 3, name: 'mario', username: 'mario1', email: 'mario@test.com' },
];

describe('useUsers', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should be created with empty users', () => {
    const { result } = renderHook(() => useUsers());
    expect(result.current.users).toEqual([]);
    expect(typeof result.current.getUsers).toBe('function');
  });

  it('getUsers() should fetch and return users', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve(mockUsers),
    } as Response);

    const { result } = renderHook(() => useUsers());

    await act(async () => {
      result.current.getUsers();
    });

    expect(result.current.users).toEqual(mockUsers);
    expect(global.fetch).toHaveBeenCalledWith(
      'https://jsonplaceholder.typicode.com/users'
    );
  });
});
