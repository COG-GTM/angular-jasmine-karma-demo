import { render, screen } from '@testing-library/react';
import { Item } from '../../../domain/item.model';
import { ItemDetail } from './ItemDetail';

describe('ItemDetail: testing item prop from parent', () => {
  const itemInput: Item = { name: 'foo', description: 'bar', price: '33' };

  it('should create', () => {
    const { container } = render(<ItemDetail item={itemInput} />);
    expect(container).toBeTruthy();
  });

  it('should render item-detail works text', () => {
    render(<ItemDetail item={itemInput} />);
    expect(screen.getByText('item-detail works!')).toBeInTheDocument();
  });

  it('should accept item with different values without changing output', () => {
    const newItem: Item = { name: 'new item', description: 'new description', price: '99' };
    const { rerender, container } = render(<ItemDetail item={itemInput} />);
    const before = container.innerHTML;
    rerender(<ItemDetail item={newItem} />);
    expect(container.innerHTML).toEqual(before);
    expect(screen.getByText('item-detail works!')).toBeInTheDocument();
  });

  it('should not render item fields (template is static, 1:1 with Angular)', () => {
    render(<ItemDetail item={itemInput} />);
    expect(screen.queryByText('foo')).toBeNull();
    expect(screen.queryByText('bar')).toBeNull();
    expect(screen.queryByText('33')).toBeNull();
  });
});
