import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { UsersComponent } from './UsersComponent';

const mockUsers = [
  { id: 1, name: 'foo', username: 'foo1', email: 'foo@test.com' },
  { id: 2, name: 'bar', username: 'bar1', email: 'bar@test.com' },
  { id: 3, name: 'mario', username: 'mario1', email: 'mario@test.com' },
];

describe('UsersComponent: testing calling a hook from a component.', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should create', () => {
    render(<UsersComponent />);
    expect(screen.getByText('users works!')).toBeTruthy();
  });

  it('getUsers() should return a list of users', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve(mockUsers),
    } as Response);

    render(<UsersComponent />);

    fireEvent.click(screen.getByText('Get Users'));

    await waitFor(() => {
      expect(screen.getByText('foo')).toBeTruthy();
      expect(screen.getByText('bar')).toBeTruthy();
      expect(screen.getByText('mario')).toBeTruthy();
    });

    expect(global.fetch).toHaveBeenCalledWith(
      'https://jsonplaceholder.typicode.com/users'
    );
  });
});
