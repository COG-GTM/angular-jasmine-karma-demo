import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ItemComponent from './ItemComponent';

describe('ItemComponent', () => {
  it('renders name, price with € and description inside a .card', () => {
    const { container } = render(<ItemComponent name="foo" description="bar" price="123" />);
    expect(container.querySelector('.card')).toBeInTheDocument();
    expect(screen.getByText('foo')).toBeInTheDocument();
    expect(screen.getByText('123 €')).toBeInTheDocument();
    expect(screen.getByText('bar')).toBeInTheDocument();
  });

  it('logs "like <name>" when the like button is clicked', async () => {
    const info = vi.spyOn(console, 'info').mockImplementation(() => {});
    render(<ItemComponent name="mario" description="bross" price="456" />);
    await userEvent.click(screen.getByRole('button', { name: 'like' }));
    expect(info).toHaveBeenCalledWith('like mario');
  });
});
