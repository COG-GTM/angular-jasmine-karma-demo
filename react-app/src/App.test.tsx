import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import App from './App';

const renderAt = (path: string) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  );

describe('App routing', () => {
  it('redirects the root path to the shop page', () => {
    renderAt('/');

    expect(screen.getByText('angular-jasmine-karma-demo app is running!')).toBeInTheDocument();
    expect(screen.getByText('Shop Items')).toBeInTheDocument();
  });

  it('renders the users page on /users', () => {
    renderAt('/users');

    expect(screen.getByText('users works!')).toBeInTheDocument();
  });
});
