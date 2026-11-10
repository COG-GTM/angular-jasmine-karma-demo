import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddItemComponent from './AddItemComponent';

const input = (name: string) => screen.getByRole('textbox', { name });
const save = () => screen.getByRole('button', { name: /save/i });

describe('AddItemComponent', () => {
  it('renders the intro text and three empty filled fields', () => {
    render(<AddItemComponent />);
    expect(screen.getByText('add-item works!')).toBeInTheDocument();
    for (const name of ['name', 'description', 'price']) {
      expect(input(name)).toHaveValue('');
      expect(input(name)).toHaveAttribute('placeholder', name);
      expect(input(name)).toHaveAttribute('name', name);
    }
  });

  it('keeps Save disabled until every field is non-empty', async () => {
    render(<AddItemComponent />);
    expect(save()).toBeDisabled();
    await userEvent.type(input('name'), 'foo');
    await userEvent.type(input('description'), 'bar');
    expect(save()).toBeDisabled();
    await userEvent.type(input('price'), '123');
    expect(save()).toBeEnabled();
    await userEvent.clear(input('description'));
    expect(save()).toBeDisabled();
  });

  it('treats whitespace as a value, like Validators.required', async () => {
    render(<AddItemComponent />);
    await userEvent.type(input('name'), ' ');
    await userEvent.type(input('description'), ' ');
    await userEvent.type(input('price'), ' ');
    expect(save()).toBeEnabled();
  });

  it('logs saveItem when Save is clicked', async () => {
    const info = vi.spyOn(console, 'info').mockImplementation(() => {});
    render(<AddItemComponent />);
    await userEvent.type(input('name'), 'foo');
    await userEvent.type(input('description'), 'bar');
    await userEvent.type(input('price'), '123');
    await userEvent.click(save());
    expect(info).toHaveBeenCalledWith('saveItem');
  });
});
