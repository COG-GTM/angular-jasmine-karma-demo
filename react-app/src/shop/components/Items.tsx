import { useState } from 'react';
import type { Item } from '../domain/item.model';
import { Item as ItemCard } from './Item';
import styles from './Items.module.css';

export type SortField = keyof Item;
export type SortOrder = 'asc' | 'desc';

const INITIAL_ITEMS: Item[] = [
  { name: 'foo', description: 'bar', price: '123' },
  { name: 'mario', description: 'bross', price: '456' },
  { name: 'luigi', description: 'bross', price: '789' },
  { name: 'apple', description: 'fruit', price: '99' },
  { name: 'banana', description: 'fruit', price: '59' },
];

export function sortItems(items: Item[], field: SortField, order: SortOrder): Item[] {
  const sorted = [...items];
  sorted.sort((a, b) => {
    const comparison = a[field].localeCompare(b[field]);
    return order === 'asc' ? comparison : -comparison;
  });
  return sorted;
}

const SORT_FIELDS: { field: SortField; label: string }[] = [
  { field: 'name', label: 'Name' },
  { field: 'description', label: 'Description' },
  { field: 'price', label: 'Price' },
];

export default function Items() {
  const [items, setItems] = useState<Item[]>(INITIAL_ITEMS);
  const [sortBy, setSortBy] = useState<SortField>('name');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  function handleSort(field: SortField) {
    let newOrder: SortOrder;
    if (field === sortBy) {
      newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
      setSortOrder(newOrder);
    } else {
      newOrder = 'asc';
      setSortBy(field);
      setSortOrder('asc');
    }
    setItems(sortItems(items, field, newOrder));
  }

  return (
    <div className={styles.itemsContainer}>
      <h2>Shop Items</h2>

      <div className={styles.sortControls}>
        <span>Sort by:</span>
        {SORT_FIELDS.map(({ field, label }) => (
          <button
            key={field}
            className={`${styles.sortBtn} ${sortBy === field ? `${styles.active} active` : ''}`}
            onClick={() => handleSort(field)}
          >
            {label} {sortBy === field ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
          </button>
        ))}
      </div>

      <div className={styles.itemsGrid}>
        {items.map((item) => (
          <ItemCard key={item.name} {...item} />
        ))}
      </div>
    </div>
  );
}
