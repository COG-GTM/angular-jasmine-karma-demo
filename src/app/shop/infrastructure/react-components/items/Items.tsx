import { useState } from 'react';
import { Item as ItemModel } from '../../../domain/item.model';
import { Item } from '../item/Item';
import './Items.css';

type SortField = keyof ItemModel;
type SortOrder = 'asc' | 'desc';

const INITIAL_ITEMS: ItemModel[] = [
  { name: 'foo', description: 'bar', price: '123' },
  { name: 'mario', description: 'bross', price: '456' },
  { name: 'luigi', description: 'bross', price: '789' },
  { name: 'apple', description: 'fruit', price: '99' },
  { name: 'banana', description: 'fruit', price: '59' },
];

const sortItems = (items: ItemModel[], sortBy: SortField, sortOrder: SortOrder): ItemModel[] =>
  [...items].sort((a, b) => {
    const comparison = a[sortBy].localeCompare(b[sortBy]);
    return sortOrder === 'asc' ? comparison : -comparison;
  });

export const Items = () => {
  const [items, setItems] = useState<ItemModel[]>(INITIAL_ITEMS);
  const [sortBy, setSortBy] = useState<SortField>('name');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  const onSort = (field: SortField) => {
    let nextOrder: SortOrder;
    if (sortBy === field) {
      nextOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      nextOrder = 'asc';
    }
    setSortBy(field);
    setSortOrder(nextOrder);
    setItems(sortItems(items, field, nextOrder));
  };

  const arrow = (field: SortField) => (sortBy === field ? (sortOrder === 'asc' ? '↑' : '↓') : '');
  const sortClass = (field: SortField) => `sort-btn${sortBy === field ? ' active' : ''}`;

  return (
    <div className="items-container">
      <h2>Shop Items</h2>

      <div className="sort-controls">
        <span>Sort by:</span>
        <button type="button" onClick={() => onSort('name')} className={sortClass('name')}>
          Name {arrow('name')}
        </button>
        <button type="button" onClick={() => onSort('description')} className={sortClass('description')}>
          Description {arrow('description')}
        </button>
        <button type="button" onClick={() => onSort('price')} className={sortClass('price')}>
          Price {arrow('price')}
        </button>
      </div>

      <div className="items-grid">
        {items.map((item) => (
          <Item key={item.name} name={item.name} description={item.description} price={item.price} />
        ))}
      </div>
    </div>
  );
};
