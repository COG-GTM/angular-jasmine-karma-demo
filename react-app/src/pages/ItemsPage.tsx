import { useState } from 'react';
import type { Item } from '../types/item';
import { Item as ItemCard } from '../components/Item';
import { nextSortState, sortItems, type SortOrder } from '../utils/sort';
import './ItemsPage.scss';

const initialItems: Item[] = [
  { name: 'foo', description: 'bar', price: '123' },
  { name: 'mario', description: 'bross', price: '456' },
  { name: 'luigi', description: 'bross', price: '789' },
  { name: 'apple', description: 'fruit', price: '99' },
  { name: 'banana', description: 'fruit', price: '59' },
];

/**
 * Ported from ItemsComponent (the /shop route). Renders the item grid plus the
 * sort controls; sorting logic lives in utils/sort.ts.
 */
export function ItemsPage() {
  const [items, setItems] = useState<Item[]>(
    sortItems(initialItems, 'name', 'asc')
  );
  const [sortBy, setSortBy] = useState<string>('name');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  const handleSort = (field: string) => {
    const next = nextSortState({ sortBy, sortOrder }, field);
    setSortBy(next.sortBy);
    setSortOrder(next.sortOrder);
    setItems((current) => sortItems(current, next.sortBy, next.sortOrder));
  };

  const arrow = (field: string) =>
    sortBy === field ? (sortOrder === 'asc' ? ' ↑' : ' ↓') : '';

  return (
    <div className="items-container">
      <h2>Shop Items</h2>

      <div className="sort-controls">
        <span>Sort by:</span>
        <button
          onClick={() => handleSort('name')}
          className={`sort-btn${sortBy === 'name' ? ' active' : ''}`}
        >
          Name{arrow('name')}
        </button>
        <button
          onClick={() => handleSort('description')}
          className={`sort-btn${sortBy === 'description' ? ' active' : ''}`}
        >
          Description{arrow('description')}
        </button>
        <button
          onClick={() => handleSort('price')}
          className={`sort-btn${sortBy === 'price' ? ' active' : ''}`}
        >
          Price{arrow('price')}
        </button>
      </div>

      <div className="items-grid">
        {items.map((item, index) => (
          <ItemCard
            key={`${item.name}-${index}`}
            name={item.name}
            description={item.description}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
}

export default ItemsPage;
