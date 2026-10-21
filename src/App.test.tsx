import { render, screen } from '@testing-library/react';
import { MemoryRouter, useLocation } from 'react-router';
import { App } from './App';

// The routed components are owned by other work units, so App tests replace their
// barrels with simple stand-ins (test doubles). This keeps these tests independent of
// whatever Items/Users actually render.
vi.mock('./shop/components/Items', () => ({
  Items: () => <div data-testid="items-stub">items stub</div>,
}));
vi.mock('./user/components/Users', () => ({
  Users: () => <div data-testid="users-stub">users stub</div>,
}));

function LocationProbe() {
  const location = useLocation();
  return <output data-testid="location">{location.pathname}</output>;
}

function renderAt(path: string, props: Parameters<typeof App>[0] = {}) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App {...props} />
      <LocationProbe />
    </MemoryRouter>,
  );
}

describe('App', () => {
  it('should create the app', () => {
    // Arrange + Act
    const { container } = renderAt('/shop');

    // Assert
    expect(container).not.toBeEmptyDOMElement();
  });

  it(`should have as title 'angular-jasmine-karma-demo'`, () => {
    renderAt('/shop');

    expect(screen.getByText(/angular-jasmine-karma-demo/)).toBeInTheDocument();
  });

  // Test for rendering the title in the template
  it('should render title', () => {
    const { container } = renderAt('/shop');

    expect(container.querySelector('span')).toHaveTextContent(
      'angular-jasmine-karma-demo app is running!',
    );
  });

  // Angular checked for <router-outlet>; in React the equivalent is that the matched
  // route's element is rendered after the title.
  it('should have a router outlet that renders the matched route', () => {
    renderAt('/shop');

    expect(screen.getByTestId('items-stub')).toBeInTheDocument();
  });

  // Test for verifying the title can be changed
  it('should allow title to be changed', () => {
    const { container } = renderAt('/shop', { title: 'new-title' });

    expect(container.querySelector('span')).toHaveTextContent('new-title app is running!');
  });

  describe('routes', () => {
    it("redirects '/' to '/shop'", () => {
      renderAt('/');

      expect(screen.getByTestId('location')).toHaveTextContent('/shop');
      expect(screen.getByTestId('items-stub')).toBeInTheDocument();
    });

    it("renders Items on '/shop'", () => {
      renderAt('/shop');

      expect(screen.getByTestId('items-stub')).toBeInTheDocument();
      expect(screen.queryByTestId('users-stub')).not.toBeInTheDocument();
    });

    it("renders Users on '/users'", () => {
      renderAt('/users');

      expect(screen.getByTestId('users-stub')).toBeInTheDocument();
      expect(screen.queryByTestId('items-stub')).not.toBeInTheDocument();
    });

    it('renders only the title for an unknown path (no wildcard route, like Angular)', () => {
      renderAt('/does-not-exist');

      expect(screen.getByText('angular-jasmine-karma-demo app is running!')).toBeInTheDocument();
      expect(screen.queryByTestId('items-stub')).not.toBeInTheDocument();
      expect(screen.queryByTestId('users-stub')).not.toBeInTheDocument();
    });
  });
});
