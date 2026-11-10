import { render, screen } from '@testing-library/react';
import ItemDetailComponent from './ItemDetailComponent';

describe('ItemDetailComponent', () => {
  it('renders its placeholder text with or without an item', () => {
    const { rerender } = render(<ItemDetailComponent />);
    expect(screen.getByText('item-detail works!')).toBeInTheDocument();
    rerender(<ItemDetailComponent item={{ name: 'foo', description: 'bar', price: '123' }} />);
    expect(screen.getByText('item-detail works!')).toBeInTheDocument();
  });
});
