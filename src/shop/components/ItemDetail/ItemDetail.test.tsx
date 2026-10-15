import { render, screen } from '@testing-library/react';
import type { ReactElement } from 'react';
import type { Item } from '../../domain/item.model';
import ItemDetail, { type ItemDetailProps } from './ItemDetail';

describe('ItemDetailComponent: testing @Input from parent', () => {
  let itemInput: Item;
  let element: ReactElement<ItemDetailProps>;
  let container: HTMLElement;
  let rerender: (ui: ReactElement) => void;

  beforeEach(() => {
    itemInput = { name: 'foo', description: 'bar', price: '33' };
    element = <ItemDetail item={itemInput} />;
    ({ container, rerender } = render(element));
  });

  it('should create', () => {
    expect(container.querySelector('p')).toBeInTheDocument();
  });

  it('should get the name param value from @Input', () => {
    expect(element.props.item?.name).toContain(itemInput.name);
  });

  it('should get the description param value from @Input', () => {
    expect(element.props.item?.description).toContain(itemInput.description);
  });

  it('should get the price param value from @Input', () => {
    expect(element.props.item?.price).toContain(itemInput.price);
  });

  it('should handle null item input', () => {
    element = <ItemDetail item={null as unknown as ItemDetailProps['item']} />;
    rerender(element);
    expect(element.props.item).toBeNull();
    expect(screen.getByText('item-detail works!')).toBeInTheDocument();
  });

  it('should handle undefined item input', () => {
    element = <ItemDetail item={undefined} />;
    rerender(element);
    expect(element.props.item).toBeUndefined();
    expect(screen.getByText('item-detail works!')).toBeInTheDocument();
  });

  it('should accept item with different values', () => {
    const newItem = { name: 'new item', description: 'new description', price: '99' };
    element = <ItemDetail item={newItem} />;
    rerender(element);
    expect(element.props.item?.name).toEqual('new item');
    expect(element.props.item?.description).toEqual('new description');
    expect(element.props.item?.price).toEqual('99');
  });

  it('should render item-detail works text', () => {
    expect(container.textContent).toContain('item-detail works!');
  });

  it('should not render the item fields', () => {
    expect(screen.queryByText('foo')).toBeNull();
    expect(screen.queryByText('bar')).toBeNull();
    expect(screen.queryByText('33')).toBeNull();
  });
});
