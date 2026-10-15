import { act, render, renderHook, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ItemProps } from '../Item';
import Items from './Items';
import { useItemsSort, type SortField } from './useItemsSort';

vi.mock('../Item', () => ({
  default: ({ name, description, price }: ItemProps) => (
    <div data-testid="item-stub">
      <span data-testid="item-name">{name}</span>
      <span data-testid="item-description">{description}</span>
      <span data-testid="item-price">{price}</span>
    </div>
  ),
}));

const LABELS: Record<SortField, string> = {
  name: 'Name',
  description: 'Description',
  price: 'Price',
};

function renderItems() {
  const user = userEvent.setup();
  const utils = render(<Items />);
  return { user, ...utils };
}

function sortButton(field: SortField) {
  return screen.getByRole('button', { name: new RegExp(`^${LABELS[field]}`) });
}

function renderedItems() {
  return screen.queryAllByTestId('item-stub').map((el) => ({
    name: within(el).getByTestId('item-name').textContent,
    description: within(el).getByTestId('item-description').textContent,
    price: within(el).getByTestId('item-price').textContent,
  }));
}

function sortState() {
  const active = document.querySelectorAll('.sort-btn.active');
  expect(active).toHaveLength(1);
  const text = active[0].textContent ?? '';
  const field = (Object.keys(LABELS) as SortField[]).find((f) => text.startsWith(LABELS[f]));
  return { sortBy: field, sortOrder: text.includes('↑') ? 'asc' : text.includes('↓') ? 'desc' : undefined };
}

async function arrangeSort(user: ReturnType<typeof userEvent.setup>, field: SortField, order: 'asc' | 'desc') {
  while (sortState().sortBy !== field || sortState().sortOrder !== order) {
    await user.click(sortButton(field));
  }
}

