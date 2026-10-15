import Item from '../Item';
import { useItemsSort, type SortField } from './useItemsSort';
import './Items.css';

const SORT_FIELDS: { field: SortField; label: string }[] = [
  { field: 'name', label: 'Name' },
  { field: 'description', label: 'Description' },
  { field: 'price', label: 'Price' },
];

export default function Items() {
  const { items, sortBy, sortOrder, sortItems } = useItemsSort();

  return (
    <div className="items-container">
      <h2>Shop Items</h2>

      <div className="sort-controls">
        <span>Sort by:</span>
        {SORT_FIELDS.map(({ field, label }) => (
          <button
            key={field}
            type="button"
            onClick={() => sortItems(field)}
            className={`sort-btn${sortBy === field ? ' active' : ''}`}
          >
            {label} {sortBy === field ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
          </button>
        ))}
      </div>

      <div className="items-grid">
        {items.map((item) => (
          <Item
            key={`${item.name}-${item.description}-${item.price}`}
            name={item.name}
            description={item.description}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
}
