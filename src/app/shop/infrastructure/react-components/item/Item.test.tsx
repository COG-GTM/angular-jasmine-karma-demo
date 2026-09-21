import { fireEvent, render, screen } from '@testing-library/react';
import { Item } from './Item';

describe('Item', () => {
  const props = { name: 'foo', description: 'bar', price: '123' };

  it('should render name, price and description', () => {
    render(<Item {...props} />);
    expect(screen.getByText('foo')).toBeInTheDocument();
    expect(screen.getByText('123 €')).toBeInTheDocument();
    expect(screen.getByText('bar')).toBeInTheDocument();
  });

  it('should log on like click', () => {
    const info = vi.spyOn(console, 'info').mockImplementation(() => undefined);
    render(<Item {...props} />);
    fireEvent.click(screen.getByRole('button', { name: 'like' }));
    expect(info).toHaveBeenCalledWith('like foo');
    info.mockRestore();
  });
});
