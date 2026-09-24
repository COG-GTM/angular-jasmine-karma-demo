import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import App from './App';

function renderAt(route: string) {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <App />
    </MemoryRouter>,
  );
}

describe('App', () => {
  it('renders the running text and nav links', () => {
    // Arrange / Act
    renderAt('/shop');

    // Assert
    expect(screen.getByText('angular-jasmine-karma-demo app is running!')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Shop' })).toHaveAttribute('href', '/shop');
    expect(screen.getByRole('link', { name: 'Add Item' })).toHaveAttribute('href', '/shop/add');
    expect(screen.getByRole('link', { name: 'Users' })).toHaveAttribute('href', '/users');
  });

  it('renders Items at /shop', () => {
    renderAt('/shop');
    expect(screen.getByRole('heading', { name: 'Shop Items' })).toBeInTheDocument();
  });

  it('redirects unknown routes to /shop', () => {
    renderAt('/');
    expect(screen.getByRole('heading', { name: 'Shop Items' })).toBeInTheDocument();
  });

  it('renders AddItem at /shop/add', () => {
    renderAt('/shop/add');
    expect(screen.getByText('add-item works!')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('name')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /save/i })).toBeDisabled();
  });

  it('renders Users at /users', () => {
    renderAt('/users');
    expect(screen.getByText('users works!')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Get Users' })).toBeInTheDocument();
  });
});
