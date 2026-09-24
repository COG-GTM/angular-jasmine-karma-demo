import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Items, { sortItems } from './Items';
import type { Item } from '../domain/item.model';

function getRenderedNames(): string[] {
  return screen.getAllByTestId('item-name').map((el) => el.textContent ?? '');
}

function getRenderedDescriptions(): string[] {
  return screen.getAllByTestId('item-description').map((el) => el.textContent ?? '');
}

function getRenderedPrices(): string[] {
  return screen
    .getAllByTestId('item-price')
    .map((el) => (el.textContent ?? '').replace(' €', ''));
}

describe('Items component', () => {
  it('renders the "Shop Items" heading', () => {
    // Arrange & Act
    render(<Items />);

    // Assert
    expect(screen.getByRole('heading', { name: 'Shop Items' })).toBeInTheDocument();
  });

  it('renders 5 item cards', () => {
    // Arrange & Act
    render(<Items />);

    // Assert
    expect(screen.getAllByTestId('item-name')).toHaveLength(5);
  });

  it('shows items in the initial unsorted order', () => {
    // Arrange & Act
    render(<Items />);

    // Assert
    expect(getRenderedNames()).toEqual(['foo', 'mario', 'luigi', 'apple', 'banana']);
  });

  it('marks the Name button active with an up arrow initially', () => {
    // Arrange & Act
    render(<Items />);

    // Assert
    const nameButton = screen.getByRole('button', { name: /Name/ });
    expect(nameButton).toHaveClass('active');
    expect(nameButton).toHaveTextContent('Name ↑');
  });

  it('does not mark Description or Price buttons active initially', () => {
    // Arrange & Act
    render(<Items />);

    // Assert
    expect(screen.getByRole('button', { name: /Description/ })).not.toHaveClass('active');
    expect(screen.getByRole('button', { name: /Price/ })).not.toHaveClass('active');
  });

  it('sorts by name descending when clicking the already-active Name button', () => {
    // Arrange
    render(<Items />);

    // Act
    fireEvent.click(screen.getByRole('button', { name: /Name/ }));

    // Assert
    expect(getRenderedNames()[0]).toBe('mario');
    expect(getRenderedNames()[4]).toBe('apple');
    expect(screen.getByRole('button', { name: /Name/ })).toHaveTextContent('↓');
  });

  it('sorts back to ascending when clicking Name twice', () => {
    // Arrange
    render(<Items />);

    // Act
    fireEvent.click(screen.getByRole('button', { name: /Name/ }));
    fireEvent.click(screen.getByRole('button', { name: /Name/ }));

    // Assert
    expect(getRenderedNames()).toEqual(['apple', 'banana', 'foo', 'luigi', 'mario']);
    expect(screen.getByRole('button', { name: /Name/ })).toHaveTextContent('↑');
  });

  it('sorts by description ascending and activates the Description button', () => {
    // Arrange
    render(<Items />);

    // Act
    fireEvent.click(screen.getByRole('button', { name: /Description/ }));

    // Assert
    expect(getRenderedDescriptions()).toEqual(['bar', 'bross', 'bross', 'fruit', 'fruit']);
    expect(screen.getByRole('button', { name: /Description/ })).toHaveClass('active');
    expect(screen.getByRole('button', { name: /Name/ })).not.toHaveClass('active');
  });

  it('sorts by description descending when clicking Description twice', () => {
    // Arrange
    render(<Items />);

    // Act
    fireEvent.click(screen.getByRole('button', { name: /Description/ }));
    fireEvent.click(screen.getByRole('button', { name: /Description/ }));

    // Assert
    expect(getRenderedDescriptions()[0]).toBe('fruit');
    expect(getRenderedDescriptions()[4]).toBe('bar');
    expect(screen.getByRole('button', { name: /Description/ })).toHaveTextContent('↓');
  });

  it('sorts by price ascending using string comparison', () => {
    // Arrange
    render(<Items />);

    // Act
    fireEvent.click(screen.getByRole('button', { name: /Price/ }));

    // Assert
    expect(getRenderedPrices()).toEqual(['123', '456', '59', '789', '99']);
    expect(screen.getByRole('button', { name: /Price/ })).toHaveClass('active');
  });

  it('sorts by price descending when clicking Price twice', () => {
    // Arrange
    render(<Items />);

    // Act
    fireEvent.click(screen.getByRole('button', { name: /Price/ }));
    fireEvent.click(screen.getByRole('button', { name: /Price/ }));

    // Assert
    expect(getRenderedPrices()).toEqual(['99', '789', '59', '456', '123']);
  });

  it('resets to ascending when switching from desc Name to Price', () => {
    // Arrange
    render(<Items />);
    fireEvent.click(screen.getByRole('button', { name: /Name/ }));

    // Act
    fireEvent.click(screen.getByRole('button', { name: /Price/ }));

    // Assert
    expect(screen.getByRole('button', { name: /Price/ })).toHaveTextContent('↑');
    expect(getRenderedPrices()).toEqual(['123', '456', '59', '789', '99']);
  });

  it('keeps ascending order across multiple field switches', () => {
    // Arrange
    render(<Items />);

    // Act
    fireEvent.click(screen.getByRole('button', { name: /Price/ }));
    fireEvent.click(screen.getByRole('button', { name: /Description/ }));
    fireEvent.click(screen.getByRole('button', { name: /Name/ }));

    // Assert
    expect(screen.getByRole('button', { name: /Price/ })).toHaveTextContent('Price');
    expect(screen.getByRole('button', { name: /Name/ })).toHaveTextContent('↑');
  });
});

