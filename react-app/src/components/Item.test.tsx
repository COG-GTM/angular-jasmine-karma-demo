import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import Item from './Item';

describe('Item', () => {
  it('renders the name, price and description', () => {
    render(<Item name="foo" description="bar" price="123" />);

    expect(screen.getByText('foo')).toBeInTheDocument();
    expect(screen.getByText('123 €')).toBeInTheDocument();
    expect(screen.getByText('bar')).toBeInTheDocument();
  });

  it('logs when the like button is clicked', async () => {
    const info = vi.spyOn(console, 'info').mockImplementation(() => {});
    render(<Item name="foo" description="bar" price="123" />);

    await userEvent.click(screen.getByRole('button', { name: 'like' }));

    expect(info).toHaveBeenCalledWith('like foo');
    info.mockRestore();
  });
});
