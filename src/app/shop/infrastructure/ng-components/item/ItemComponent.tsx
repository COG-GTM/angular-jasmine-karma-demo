import React from 'react';
import { Item } from '../../../domain/item.model';

interface ItemComponentProps {
  name: Item['name'];
  description: Item['description'];
  price: Item['price'];
}

export const ItemComponent: React.FC<ItemComponentProps> = ({ name, description, price }) => {
  const like = (): void => {
    console.info('like ' + name);
  };

  return null;
};
