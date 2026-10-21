import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { User } from '../../domain/user.model';
import { getUsers } from '../../application/usersService';
import { Users } from './Users';

// Port of users.component.spec.ts: testing calling a service from a component.
// Angular replaced the service method with spyOn(...).and.returnValue(of(...)).
// Here vi.mock swaps the whole service module for a test double, and each test decides
// what the mocked getUsers() resolves to (mockResolvedValue is the Promise version of of()).
vi.mock('../../application/usersService', () => ({
  USERS_URL: 'https://jsonplaceholder.typicode.com/users',
  getUsers: vi.fn(),
}));

const getUsersMock = vi.mocked(getUsers);

function makeUsers(...names: string[]): User[] {
  return names.map((name, index) => ({ id: index + 1, name }));
}

async function clickGetUsers() {
  const user = userEvent.setup();
  await user.click(screen.getByRole('button', { name: 'Get Users' }));
}

describe('Users: testing calling a service from a component.', () => {
  beforeEach(() => {
    // restoreMocks only restores vi.spyOn spies, so reset the module double's calls here.
    getUsersMock.mockReset();
    // Default double: an empty list, so a click never hits the network.
    getUsersMock.mockResolvedValue([]);
  });

  it('should create', () => {
    const { container } = render(<Users />);

    expect(container).not.toBeEmptyDOMElement();
  });

  it('getUsers() should return a list of users', async () => {
    // 1º Arrange: we doubled the service.
    // The array to be returned by the service. We could also test the full data structure
    // received from the backend; here each user only needs an id and a name.
    const users = makeUsers('foo', 'bar', 'mario');
    getUsersMock.mockResolvedValue(users);
    render(<Users />);

    // 2º Act: call the service (through the button, as a user would)
    await clickGetUsers();

    // 3º Assert: the component shows every user the service returned
    const items = await screen.findAllByRole('listitem');
    expect(items.map((item) => item.textContent)).toEqual(['foo', 'bar', 'mario']);
  });

  it('getUsers() should handle empty user list', async () => {
    getUsersMock.mockResolvedValue([]);
    render(<Users />);

    await clickGetUsers();

    await waitFor(() => expect(getUsersMock).toHaveBeenCalledTimes(1));
    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
    expect(screen.getByRole('list')).toBeEmptyDOMElement();
  });

  it('getUsers() should log to console when called', async () => {
    // A spy on console.info lets us assert the call without printing anything.
    const infoSpy = vi.spyOn(console, 'info').mockImplementation(() => {});
    getUsersMock.mockResolvedValue(makeUsers('foo', 'bar'));
    render(<Users />);

    await clickGetUsers();

    expect(infoSpy).toHaveBeenCalledWith('getUsers');
  });

  it('should render users works text', () => {
    render(<Users />);

    expect(screen.getByText('users works!')).toBeInTheDocument();
  });

  it('should have a Get Users button', () => {
    render(<Users />);

    const button = screen.getByRole('button', { name: 'Get Users' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Get Users');
    expect(button).toHaveAttribute('type', 'button');
  });

  it('should call getUsers when button is clicked', async () => {
    vi.spyOn(console, 'info').mockImplementation(() => {});
    render(<Users />);

    await clickGetUsers();

    expect(getUsersMock).toHaveBeenCalledTimes(1);
  });

  it('should initialize with empty users array', () => {
    render(<Users />);

    // Nothing is listed and nothing is fetched until the button is clicked.
    expect(screen.getByRole('list')).toBeEmptyDOMElement();
    expect(getUsersMock).not.toHaveBeenCalled();
  });

  it('should render user list when users are loaded', async () => {
    getUsersMock.mockResolvedValue(makeUsers('User1', 'User2'));
    const { container } = render(<Users />);

    await clickGetUsers();

    // Re-render after the promise resolves replaces fixture.detectChanges().
    expect(await screen.findByText('User1')).toBeInTheDocument();
    expect(container).toHaveTextContent('User1');
    expect(container).toHaveTextContent('User2');
  });

  // Extra cases beyond the Angular spec.
  it('logs a failed request with console.error and leaves the UI unchanged', async () => {
    // Legacy parity: no error UI. The rejection must still be handled (no unhandled rejection).
    const error = new Error('boom');
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    getUsersMock.mockRejectedValue(error);
    render(<Users />);

    await clickGetUsers();

    await waitFor(() => expect(errorSpy).toHaveBeenCalledWith(error));
    expect(screen.getByText('users works!')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Get Users' })).toBeInTheDocument();
    expect(screen.getByRole('list')).toBeEmptyDOMElement();
  });

  it('replaces the list on every click', async () => {
    getUsersMock
      .mockResolvedValueOnce(makeUsers('first'))
      .mockResolvedValueOnce(makeUsers('second', 'third'));
    render(<Users />);

    await clickGetUsers();
    expect(await screen.findByText('first')).toBeInTheDocument();

    await clickGetUsers();
    expect(await screen.findByText('third')).toBeInTheDocument();
    expect(screen.queryByText('first')).not.toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });

  it('renders the button as a contained warn (MUI error) button, like mat-raised-button color="warn"', () => {
    render(<Users />);

    const button = screen.getByRole('button', { name: 'Get Users' });
    expect(button).toHaveClass('MuiButton-contained', 'MuiButton-colorError');
  });
});
