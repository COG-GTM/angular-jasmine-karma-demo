import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ItemDetail from './ItemDetail';

describe('ItemDetail', () => {
  it('renders the item name when an item is provided', () => {
    render(<ItemDetail item={{ name: 'foo', description: 'bar', price: '123' }} />);

    expect(screen.getByText('item-detail works!')).toBeInTheDocument();
    expect(screen.getByText('foo')).toBeInTheDocument();
  });
});
