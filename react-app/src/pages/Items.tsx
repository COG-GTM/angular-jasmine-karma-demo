import { useState } from 'react';
import Item from '../components/Item';
import type { Item as ItemModel } from '../types/item';
import './Items.scss';

const initialItems: ItemModel[] = [
  { name: 'foo', description: 'bar', price: '123' },
  { name: 'mario', description: 'bross', price: '456' },
  { name: 'luigi', description: 'bross', price: '789' },
  { name: 'apple', description: 'fruit', price: '99' },
  { name: 'banana', description: 'fruit', price: '59' },
];

type SortOrder = 'asc' | 'desc';

function sortItems(items: ItemModel[], sortBy: string, sortOrder: SortOrder): ItemModel[] {
  return [...items].sort((a, b) => {
    const aValue = a[sortBy as keyof ItemModel];
    const bValue = b[sortBy as keyof ItemModel];
    const comparison = aValue.localeCompare(bValue);
    return sortOrder === 'asc' ? comparison : -comparison;
  });
}

export function Items() {
  const [items, setItems] = useState<ItemModel[]>(initialItems);
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  const handleSort = (field: string) => {
    const nextOrder: SortOrder = sortBy === field && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortBy(field);
    setSortOrder(nextOrder);
    setItems((current) => sortItems(current, field, nextOrder));
  };

  const arrow = (field: string) =>
    sortBy === field ? (sortOrder === 'asc' ? '↑' : '↓') : '';

  return (
    <div className="items-container">
      <h2>Shop Items</h2>

      <div className="sort-controls">
        <span>Sort by:</span>
        {(['name', 'description', 'price'] as const).map((field) => (
          <button
            key={field}
            onClick={() => handleSort(field)}
            className={`sort-btn${sortBy === field ? ' active' : ''}`}
          >
            {field.charAt(0).toUpperCase() + field.slice(1)} {arrow(field)}
          </button>
        ))}
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

export default Items;
