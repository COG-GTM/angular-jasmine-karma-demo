import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>
  );
}

describe('App routing (ported from app-routing.module.ts + AppComponent)', () => {
  it('renders the app shell status text', () => {
    renderAt('/shop');
    expect(
      screen.getByText('angular-jasmine-karma-demo app is running!')
    ).toBeInTheDocument();
  });

  it('renders the shop page at /shop', () => {
    renderAt('/shop');
    expect(screen.getByText('Shop Items')).toBeInTheDocument();
  });

  it('redirects the empty path to /shop', () => {
    renderAt('/');
    expect(screen.getByText('Shop Items')).toBeInTheDocument();
  });

  it('renders the users page at /users', () => {
    renderAt('/users');
    expect(screen.getByText('users works!')).toBeInTheDocument();
  });

  it('navigates between pages via the nav links', async () => {
    renderAt('/shop');
    await userEvent.click(screen.getByRole('link', { name: /users/i }));
    expect(screen.getByText('users works!')).toBeInTheDocument();

    await userEvent.click(screen.getByRole('link', { name: /shop/i }));
    expect(screen.getByText('Shop Items')).toBeInTheDocument();
  });
});
