import type { Item } from '../domain/item.model';

export type SortField = keyof Item;
export type SortOrder = 'asc' | 'desc';

export interface SortState {
  sortBy: SortField;
  sortOrder: SortOrder;
}

/** Same toggle rule as ItemsComponent.sortItems(): re-clicking a field flips the order, a new field resets to asc. */
export function nextSortState(current: SortState, field: SortField): SortState {
  if (current.sortBy === field) {
    return { sortBy: field, sortOrder: current.sortOrder === 'asc' ? 'desc' : 'asc' };
  }
  return { sortBy: field, sortOrder: 'asc' };
}

/** Port of ItemsComponent.applySort(): string fields compare with localeCompare (price included). */
export function sortItems(items: readonly Item[], { sortBy, sortOrder }: SortState): Item[] {
  return [...items].sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];
    const comparison =
      typeof aValue === 'string' && typeof bValue === 'string'
        ? aValue.localeCompare(bValue)
        : aValue > bValue
          ? 1
          : -1;
    return sortOrder === 'asc' ? comparison : -comparison;
  });
}
