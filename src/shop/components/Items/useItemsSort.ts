import { useState } from 'react';
import type { Item } from '../../domain/item.model';

export type SortField = keyof Item;
export type SortOrder = 'asc' | 'desc';

export const SEED_ITEMS: Item[] = [
  { name: 'foo', description: 'bar', price: '123' },
  { name: 'mario', description: 'bross', price: '456' },
  { name: 'luigi', description: 'bross', price: '789' },
  { name: 'apple', description: 'fruit', price: '99' },
  { name: 'banana', description: 'fruit', price: '59' },
];

export function applySort(items: Item[], sortBy: SortField, sortOrder: SortOrder): Item[] {
  return [...items].sort((a, b) => {
    let comparison = 0;
    const aValue = a[sortBy];
    const bValue = b[sortBy];

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      comparison = aValue.localeCompare(bValue);
    } else {
      comparison = aValue > bValue ? 1 : -1;
    }

    return sortOrder === 'asc' ? comparison : -comparison;
  });
}

interface SortState {
  items: Item[];
  sortBy: SortField;
  sortOrder: SortOrder;
}

export function useItemsSort(initialItems: Item[] = SEED_ITEMS) {
  const [state, setState] = useState<SortState>(() => ({
    items: [...initialItems],
    sortBy: 'name',
    sortOrder: 'asc',
  }));

  const sortItems = (field: SortField) => {
    setState((prev) => {
      const sortOrder: SortOrder =
        prev.sortBy === field ? (prev.sortOrder === 'asc' ? 'desc' : 'asc') : 'asc';
      return { items: applySort(prev.items, field, sortOrder), sortBy: field, sortOrder };
    });
  };

  return { ...state, sortItems };
}
