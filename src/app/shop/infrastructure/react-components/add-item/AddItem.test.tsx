import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AddItem } from './AddItem';

describe('AddItem: testing form validation', () => {
  it('should render the component', () => {
    render(<AddItem />);
    expect(screen.getByText('add-item works!')).toBeInTheDocument();
  });

  it('form should be invalid when fields are empty (button disabled)', () => {
    render(<AddItem />);
    const saveButton = screen.getByRole('button', { name: /save/i });
    expect(saveButton).toBeDisabled();
  });

  it('form should be valid when all fields are filled (button enabled)', () => {
    render(<AddItem />);
    fireEvent.change(screen.getByPlaceholderText('name'), { target: { value: 'foo' } });
    fireEvent.change(screen.getByPlaceholderText('description'), { target: { value: 'bar' } });
    fireEvent.change(screen.getByPlaceholderText('price'), { target: { value: '33' } });

    const saveButton = screen.getByRole('button', { name: /save/i });
    expect(saveButton).toBeEnabled();
  });

  it('button save should not call saveItem when form is invalid', () => {
    const consoleSpy = jest.spyOn(console, 'info').mockImplementation();
    render(<AddItem />);
    const saveButton = screen.getByRole('button', { name: /save/i });
    fireEvent.click(saveButton);
    expect(consoleSpy).not.toHaveBeenCalled();
    consoleSpy.mockRestore();
  });

  it('button save should call saveItem when form is valid', () => {
    const consoleSpy = jest.spyOn(console, 'info').mockImplementation();
    render(<AddItem />);

    fireEvent.change(screen.getByPlaceholderText('name'), { target: { value: 'foo' } });
    fireEvent.change(screen.getByPlaceholderText('description'), { target: { value: 'bar' } });
    fireEvent.change(screen.getByPlaceholderText('price'), { target: { value: '33' } });

    const saveButton = screen.getByRole('button', { name: /save/i });
    fireEvent.click(saveButton);
    expect(consoleSpy).toHaveBeenCalledWith('saveItem');
    consoleSpy.mockRestore();
  });
});
