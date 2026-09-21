import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { User } from '../../../domain/user.model';
import { UsersService, UsersServiceContext } from '../../../react-hooks/useUsersService';
import { Users } from './Users';

const mockUsers: User[] = [
  { id: 1, name: 'Leanne Graham', username: 'Bret', email: 'Sincere@april.biz' },
  { id: 2, name: 'Ervin Howell', username: 'Antonette', email: 'Shanna@melissa.tv' },
];

const renderWithService = (service: UsersService) =>
  render(
    <UsersServiceContext.Provider value={service}>
      <Users />
    </UsersServiceContext.Provider>
  );

describe('Users', () => {
  it('renders the heading and button with an empty list', () => {
    const service: UsersService = { getUsers: vi.fn().mockResolvedValue(mockUsers) };
    renderWithService(service);

    expect(screen.getByText('users works!')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Get Users' })).toBeInTheDocument();
    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
    expect(service.getUsers).not.toHaveBeenCalled();
  });

  it('fetches and lists users when "Get Users" is clicked', async () => {
    const service: UsersService = { getUsers: vi.fn().mockResolvedValue(mockUsers) };
    const infoSpy = vi.spyOn(console, 'info').mockImplementation(() => undefined);
    renderWithService(service);

    fireEvent.click(screen.getByRole('button', { name: 'Get Users' }));

    expect(infoSpy).toHaveBeenCalledWith('getUsers');
    expect(service.getUsers).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(screen.getAllByRole('listitem')).toHaveLength(2));
    expect(screen.getByText('Leanne Graham')).toBeInTheDocument();
    expect(screen.getByText('Ervin Howell')).toBeInTheDocument();
    infoSpy.mockRestore();
  });
});
