import { render, screen } from '@testing-library/react';
import { Item } from './Item';

// Placeholder smoke test: the Item child replaces this file with the item.component.spec.ts port.
describe('Item (placeholder)', () => {
  it('renders name, price and description', () => {
    render(<Item name="foo" description="bar" price="123" />);

    expect(screen.getByText('foo')).toBeInTheDocument();
    expect(screen.getByText('123 €')).toBeInTheDocument();
    expect(screen.getByText('bar')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'like' })).toBeInTheDocument();
  });
});
