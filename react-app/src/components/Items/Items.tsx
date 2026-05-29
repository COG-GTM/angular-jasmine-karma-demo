import { useState } from 'react';
import type { Item as ItemType } from '../../types';
import { Item } from '../Item/Item';
import './Items.scss';

const INITIAL_ITEMS: ItemType[] = [
  { name: 'foo', description: 'bar', price: '123' },
  { name: 'mario', description: 'bross', price: '456' },
  { name: 'luigi', description: 'bross', price: '789' },
  { name: 'apple', description: 'fruit', price: '99' },
  { name: 'banana', description: 'fruit', price: '59' },
];

type SortField = keyof ItemType;
type SortOrder = 'asc' | 'desc';

function sortItemsArray(items: ItemType[], sortBy: SortField, sortOrder: SortOrder): ItemType[] {
  return [...items].sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];
    const comparison = aValue.localeCompare(bValue);
    return sortOrder === 'asc' ? comparison : -comparison;
  });
}

export function Items() {
  const [sortBy, setSortBy] = useState<SortField>('name');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [items, setItems] = useState<ItemType[]>(() =>
    sortItemsArray(INITIAL_ITEMS, 'name', 'asc')
  );

  const handleSort = (field: SortField) => {
    let newOrder: SortOrder;
    if (sortBy === field) {
      newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      newOrder = 'asc';
    }
    setSortBy(field);
    setSortOrder(newOrder);
    setItems(prev => sortItemsArray(prev, field, newOrder));
  };

  return (
    <div className="items-container">
      <h2>Shop Items</h2>

      <div className="sort-controls">
        <span>Sort by:</span>
        <button
          onClick={() => handleSort('name')}
          className={`sort-btn ${sortBy === 'name' ? 'active' : ''}`}
        >
          Name {sortBy === 'name' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
        </button>
        <button
          onClick={() => handleSort('description')}
          className={`sort-btn ${sortBy === 'description' ? 'active' : ''}`}
        >
          Description {sortBy === 'description' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
        </button>
        <button
          onClick={() => handleSort('price')}
          className={`sort-btn ${sortBy === 'price' ? 'active' : ''}`}
        >
          Price {sortBy === 'price' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
        </button>
      </div>

      <div className="items-grid">
        {items.map(item => (
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
