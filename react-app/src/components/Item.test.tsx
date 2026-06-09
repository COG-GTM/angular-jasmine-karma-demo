import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Item } from './Item';

describe('Item (ported from ItemComponent)', () => {
  it('renders the name, price and description', () => {
    render(<Item name="Test Item" description="Test Description" price="100" />);
    expect(screen.getByText('Test Item')).toBeInTheDocument();
    expect(screen.getByText('100 €')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('has a like button', () => {
    render(<Item name="Test Item" description="d" price="1" />);
    expect(
      screen.getByRole('button', { name: /like/i })
    ).toBeInTheDocument();
  });

  it('logs to the console when the like button is clicked', async () => {
    const infoSpy = vi.spyOn(console, 'info').mockImplementation(() => {});
    render(<Item name="Test Item" description="d" price="1" />);

    await userEvent.click(screen.getByRole('button', { name: /like/i }));

    expect(infoSpy).toHaveBeenCalledWith('like Test Item');
    infoSpy.mockRestore();
  });
});
