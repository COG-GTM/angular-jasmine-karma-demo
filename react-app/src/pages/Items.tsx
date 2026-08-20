import { useState } from 'react';
import Item from '../components/Item';
import { sortItems, type SortOrder } from '../utils/sortItems';
import type { Item as ItemModel } from '../types/item';
import { initialItems } from '../data/items';
import './Items.scss';

export default function Items() {
  const [items, setItems] = useState<ItemModel[]>(initialItems);
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  const handleSort = (field: string) => {
    const nextOrder: SortOrder =
      sortBy === field ? (sortOrder === 'asc' ? 'desc' : 'asc') : 'asc';
    setSortBy(field);
    setSortOrder(nextOrder);
    setItems((current) => sortItems(current, field, nextOrder));
  };

  const indicator = (field: string) =>
    sortBy === field ? (sortOrder === 'asc' ? '↑' : '↓') : '';

  return (
    <div className="items-container">
      <h2>Shop Items</h2>

      <div className="sort-controls">
        <span>Sort by:</span>
        <button
          onClick={() => handleSort('name')}
          className={`sort-btn${sortBy === 'name' ? ' active' : ''}`}
        >
          Name {indicator('name')}
        </button>
        <button
          onClick={() => handleSort('description')}
          className={`sort-btn${sortBy === 'description' ? ' active' : ''}`}
        >
          Description {indicator('description')}
        </button>
        <button
          onClick={() => handleSort('price')}
          className={`sort-btn${sortBy === 'price' ? ' active' : ''}`}
        >
          Price {indicator('price')}
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
