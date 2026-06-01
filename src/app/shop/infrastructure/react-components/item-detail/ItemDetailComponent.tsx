import React from 'react';
import { Item } from '../../../domain/item.model.react';

interface ItemDetailProps {
  item: Item;
}

export const ItemDetailComponent: React.FC<ItemDetailProps> = ({ item }) => {
  return (
    <div className="item-detail">
      <p>{item.name}</p>
      <p>{item.description}</p>
      <p>{item.price}</p>
    </div>
  );
};
