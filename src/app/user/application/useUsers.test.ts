import { renderHook, act, waitFor } from '@testing-library/react';
import { useUsers } from './useUsers';

const mockUsers = [
  { id: 1, name: 'Leanne Graham', username: 'Bret', email: 'Sincere@april.biz', address: { street: 'Kulas Light', suite: 'Apt. 556', city: 'Gwenborough', zipcode: '92998-3874', geo: { lat: '-37.3159', lng: '81.1496' } }, phone: '1-770-736-8031 x56442', website: 'hildegard.org', company: { name: 'Romaguera-Crona', catchPhrase: 'Multi-layered client-server neural-net', bs: 'harness real-time e-markets' } },
  { id: 2, name: 'Ervin Howell', username: 'Antonette', email: 'Shanna@melissa.tv', address: { street: 'Victor Plains', suite: 'Suite 879', city: 'Wisokyburgh', zipcode: '90566-7771', geo: { lat: '-43.9509', lng: '-34.4618' } }, phone: '010-692-6593 x09125', website: 'anastasia.net', company: { name: 'Deckow-Crist', catchPhrase: 'Proactive didactic contingency', bs: 'synergize scalable supply-chains' } },
  { id: 3, name: 'Clementine Bauch', username: 'Samantha', email: 'Nathan@yesenia.net', address: { street: 'Douglas Extension', suite: 'Suite 847', city: 'McKenziehaven', zipcode: '59590-4157', geo: { lat: '-68.6102', lng: '-47.0653' } }, phone: '1-463-123-4447', website: 'ramiro.info', company: { name: 'Romaguera-Jacobson', catchPhrase: 'Face to face bifurcated interface', bs: 'e-enable strategic applications' } },
];

describe('useUsers hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with empty users array and no loading/error state', () => {
    const { result } = renderHook(() => useUsers());

    expect(result.current.users).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(typeof result.current.fetchUsers).toBe('function');
  });

  it('should fetch users successfully', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => mockUsers,
    });

    const { result } = renderHook(() => useUsers());

    await act(async () => {
      await result.current.fetchUsers();
    });

    await waitFor(() => {
      expect(result.current.users).toEqual(mockUsers);
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe(null);
    });

    expect(global.fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users');
  });

  it('should set loading state while fetching', async () => {
    let resolvePromise: (value: unknown) => void;
    const fetchPromise = new Promise((resolve) => {
      resolvePromise = resolve;
    });

    global.fetch = jest.fn().mockReturnValueOnce(fetchPromise);

    const { result } = renderHook(() => useUsers());

    act(() => {
      result.current.fetchUsers();
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(true);
    });

    await act(async () => {
      resolvePromise!({
        ok: true,
        json: async () => mockUsers,
      });
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
  });

  it('should handle fetch error', async () => {
    global.fetch = jest.fn().mockRejectedValueOnce(new Error('Network error'));

    const { result } = renderHook(() => useUsers());

    await act(async () => {
      await result.current.fetchUsers();
    });

    await waitFor(() => {
      expect(result.current.users).toEqual([]);
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe('Network error');
    });
  });

  it('should handle HTTP error response', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    const { result } = renderHook(() => useUsers());

    await act(async () => {
      await result.current.fetchUsers();
    });

    await waitFor(() => {
      expect(result.current.users).toEqual([]);
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe('HTTP error! status: 500');
    });
  });

  it('should log getUsers to console when fetchUsers is called', async () => {
    const consoleSpy = jest.spyOn(console, 'info').mockImplementation();
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => mockUsers,
    });

    const { result } = renderHook(() => useUsers());

    await act(async () => {
      await result.current.fetchUsers();
    });

    expect(consoleSpy).toHaveBeenCalledWith('getUsers');
    consoleSpy.mockRestore();
  });
});
