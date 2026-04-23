import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ItemComponent } from './ItemComponent';

describe('ItemComponent: testing basic component creation', () => {
  const defaultProps = {
    name: 'Test Item',
    description: 'A test description',
    price: '9.99',
  };

  it('should create', () => {
    const { container } = render(<ItemComponent {...defaultProps} />);
    expect(container).toBeTruthy();
  });

  it('should render the item name', () => {
    render(<ItemComponent {...defaultProps} />);
    expect(screen.getByText('Test Item')).toBeTruthy();
  });

  it('should render the item price with euro symbol', () => {
    render(<ItemComponent {...defaultProps} />);
    expect(screen.getByText('9.99 €')).toBeTruthy();
  });

  it('should render the item description', () => {
    render(<ItemComponent {...defaultProps} />);
    expect(screen.getByText('A test description')).toBeTruthy();
  });

  it('should have a like button with aria-label', () => {
    render(<ItemComponent {...defaultProps} />);
    const button = screen.getByRole('button', { name: 'like' });
    expect(button).toBeTruthy();
  });

  it('should log to console when like button is clicked', () => {
    const consoleSpy = jest.spyOn(console, 'info').mockImplementation();
    render(<ItemComponent {...defaultProps} />);
    const button = screen.getByRole('button', { name: 'like' });
    fireEvent.click(button);
    expect(consoleSpy).toHaveBeenCalledWith('like Test Item');
    consoleSpy.mockRestore();
  });
});
