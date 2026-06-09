import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UsersPage } from './UsersPage';
import { usersService } from '../services/usersService';

describe('UsersPage (ported from UsersComponent: calling a service)', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders the placeholder text and the Get Users button', () => {
    render(<UsersPage />);
    expect(screen.getByText('users works!')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /get users/i })
    ).toBeInTheDocument();
  });

  it('starts with an empty user list', () => {
    render(<UsersPage />);
    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
  });

  it('logs to the console and calls the service when the button is clicked', async () => {
    const infoSpy = vi.spyOn(console, 'info').mockImplementation(() => {});
    const getUsersSpy = vi
      .spyOn(usersService, 'getUsers')
      .mockResolvedValue([]);

    render(<UsersPage />);
    await userEvent.click(screen.getByRole('button', { name: /get users/i }));

    expect(infoSpy).toHaveBeenCalledWith('getUsers');
    expect(getUsersSpy).toHaveBeenCalledTimes(1);
    infoSpy.mockRestore();
  });

  it('renders the user list returned by the service', async () => {
    vi.spyOn(usersService, 'getUsers').mockResolvedValue([
      { id: 1, name: 'User1' },
      { id: 2, name: 'User2' },
    ]);

    render(<UsersPage />);
    await userEvent.click(screen.getByRole('button', { name: /get users/i }));

    expect(await screen.findByText('User1')).toBeInTheDocument();
    expect(screen.getByText('User2')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });
});
