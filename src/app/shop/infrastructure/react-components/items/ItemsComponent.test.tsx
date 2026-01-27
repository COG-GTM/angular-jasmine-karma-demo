import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ItemsComponent } from './ItemsComponent';
import { Item } from '../../../domain/item.model';

describe('ItemsComponent', () => {
  it('should render the component', () => {
    render(<ItemsComponent />);
    expect(screen.getByText('items shop')).toBeTruthy();
  });

  it('should render default items when no initialItems provided', () => {
    render(<ItemsComponent />);
    expect(screen.getByText('foo')).toBeTruthy();
    expect(screen.getByText('mario')).toBeTruthy();
    expect(screen.getByText('luigi')).toBeTruthy();
  });

  it('should render custom items when initialItems provided', () => {
    const customItems: Item[] = [
      { name: 'custom1', description: 'desc1', price: '100' },
      { name: 'custom2', description: 'desc2', price: '200' },
    ];
    render(<ItemsComponent initialItems={customItems} />);
    expect(screen.getByText('custom1')).toBeTruthy();
    expect(screen.getByText('custom2')).toBeTruthy();
    expect(screen.queryByText('foo')).toBeNull();
  });

  it('should display item prices', () => {
    render(<ItemsComponent />);
    expect(screen.getByText('123 EUR')).toBeTruthy();
    expect(screen.getByText('456 EUR')).toBeTruthy();
    expect(screen.getByText('789 EUR')).toBeTruthy();
  });

  it('should display item descriptions', () => {
    render(<ItemsComponent />);
    expect(screen.getAllByText('bar').length).toBeGreaterThan(0);
    expect(screen.getAllByText('bross').length).toBeGreaterThan(0);
  });

  it('should show item detail when item is clicked', () => {
    render(<ItemsComponent />);
    const fooItem = screen.getByText('foo').closest('div');
    if (fooItem) {
      fireEvent.click(fooItem);
    }
    expect(screen.getByText('item-detail works!')).toBeTruthy();
    expect(screen.getByText('Selected: foo')).toBeTruthy();
  });

  it('should render add item placeholder', () => {
    render(<ItemsComponent />);
    expect(screen.getByText('add-item works!')).toBeTruthy();
    expect(screen.getByText('Add Item (placeholder)')).toBeTruthy();
  });

  it('should call handleAddItem when add button is clicked', () => {
    const consoleSpy = jest.spyOn(console, 'info').mockImplementation();
    render(<ItemsComponent />);
    const addButton = screen.getByText('Add Item (placeholder)');
    fireEvent.click(addButton);
    expect(consoleSpy).toHaveBeenCalledWith('Add item:', { name: '', description: '', price: '' });
    consoleSpy.mockRestore();
  });
});
