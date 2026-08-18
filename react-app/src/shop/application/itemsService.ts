import type { Item } from '../domain/item.model';

export type SortField = keyof Item;
export type SortOrder = 'asc' | 'desc';

export const defaultItems: readonly Item[] = [
  { name: 'foo', description: 'bar', price: '123' },
  { name: 'mario', description: 'bross', price: '456' },
  { name: 'luigi', description: 'bross', price: '789' },
  { name: 'apple', description: 'fruit', price: '99' },
  { name: 'banana', description: 'fruit', price: '59' },
];

export function sortItems(items: readonly Item[], field: SortField, order: SortOrder): Item[] {
  return [...items].sort((a, b) => {
    const comparison = a[field].localeCompare(b[field]);
    return order === 'asc' ? comparison : -comparison;
  });
}

export function nextSortState(
  current: { sortBy: SortField; sortOrder: SortOrder },
  field: SortField,
): { sortBy: SortField; sortOrder: SortOrder } {
  if (current.sortBy === field) {
    return { sortBy: field, sortOrder: current.sortOrder === 'asc' ? 'desc' : 'asc' };
  }
  return { sortBy: field, sortOrder: 'asc' };
}
