import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { AddItemComponent } from './AddItemComponent';

describe('AddItemComponent: testing form validation', () => {
  it('should create', () => {
    render(<AddItemComponent />);
    expect(screen.getByText('add-item works!')).toBeInTheDocument();
  });

  it('form should be invalid when fields are empty', () => {
    render(<AddItemComponent />);
    const saveButton = screen.getByRole('button', { name: /save/i });
    expect(saveButton).toBeDisabled();
  });

  it('form should be valid when all fields are filled', () => {
    render(<AddItemComponent />);
    
    const nameInput = screen.getByPlaceholderText('name');
    const descriptionInput = screen.getByPlaceholderText('description');
    const priceInput = screen.getByPlaceholderText('price');
    
    fireEvent.change(nameInput, { target: { value: 'foo' } });
    fireEvent.change(descriptionInput, { target: { value: 'bar' } });
    fireEvent.change(priceInput, { target: { value: '33' } });
    
    const saveButton = screen.getByRole('button', { name: /save/i });
    expect(saveButton).not.toBeDisabled();
  });

  it('button save should not call saveItem when form is invalid', () => {
    const mockSaveItem = jest.fn();
    render(<AddItemComponent onSaveItem={mockSaveItem} />);
    
    const saveButton = screen.getByRole('button', { name: /save/i });
    fireEvent.click(saveButton);
    
    expect(mockSaveItem).not.toHaveBeenCalled();
  });

  it('button save should call onSaveItem when form is valid', () => {
    const mockSaveItem = jest.fn();
    render(<AddItemComponent onSaveItem={mockSaveItem} />);
    
    const nameInput = screen.getByPlaceholderText('name');
    const descriptionInput = screen.getByPlaceholderText('description');
    const priceInput = screen.getByPlaceholderText('price');
    
    fireEvent.change(nameInput, { target: { value: 'foo' } });
    fireEvent.change(descriptionInput, { target: { value: 'bar' } });
    fireEvent.change(priceInput, { target: { value: '33' } });
    
    const saveButton = screen.getByRole('button', { name: /save/i });
    fireEvent.click(saveButton);
    
    expect(mockSaveItem).toHaveBeenCalledTimes(1);
    expect(mockSaveItem).toHaveBeenCalledWith({
      name: 'foo',
      description: 'bar',
      price: '33',
    });
  });

  it('should show validation errors when fields are touched and empty', () => {
    render(<AddItemComponent />);
    
    const nameInput = screen.getByPlaceholderText('name');
    fireEvent.blur(nameInput);
    
    expect(screen.getByText('Name is required')).toBeInTheDocument();
  });

  it('should not show validation errors before fields are touched', () => {
    render(<AddItemComponent />);
    
    expect(screen.queryByText('Name is required')).not.toBeInTheDocument();
    expect(screen.queryByText('Description is required')).not.toBeInTheDocument();
    expect(screen.queryByText('Price is required')).not.toBeInTheDocument();
  });

  it('name field should be required', () => {
    render(<AddItemComponent />);
    
    const descriptionInput = screen.getByPlaceholderText('description');
    const priceInput = screen.getByPlaceholderText('price');
    
    fireEvent.change(descriptionInput, { target: { value: 'bar' } });
    fireEvent.change(priceInput, { target: { value: '33' } });
    
    const saveButton = screen.getByRole('button', { name: /save/i });
    expect(saveButton).toBeDisabled();
  });

  it('description field should be required', () => {
    render(<AddItemComponent />);
    
    const nameInput = screen.getByPlaceholderText('name');
    const priceInput = screen.getByPlaceholderText('price');
    
    fireEvent.change(nameInput, { target: { value: 'foo' } });
    fireEvent.change(priceInput, { target: { value: '33' } });
    
    const saveButton = screen.getByRole('button', { name: /save/i });
    expect(saveButton).toBeDisabled();
  });

  it('price field should be required', () => {
    render(<AddItemComponent />);
    
    const nameInput = screen.getByPlaceholderText('name');
    const descriptionInput = screen.getByPlaceholderText('description');
    
    fireEvent.change(nameInput, { target: { value: 'foo' } });
    fireEvent.change(descriptionInput, { target: { value: 'bar' } });
    
    const saveButton = screen.getByRole('button', { name: /save/i });
    expect(saveButton).toBeDisabled();
  });
});
