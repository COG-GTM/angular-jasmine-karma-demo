import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Users } from './Users';

vi.mock('../../services/users-service', () => ({
  getUsers: vi.fn(),
}));

import { getUsers } from '../../services/users-service';

describe('Users', () => {
  it('should render', () => {
    render(<Users />);
    expect(screen.getByText('users works!')).toBeTruthy();
  });

  it('should have a Get Users button', () => {
    render(<Users />);
    const button = screen.getByRole('button');
    expect(button.textContent).toContain('Get Users');
  });

  it('should initialize with empty users list', () => {
    render(<Users />);
    const listItems = screen.queryAllByRole('listitem');
    expect(listItems.length).toBe(0);
  });

  it('should render users when Get Users is clicked', async () => {
    const mockUsers = [
      { id: 1, name: 'User1' },
      { id: 2, name: 'User2' },
    ];
    vi.mocked(getUsers).mockResolvedValue(mockUsers);

    const user = userEvent.setup();
    render(<Users />);
    await user.click(screen.getByRole('button'));

    expect(await screen.findByText('User1')).toBeTruthy();
    expect(screen.getByText('User2')).toBeTruthy();
  });

  it('should log getUsers when button is clicked', async () => {
    vi.mocked(getUsers).mockResolvedValue([]);
    const spy = vi.spyOn(console, 'info').mockImplementation(() => {});
    const user = userEvent.setup();
    render(<Users />);
    await user.click(screen.getByRole('button'));
    expect(spy).toHaveBeenCalledWith('getUsers');
    spy.mockRestore();
  });
});
