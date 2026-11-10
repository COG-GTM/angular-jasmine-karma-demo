import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders the running banner', () => {
    render(<App />);
    expect(screen.getByText('angular-jasmine-karma-demo app is running!')).toBeInTheDocument();
  });
});
