import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getUsers } from '../../application/usersService';
import Users from './Users';

vi.mock('../../application/usersService', async (importOriginal) => ({
  ...(await importOriginal<typeof import('../../application/usersService')>()),
  getUsers: vi.fn(),
}));

const getUsersMock = vi.mocked(getUsers);

describe('UsersComponent: testing calling a service from a component.', () => {
  let container: HTMLElement;

  beforeEach(() => {
    getUsersMock.mockReset().mockResolvedValue([]);
    vi.spyOn(console, 'info').mockImplementation(() => {});
    ({ container } = render(<Users />));
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should create', () => {
    // Arrange

    // Act

    // Assert
    expect(container).toHaveTextContent('Get Users');
    expect(screen.getByRole('button', { name: 'Get Users' })).toBeInTheDocument();
  });

  it('getUsers() should return a list of users', async () => {
    // Arrange
    const user = userEvent.setup();
    getUsersMock.mockResolvedValue([
      { id: 1, name: 'foo' },
      { id: 2, name: 'bar' },
      { id: 3, name: 'mario' },
    ]);

    // Act
    await user.click(screen.getByRole('button', { name: 'Get Users' }));
    const userItems = await screen.findAllByRole('listitem');

    // Assert
    expect(userItems).toHaveLength(3);
    expect(userItems.map((item) => item.textContent)).toEqual(['foo', 'bar', 'mario']);
    expect(getUsersMock).toHaveBeenCalledTimes(1);
  });

  it('getUsers() should handle empty user list', async () => {
    // Arrange
    const user = userEvent.setup();
    getUsersMock.mockResolvedValue([]);

    // Act
    await user.click(screen.getByRole('button', { name: 'Get Users' }));
    await waitFor(() => expect(getUsersMock).toHaveBeenCalledTimes(1));

    // Assert
    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
  });

  it('getUsers() should log to console when called', async () => {
    // Arrange
    const user = userEvent.setup();

    // Act
    await user.click(screen.getByRole('button', { name: 'Get Users' }));

    // Assert
    expect(console.info).toHaveBeenCalledWith('getUsers');
  });

  it('should render users works text', () => {
    // Arrange

    // Act

    // Assert
    expect(screen.getByText('users works!')).toBeInTheDocument();
  });

  it('should have a Get Users button', () => {
    // Arrange

    // Act
    const button = screen.getByRole('button', { name: 'Get Users' });

    // Assert
    expect(button.textContent).toContain('Get Users');
    expect(button).toHaveClass('MuiButton-contained');
    expect(button).toHaveClass('MuiButton-containedError');
  });

  it('should call getUsers when button is clicked', async () => {
    // Arrange
    const user = userEvent.setup();

    // Act
    await user.click(screen.getByRole('button', { name: 'Get Users' }));

    // Assert
    expect(getUsersMock).toHaveBeenCalledTimes(1);
  });

  it('should initialize with empty users array', () => {
    // Arrange

    // Act

    // Assert
    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
    expect(getUsersMock).not.toHaveBeenCalled();
  });

  it('should render user list when users are loaded', async () => {
    // Arrange
    const user = userEvent.setup();
    getUsersMock.mockResolvedValue([
      { id: 1, name: 'User1' },
      { id: 2, name: 'User2' },
    ]);

    // Act
    await user.click(screen.getByRole('button', { name: 'Get Users' }));

    // Assert
    expect(await screen.findByText('User1')).toBeInTheDocument();
    expect(await screen.findByText('User2')).toBeInTheDocument();
  });
});
