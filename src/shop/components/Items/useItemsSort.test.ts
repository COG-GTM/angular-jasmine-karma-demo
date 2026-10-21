import { act, renderHook } from '@testing-library/react';
import { useItemsSort } from './useItemsSort';

// renderHook mounts the hook in a tiny test component, so we can drive it like the
// Items component does. State updates must be wrapped in act() so React flushes them.
describe('useItemsSort', () => {
  it('starts with the seed items, sortBy "name" and sortOrder "asc"', () => {
    // Arrange & Act
    const { result } = renderHook(() => useItemsSort());

    // Assert
    expect(result.current.items.map((item) => item.name)).toEqual([
      'foo',
      'mario',
      'luigi',
      'apple',
      'banana',
    ]);
    expect(result.current.sortBy).toBe('name');
    expect(result.current.sortOrder).toBe('asc');
  });

  it('accepts an initial state override (like setting component fields in Arrange)', () => {
    // Arrange & Act
    const { result } = renderHook(() => useItemsSort({ sortBy: 'price', sortOrder: 'desc' }));

    // Assert
    expect(result.current.sortBy).toBe('price');
    expect(result.current.sortOrder).toBe('desc');
  });

  it('toggles the order when sorting by the active field', () => {
    // Arrange
    const { result } = renderHook(() => useItemsSort());

    // Act
    act(() => result.current.sortItems('name'));

    // Assert
    expect(result.current.sortOrder).toBe('desc');
    expect(result.current.items.map((item) => item.name)).toEqual([
      'mario',
      'luigi',
      'foo',
      'banana',
      'apple',
    ]);
  });

  it('switches to a new field in ascending order and re-sorts the current list', () => {
    // Arrange
    const { result } = renderHook(() => useItemsSort());

    // Act
    act(() => result.current.sortItems('name'));
    act(() => result.current.sortItems('description'));

    // Assert - ties (bross, fruit) keep the order from the previous name-desc sort
    expect(result.current.sortBy).toBe('description');
    expect(result.current.sortOrder).toBe('asc');
    expect(result.current.items.map((item) => item.name)).toEqual([
      'foo',
      'mario',
      'luigi',
      'banana',
      'apple',
    ]);
  });

  it('keeps a stable sortItems function between renders', () => {
    // Arrange
    const { result } = renderHook(() => useItemsSort());
    const first = result.current.sortItems;

    // Act
    act(() => result.current.sortItems('price'));

    // Assert
    expect(result.current.sortItems).toBe(first);
  });
});
