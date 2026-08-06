import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import Item from './Item';

describe('Item', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders the name, description, and price', () => {
    render(<Item name="Test Item" description="Test Description" price="100" />);

    expect(screen.getByRole('heading', { name: 'Test Item' })).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('100 €')).toBeInTheDocument();
  });

  it('logs a like message when the favorite button is clicked', () => {
    const infoSpy = vi.spyOn(console, 'info').mockImplementation(() => undefined);
    render(<Item name="Test Item" description="Test Description" price="100" />);

    fireEvent.click(screen.getByRole('button', { name: 'like' }));

    expect(infoSpy).toHaveBeenCalledWith('like Test Item');
  });
});
