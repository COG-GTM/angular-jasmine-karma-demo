import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Item } from './Item';

// Converted from item.component.spec.ts
describe('Item', () => {
  it('should render', () => {
    render(<Item name="Test Item" description="Test Description" price="100" />);
    expect(screen.getByText('Test Item')).toBeInTheDocument();
  });

  it('should render name, price (with €) and description', () => {
    render(<Item name="Test Item" description="Test Description" price="100" />);
    expect(screen.getByText('Test Item')).toBeInTheDocument();
    expect(screen.getByText('100 €')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('should log to console.info when like() is invoked via the button', async () => {
    const infoSpy = vi.spyOn(console, 'info').mockImplementation(() => {});
    render(<Item name="Test Item" description="Test Description" price="100" />);

    await userEvent.click(screen.getByRole('button', { name: 'like' }));

    expect(infoSpy).toHaveBeenCalledWith('like Test Item');
    infoSpy.mockRestore();
  });

  it('should expose a like button', () => {
    render(<Item name="Test Item" description="Test Description" price="100" />);
    expect(screen.getByRole('button', { name: 'like' })).toBeInTheDocument();
  });
});
