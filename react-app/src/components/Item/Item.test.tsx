import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Item } from './Item';

describe('Item', () => {
  it('should render', () => {
    render(<Item name="Test Item" description="Test Description" price="100" />);
    expect(screen.getByText('Test Item')).toBeTruthy();
  });

  it('should display name, price, and description', () => {
    render(<Item name="Test Item" description="Test Description" price="100" />);
    expect(screen.getByText('Test Item')).toBeTruthy();
    expect(screen.getByText(/100 €/)).toBeTruthy();
    expect(screen.getByText('Test Description')).toBeTruthy();
  });

  it('should log to console when like is clicked', async () => {
    const spy = vi.spyOn(console, 'info').mockImplementation(() => {});
    const user = userEvent.setup();
    render(<Item name="Test Item" description="Test Description" price="100" />);
    await user.click(screen.getByRole('button', { name: /like/i }));
    expect(spy).toHaveBeenCalledWith('like Test Item');
    spy.mockRestore();
  });

  it('should call onLike callback when like button is clicked', async () => {
    const onLike = vi.fn();
    const user = userEvent.setup();
    render(<Item name="Test Item" description="Desc" price="50" onLike={onLike} />);
    await user.click(screen.getByRole('button', { name: /like/i }));
    expect(onLike).toHaveBeenCalledTimes(1);
  });
});
