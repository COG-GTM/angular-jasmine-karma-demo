import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ItemsComponent } from './ItemsComponent';
import type { Item } from './ItemDetailComponent';

describe('ItemsComponent', () => {
  it('should render the component', () => {
    render(<ItemsComponent />);
    expect(screen.getByText('items shop')).toBeInTheDocument();
  });

  it('should render default items when no initialItems provided', () => {
    render(<ItemsComponent />);
    expect(screen.getByText('foo')).toBeInTheDocument();
    expect(screen.getByText('mario')).toBeInTheDocument();
    expect(screen.getByText('luigi')).toBeInTheDocument();
  });

  it('should render custom items when initialItems provided', () => {
    const customItems: Item[] = [
      { name: 'custom1', description: 'desc1', price: '100' },
      { name: 'custom2', description: 'desc2', price: '200' },
    ];
    render(<ItemsComponent initialItems={customItems} />);
    expect(screen.getByText('custom1')).toBeInTheDocument();
    expect(screen.getByText('custom2')).toBeInTheDocument();
    expect(screen.queryByText('foo')).not.toBeInTheDocument();
  });

  it('should display item prices', () => {
    render(<ItemsComponent />);
    expect(screen.getByText(/123/)).toBeInTheDocument();
    expect(screen.getByText(/456/)).toBeInTheDocument();
    expect(screen.getByText(/789/)).toBeInTheDocument();
  });

  it('should display item descriptions', () => {
    render(<ItemsComponent />);
    expect(screen.getByText('bar')).toBeInTheDocument();
    expect(screen.getAllByText('bross').length).toBeGreaterThan(0);
  });

  it('should show item detail when item is clicked', () => {
    render(<ItemsComponent />);
    const fooItem = screen.getByText('foo').closest('div[class="card"]');
    if (fooItem) {
      fireEvent.click(fooItem);
    }
    expect(screen.getByText('item-detail works!')).toBeInTheDocument();
    expect(screen.getByText('Selected: foo')).toBeInTheDocument();
  });

  it('should render add item form', () => {
    render(<ItemsComponent />);
    expect(screen.getByText('add-item works!')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument();
  });

  it('should add new item when form is submitted', () => {
    const consoleSpy = jest.spyOn(console, 'info').mockImplementation();
    render(<ItemsComponent />);
    
    const nameInput = screen.getByPlaceholderText('name');
    const descriptionInput = screen.getByPlaceholderText('description');
    const priceInput = screen.getByPlaceholderText('price');
    
    fireEvent.change(nameInput, { target: { value: 'newItem' } });
    fireEvent.change(descriptionInput, { target: { value: 'newDesc' } });
    fireEvent.change(priceInput, { target: { value: '999' } });
    
    const saveButton = screen.getByRole('button', { name: /save/i });
    fireEvent.click(saveButton);
    
    expect(consoleSpy).toHaveBeenCalledWith('Add item:', { name: 'newItem', description: 'newDesc', price: '999' });
    consoleSpy.mockRestore();
  });
});
