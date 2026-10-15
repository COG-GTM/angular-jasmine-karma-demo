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

  it('shows Items placeholder on /shop', () => {
    renderApp(['/shop']);
    expect(screen.getByText('Items placeholder')).toBeInTheDocument();
  });

  it('shows Users placeholder on /users and not Items', () => {
    renderApp(['/users']);
    expect(screen.getByText('users works!')).toBeInTheDocument();
    expect(screen.queryByText('Items placeholder')).not.toBeInTheDocument();
  });

  it('redirects / to /shop showing Items placeholder', () => {
    renderApp(['/']);
    expect(screen.getByText('Items placeholder')).toBeInTheDocument();
  });
});
