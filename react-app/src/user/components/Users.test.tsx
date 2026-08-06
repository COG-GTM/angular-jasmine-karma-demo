import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import Users from './Users';

describe('Users', () => {
  it('renders the initial state without fetching users', () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch');

    render(<Users />);

    expect(screen.getByText('users works!')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Get Users' })).toBeInTheDocument();
    expect(fetchSpy).not.toHaveBeenCalled();

    fetchSpy.mockRestore();
  });

  it('fetches users after clicking Get Users and renders their names', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => [
        { id: 1, name: 'User One' },
        { id: 2, name: 'User Two' },
      ],
    } as Response);
    const infoSpy = vi.spyOn(console, 'info').mockImplementation(() => undefined);

    render(<Users />);
    fireEvent.click(screen.getByRole('button', { name: 'Get Users' }));

    expect(infoSpy).toHaveBeenCalledWith('getUsers');
    await waitFor(() => {
      expect(screen.getByText('User One')).toBeInTheDocument();
      expect(screen.getByText('User Two')).toBeInTheDocument();
    });
    expect(fetchSpy).toHaveBeenCalledTimes(1);

    fetchSpy.mockRestore();
    infoSpy.mockRestore();
  });
});
