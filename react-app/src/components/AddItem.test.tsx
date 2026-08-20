import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import AddItem from './AddItem';
import { emptyForm, isFormValid } from '../utils/addItemForm';

describe('AddItem form validation', () => {
  it('is invalid when empty', () => {
    expect(isFormValid(emptyForm)).toBe(false);
  });

  it('is valid when all fields are filled', () => {
    expect(isFormValid({ name: 'foo', description: 'bar', price: '33' })).toBe(true);
  });

  it('is invalid when only one field is filled', () => {
    expect(isFormValid({ ...emptyForm, name: 'foo' })).toBe(false);
    expect(isFormValid({ ...emptyForm, description: 'bar' })).toBe(false);
    expect(isFormValid({ ...emptyForm, price: '33' })).toBe(false);
  });

  it('disables save while the form is invalid', () => {
    render(<AddItem />);

    expect(screen.getByRole('button', { name: /save/i })).toBeDisabled();
  });

  it('enables save and calls saveItem once every field is filled', async () => {
    const info = vi.spyOn(console, 'info').mockImplementation(() => {});
    render(<AddItem />);

    await userEvent.type(screen.getByLabelText('name'), 'foo');
    await userEvent.type(screen.getByLabelText('description'), 'bar');
    await userEvent.type(screen.getByLabelText('price'), '33');

    const saveButton = screen.getByRole('button', { name: /save/i });
    expect(saveButton).toBeEnabled();

    await userEvent.click(saveButton);
    expect(info).toHaveBeenCalledWith('saveItem');
    info.mockRestore();
  });
});
