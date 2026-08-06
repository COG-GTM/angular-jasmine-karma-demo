import { fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import AddItem from './AddItem';

describe('AddItem', () => {
  it('renders with Save disabled while the form is empty', () => {
    render(<AddItem />);

    expect(screen.getByText('add-item works!')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Save' })).toBeDisabled();
  });

  it('enables Save when all required fields are filled', () => {
    render(<AddItem />);

    fireEvent.change(screen.getByLabelText('name'), { target: { value: 'Item name' } });
    fireEvent.change(screen.getByLabelText('description'), {
      target: { value: 'Item description' },
    });
    fireEvent.change(screen.getByLabelText('price'), { target: { value: '33' } });

    expect(screen.getByRole('button', { name: 'Save' })).toBeEnabled();
  });

  it('logs saveItem when Save is clicked', () => {
    const infoSpy = vi.spyOn(console, 'info').mockImplementation(() => undefined);
    render(<AddItem />);

    fireEvent.change(screen.getByLabelText('name'), { target: { value: 'Item name' } });
    fireEvent.change(screen.getByLabelText('description'), {
      target: { value: 'Item description' },
    });
    fireEvent.change(screen.getByLabelText('price'), { target: { value: '33' } });
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));

    expect(infoSpy).toHaveBeenCalledWith('saveItem');

    infoSpy.mockRestore();
  });
});
