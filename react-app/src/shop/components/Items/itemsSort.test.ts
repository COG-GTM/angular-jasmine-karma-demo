import {
  createInitialItemsSortState,
  SEED_ITEMS,
  sortItems,
  sortItemsBy,
  type ItemsSortState,
} from './itemsSort';

// Port of items.component.spec.ts. The Angular spec mutated component.sortBy /
// component.sortOrder / component.items and then called component.sortItems().
// Here the sort logic is a pure function, so each test builds the "component state"
// object (Arrange), passes it to sortItems() (Act) and checks the returned state (Assert).
// Where the Angular spec asserted something the legacy component never did, the test
// asserts what the running Angular app actually does and says so in its name.

function stateWith(overrides: Partial<ItemsSortState> = {}): ItemsSortState {
  return { ...createInitialItemsSortState(), ...overrides };
}

const names = (state: ItemsSortState) => state.items.map((item) => item.name);

describe('itemsSort: testing sorting functionality', () => {
  describe('Initial State', () => {
    it('should have items array initialized with 5 items', () => {
      // Arrange & Act
      const state = createInitialItemsSortState();

      // Assert
      expect(state.items).toHaveLength(5);
    });

    it('should have sortBy initialized to "name"', () => {
      // Arrange & Act
      const { sortBy } = createInitialItemsSortState();

      // Assert
      expect(sortBy).toBe('name');
    });

    it('should have sortOrder initialized to "asc"', () => {
      // Arrange & Act
      const { sortOrder } = createInitialItemsSortState();

      // Assert
      expect(sortOrder).toBe('asc');
    });

    it('should keep the seed order initially (legacy never sorts on init, the Angular spec expected name ascending)', () => {
      // Arrange & Act
      const state = createInitialItemsSortState();

      // Assert
      expect(names(state)).toEqual(['foo', 'mario', 'luigi', 'apple', 'banana']);
    });
  });

  describe('Sorting by Name', () => {
    it('should sort items by name in ascending order', () => {
      // Arrange
      const state = stateWith({ sortBy: 'price', sortOrder: 'desc' });

      // Act
      const result = sortItems(state, 'name');

      // Assert
      expect(result.sortBy).toBe('name');
      expect(result.sortOrder).toBe('asc');
      expect(result.items[0].name).toBe('apple');
      expect(result.items[result.items.length - 1].name).toBe('mario');
    });

    it('should sort items by name in descending order when toggled', () => {
      // Arrange
      const state = stateWith({ sortBy: 'name', sortOrder: 'asc' });

      // Act
      const result = sortItems(state, 'name');

      // Assert
      expect(result.sortBy).toBe('name');
      expect(result.sortOrder).toBe('desc');
      expect(result.items[0].name).toBe('mario');
      expect(result.items[result.items.length - 1].name).toBe('apple');
    });
  });

  describe('Sorting by Description', () => {
    it('should sort items by description in ascending order', () => {
      // Arrange
      const state = stateWith({ sortBy: 'name' });

      // Act
      const result = sortItems(state, 'description');

      // Assert
      expect(result.sortBy).toBe('description');
      expect(result.sortOrder).toBe('asc');
      expect(result.items[0].description).toBe('bar');
      expect(result.items[1].description).toBe('bross');
      expect(result.items[result.items.length - 1].description).toBe('fruit');
    });

    it('should sort items by description in descending order when toggled', () => {
      // Arrange
      const state = stateWith({ sortBy: 'description', sortOrder: 'asc' });

      // Act
      const result = sortItems(state, 'description');

      // Assert
      expect(result.sortBy).toBe('description');
      expect(result.sortOrder).toBe('desc');
      expect(result.items[0].description).toBe('fruit');
      expect(result.items[result.items.length - 1].description).toBe('bar');
    });
  });

  describe('Sorting by Price', () => {
    // Prices are strings compared with localeCompare (legacy parity), so '59' and '99'
    // sort after '456'. The Angular spec expected numeric order here.
    it('should sort items by price in ascending order (string comparison, like legacy)', () => {
      // Arrange
      const state = stateWith({ sortBy: 'name' });

      // Act
      const result = sortItems(state, 'price');

      // Assert
      expect(result.sortBy).toBe('price');
      expect(result.sortOrder).toBe('asc');
      expect(result.items.map((item) => item.price)).toEqual(['123', '456', '59', '789', '99']);
    });

    it('should sort items by price in descending order when toggled (string comparison, like legacy)', () => {
      // Arrange
      const state = stateWith({ sortBy: 'price', sortOrder: 'asc' });

      // Act
      const result = sortItems(state, 'price');

      // Assert
      expect(result.sortBy).toBe('price');
      expect(result.sortOrder).toBe('desc');
      expect(result.items.map((item) => item.price)).toEqual(['99', '789', '59', '456', '123']);
    });
  });

  describe('Toggle Behavior', () => {
    it('should toggle sortOrder from asc to desc when clicking same field', () => {
      // Arrange
      const state = stateWith({ sortBy: 'name', sortOrder: 'asc' });

      // Act
      const result = sortItems(state, 'name');

      // Assert
      expect(result.sortOrder).toBe('desc');
      expect(result.sortBy).toBe('name');
    });

    it('should toggle sortOrder from desc to asc when clicking same field', () => {
      // Arrange
      const state = stateWith({ sortBy: 'price', sortOrder: 'desc' });

      // Act
      const result = sortItems(state, 'price');

      // Assert
      expect(result.sortOrder).toBe('asc');
      expect(result.sortBy).toBe('price');
    });
  });

  describe('Switching Between Sort Fields', () => {
    it('should reset sortOrder to asc when switching to different field', () => {
      // Arrange
      const state = stateWith({ sortBy: 'name', sortOrder: 'desc' });

      // Act
      const result = sortItems(state, 'price');

      // Assert
      expect(result.sortBy).toBe('price');
      expect(result.sortOrder).toBe('asc');
    });

    it('should reset sortOrder to asc when switching from desc to new field', () => {
      // Arrange
      const state = stateWith({ sortBy: 'description', sortOrder: 'desc' });

      // Act
      const result = sortItems(state, 'name');

      // Assert
      expect(result.sortBy).toBe('name');
      expect(result.sortOrder).toBe('asc');
    });

    it('should handle multiple field switches correctly', () => {
      // Arrange
      const state = stateWith({ sortBy: 'name', sortOrder: 'asc' });

      // Act - First switch
      const first = sortItems(state, 'price');

      // Assert - First switch
      expect(first.sortBy).toBe('price');
      expect(first.sortOrder).toBe('asc');

      // Act - Second switch
      const second = sortItems(first, 'description');

      // Assert - Second switch
      expect(second.sortBy).toBe('description');
      expect(second.sortOrder).toBe('asc');

      // Act - Third switch (back to name)
      const third = sortItems(second, 'name');

      // Assert - Third switch
      expect(third.sortBy).toBe('name');
      expect(third.sortOrder).toBe('asc');
    });
  });

  describe('Edge Cases', () => {
    // The Angular spec expected sortOrder 'asc' here, but the initial sortBy is already
    // 'name', so sortItems('name') toggles to 'desc' in the legacy component too.
    it('should handle empty array without errors (toggles name to desc, like legacy)', () => {
      // Arrange
      const state = stateWith({ items: [] });

      // Act
      const result = sortItems(state, 'name');

      // Assert
      expect(result.items).toHaveLength(0);
      expect(result.sortBy).toBe('name');
      expect(result.sortOrder).toBe('desc');
    });

    it('should handle single item array', () => {
      // Arrange
      const state = stateWith({ items: [{ name: 'single', description: 'item', price: '100' }] });

      // Act
      const result = sortItems(state, 'name');

      // Assert
      expect(result.items).toHaveLength(1);
      expect(result.items[0].name).toBe('single');
    });

    it('should handle items with same sort field values', () => {
      // Arrange
      const state = stateWith({
        items: [
          { name: 'item1', description: 'same', price: '100' },
          { name: 'item2', description: 'same', price: '200' },
        ],
      });

      // Act
      const result = sortItems(state, 'description');

      // Assert
      expect(result.sortBy).toBe('description');
      expect(result.sortOrder).toBe('asc');
      expect(result.items).toHaveLength(2);
      expect(result.items[0].description).toBe('same');
      expect(result.items[1].description).toBe('same');
      // Array.prototype.sort is stable, so ties keep their previous order.
      expect(names(result)).toEqual(['item1', 'item2']);
    });

    it('should handle price as string comparison correctly', () => {
      // Arrange
      const state = stateWith({
        items: [
          { name: 'a', description: 'desc', price: '9' },
          { name: 'b', description: 'desc', price: '100' },
          { name: 'c', description: 'desc', price: '50' },
        ],
      });

      // Act
      const result = sortItems(state, 'price');

      // Assert
      expect(result.items[0].price).toBe('100');
      expect(result.items[1].price).toBe('50');
      expect(result.items[2].price).toBe('9');
    });
  });

  describe('Sort Order Consistency', () => {
    // The Angular spec expected sortOrder 'asc' after three clicks and compared against
    // an array it had reversed in place. Same intent, corrected for what legacy does:
    // the first click on the active Name field already toggles to 'desc'.
    it('should maintain sort order after multiple sorts on same field', () => {
      // Arrange
      const initial = createInitialItemsSortState();

      // Act - First sort (Name is already active, so this toggles to desc)
      const afterFirstSort = sortItems(initial, 'name');
      // Act - Toggle to asc
      const afterSecondSort = sortItems(afterFirstSort, 'name');
      // Act - Toggle back to desc
      const afterThirdSort = sortItems(afterSecondSort, 'name');

      // Assert
      expect(afterThirdSort.sortOrder).toBe('desc');
      expect(afterFirstSort.items).not.toEqual(initial.items);
      expect(afterSecondSort.items).toEqual([...afterFirstSort.items].reverse());
      expect(afterThirdSort.items).toEqual(afterFirstSort.items);
    });
  });

  describe('Purity (React-specific)', () => {
    it('should not mutate the input state or the seed items', () => {
      // Arrange
      const state = createInitialItemsSortState();
      const before = [...state.items];

      // Act
      sortItems(state, 'description');
      sortItemsBy(SEED_ITEMS, 'price', 'desc');

      // Assert
      expect(state.items).toEqual(before);
      expect(SEED_ITEMS.map((item) => item.name)).toEqual(['foo', 'mario', 'luigi', 'apple', 'banana']);
    });
  });
});
