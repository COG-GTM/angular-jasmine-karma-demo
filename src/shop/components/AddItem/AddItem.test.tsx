import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddItem from './AddItem';

afterEach(() => {
  vi.restoreAllMocks();
});

describe('AddItemComponent: testing form validation', () => {
  it('should create', () => {
    render(<AddItem />);
    expect(screen.getByText('add-item works!')).toBeInTheDocument();
  });

  it('form should be invalid when empty', () => {
    render(<AddItem />);
    expect(screen.getByRole('button', { name: /save/i })).toBeDisabled();
  });

  it('form should be valid when all fields are filled', async () => {
    const user = userEvent.setup();
    render(<AddItem />);
    await user.type(screen.getByPlaceholderText('name'), 'foo');
    await user.type(screen.getByPlaceholderText('description'), 'bar');
    await user.type(screen.getByPlaceholderText('price'), '33');
    expect(screen.getByRole('button', { name: /save/i })).toBeEnabled();
  });

  it('form should be invalid when only name is filled', async () => {
    const user = userEvent.setup();
    render(<AddItem />);
    await user.type(screen.getByPlaceholderText('name'), 'foo');
    expect(screen.getByRole('button', { name: /save/i })).toBeDisabled();
  });

  it('form should be invalid when only description is filled', async () => {
    const user = userEvent.setup();
    render(<AddItem />);
    await user.type(screen.getByPlaceholderText('description'), 'bar');
    expect(screen.getByRole('button', { name: /save/i })).toBeDisabled();
  });

  it('form should be invalid when only price is filled', async () => {
    const user = userEvent.setup();
    render(<AddItem />);
    await user.type(screen.getByPlaceholderText('price'), '33');
    expect(screen.getByRole('button', { name: /save/i })).toBeDisabled();
  });

  it('name field should be required', () => {
    render(<AddItem />);
    const input = screen.getByPlaceholderText('name');
    expect(input).toBeRequired();
    expect(input).toBeInvalid();
    expect(input).toHaveValue('');
  });

  it('description field should be required', () => {
    render(<AddItem />);
    const input = screen.getByPlaceholderText('description');
    expect(input).toBeRequired();
    expect(input).toBeInvalid();
    expect(input).toHaveValue('');
  });

  it('price field should be required', () => {
    render(<AddItem />);
    const input = screen.getByPlaceholderText('price');
    expect(input).toBeRequired();
    expect(input).toBeInvalid();
    expect(input).toHaveValue('');
  });

  it('button save should not call saveItem when form is invalid', async () => {
    const infoSpy = vi.spyOn(console, 'info').mockImplementation(() => {});
    const onSave = vi.fn();
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    render(<AddItem onSave={onSave} />);
    await user.click(screen.getByRole('button', { name: /save/i }));
    expect(infoSpy).toHaveBeenCalledTimes(0);
    expect(onSave).toHaveBeenCalledTimes(0);
  });

  it('button save should call saveItem when form is valid', async () => {
    const infoSpy = vi.spyOn(console, 'info').mockImplementation(() => {});
    const onSave = vi.fn();
    const user = userEvent.setup();
    render(<AddItem onSave={onSave} />);
    await user.type(screen.getByPlaceholderText('name'), 'foo');
    await user.type(screen.getByPlaceholderText('description'), 'bar');
    await user.type(screen.getByPlaceholderText('price'), '33');
    await user.click(screen.getByRole('button', { name: /save/i }));
    expect(infoSpy).toHaveBeenCalledTimes(1);
    expect(infoSpy).toHaveBeenCalledWith('saveItem');
    expect(onSave).toHaveBeenCalledTimes(1);
  });

  it('saveItem method should log to console', async () => {
    const infoSpy = vi.spyOn(console, 'info').mockImplementation(() => {});
    const user = userEvent.setup();
    render(<AddItem />);
    await user.type(screen.getByPlaceholderText('name'), 'foo');
    await user.type(screen.getByPlaceholderText('description'), 'bar');
    await user.type(screen.getByPlaceholderText('price'), '33');
    await user.click(screen.getByRole('button', { name: /save/i }));
    expect(infoSpy).toHaveBeenCalledWith('saveItem');
  });

  it('button should be disabled when form is invalid', () => {
    render(<AddItem />);
    expect(screen.getByRole('button', { name: /save/i })).toBeDisabled();
  });

  it('button should be enabled when form is valid', async () => {
    const user = userEvent.setup();
    render(<AddItem />);
    await user.type(screen.getByPlaceholderText('name'), 'foo');
    await user.type(screen.getByPlaceholderText('description'), 'bar');
    await user.type(screen.getByPlaceholderText('price'), '33');
    expect(screen.getByRole('button', { name: /save/i })).toBeEnabled();
  });

  it('onSave should receive the entered item', async () => {
    vi.spyOn(console, 'info').mockImplementation(() => {});
    const onSave = vi.fn();
    const user = userEvent.setup();
    render(<AddItem onSave={onSave} />);
    await user.type(screen.getByPlaceholderText('name'), 'foo');
    await user.type(screen.getByPlaceholderText('description'), 'bar');
    await user.type(screen.getByPlaceholderText('price'), '33');
    await user.click(screen.getByRole('button', { name: /save/i }));
    expect(onSave).toHaveBeenCalledWith({ name: 'foo', description: 'bar', price: '33' });
  });
});
