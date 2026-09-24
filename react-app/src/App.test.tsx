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
  it('renders the running text', () => {
    renderAt('/shop');
    expect(
      screen.getByText('angular-jasmine-karma-demo app is running!'),
    ).toBeInTheDocument();
  });

  it('redirects / to the shop page', () => {
    renderAt('/');
    expect(screen.getByText('Items placeholder')).toBeInTheDocument();
  });

  it('renders Users at /users', () => {
    renderAt('/users');
    expect(screen.getByText('Users placeholder')).toBeInTheDocument();
  });
});
