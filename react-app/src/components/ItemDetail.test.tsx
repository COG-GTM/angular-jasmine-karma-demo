import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ItemDetail from './ItemDetail';

describe('ItemDetail', () => {
  it('renders the placeholder content', () => {
    render(<ItemDetail item={{ name: 'foo', description: 'bar', price: '123' }} />);

    expect(screen.getByText('item-detail works!')).toBeInTheDocument();
  });
});
