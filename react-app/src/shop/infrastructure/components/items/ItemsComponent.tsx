import { useState } from 'react';
import type { Item } from '../../../domain/item.model';
import {
  nextSortState,
  sortItems,
  type SortField,
  type SortState,
} from '../../../application/sortItems';
import { initialItems } from '../../../domain/initialItems';
import ItemComponent from '../item/ItemComponent';
import './ItemsComponent.scss';

const sortFields: { field: SortField; label: string }[] = [
  { field: 'name', label: 'Name' },
  { field: 'description', label: 'Description' },
  { field: 'price', label: 'Price' },
];

/** Port of items.component: starts unsorted with "Name ↑" active, exactly like the Angular component. */
export default function ItemsComponent() {
  const [items, setItems] = useState<Item[]>(initialItems);
  const [sort, setSort] = useState<SortState>({ sortBy: 'name', sortOrder: 'asc' });

  const onSort = (field: SortField) => {
    const next = nextSortState(sort, field);
    setSort(next);
    setItems((current) => sortItems(current, next));
  };

  return (
    <div className="items-container">
      <h2>Shop Items</h2>

      <div className="sort-controls">
        <span>Sort by:</span>
        {sortFields.map(({ field, label }) => (
          <button
            key={field}
            type="button"
            onClick={() => onSort(field)}
            className={`sort-btn${sort.sortBy === field ? ' active' : ''}`}
          >
            {label} {sort.sortBy === field ? (sort.sortOrder === 'asc' ? '↑' : '↓') : ''}
          </button>
        ))}
      </div>

      <div className="items-grid">
        {items.map((item) => (
          <ItemComponent
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
