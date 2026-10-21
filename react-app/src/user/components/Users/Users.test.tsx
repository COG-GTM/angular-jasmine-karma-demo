import { render, screen } from '@testing-library/react';
import { Users } from './Users';

// Placeholder smoke test: the Users child replaces this file with the users.component.spec.ts port.
describe('Users (placeholder)', () => {
  it('renders the users works! text', () => {
    render(<Users />);

    expect(screen.getByText('users works!')).toBeInTheDocument();
  });
});
