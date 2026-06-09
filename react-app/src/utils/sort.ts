import type { Item } from '../types/item';

export type SortOrder = 'asc' | 'desc';

export interface SortState {
  sortBy: string;
  sortOrder: SortOrder;
}

/**
 * Computes the next sort state when a sort field is clicked, ported from
 * ItemsComponent.sortItems: clicking the active field toggles the direction,
 * clicking a new field selects it ascending.
 */
export function nextSortState(current: SortState, field: string): SortState {
  if (current.sortBy === field) {
    return {
      sortBy: field,
      sortOrder: current.sortOrder === 'asc' ? 'desc' : 'asc',
    };
  }
  return { sortBy: field, sortOrder: 'asc' };
}

/**
 * Returns a new array sorted by the given field/order, ported from
 * ItemsComponent.applySort (string comparison via localeCompare).
 */
export function sortItems(
  items: Item[],
  field: string,
  order: SortOrder
): Item[] {
  return [...items].sort((a, b) => {
    const aValue = a[field as keyof Item];
    const bValue = b[field as keyof Item];

    let comparison: number;
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      comparison = aValue.localeCompare(bValue);
    } else {
      comparison = aValue > bValue ? 1 : -1;
    }

    return order === 'asc' ? comparison : -comparison;
  });
}
