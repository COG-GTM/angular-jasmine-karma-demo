import { fireEvent, render, screen } from '@testing-library/react';
import { AddItem } from './AddItem';

describe('AddItem', () => {
  const fillForm = () => {
    fireEvent.change(screen.getByLabelText('name'), { target: { value: 'foo' } });
    fireEvent.change(screen.getByLabelText('description'), { target: { value: 'bar' } });
    fireEvent.change(screen.getByLabelText('price'), { target: { value: '123' } });
  };

  it('should render the works text and the three fields', () => {
    render(<AddItem />);
    expect(screen.getByText('add-item works!')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('description')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('price')).toBeInTheDocument();
  });

  it('should disable Save while the form is invalid', () => {
    render(<AddItem />);
    const save = screen.getByRole('button', { name: /save/i });
    expect(save).toBeDisabled();
    fireEvent.change(screen.getByLabelText('name'), { target: { value: 'foo' } });
    expect(save).toBeDisabled();
  });

  it('should enable Save once all fields are filled and log on click', () => {
    const info = vi.spyOn(console, 'info').mockImplementation(() => undefined);
    render(<AddItem />);
    fillForm();
    const save = screen.getByRole('button', { name: /save/i });
    expect(save).toBeEnabled();
    fireEvent.click(save);
    expect(info).toHaveBeenCalledWith('saveItem');
    info.mockRestore();
  });

  it('should keep inputs controlled', () => {
    render(<AddItem />);
    fireEvent.change(screen.getByLabelText('price'), { target: { value: '9.99' } });
    expect(screen.getByLabelText('price')).toHaveValue('9.99');
  });
});
