import { render, screen } from '@testing-library/react';
import { Items } from './Items';

// Placeholder smoke test: the Items child replaces this file with the items.component.spec.ts port.
describe('Items (placeholder)', () => {
  it('renders the Shop Items heading', () => {
    render(<Items />);

    expect(screen.getByRole('heading', { name: 'Shop Items' })).toBeInTheDocument();
  });
});
