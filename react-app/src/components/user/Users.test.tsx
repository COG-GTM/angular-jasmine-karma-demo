import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Users } from './Users';
import { usersService } from '../../services/usersService';

// Converted from users.component.spec.ts
describe('Users', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders the "users works!" text', () => {
    render(<Users />);
    expect(screen.getByText('users works!')).toBeInTheDocument();
  });

  it('renders a "Get Users" button', () => {
    render(<Users />);
    expect(screen.getByRole('button', { name: 'Get Users' })).toBeInTheDocument();
  });

  it('starts with an empty user list', () => {
    render(<Users />);
    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
  });

  it('logs to console.info when getUsers is invoked', async () => {
    const infoSpy = vi.spyOn(console, 'info').mockImplementation(() => {});
    vi.spyOn(usersService, 'getUsers').mockResolvedValue([]);
    render(<Users />);

    await userEvent.click(screen.getByRole('button', { name: 'Get Users' }));
    expect(infoSpy).toHaveBeenCalledWith('getUsers');
  });

  it('renders the user list returned by the service', async () => {
    vi.spyOn(usersService, 'getUsers').mockResolvedValue([
      { name: 'User1' },
      { name: 'User2' },
    ]);
    render(<Users />);

    await userEvent.click(screen.getByRole('button', { name: 'Get Users' }));

    expect(await screen.findByText('User1')).toBeInTheDocument();
    expect(screen.getByText('User2')).toBeInTheDocument();
  });
});