describe('ItemsComponent: testing sorting functionality', () => {
  it('should create', () => {
    // Arrange & Act
    renderItems();

    // Assert
    expect(screen.getByRole('heading', { name: 'Shop Items' })).toBeInTheDocument();
    expect(screen.getByText('Sort by:')).toBeInTheDocument();
  });

  describe('Initial State', () => {
    it('should have items array initialized with 5 items', () => {
      // Arrange & Act
      renderItems();

      // Assert
      expect(renderedItems()).toHaveLength(5);
    });

    it('should have sortBy initialized to "name"', () => {
      // Arrange & Act
      renderItems();

      // Assert
      expect(sortState().sortBy).toBe('name');
      expect(sortButton('name')).toHaveClass('active');
      expect(sortButton('description')).not.toHaveClass('active');
      expect(sortButton('price')).not.toHaveClass('active');
    });

    it('should have sortOrder initialized to "asc"', () => {
      // Arrange & Act
      renderItems();

      // Assert
      expect(sortState().sortOrder).toBe('asc');
      expect(sortButton('name')).toHaveTextContent('Name ↑');
    });

    it('should have items in default order (by name ascending)', () => {
      // Arrange & Act
      renderItems();

      // Assert
      expect(renderedItems().map((item) => item.name)).toEqual(['foo', 'mario', 'luigi', 'apple', 'banana']);
    });
  });

  describe('Sorting by Name', () => {
    it('should sort items by name in ascending order', async () => {
      // Arrange
      const { user } = renderItems();
      await arrangeSort(user, 'price', 'desc');

      // Act
      await user.click(sortButton('name'));

      // Assert
      const items = renderedItems();
      expect(sortState()).toEqual({ sortBy: 'name', sortOrder: 'asc' });
      expect(items[0].name).toBe('apple');
      expect(items[items.length - 1].name).toBe('mario');
    });

    it('should sort items by name in descending order when toggled', async () => {
      // Arrange
      const { user } = renderItems();

      // Act
      await user.click(sortButton('name'));

      // Assert
      const items = renderedItems();
      expect(sortState()).toEqual({ sortBy: 'name', sortOrder: 'desc' });
      expect(items[0].name).toBe('mario');
      expect(items[items.length - 1].name).toBe('apple');
    });
  });

  describe('Sorting by Description', () => {
    it('should sort items by description in ascending order', async () => {
      // Arrange
      const { user } = renderItems();

      // Act
      await user.click(sortButton('description'));

      // Assert
      const items = renderedItems();
      expect(sortState()).toEqual({ sortBy: 'description', sortOrder: 'asc' });
      expect(items[0].description).toBe('bar');
      expect(items[1].description).toBe('bross');
      expect(items[items.length - 1].description).toBe('fruit');
    });

    it('should sort items by description in descending order when toggled', async () => {
      // Arrange
      const { user } = renderItems();
      await arrangeSort(user, 'description', 'asc');

      // Act
      await user.click(sortButton('description'));

      // Assert
      const items = renderedItems();
      expect(sortState()).toEqual({ sortBy: 'description', sortOrder: 'desc' });
      expect(items[0].description).toBe('fruit');
      expect(items[items.length - 1].description).toBe('bar');
    });
  });

  describe('Sorting by Price', () => {
    it('should sort items by price in ascending order', async () => {
      // Arrange
      const { user } = renderItems();

      // Act
      await user.click(sortButton('price'));

      // Assert
      const items = renderedItems();
      expect(sortState()).toEqual({ sortBy: 'price', sortOrder: 'asc' });
      expect(items.map((item) => item.price)).toEqual(['123', '456', '59', '789', '99']);
      expect(items[0].price).toBe('123');
      expect(items[items.length - 1].price).toBe('99');
    });

    it('should sort items by price in descending order when toggled', async () => {
      // Arrange
      const { user } = renderItems();
      await arrangeSort(user, 'price', 'asc');

      // Act
      await user.click(sortButton('price'));

      // Assert
      const items = renderedItems();
      expect(sortState()).toEqual({ sortBy: 'price', sortOrder: 'desc' });
      expect(items[0].price).toBe('99');
      expect(items[items.length - 1].price).toBe('123');
    });
  });

  describe('Toggle Behavior', () => {
    it('should toggle sortOrder from asc to desc when clicking same field', async () => {
      // Arrange
      const { user } = renderItems();
      await arrangeSort(user, 'name', 'asc');

      // Act
      await user.click(sortButton('name'));

      // Assert
      expect(sortState()).toEqual({ sortBy: 'name', sortOrder: 'desc' });
      expect(sortButton('name')).toHaveTextContent('Name ↓');
    });

    it('should toggle sortOrder from desc to asc when clicking same field', async () => {
      // Arrange
      const { user } = renderItems();
      await arrangeSort(user, 'price', 'desc');

      // Act
      await user.click(sortButton('price'));

      // Assert
      expect(sortState()).toEqual({ sortBy: 'price', sortOrder: 'asc' });
      expect(sortButton('price')).toHaveTextContent('Price ↑');
    });
  });

  describe('Switching Between Sort Fields', () => {
    it('should reset sortOrder to asc when switching to different field', async () => {
      // Arrange
      const { user } = renderItems();
      await arrangeSort(user, 'name', 'desc');

      // Act
      await user.click(sortButton('price'));

      // Assert
      expect(sortState()).toEqual({ sortBy: 'price', sortOrder: 'asc' });
    });

    it('should reset sortOrder to asc when switching from desc to new field', async () => {
      // Arrange
      const { user } = renderItems();
      await arrangeSort(user, 'description', 'desc');

      // Act
      await user.click(sortButton('name'));

      // Assert
      expect(sortState()).toEqual({ sortBy: 'name', sortOrder: 'asc' });
    });

    it('should handle multiple field switches correctly', async () => {
      // Arrange
      const { user } = renderItems();
      await arrangeSort(user, 'name', 'asc');

      // Act - First switch
      await user.click(sortButton('price'));

      // Assert - First switch
      expect(sortState()).toEqual({ sortBy: 'price', sortOrder: 'asc' });

      // Act - Second switch
      await user.click(sortButton('description'));

      // Assert - Second switch
      expect(sortState()).toEqual({ sortBy: 'description', sortOrder: 'asc' });

      // Act - Third switch (back to name)
      await user.click(sortButton('name'));

      // Assert - Third switch
      expect(sortState()).toEqual({ sortBy: 'name', sortOrder: 'asc' });
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty array without errors', () => {
      // Arrange
      const { result } = renderHook(() => useItemsSort([]));

      // Act
      act(() => result.current.sortItems('name'));

      // Assert
      expect(result.current.items.length).toBe(0);
      expect(result.current.sortBy).toBe('name');
      expect(result.current.sortOrder).toBe('desc');
    });

    it('should handle single item array', () => {
      // Arrange
      const { result } = renderHook(() => useItemsSort([{ name: 'single', description: 'item', price: '100' }]));

      // Act
      act(() => result.current.sortItems('name'));

      // Assert
      expect(result.current.items.length).toBe(1);
      expect(result.current.items[0].name).toBe('single');
    });

    it('should handle items with same sort field values', () => {
      // Arrange
      const { result } = renderHook(() =>
        useItemsSort([
          { name: 'item1', description: 'same', price: '100' },
          { name: 'item2', description: 'same', price: '200' },
        ]),
      );

      // Act
      act(() => result.current.sortItems('description'));

      // Assert
      expect(result.current.sortBy).toBe('description');
      expect(result.current.sortOrder).toBe('asc');
      expect(result.current.items.length).toBe(2);
      expect(result.current.items[0].description).toBe('same');
      expect(result.current.items[1].description).toBe('same');
    });

    it('should handle price as string comparison correctly', () => {
      // Arrange
      const { result } = renderHook(() =>
        useItemsSort([
          { name: 'a', description: 'desc', price: '9' },
          { name: 'b', description: 'desc', price: '100' },
          { name: 'c', description: 'desc', price: '50' },
        ]),
      );

      // Act
      act(() => result.current.sortItems('price'));

      // Assert
      expect(result.current.items[0].price).toBe('100');
      expect(result.current.items[1].price).toBe('50');
      expect(result.current.items[2].price).toBe('9');
    });

    it('should compare values with localeCompare', async () => {
      // Arrange
      const localeCompareSpy = vi.spyOn(String.prototype, 'localeCompare');
      const { user } = renderItems();

      // Act
      await user.click(sortButton('description'));

      // Assert
      expect(localeCompareSpy).toHaveBeenCalled();
      localeCompareSpy.mockRestore();
    });
  });

  describe('Sort Order Consistency', () => {
    it('should maintain sort order after multiple sorts on same field', async () => {
      // Arrange
      const { user } = renderItems();
      const initialOrder = renderedItems();

      // Act - First sort
      await user.click(sortButton('name'));
      const afterFirstSort = renderedItems();

      // Act - Toggle back
      await user.click(sortButton('name'));
      const afterSecondSort = renderedItems();

      // Act - Toggle again
      await user.click(sortButton('name'));
      const afterThirdSort = renderedItems();

      // Assert
      expect(sortState().sortOrder).toBe('desc');
      expect(afterFirstSort).not.toEqual(initialOrder);
      expect(afterSecondSort).toEqual([...afterFirstSort].reverse());
      expect(afterThirdSort).toEqual(afterFirstSort);
    });
  });

  describe('Rendering', () => {
    it('should render each item through the Item component with name, description and price', () => {
      // Arrange & Act
      renderItems();

      // Assert
      expect(renderedItems()[0]).toEqual({ name: 'foo', description: 'bar', price: '123' });
    });

    it('should not log via console.info', async () => {
      // Arrange
      const infoSpy = vi.spyOn(console, 'info');
      const { user } = renderItems();

      // Act
      await user.click(sortButton('price'));

      // Assert
      expect(infoSpy).not.toHaveBeenCalled();
      infoSpy.mockRestore();
    });
  });
});
