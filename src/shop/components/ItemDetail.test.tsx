import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import type { Item } from '../domain/item.model';
import ItemDetail from './ItemDetail';

describe('ItemDetail: testing item prop from parent', () => {
  // pretend that it was wired to something that supplied an Item
  const itemInput: Item = { name: 'foo', description: 'bar', price: '33' };

  it('should create', () => {
    // Arrange & Act
    render(<ItemDetail item={itemInput} />);

    // Assert
    expect(screen.getByTestId('item-detail')).toBeInTheDocument();
  });

  it('should get the name param value from the item prop', () => {
    // Arrange & Act
    render(<ItemDetail item={itemInput} />);

    // Assert
    expect(screen.getByTestId('item-detail-name')).toHaveTextContent(itemInput.name);
  });

  it('should get the description param value from the item prop', () => {
    // Arrange & Act
    render(<ItemDetail item={itemInput} />);

    // Assert
    expect(screen.getByTestId('item-detail-description')).toHaveTextContent(itemInput.description);
  });

  it('should get the price param value from the item prop', () => {
    // Arrange & Act
    render(<ItemDetail item={itemInput} />);

    // Assert
    expect(screen.getByTestId('item-detail-price')).toHaveTextContent(`${itemInput.price} €`);
  });

  it('should handle null item input', () => {
    // Arrange & Act
    render(<ItemDetail item={null} />);

    // Assert
    expect(screen.getByText('item-detail works!')).toBeInTheDocument();
    expect(screen.queryByTestId('item-detail-name')).toBeNull();
  });

  it('should handle undefined item input', () => {
    // Arrange & Act
    render(<ItemDetail item={undefined} />);

    // Assert
    expect(screen.getByText('item-detail works!')).toBeInTheDocument();
    expect(screen.queryByTestId('item-detail-name')).toBeNull();
  });

  it('should accept item with different values', () => {
    // Arrange
    const newItem: Item = { name: 'new item', description: 'new description', price: '99' };
    const { rerender } = render(<ItemDetail item={itemInput} />);

    // Act
    rerender(<ItemDetail item={newItem} />);

    // Assert
    expect(screen.getByTestId('item-detail-name')).toHaveTextContent('new item');
    expect(screen.getByTestId('item-detail-description')).toHaveTextContent('new description');
    expect(screen.getByTestId('item-detail-price')).toHaveTextContent('99 €');
  });

  it('should render item-detail works text', () => {
    // Arrange & Act
    const { container } = render(<ItemDetail item={itemInput} />);

    // Assert
    expect(container.textContent).toContain('item-detail works!');
  });
});
