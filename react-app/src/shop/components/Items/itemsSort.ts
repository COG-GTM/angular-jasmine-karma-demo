import type { Item } from '../../domain/item.model';

export type SortField = keyof Item;
export type SortOrder = 'asc' | 'desc';

export interface ItemsSortState {
  items: Item[];
  sortBy: SortField;
  sortOrder: SortOrder;
}

// Same seed data and order as items.component.ts.
export const SEED_ITEMS: readonly Item[] = [
  { name: 'foo', description: 'bar', price: '123' },
  { name: 'mario', description: 'bross', price: '456' },
  { name: 'luigi', description: 'bross', price: '789' },
  { name: 'apple', description: 'fruit', price: '99' },
  { name: 'banana', description: 'fruit', price: '59' },
];

// Like the Angular component, nothing is sorted on init: the seed order is shown
// even though the Name ↑ button is active.
export function createInitialItemsSortState(
  items: readonly Item[] = SEED_ITEMS,
): ItemsSortState {
  return { items: [...items], sortBy: 'name', sortOrder: 'asc' };
}

// Every field is a string and is compared with localeCompare, so prices sort as
// strings ('123' < '59' < '99'), exactly like the legacy applySort().
export function sortItemsBy(items: readonly Item[], field: SortField, order: SortOrder): Item[] {
  return [...items].sort((a, b) => {
    const comparison = a[field].localeCompare(b[field]);
    return order === 'asc' ? comparison : -comparison;
  });
}

// Port of ItemsComponent.sortItems(): same field flips the order, a new field
// switches to it in ascending order, then the current list is re-sorted (stable,
// so ties keep their previous relative order).
export function sortItems(state: ItemsSortState, field: SortField): ItemsSortState {
  const sortOrder: SortOrder =
    state.sortBy === field ? (state.sortOrder === 'asc' ? 'desc' : 'asc') : 'asc';
  return { items: sortItemsBy(state.items, field, sortOrder), sortBy: field, sortOrder };
}
