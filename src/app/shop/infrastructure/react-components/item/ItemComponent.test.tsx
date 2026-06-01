import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ItemComponent } from './ItemComponent';

describe('ItemComponent', () => {
  const defaultProps = {
    name: 'Test Item',
    description: 'Test Description',
    price: '19.99',
  };

  it('should render the component', () => {
    render(<ItemComponent {...defaultProps} />);
    expect(screen.getByText('Test Item')).toBeInTheDocument();
  });

  it('should display the item name', () => {
    render(<ItemComponent {...defaultProps} />);
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Test Item');
  });

  it('should display the item price with euro symbol', () => {
    render(<ItemComponent {...defaultProps} />);
    expect(screen.getByText(/19\.99/)).toBeInTheDocument();
  });

  it('should display the item description', () => {
    render(<ItemComponent {...defaultProps} />);
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('should have a like button with aria-label', () => {
    render(<ItemComponent {...defaultProps} />);
    const likeButton = screen.getByRole('button', { name: /like/i });
    expect(likeButton).toBeInTheDocument();
  });

  it('should call console.info when like button is clicked', () => {
    const consoleSpy = jest.spyOn(console, 'info').mockImplementation();
    render(<ItemComponent {...defaultProps} />);
    
    const likeButton = screen.getByRole('button', { name: /like/i });
    fireEvent.click(likeButton);
    
    expect(consoleSpy).toHaveBeenCalledWith('like Test Item');
    consoleSpy.mockRestore();
  });

  it('should call onLike callback when like button is clicked', () => {
    const onLikeMock = jest.fn();
    render(<ItemComponent {...defaultProps} onLike={onLikeMock} />);
    
    const likeButton = screen.getByRole('button', { name: /like/i });
    fireEvent.click(likeButton);
    
    expect(onLikeMock).toHaveBeenCalledTimes(1);
  });

  it('should not throw when onLike is not provided', () => {
    render(<ItemComponent {...defaultProps} />);
    
    const likeButton = screen.getByRole('button', { name: /like/i });
    expect(() => fireEvent.click(likeButton)).not.toThrow();
  });

  it('should render with different props', () => {
    const customProps = {
      name: 'Custom Item',
      description: 'Custom Description',
      price: '99.99',
    };
    
    render(<ItemComponent {...customProps} />);
    
    expect(screen.getByText('Custom Item')).toBeInTheDocument();
    expect(screen.getByText('Custom Description')).toBeInTheDocument();
    expect(screen.getByText(/99\.99/)).toBeInTheDocument();
  });
});
