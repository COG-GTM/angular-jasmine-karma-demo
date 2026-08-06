import { useState } from 'react';
import type { FC } from 'react';
import type { Item as ItemModel } from '../../domain/item.model';
import Item from './Item';
import styles from './Items.module.css';

export interface ItemsProps {}

type SortOrder = 'asc' | 'desc';

const initialItems: ItemModel[] = [
  { name: 'foo', description: 'bar', price: '123' },
  { name: 'mario', description: 'bross', price: '456' },
  { name: 'luigi', description: 'bross', price: '789' },
  { name: 'apple', description: 'fruit', price: '99' },
  { name: 'banana', description: 'fruit', price: '59' }
];

const applySort = (items: ItemModel[], sortBy: string, sortOrder: SortOrder): ItemModel[] =>
  [...items].sort((a, b) => {
    let comparison = 0;
    const aValue = a[sortBy as keyof ItemModel];
    const bValue = b[sortBy as keyof ItemModel];

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      comparison = aValue.localeCompare(bValue);
    } else {
      comparison = aValue > bValue ? 1 : -1;
    }

    return sortOrder === 'asc' ? comparison : -comparison;
  });

const sortedInitialItems = applySort(initialItems, 'name', 'asc');

const Items: FC<ItemsProps> = () => {
  const [items, setItems] = useState<ItemModel[]>(sortedInitialItems);
  const [sortBy, setSortBy] = useState<string>('name');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  const sortItems = (field: string): void => {
    const nextOrder: SortOrder = sortBy === field ? (sortOrder === 'asc' ? 'desc' : 'asc') : 'asc';
    setSortBy(field);
    setSortOrder(nextOrder);
    setItems(applySort(items, field, nextOrder));
  };

  const arrow = (field: string): string =>
    sortBy === field ? (sortOrder === 'asc' ? '↑' : '↓') : '';

  const sortBtnClass = (field: string): string =>
    sortBy === field ? `${styles['sort-btn']} ${styles.active}` : styles['sort-btn'];

  return (
    <div className={styles['items-container']}>
      <h2>Shop Items</h2>

      <div className={styles['sort-controls']}>
        <span>Sort by:</span>
        <button type="button" onClick={() => sortItems('name')} className={sortBtnClass('name')}>
          Name {arrow('name')}
        </button>
        <button
          type="button"
          onClick={() => sortItems('description')}
          className={sortBtnClass('description')}
        >
          Description {arrow('description')}
        </button>
        <button type="button" onClick={() => sortItems('price')} className={sortBtnClass('price')}>
          Price {arrow('price')}
        </button>
      </div>

      <div className={styles['items-grid']}>
        {items.map((item) => (
          <Item
            key={item.name}
            name={item.name}
            description={item.description}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default Items;
