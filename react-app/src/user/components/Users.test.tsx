import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Users from './Users';
import { getUsers } from '../application/UsersServices';

vi.mock('../application/UsersServices');

const mockedGetUsers = vi.mocked(getUsers);

describe('Users: testing calling a service from a component.', () => {
  beforeEach(() => {
    vi.spyOn(console, 'info').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
    mockedGetUsers.mockReset();
  });

  it('should create', () => {
    // Arrange & Act
    const { container } = render(<Users />);

    // Assert
    expect(container).toBeTruthy();
  });

  it('should render users works text', () => {
    // Arrange & Act
    render(<Users />);

    // Assert
    expect(screen.getByText('users works!')).toBeInTheDocument();
  });

  it('should have a Get Users button', () => {
    // Arrange & Act
    render(<Users />);

    // Assert
    expect(screen.getByRole('button', { name: 'Get Users' })).toBeInTheDocument();
  });

  it('should initialize with empty users list', () => {
    // Arrange & Act
    render(<Users />);

    // Assert
    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
    expect(mockedGetUsers).not.toHaveBeenCalled();
  });

  it('should call getUsers when button is clicked', async () => {
    // Arrange
    mockedGetUsers.mockResolvedValue([]);
    const user = userEvent.setup();
    render(<Users />);

    // Act
    await user.click(screen.getByRole('button', { name: 'Get Users' }));

    // Assert
    expect(mockedGetUsers).toHaveBeenCalledTimes(1);
  });

  it('should log to console when getUsers is triggered', async () => {
    // Arrange
    mockedGetUsers.mockResolvedValue([{ id: 1, name: 'foo' }, { id: 2, name: 'bar' }]);
    const user = userEvent.setup();
    render(<Users />);

    // Act
    await user.click(screen.getByRole('button', { name: 'Get Users' }));

    // Assert
    expect(console.info).toHaveBeenCalledWith('getUsers');
  });

  it('should render user list when users are loaded', async () => {
    // Arrange
    mockedGetUsers.mockResolvedValue([{ id: 1, name: 'User1' }, { id: 2, name: 'User2' }]);
    const user = userEvent.setup();
    render(<Users />);

    // Act
    await user.click(screen.getByRole('button', { name: 'Get Users' }));

    // Assert
    expect(await screen.findByText('User1')).toBeInTheDocument();
    expect(screen.getByText('User2')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });

  it('should handle empty user list', async () => {
    // Arrange
    mockedGetUsers.mockResolvedValue([]);
    const user = userEvent.setup();
    render(<Users />);

    // Act
    await user.click(screen.getByRole('button', { name: 'Get Users' }));

    // Assert
    await waitFor(() => expect(mockedGetUsers).toHaveBeenCalledTimes(1));
    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
  });

  it('should leave the list empty and log an error when getUsers fails', async () => {
    // Arrange
    const failure = new Error('network down');
    mockedGetUsers.mockRejectedValue(failure);
    const user = userEvent.setup();
    render(<Users />);

    // Act
    await user.click(screen.getByRole('button', { name: 'Get Users' }));

    // Assert
    await waitFor(() => expect(console.error).toHaveBeenCalledWith(failure));
    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
  });
});
