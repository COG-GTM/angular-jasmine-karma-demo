import { useState } from 'react';
import type { Item as ItemModel } from '../../types/item';
import { Item } from './Item';
import styles from './Items.module.css';

export type SortField = 'name' | 'description' | 'price';
export type SortOrder = 'asc' | 'desc';

export interface SortState {
  sortBy: SortField;
  sortOrder: SortOrder;
}

// Seed data ported 1:1 from items.component.ts
export const INITIAL_ITEMS: ItemModel[] = [
  { name: 'foo', description: 'bar', price: '123' },
  { name: 'mario', description: 'bross', price: '456' },
  { name: 'luigi', description: 'bross', price: '789' },
  { name: 'apple', description: 'fruit', price: '99' },
  { name: 'banana', description: 'fruit', price: '59' },
];

// Mirrors the toggle logic of ItemsComponent.sortItems(): clicking the active
// field flips the order, switching fields resets to ascending.
export const nextSortState = (current: SortState, field: SortField): SortState => {
  if (current.sortBy === field) {
    return {
      sortBy: field,
      sortOrder: current.sortOrder === 'asc' ? 'desc' : 'asc',
    };
  }
  return { sortBy: field, sortOrder: 'asc' };
};

// Mirrors ItemsComponent.applySort(): string fields use localeCompare, other
// values fall back to a `>` comparison. Returns a new array (no mutation).
export const sortItems = (
  items: ItemModel[],
  { sortBy, sortOrder }: SortState,
): ItemModel[] => {
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
};

export const Items = () => {
  const [items, setItems] = useState<ItemModel[]>(INITIAL_ITEMS);
  const [sort, setSort] = useState<SortState>({ sortBy: 'name', sortOrder: 'asc' });

  const handleSort = (field: SortField) => {
    const next = nextSortState(sort, field);
    setSort(next);
    setItems((current) => sortItems(current, next));
  };

  const arrow = (field: SortField) =>
    sort.sortBy === field ? (sort.sortOrder === 'asc' ? '↑' : '↓') : '';

  const sortButton = (field: SortField, label: string) => (
    <button
      onClick={() => handleSort(field)}
      className={`${styles.sortBtn} ${sort.sortBy === field ? styles.active : ''}`.trim()}
    >
      {label} {arrow(field)}
    </button>
  );

  return (
    <div className={styles.itemsContainer}>
      <h2>Shop Items</h2>

      <div className={styles.sortControls}>
        <span>Sort by:</span>
        {sortButton('name', 'Name')}
        {sortButton('description', 'Description')}
        {sortButton('price', 'Price')}
      </div>

      <div className={styles.itemsGrid}>
        {items.map((item, index) => (
          <Item
            key={`${item.name}-${index}`}
            name={item.name}
            description={item.description}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};
