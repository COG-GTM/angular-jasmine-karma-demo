import React, { useState } from 'react';
import { ItemComponent } from './ItemComponent';
import { ItemDetailComponent } from './ItemDetailComponent';
import type { Item } from './ItemDetailComponent';
import { AddItemComponent } from './AddItemComponent';

interface ItemsComponentProps {
  initialItems?: Item[];
}

export const ItemsComponent: React.FC<ItemsComponentProps> = ({ initialItems }) => {
  const [items, setItems] = useState<Item[]>(
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
    setItems(prev => [...prev, newItem]);
  };

  return (
    <div>
      <p>items shop</p>
      {items.map((item, index) => (
        <div key={index} onClick={() => handleItemSelect(item)}>
          <ItemComponent
            name={item.name}
            description={item.description}
            price={item.price}
          />
        </div>
      ))}
      {selectedItem && (
        <ItemDetailComponent item={selectedItem} />
      )}
      <AddItemComponent onSaveItem={handleAddItem} />
    </div>
  );
};
