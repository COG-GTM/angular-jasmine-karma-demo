import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ItemDetail from './ItemDetail';

describe('ItemDetail', () => {
  it('renders the item-detail works text', () => {
    render(
      <ItemDetail
        item={{ name: 'foo', description: 'bar', price: '33' }}
      />,
    );

    expect(screen.getByText('item-detail works!')).toBeInTheDocument();
  });
});
