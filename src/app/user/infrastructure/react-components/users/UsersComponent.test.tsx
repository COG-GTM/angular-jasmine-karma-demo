import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { UsersComponent } from './UsersComponent';

const mockUsers = [
  { id: 1, name: 'Leanne Graham', username: 'Bret', email: 'Sincere@april.biz', address: { street: 'Kulas Light', suite: 'Apt. 556', city: 'Gwenborough', zipcode: '92998-3874', geo: { lat: '-37.3159', lng: '81.1496' } }, phone: '1-770-736-8031 x56442', website: 'hildegard.org', company: { name: 'Romaguera-Crona', catchPhrase: 'Multi-layered client-server neural-net', bs: 'harness real-time e-markets' } },
  { id: 2, name: 'Ervin Howell', username: 'Antonette', email: 'Shanna@melissa.tv', address: { street: 'Victor Plains', suite: 'Suite 879', city: 'Wisokyburgh', zipcode: '90566-7771', geo: { lat: '-43.9509', lng: '-34.4618' } }, phone: '010-692-6593 x09125', website: 'anastasia.net', company: { name: 'Deckow-Crist', catchPhrase: 'Proactive didactic contingency', bs: 'synergize scalable supply-chains' } },
  { id: 3, name: 'Clementine Bauch', username: 'Samantha', email: 'Nathan@yesenia.net', address: { street: 'Douglas Extension', suite: 'Suite 847', city: 'McKenziehaven', zipcode: '59590-4157', geo: { lat: '-68.6102', lng: '-47.0653' } }, phone: '1-463-123-4447', website: 'ramiro.info', company: { name: 'Romaguera-Jacobson', catchPhrase: 'Face to face bifurcated interface', bs: 'e-enable strategic applications' } },
];

describe('UsersComponent', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the component', () => {
    global.fetch = jest.fn();
    render(<UsersComponent />);

    expect(screen.getByText('users works!')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Get Users' })).toBeInTheDocument();
  });

  it('should have a Get Users button', () => {
    global.fetch = jest.fn();
    render(<UsersComponent />);

    const button = screen.getByRole('button', { name: 'Get Users' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('type', 'button');
  });

  it('should fetch and display users when button is clicked', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => mockUsers,
    });

    render(<UsersComponent />);

    const button = screen.getByRole('button', { name: 'Get Users' });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('Leanne Graham')).toBeInTheDocument();
      expect(screen.getByText('Ervin Howell')).toBeInTheDocument();
      expect(screen.getByText('Clementine Bauch')).toBeInTheDocument();
    });
  });

  it('should display loading state while fetching', async () => {
    let resolvePromise: (value: unknown) => void;
    const fetchPromise = new Promise((resolve) => {
      resolvePromise = resolve;
    });

    global.fetch = jest.fn().mockReturnValueOnce(fetchPromise);

    render(<UsersComponent />);

    const button = screen.getByRole('button', { name: 'Get Users' });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    resolvePromise!({
      ok: true,
      json: async () => mockUsers,
    });

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });
  });

  it('should display error message when fetch fails', async () => {
    global.fetch = jest.fn().mockRejectedValueOnce(new Error('Network error'));

    render(<UsersComponent />);

    const button = screen.getByRole('button', { name: 'Get Users' });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('Error: Network error')).toBeInTheDocument();
    });
  });

  it('should render users in a list', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => mockUsers,
    });

    render(<UsersComponent />);

    const button = screen.getByRole('button', { name: 'Get Users' });
    fireEvent.click(button);

    await waitFor(() => {
      const listItems = screen.getAllByRole('listitem');
      expect(listItems).toHaveLength(3);
    });
  });

  it('should call fetch with correct URL', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => mockUsers,
    });

    render(<UsersComponent />);

    const button = screen.getByRole('button', { name: 'Get Users' });
    fireEvent.click(button);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users');
    });
  });
});
