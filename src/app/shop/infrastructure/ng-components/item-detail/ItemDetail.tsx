import React from 'react';
import { Item } from '../../../domain/item.model';

interface ItemDetailProps {
  item: Item;
}

export const ItemDetail = (props: ItemDetailProps) => {
  return <p>item-detail works!</p>;
};

export default ItemDetail;
