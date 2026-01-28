import React from 'react';
import { render, screen } from '@testing-library/react';
import { ItemDetailComponent } from './ItemDetailComponent';

describe('ItemDetailComponent: testing props from parent', () => {
  const itemInput = { name: 'foo', description: 'bar', price: '33' };

  it('should render', () => {
    render(<ItemDetailComponent item={itemInput} />);
    expect(screen.getByText('item-detail works!')).toBeInTheDocument();
  });

  it('should display the item name', () => {
    render(<ItemDetailComponent item={itemInput} />);
    expect(screen.getByText('Selected: foo')).toBeInTheDocument();
  });

  it('should display the item price', () => {
    render(<ItemDetailComponent item={itemInput} />);
    expect(screen.getByText(/Price: 33/)).toBeInTheDocument();
  });

  it('should display the item description', () => {
    render(<ItemDetailComponent item={itemInput} />);
    expect(screen.getByText('Description: bar')).toBeInTheDocument();
  });
});
