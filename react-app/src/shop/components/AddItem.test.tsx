import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import AddItem from './AddItem';

function getFields() {
  return {
    name: screen.getByPlaceholderText('name'),
    description: screen.getByPlaceholderText('description'),
    price: screen.getByPlaceholderText('price'),
  };
}

function getSaveButton() {
  return screen.getByRole('button', { name: /save/i });
}

function fillAll() {
  const { name, description, price } = getFields();
  fireEvent.change(name, { target: { value: 'foo' } });
  fireEvent.change(description, { target: { value: 'bar' } });
  fireEvent.change(price, { target: { value: '33' } });
}

describe('AddItem: testing form validation', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should create', () => {
    // Arrange / Act
    render(<AddItem />);
    // Assert
    expect(screen.getByText('add-item works!')).toBeInTheDocument();
  });

  it('renders the name, description and price fields', () => {
    // Arrange / Act
    render(<AddItem />);
    const { name, description, price } = getFields();
    // Assert
    expect(name).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(price).toBeInTheDocument();
  });

  it('name field should be required', () => {
    // Arrange / Act
    render(<AddItem />);
    // Assert
    expect(getFields().name).toBeRequired();
  });

  it('description field should be required', () => {
    // Arrange / Act
    render(<AddItem />);
    // Assert
    expect(getFields().description).toBeRequired();
  });

  it('price field should be required', () => {
    // Arrange / Act
    render(<AddItem />);
    // Assert
    expect(getFields().price).toBeRequired();
  });

  it('button should be disabled when form is empty', () => {
    // Arrange / Act
    render(<AddItem />);
    // Assert
    expect(getSaveButton()).toBeDisabled();
  });

  it('button should be enabled when all fields are filled', () => {
    // Arrange
    render(<AddItem />);
    // Act
    fillAll();
    // Assert
    expect(getSaveButton()).toBeEnabled();
  });

  it('button should be disabled when only name is filled', () => {
    // Arrange
    render(<AddItem />);
    // Act
    fireEvent.change(getFields().name, { target: { value: 'foo' } });
    // Assert
    expect(getSaveButton()).toBeDisabled();
  });

  it('button should be disabled when only description is filled', () => {
    // Arrange
    render(<AddItem />);
    // Act
    fireEvent.change(getFields().description, { target: { value: 'bar' } });
    // Assert
    expect(getSaveButton()).toBeDisabled();
  });

  it('button should be disabled when only price is filled', () => {
    // Arrange
    render(<AddItem />);
    // Act
    fireEvent.change(getFields().price, { target: { value: '33' } });
    // Assert
    expect(getSaveButton()).toBeDisabled();
  });

  it('button should be disabled again when a field is cleared', () => {
    // Arrange
    render(<AddItem />);
    fillAll();
    // Act
    fireEvent.change(getFields().description, { target: { value: '' } });
    // Assert
    expect(getSaveButton()).toBeDisabled();
  });

  it('button save should not call saveItem when form is invalid', () => {
    // Arrange
    const infoSpy = vi.spyOn(console, 'info').mockImplementation(() => {});
    render(<AddItem />);
    // Act
    fireEvent.click(getSaveButton());
    // Assert
    expect(infoSpy).not.toHaveBeenCalled();
  });

  it('button save should call saveItem when form is valid', () => {
    // Arrange
    const infoSpy = vi.spyOn(console, 'info').mockImplementation(() => {});
    render(<AddItem />);
    fillAll();
    // Act
    fireEvent.click(getSaveButton());
    // Assert
    expect(infoSpy).toHaveBeenCalledTimes(1);
    expect(infoSpy).toHaveBeenCalledWith('saveItem');
  });
});
