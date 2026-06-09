import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import type { Item } from '../types/item';
import { ItemDetail } from './ItemDetail';

describe('ItemDetail (ported from ItemDetailComponent: @Input -> props)', () => {
  const item: Item = { name: 'foo', description: 'bar', price: '33' };

  it('renders the placeholder text', () => {
    render(<ItemDetail />);
    expect(screen.getByText('item-detail works!')).toBeInTheDocument();
  });

  it('renders the values received via props', () => {
    render(<ItemDetail item={item} />);
    expect(screen.getByText('foo')).toBeInTheDocument();
    expect(screen.getByText('bar')).toBeInTheDocument();
    expect(screen.getByText('33')).toBeInTheDocument();
  });

  it('handles a null item without rendering details', () => {
    render(<ItemDetail item={null} />);
    expect(screen.getByText('item-detail works!')).toBeInTheDocument();
    expect(screen.queryByText('foo')).not.toBeInTheDocument();
  });

  it('renders different item values', () => {
    const newItem: Item = {
      name: 'new item',
      description: 'new description',
      price: '99',
    };
    render(<ItemDetail item={newItem} />);
    expect(screen.getByText('new item')).toBeInTheDocument();
    expect(screen.getByText('new description')).toBeInTheDocument();
    expect(screen.getByText('99')).toBeInTheDocument();
  });
});
