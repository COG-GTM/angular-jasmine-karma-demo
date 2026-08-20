import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import Users from './Users';

describe('Users page', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders the static content and the Get Users button', () => {
    render(<Users />);

    expect(screen.getByText('users works!')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Get Users' })).toBeInTheDocument();
    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
  });

  it('loads and renders users when the button is clicked', async () => {
    const users = [
      { id: 1, name: 'User1' },
      { id: 2, name: 'User2' },
    ];
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify(users), { status: 200 })
    );
    const info = vi.spyOn(console, 'info').mockImplementation(() => {});

    render(<Users />);
    await userEvent.click(screen.getByRole('button', { name: 'Get Users' }));

    expect(await screen.findByText('User1')).toBeInTheDocument();
    expect(screen.getByText('User2')).toBeInTheDocument();
    expect(info).toHaveBeenCalledWith('getUsers');
  });

  it('keeps the list empty and logs when the request fails', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response('boom', { status: 500 }));
    const error = vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(console, 'info').mockImplementation(() => {});

    render(<Users />);
    await userEvent.click(screen.getByRole('button', { name: 'Get Users' }));

    expect(error).toHaveBeenCalled();
    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
  });
});
