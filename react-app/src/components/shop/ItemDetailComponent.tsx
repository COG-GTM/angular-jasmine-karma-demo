import React from 'react';

export interface Item {
  name: string;
  description: string;
  price: string;
}

interface ItemDetailComponentProps {
  item: Item;
}

export const ItemDetailComponent: React.FC<ItemDetailComponentProps> = ({ item }) => {
  return (
    <div className="item-detail">
      <p>item-detail works!</p>
      <p>Selected: {item.name}</p>
      <p>Price: {item.price} &euro;</p>
      <p>Description: {item.description}</p>
    </div>
  );
};
