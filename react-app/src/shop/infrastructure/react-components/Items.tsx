import { useState } from 'react';
import type { Item as ItemModel } from '../../domain/item.model';
import {
  defaultItems,
  nextSortState,
  sortItems,
  type SortField,
  type SortOrder,
} from '../../application/itemsService';
import { Item } from './Item';
import './items.scss';

export function Items() {
  const [items, setItems] = useState<ItemModel[]>([...defaultItems]);
  const [sortBy, setSortBy] = useState<SortField>('name');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  const handleSort = (field: SortField): void => {
    const next = nextSortState({ sortBy, sortOrder }, field);
    setSortBy(next.sortBy);
    setSortOrder(next.sortOrder);
    setItems((current) => sortItems(current, next.sortBy, next.sortOrder));
  };

  const arrow = (field: SortField): string =>
    sortBy === field ? (sortOrder === 'asc' ? '↑' : '↓') : '';

  return (
    <div className="items-container">
      <h2>Shop Items</h2>

      <div className="sort-controls">
        <span>Sort by:</span>
        <button
          onClick={() => handleSort('name')}
          className={sortBy === 'name' ? 'sort-btn active' : 'sort-btn'}
        >
          Name {arrow('name')}
        </button>
        <button
          onClick={() => handleSort('description')}
          className={sortBy === 'description' ? 'sort-btn active' : 'sort-btn'}
        >
          Description {arrow('description')}
        </button>
        <button
          onClick={() => handleSort('price')}
          className={sortBy === 'price' ? 'sort-btn active' : 'sort-btn'}
        >
          Price {arrow('price')}
        </button>
      </div>

      <div className="items-grid">
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
}
