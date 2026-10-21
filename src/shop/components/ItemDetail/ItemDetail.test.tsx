import { render, screen } from '@testing-library/react';
import type { Item } from '../../domain/item.model';
import { ItemDetail, type ItemDetailProps } from './ItemDetail';

// Port of item-detail.component.spec.ts ("testing @Input from parent").
// Angular @Input -> React props. Angular set `component.item` and called detectChanges();
// in React the parent passes `item` as a prop and `rerender` plays the role of a new binding.
// Like the legacy template, ItemDetail renders only static text, so these tests check the
// props the component received (captured by a spy) and that it renders for every input.

function renderWithSpy(props: ItemDetailProps) {
  // A thin "parent" that records every props object handed to ItemDetail.
  const received = vi.fn<(props: ItemDetailProps) => void>();
  function Spy(p: ItemDetailProps) {
    received(p);
    return <ItemDetail {...p} />;
  }
  const utils = render(<Spy {...props} />);
  const rerender = (next: ItemDetailProps) => utils.rerender(<Spy {...next} />);
  const lastItem = () => received.mock.lastCall?.[0].item;
  return { ...utils, rerender, lastItem };
}

describe('ItemDetail: testing @Input from parent', () => {
  let itemInput: Item;

  beforeEach(() => {
    // pretend that it was wired to something that supplied an Item
    itemInput = { name: 'foo', description: 'bar', price: '33' };
  });

  it('should create', () => {
    const { container } = render(<ItemDetail item={itemInput} />);

    expect(container.firstChild).toBeInTheDocument();
  });

  it('should get the name param value from props', () => {
    const { lastItem } = renderWithSpy({ item: itemInput });

    expect(lastItem()?.name).toContain(itemInput.name);
  });

  it('should get the description param value from props', () => {
    const { lastItem } = renderWithSpy({ item: itemInput });

    expect(lastItem()?.description).toContain(itemInput.description);
  });

  it('should get the price param value from props', () => {
    const { lastItem } = renderWithSpy({ item: itemInput });

    expect(lastItem()?.price).toContain(itemInput.price);
  });

  it('should handle null item input', () => {
    // Arrange
    const { rerender, lastItem } = renderWithSpy({ item: itemInput });

    // Act
    rerender({ item: null });

    // Assert
    expect(lastItem()).toBeNull();
    expect(screen.getByText('item-detail works!')).toBeInTheDocument();
  });

  it('should handle undefined item input', () => {
    const { rerender, lastItem } = renderWithSpy({ item: itemInput });

    rerender({ item: undefined });

    expect(lastItem()).toBeUndefined();
    expect(screen.getByText('item-detail works!')).toBeInTheDocument();
  });

  it('should accept item with different values', () => {
    // Arrange
    const { rerender, lastItem } = renderWithSpy({ item: itemInput });
    const newItem: Item = { name: 'new item', description: 'new description', price: '99' };

    // Act
    rerender({ item: newItem });

    // Assert
    expect(lastItem()?.name).toEqual('new item');
    expect(lastItem()?.description).toEqual('new description');
    expect(lastItem()?.price).toEqual('99');
  });

  it('should render item-detail works text', () => {
    const { container } = render(<ItemDetail item={itemInput} />);

    expect(container.textContent).toContain('item-detail works!');
  });

  it('should render the same output with no item at all', () => {
    const { container } = render(<ItemDetail />);

    expect(container.innerHTML).toBe('<p>item-detail works!</p>');
  });
});
