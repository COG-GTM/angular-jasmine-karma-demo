import React from 'react';
import { render, screen } from '@testing-library/react';
import { App } from './App';

describe('App (React)', () => {
  it('should create the app', () => {
    const { container } = render(<App />);
    expect(container).toBeTruthy();
  });

  it("should have as title 'angular-jasmine-karma-demo'", () => {
    render(<App />);
    expect(
      screen.getByText('angular-jasmine-karma-demo app is running!')
    ).toBeTruthy();
  });

  it('should render navigation routes', () => {
    const { container } = render(<App />);
    // Default route redirects to /users, so UsersPlaceholder should render
    expect(container).toBeTruthy();
  });

  it('should accept a custom title prop', () => {
    render(<App title="custom-title" />);
    expect(screen.getByText('custom-title app is running!')).toBeTruthy();
  });
});
