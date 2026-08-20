import { describe, expect, it } from 'vitest';
import { sortItems } from './sortItems';
import type { Item } from '../types/item';

describe('sortItems', () => {
  const items: Item[] = [
    { name: 'foo', description: 'bar', price: '123' },
    { name: 'apple', description: 'fruit', price: '99' },
    { name: 'mario', description: 'bross', price: '456' },
  ];

  it('sorts by name ascending', () => {
    const sorted = sortItems(items, 'name', 'asc');
    expect(sorted.map((item) => item.name)).toEqual(['apple', 'foo', 'mario']);
  });

  it('sorts by name descending', () => {
    const sorted = sortItems(items, 'name', 'desc');
    expect(sorted.map((item) => item.name)).toEqual(['mario', 'foo', 'apple']);
  });

  it('sorts by description ascending', () => {
    const sorted = sortItems(items, 'description', 'asc');
    expect(sorted.map((item) => item.description)).toEqual(['bar', 'bross', 'fruit']);
  });

  it('sorts by price ascending using string comparison', () => {
    const sorted = sortItems(items, 'price', 'asc');
    expect(sorted.map((item) => item.price)).toEqual(['123', '456', '99']);
  });

  it('does not mutate the original array', () => {
    const original = [...items];
    sortItems(items, 'name', 'desc');
    expect(items).toEqual(original);
  });
});
