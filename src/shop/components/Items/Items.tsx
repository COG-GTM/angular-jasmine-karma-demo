import { Item } from '../Item';
import type { SortField } from './itemsSort';
import { useItemsSort } from './useItemsSort';
import './Items.css';

const SORT_BUTTONS: { field: SortField; label: string }[] = [
  { field: 'name', label: 'Name' },
  { field: 'description', label: 'Description' },
  { field: 'price', label: 'Price' },
];

export function Items() {
  const { items, sortBy, sortOrder, sortItems } = useItemsSort();

  return (
    <div className="items-container">
      <h2>Shop Items</h2>

      <div className="sort-controls">
        <span>Sort by:</span>
        {SORT_BUTTONS.map(({ field, label }) => {
          const active = sortBy === field;
          return (
            <button
              key={field}
              type="button"
              onClick={() => sortItems(field)}
              className={active ? 'sort-btn active' : 'sort-btn'}
            >
              {label}
              {active ? ` ${sortOrder === 'asc' ? '↑' : '↓'}` : ''}
            </button>
          );
        })}
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
