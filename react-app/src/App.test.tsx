import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

function renderApp(initialEntries: string[]) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <App />
    </MemoryRouter>,
  );
}

describe('App', () => {
  it('renders the app title in a span', () => {
    renderApp(['/shop']);
    const title = screen.getByText('angular-jasmine-karma-demo app is running!');
    expect(title.tagName).toBe('SPAN');
  });

  it('shows Items on /shop', () => {
    renderApp(['/shop']);
    expect(screen.getByRole('heading', { name: 'Shop Items' })).toBeInTheDocument();
  });

  it('shows Users on /users and not Items', () => {
    renderApp(['/users']);
    expect(screen.getByText('users works!')).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Shop Items' })).not.toBeInTheDocument();
  });

  it('redirects / to /shop showing Items', () => {
    renderApp(['/']);
    expect(screen.getByRole('heading', { name: 'Shop Items' })).toBeInTheDocument();
  });
});
