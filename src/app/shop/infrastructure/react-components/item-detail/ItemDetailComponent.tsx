import React from 'react';

interface Item {
  name: string;
  description: string;
  price: string;
}

interface ItemDetailComponentProps {
  item: Item;
}

export const ItemDetailComponent: React.FC<ItemDetailComponentProps> = ({ item }) => {
  return (
    <p>item-detail works!</p>
  );
};
