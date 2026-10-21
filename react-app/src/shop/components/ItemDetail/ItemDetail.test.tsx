import { render, screen } from '@testing-library/react';
import { ItemDetail } from './ItemDetail';

// Placeholder smoke test: the ItemDetail child replaces this file with the item-detail.component.spec.ts port.
describe('ItemDetail (placeholder)', () => {
  it('renders the item-detail works! text', () => {
    render(<ItemDetail />);

    expect(screen.getByText('item-detail works!')).toBeInTheDocument();
  });
});
