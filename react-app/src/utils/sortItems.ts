import type { Item } from '../types/item';

export type SortOrder = 'asc' | 'desc';

export function sortItems(items: Item[], sortBy: string, sortOrder: SortOrder): Item[] {
  return [...items].sort((a, b) => {
    const aValue = a[sortBy as keyof Item];
    const bValue = b[sortBy as keyof Item];
    let comparison = 0;

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      comparison = aValue.localeCompare(bValue);
    } else {
      comparison = aValue > bValue ? 1 : -1;
    }

    return sortOrder === 'asc' ? comparison : -comparison;
  });
}
