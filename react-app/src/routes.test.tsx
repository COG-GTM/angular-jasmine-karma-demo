import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { routes } from './routes';

function renderAt(path: string) {
  const router = createMemoryRouter(routes, { initialEntries: [path] });
  const { container } = render(<RouterProvider router={router} />);
  return { router, container };
}

describe('routes', () => {
  it('shows the running banner on every route', () => {
    renderAt('/users');
    expect(screen.getByText('angular-jasmine-karma-demo app is running!')).toBeInTheDocument();
  });

  it('redirects the empty path to /shop, replacing the history entry', async () => {
    const { router, container } = renderAt('/');
    expect(router.state.location.pathname).toBe('/shop');
    expect(router.state.historyAction).toBe('REPLACE');
    expect(container.querySelector('.items-container')).toBeInTheDocument();
  });

  it('renders the items view at /shop', () => {
    const { container } = renderAt('/shop');
    expect(container.querySelector('.items-container')).toBeInTheDocument();
  });

  it('renders the users view at /users', () => {
    renderAt('/users');
    expect(screen.getByText('users works!')).toBeInTheDocument();
  });

  it('renders only the banner for unknown paths (no wildcard route, like Angular)', () => {
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    const { container } = renderAt('/nope');
    expect(container.querySelector('.items-container')).not.toBeInTheDocument();
    expect(screen.queryByText('users works!')).not.toBeInTheDocument();
  });
});
