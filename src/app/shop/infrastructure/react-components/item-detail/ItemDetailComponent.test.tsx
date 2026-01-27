import React from 'react';
import { render, screen } from '@testing-library/react';
import { ItemDetailComponent } from './ItemDetailComponent';

describe('ItemDetailComponent: testing props from parent', () => {
  const itemInput = { name: 'foo', description: 'bar', price: '33' };

  it('should render', () => {
    render(<ItemDetailComponent item={itemInput} />);
    expect(screen.getByText('item-detail works!')).toBeTruthy();
  });

  it('should receive the name prop value', () => {
    const { container } = render(<ItemDetailComponent item={itemInput} />);
    expect(container).toBeTruthy();
  });

  it('should receive the description prop value', () => {
    const { container } = render(<ItemDetailComponent item={itemInput} />);
    expect(container).toBeTruthy();
  });

  it('should receive the price prop value', () => {
    const { container } = render(<ItemDetailComponent item={itemInput} />);
    expect(container).toBeTruthy();
  });
});
