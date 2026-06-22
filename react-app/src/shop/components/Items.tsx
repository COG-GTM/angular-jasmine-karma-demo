import { useState } from 'react';
import type { Item as ItemModel } from '../domain/item.model';
import { Item } from './Item';
import './Items.css';

const initialItems: ItemModel[] = [
  { name: 'foo', description: 'bar', price: '123' },
  { name: 'mario', description: 'bross', price: '456' },
  { name: 'luigi', description: 'bross', price: '789' },
  { name: 'apple', description: 'fruit', price: '99' },
  { name: 'banana', description: 'fruit', price: '59' },
];

type SortOrder = 'asc' | 'desc';

export const Items = () => {
  const [items, setItems] = useState<ItemModel[]>(initialItems);
  const [sortBy, setSortBy] = useState<string>('name');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  const applySort = (field: string, order: SortOrder) => {
    const sorted = [...items].sort((a, b) => {
      let comparison: number;
      const aValue = a[field as keyof ItemModel];
      const bValue = b[field as keyof ItemModel];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        comparison = aValue.localeCompare(bValue);
      } else {
        comparison = aValue > bValue ? 1 : -1;
      }

      return order === 'asc' ? comparison : -comparison;
    });
    setItems(sorted);
  };

  const sortItems = (field: string) => {
    const order: SortOrder =
      sortBy === field ? (sortOrder === 'asc' ? 'desc' : 'asc') : 'asc';
    setSortBy(field);
    setSortOrder(order);
    applySort(field, order);
  };

  const arrow = (field: string) =>
    sortBy === field ? (sortOrder === 'asc' ? '↑' : '↓') : '';

  return (
    <div className="items-container">
      <h2>Shop Items</h2>

      <div className="sort-controls">
        <span>Sort by:</span>
        <button
          onClick={() => sortItems('name')}
          className={`sort-btn${sortBy === 'name' ? ' active' : ''}`}
        >
          Name {arrow('name')}
        </button>
        <button
          onClick={() => sortItems('description')}
          className={`sort-btn${sortBy === 'description' ? ' active' : ''}`}
        >
          Description {arrow('description')}
        </button>
        <button
          onClick={() => sortItems('price')}
          className={`sort-btn${sortBy === 'price' ? ' active' : ''}`}
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
};
