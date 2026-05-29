import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AddItem, isFormValid } from './AddItem';

describe('AddItem', () => {
  it('should render', () => {
    render(<AddItem />);
    expect(screen.getByText('add-item works!')).toBeTruthy();
  });

  it('save button should be disabled when form is empty', () => {
    render(<AddItem />);
    const button = screen.getByRole('button', { name: /save/i });
    expect(button).toBeDisabled();
  });

  it('save button should be enabled when all fields are filled', async () => {
    const user = userEvent.setup();
    render(<AddItem />);
    await user.type(screen.getByPlaceholderText('name'), 'foo');
    await user.type(screen.getByPlaceholderText('description'), 'bar');
    await user.type(screen.getByPlaceholderText('price'), '33');
    const button = screen.getByRole('button', { name: /save/i });
    expect(button).not.toBeDisabled();
  });

  it('save button should remain disabled when only name is filled', async () => {
    const user = userEvent.setup();
    render(<AddItem />);
    await user.type(screen.getByPlaceholderText('name'), 'foo');
    expect(screen.getByRole('button', { name: /save/i })).toBeDisabled();
  });

  it('should log saveItem when save button is clicked', async () => {
    const spy = vi.spyOn(console, 'info').mockImplementation(() => {});
    const user = userEvent.setup();
    render(<AddItem />);
    await user.type(screen.getByPlaceholderText('name'), 'foo');
    await user.type(screen.getByPlaceholderText('description'), 'bar');
    await user.type(screen.getByPlaceholderText('price'), '33');
    await user.click(screen.getByRole('button', { name: /save/i }));
    expect(spy).toHaveBeenCalledWith('saveItem');
    spy.mockRestore();
  });
});

describe('isFormValid', () => {
  it('should return false when all fields are empty', () => {
    expect(isFormValid({ name: '', description: '', price: '' })).toBe(false);
  });

  it('should return true when all fields are filled', () => {
    expect(isFormValid({ name: 'foo', description: 'bar', price: '33' })).toBe(true);
  });

  it('should return false when only name is filled', () => {
    expect(isFormValid({ name: 'foo', description: '', price: '' })).toBe(false);
  });

  it('should return false when only description is filled', () => {
    expect(isFormValid({ name: '', description: 'bar', price: '' })).toBe(false);
  });

  it('should return false when only price is filled', () => {
    expect(isFormValid({ name: '', description: '', price: '33' })).toBe(false);
  });
});
