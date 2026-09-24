import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Item } from './Item';

describe('Item component', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders without crashing', () => {
    // Arrange
    const props = { name: 'Test Item', description: 'Test Description', price: '100' };

    // Act
    render(<Item {...props} />);

    // Assert
    expect(screen.getByTestId('item-name')).toBeInTheDocument();
  });

  it('renders the item name', () => {
    // Arrange
    const props = { name: 'Test Item', description: 'Test Description', price: '100' };

    // Act
    render(<Item {...props} />);

    // Assert
    expect(screen.getByTestId('item-name')).toHaveTextContent('Test Item');
  });

  it('renders the price with euro symbol', () => {
    // Arrange
    const props = { name: 'Test Item', description: 'Test Description', price: '100' };

    // Act
    render(<Item {...props} />);

    // Assert
    expect(screen.getByTestId('item-price')).toHaveTextContent('100 €');
  });

  it('renders the description', () => {
    // Arrange
    const props = { name: 'Test Item', description: 'Test Description', price: '100' };

    // Act
    render(<Item {...props} />);

    // Assert
    expect(screen.getByTestId('item-description')).toHaveTextContent('Test Description');
  });

  it('renders a like button with aria-label "like"', () => {
    // Arrange
    const props = { name: 'Test Item', description: 'Test Description', price: '100' };

    // Act
    render(<Item {...props} />);

    // Assert
    expect(screen.getByRole('button', { name: 'like' })).toBeInTheDocument();
  });

  it('calls console.info with "like Test Item" when like is clicked', () => {
    // Arrange
    const infoSpy = vi.spyOn(console, 'info').mockImplementation(() => {});
    const props = { name: 'Test Item', description: 'Test Description', price: '100' };
    render(<Item {...props} />);

    // Act
    fireEvent.click(screen.getByRole('button', { name: 'like' }));

    // Assert
    expect(infoSpy).toHaveBeenCalledWith('like Test Item');
  });

  it('calls console.info exactly once per click', () => {
    // Arrange
    const infoSpy = vi.spyOn(console, 'info').mockImplementation(() => {});
    const props = { name: 'Test Item', description: 'Test Description', price: '100' };
    render(<Item {...props} />);

    // Act
    fireEvent.click(screen.getByRole('button', { name: 'like' }));

    // Assert
    expect(infoSpy).toHaveBeenCalledTimes(1);
  });
});
