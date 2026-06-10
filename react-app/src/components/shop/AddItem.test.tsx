import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AddItem, isFormValid } from './AddItem';

// Converted from add-item.component.spec.ts
describe('AddItem - validation logic', () => {
  it('is invalid when empty', () => {
    expect(isFormValid({ name: '', description: '', price: '' })).toBe(false);
  });

  it('is valid when all fields are filled', () => {
    expect(isFormValid({ name: 'foo', description: 'bar', price: '33' })).toBe(true);
  });

  it('is invalid when only name is filled', () => {
    expect(isFormValid({ name: 'foo', description: '', price: '' })).toBe(false);
  });

  it('is invalid when only description is filled', () => {
    expect(isFormValid({ name: '', description: 'bar', price: '' })).toBe(false);
  });

  it('is invalid when only price is filled', () => {
    expect(isFormValid({ name: '', description: '', price: '33' })).toBe(false);
  });
});

describe('AddItem - component', () => {
  it('renders the "add-item works!" text and a disabled Save button initially', () => {
    render(<AddItem />);
    expect(screen.getByText('add-item works!')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Save/ })).toBeDisabled();
  });

  it('enables the Save button once all fields are filled', async () => {
    render(<AddItem />);
    await userEvent.type(screen.getByLabelText('name'), 'foo');
    await userEvent.type(screen.getByLabelText('description'), 'bar');
    await userEvent.type(screen.getByLabelText('price'), '33');
    expect(screen.getByRole('button', { name: /Save/ })).toBeEnabled();
  });

  it('does not call saveItem (console.info) while the form is invalid', async () => {
    const infoSpy = vi.spyOn(console, 'info').mockImplementation(() => {});
    render(<AddItem />);
    // Button is disabled; fireEvent bypasses pointer-events to confirm no-op.
    fireEvent.click(screen.getByRole('button', { name: /Save/ }));
    expect(infoSpy).not.toHaveBeenCalledWith('saveItem');
    infoSpy.mockRestore();
  });

  it('calls saveItem (console.info) when the form is valid and Save is clicked', async () => {
    const infoSpy = vi.spyOn(console, 'info').mockImplementation(() => {});
    render(<AddItem />);
    await userEvent.type(screen.getByLabelText('name'), 'foo');
    await userEvent.type(screen.getByLabelText('description'), 'bar');
    await userEvent.type(screen.getByLabelText('price'), '33');

    await userEvent.click(screen.getByRole('button', { name: /Save/ }));
    expect(infoSpy).toHaveBeenCalledWith('saveItem');
    infoSpy.mockRestore();
  });
});
