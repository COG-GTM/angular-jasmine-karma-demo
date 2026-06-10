import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { App } from './App';

// Converted from app.component.spec.ts (Jasmine/Karma -> Vitest + RTL).
describe('App', () => {
  const renderAt = (path: string) =>
    render(
      <MemoryRouter initialEntries={[path]}>
        <App />
      </MemoryRouter>,
    );

  it('should render the running title', () => {
    renderAt('/shop');
    expect(
      screen.getByText('angular-jasmine-karma-demo app is running!'),
    ).toBeInTheDocument();
  });

  it('should render the Shop route by default content', () => {
    renderAt('/shop');
    expect(screen.getByText('Shop Items')).toBeInTheDocument();
  });

  it('should render the Users route', () => {
    renderAt('/users');
    expect(screen.getByText('users works!')).toBeInTheDocument();
  });

  it('should redirect the empty path to /shop', () => {
    renderAt('/');
    expect(screen.getByText('Shop Items')).toBeInTheDocument();
  });

  it('should expose navigation links', () => {
    renderAt('/shop');
    expect(screen.getByRole('link', { name: 'Shop' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Users' })).toBeInTheDocument();
  });
});
