import { describe, it, expect } from 'vitest';
import type { Item } from '../types/item';
import { nextSortState, sortItems, type SortState } from './sort';

const baseItems: Item[] = [
  { name: 'foo', description: 'bar', price: '123' },
  { name: 'mario', description: 'bross', price: '456' },
  { name: 'luigi', description: 'bross', price: '789' },
  { name: 'apple', description: 'fruit', price: '99' },
  { name: 'banana', description: 'fruit', price: '59' },
];

describe('sortItems: sorting functionality (ported from ItemsComponent)', () => {
  it('sorts by name ascending', () => {
    const sorted = sortItems(baseItems, 'name', 'asc');
    expect(sorted.map((i) => i.name)).toEqual([
      'apple',
      'banana',
      'foo',
      'luigi',
      'mario',
    ]);
  });

  it('sorts by name descending', () => {
    const sorted = sortItems(baseItems, 'name', 'desc');
    expect(sorted.map((i) => i.name)).toEqual([
      'mario',
      'luigi',
      'foo',
      'banana',
      'apple',
    ]);
  });

  it('sorts by description ascending', () => {
    const sorted = sortItems(baseItems, 'description', 'asc');
    expect(sorted[0].description).toBe('bar');
    expect(sorted[sorted.length - 1].description).toBe('fruit');
  });

  it('sorts by description descending', () => {
    const sorted = sortItems(baseItems, 'description', 'desc');
    expect(sorted[0].description).toBe('fruit');
    expect(sorted[sorted.length - 1].description).toBe('bar');
  });

  it('sorts by price ascending using string comparison', () => {
    const sorted = sortItems(baseItems, 'price', 'asc');
    expect(sorted.map((i) => i.price)).toEqual([
      '123',
      '456',
      '59',
      '789',
      '99',
    ]);
  });

  it('sorts by price descending using string comparison', () => {
    const sorted = sortItems(baseItems, 'price', 'desc');
    expect(sorted.map((i) => i.price)).toEqual([
      '99',
      '789',
      '59',
      '456',
      '123',
    ]);
  });

  it('does not mutate the input array', () => {
    const copy = [...baseItems];
    sortItems(baseItems, 'name', 'asc');
    expect(baseItems).toEqual(copy);
  });

  it('handles an empty array without errors', () => {
    expect(sortItems([], 'name', 'asc')).toEqual([]);
  });

  it('handles a single item array', () => {
    const single: Item[] = [{ name: 'single', description: 'item', price: '100' }];
    const sorted = sortItems(single, 'name', 'asc');
    expect(sorted).toHaveLength(1);
    expect(sorted[0].name).toBe('single');
  });

  it('keeps items with equal sort values', () => {
    const items: Item[] = [
      { name: 'item1', description: 'same', price: '100' },
      { name: 'item2', description: 'same', price: '200' },
    ];
    const sorted = sortItems(items, 'description', 'asc');
    expect(sorted).toHaveLength(2);
    expect(sorted[0].description).toBe('same');
    expect(sorted[1].description).toBe('same');
  });
});

describe('nextSortState: toggle and switch behaviour', () => {
  it('toggles asc -> desc when clicking the active field', () => {
    expect(nextSortState({ sortBy: 'name', sortOrder: 'asc' }, 'name')).toEqual({
      sortBy: 'name',
      sortOrder: 'desc',
    });
  });

  it('toggles desc -> asc when clicking the active field', () => {
    expect(nextSortState({ sortBy: 'price', sortOrder: 'desc' }, 'price')).toEqual(
      { sortBy: 'price', sortOrder: 'asc' }
    );
  });

  it('resets to asc when switching to a different field', () => {
    expect(nextSortState({ sortBy: 'name', sortOrder: 'desc' }, 'price')).toEqual(
      { sortBy: 'price', sortOrder: 'asc' }
    );
  });

  it('handles multiple field switches correctly', () => {
    let state: SortState = { sortBy: 'name', sortOrder: 'asc' };
    state = nextSortState(state, 'price');
    expect(state).toEqual({ sortBy: 'price', sortOrder: 'asc' });
    state = nextSortState(state, 'description');
    expect(state).toEqual({ sortBy: 'description', sortOrder: 'asc' });
    state = nextSortState(state, 'name');
    expect(state).toEqual({ sortBy: 'name', sortOrder: 'asc' });
  });
});
