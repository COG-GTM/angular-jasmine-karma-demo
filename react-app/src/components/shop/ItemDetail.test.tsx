import { render, screen } from '@testing-library/react';
import { ItemDetail } from './ItemDetail';
import type { Item } from '../../types/item';

// Converted from item-detail.component.spec.ts
describe('ItemDetail', () => {
  it('renders the static "item-detail works!" text', () => {
    render(<ItemDetail item={{ name: 'foo', description: 'bar', price: '33' }} />);
    expect(screen.getByText('item-detail works!')).toBeInTheDocument();
  });

  it('accepts an item prop', () => {
    const item: Item = { name: 'new item', description: 'new description', price: '99' };
    render(<ItemDetail item={item} />);
    expect(screen.getByText('item-detail works!')).toBeInTheDocument();
  });

  it('handles a null item prop', () => {
    render(<ItemDetail item={null} />);
    expect(screen.getByText('item-detail works!')).toBeInTheDocument();
  });

  it('handles an undefined item prop', () => {
    render(<ItemDetail />);
    expect(screen.getByText('item-detail works!')).toBeInTheDocument();
  });
});
