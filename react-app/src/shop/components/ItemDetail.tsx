import type { Item } from '../domain/item.model';

export interface ItemDetailProps {
  item?: Item;
}

export const ItemDetail = () => {
  return <p>item-detail works!</p>;
};
