import React, { useState } from 'react';
import { Item } from '../../../domain/item.model';

interface ItemsComponentProps {
  initialItems?: Item[];
}

export const ItemsComponent: React.FC<ItemsComponentProps> = ({ initialItems }) => {
  const [items] = useState<Item[]>(
    initialItems ?? [
      { name: 'foo', description: 'bar', price: '123' },
      { name: 'mario', description: 'bross', price: '456' },
      { name: 'luigi', description: 'bross', price: '789' },
    ]
  );

  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  const handleItemSelect = (item: Item) => {
    setSelectedItem(item);
  };

  const handleAddItem = (newItem: Item) => {
    console.info('Add item:', newItem);
  };

  return (
    <div>
      <p>items shop</p>
      {items.map((item, index) => (
        <div key={index} onClick={() => handleItemSelect(item)}>
          {/* TODO: Replace with ItemComponent once migrated */}
          <div className="item-placeholder">
            <h3>{item.name}</h3>
            <p>{item.price} EUR</p>
            <p>{item.description}</p>
          </div>
        </div>
      ))}
      {selectedItem && (
        <div>
          {/* TODO: Replace with ItemDetailComponent once migrated */}
          <div className="item-detail-placeholder">
            <p>item-detail works!</p>
            <p>Selected: {selectedItem.name}</p>
          </div>
        </div>
      )}
      {/* TODO: Replace with AddItemComponent once migrated */}
      <div className="add-item-placeholder">
        <p>add-item works!</p>
        <button onClick={() => handleAddItem({ name: '', description: '', price: '' })}>
          Add Item (placeholder)
        </button>
      </div>
    </div>
  );
};
