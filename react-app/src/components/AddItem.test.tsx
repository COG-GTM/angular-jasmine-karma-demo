import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AddItem } from './AddItem';

describe('AddItem (ported from AddItemComponent: form validation)', () => {
  it('renders the three required fields and a Save button', () => {
    render(<AddItem />);
    expect(screen.getByPlaceholderText('name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('description')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('price')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument();
  });

  it('disables the Save button when the form is empty/invalid', () => {
    render(<AddItem />);
    expect(screen.getByRole('button', { name: /save/i })).toBeDisabled();
  });

  it('keeps the Save button disabled when only one field is filled', async () => {
    render(<AddItem />);
    await userEvent.type(screen.getByPlaceholderText('name'), 'foo');
    expect(screen.getByRole('button', { name: /save/i })).toBeDisabled();
  });

  it('enables the Save button when all fields are filled', async () => {
    render(<AddItem />);
    await userEvent.type(screen.getByPlaceholderText('name'), 'foo');
    await userEvent.type(screen.getByPlaceholderText('description'), 'bar');
    await userEvent.type(screen.getByPlaceholderText('price'), '33');
    expect(screen.getByRole('button', { name: /save/i })).toBeEnabled();
  });

  it('does not call saveItem (no console log) while the button is disabled', async () => {
    const infoSpy = vi.spyOn(console, 'info').mockImplementation(() => {});
    render(<AddItem />);
    await userEvent.click(screen.getByRole('button', { name: /save/i }));
    expect(infoSpy).not.toHaveBeenCalled();
    infoSpy.mockRestore();
  });

  it('logs to the console when saving a valid form', async () => {
    const infoSpy = vi.spyOn(console, 'info').mockImplementation(() => {});
    render(<AddItem />);
    await userEvent.type(screen.getByPlaceholderText('name'), 'foo');
    await userEvent.type(screen.getByPlaceholderText('description'), 'bar');
    await userEvent.type(screen.getByPlaceholderText('price'), '33');

    await userEvent.click(screen.getByRole('button', { name: /save/i }));

    expect(infoSpy).toHaveBeenCalledWith('saveItem');
    infoSpy.mockRestore();
  });
});