describe('sortItems helper', () => {
  const sample: Item[] = [
    { name: 'foo', description: 'bar', price: '123' },
    { name: 'apple', description: 'fruit', price: '99' },
  ];

  it('returns a new array and does not mutate the input', () => {
    // Arrange
    const items = [...sample];
    const snapshot = items.map((i) => ({ ...i }));

    // Act
    const result = sortItems(items, 'name', 'asc');

    // Assert
    expect(result).not.toBe(items);
    expect(items).toEqual(snapshot);
  });

  it('returns an empty array for empty input', () => {
    // Arrange & Act
    const result = sortItems([], 'name', 'asc');

    // Assert
    expect(result).toEqual([]);
  });

  it('handles a single item', () => {
    // Arrange
    const items: Item[] = [{ name: 'single', description: 'item', price: '100' }];

    // Act
    const result = sortItems(items, 'name', 'asc');

    // Assert
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('single');
  });

  it('keeps both items when sort field values are equal', () => {
    // Arrange
    const items: Item[] = [
      { name: 'item1', description: 'same', price: '100' },
      { name: 'item2', description: 'same', price: '200' },
    ];

    // Act
    const result = sortItems(items, 'description', 'asc');

    // Assert
    expect(result).toHaveLength(2);
    expect(result[0].description).toBe('same');
    expect(result[1].description).toBe('same');
  });

  it('compares prices as strings', () => {
    // Arrange
    const items: Item[] = [
      { name: 'a', description: 'desc', price: '9' },
      { name: 'b', description: 'desc', price: '100' },
      { name: 'c', description: 'desc', price: '50' },
    ];

    // Act
    const result = sortItems(items, 'price', 'asc');

    // Assert
    expect(result.map((i) => i.price)).toEqual(['100', '50', '9']);
  });

  it('desc is the reverse of asc and a third sort restores the first', () => {
    // Arrange
    const items = [...sample];

    // Act
    const asc = sortItems(items, 'name', 'asc');
    const desc = sortItems(items, 'name', 'desc');
    const ascAgain = sortItems(desc, 'name', 'asc');

    // Assert
    expect(desc).toEqual([...asc].reverse());
    expect(ascAgain).toEqual(asc);
  });
});
